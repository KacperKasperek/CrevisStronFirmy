from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:3100"
SHOT = Path(r"C:\Users\kacpe\.codex\visualizations\2026\07\22\019f89c2-fe90-7510-89f9-fffdb137633b\crevis-home.png")

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(channel="msedge", headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 1000})
    errors = []
    page.on("console", lambda msg: errors.append(msg.text) if msg.type == "error" else None)
    response = page.goto(BASE, wait_until="networkidle")
    assert response and response.ok
    assert page.get_by_role("heading", name="Twój sukces zaczyna się tutaj").is_visible()
    assert page.get_by_role("button", name="Wyślij wiadomość").is_visible()
    assert page.get_by_role("link", name="Crevis 2026 ©").get_attribute("href") == "/panel"
    assert page.get_by_text("Szanujemy Twoją prywatność").is_visible()
    page.get_by_role("button", name="Odrzucam").click()
    page.get_by_text("Szanujemy Twoją prywatność").wait_for(state="hidden")
    page.screenshot(path=str(SHOT), full_page=True)
    privacy = page.goto(f"{BASE}/polityka-prywatnosci", wait_until="networkidle")
    assert privacy and privacy.ok
    login = page.goto(f"{BASE}/panel/login", wait_until="domcontentloaded", timeout=15000)
    assert login and login.ok, (login.status if login else None, page.url, page.content()[:500])
    assert page.get_by_role("heading", name="Crevis Control").is_visible()
    assert not errors, errors
    browser.close()
