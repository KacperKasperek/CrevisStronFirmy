import os
from pathlib import Path

from playwright.sync_api import sync_playwright


BASE = os.environ.get("BASE_URL", "http://localhost:3000")
PREVIEW = Path(".next/portfolio-demo1-preview.png").resolve()
HOME_SHOT = Path(".next/portfolio-home.png").resolve()
PORTFOLIO_SHOT = Path(".next/portfolio-page.png").resolve()


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(channel="msedge", headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    console_errors: list[str] = []
    submitted_requests: list[str] = []
    page.on("console", lambda message: console_errors.append(message.text) if message.type == "error" else None)
    page.on("request", lambda request: submitted_requests.append(request.url) if request.method != "GET" else None)

    demo = page.goto(f"{BASE}/demo1", wait_until="networkidle")
    assert demo and demo.ok
    assert page.get_by_role("heading", name="Hydraulika bez przecieków.").is_visible()
    assert "noindex" in (page.locator('meta[name="robots"]').get_attribute("content") or "")
    assert page.get_by_text("Szanujemy Twoją prywatność").count() == 0
    assert page.locator("img").evaluate_all("images => images.every(image => image.complete && image.naturalWidth > 0)")
    page.locator("nextjs-portal").evaluate_all("portals => portals.forEach(portal => portal.remove())")
    page.screenshot(path=str(PREVIEW), full_page=False)

    page.get_by_label("Imię").fill("Anna")
    page.get_by_label("E-mail").fill("anna@example.com")
    page.get_by_label("Dzielnica lub miejscowość").fill("Podgórze")
    page.get_by_label("Usługa").select_option(label="Naprawa lub wyciek")
    page.get_by_label("Opis usterki").fill("Woda pojawia się pod syfonem.")
    page.get_by_role("button", name="Wyślij zgłoszenie testowe").click()
    page.get_by_role("status").wait_for(state="visible")
    assert "Dane nie zostały wysłane." in page.get_by_role("status").inner_text()
    assert not submitted_requests, submitted_requests

    page.set_viewport_size({"width": 390, "height": 844})
    page.goto(f"{BASE}/demo1", wait_until="networkidle")
    page.get_by_role("button", name="Zadzwoń").click()
    assert page.get_by_role("dialog", name="Połączenie w wersji demo").is_visible()
    page.get_by_role("button", name="Zamknij").click()

    page.set_viewport_size({"width": 1440, "height": 1000})
    page.evaluate("localStorage.setItem('crevis-analytics-consent', 'no')")
    home = page.goto(BASE, wait_until="networkidle")
    assert home and home.ok
    assert page.locator("#portfolio").is_visible()
    home_demo = page.get_by_role("link", name="Zobacz demo").first
    assert home_demo.get_attribute("href") == "/demo1"
    assert home_demo.get_attribute("target") == "_blank"
    page.locator("#portfolio").screenshot(path=str(HOME_SHOT))
    portfolio = page.goto(f"{BASE}/portfolio", wait_until="networkidle")
    assert portfolio and portfolio.ok
    assert page.get_by_role("heading", name="Strony, które pracują na markę.").is_visible()
    assert page.get_by_role("heading", name="Rura i Spółka").is_visible()
    assert page.get_by_role("link", name="Zobacz demo").get_attribute("target") == "_blank"
    assert page.get_by_role("link", name="Portfolio").first.get_attribute("href") == "/#portfolio"
    page.screenshot(path=str(PORTFOLIO_SHOT), full_page=True)

    sitemap = page.request.get(f"{BASE}/sitemap.xml")
    assert sitemap.ok
    assert "https://crevis.pl/portfolio" in sitemap.text()
    assert "https://crevis.pl/demo1" not in sitemap.text()
    assert not console_errors, console_errors

    browser.close()
