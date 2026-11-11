"use client";

import Image from "next/image";
import { FormEvent, useRef, useState } from "react";
import styles from "./demo1.module.css";

export default function DemoHydraulika() {
  const [status, setStatus] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Zgłoszenie testowe gotowe. Dane nie zostały wysłane.");
  }

  return (
    <div className={styles.page}>
      <a className={styles.skip} href="#tresc">Przejdź do treści</a>
      <div className={styles.demo}>Demo Crevis <span>·</span> Fikcyjna firma hydrauliczna</div>

      <header className={`${styles.wrap} ${styles.header}`}>
        <a className={styles.brand} href="#tresc"><span className={styles.mark} aria-hidden="true">◒</span> Rura i Spółka</a>
        <nav aria-label="Menu główne">
          <a href="#uslugi">Usługi</a>
          <a href="#obszar">Obszar</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a className={styles.headerContact} href="#kontakt">Kontakt <span aria-hidden="true">↗</span></a>
      </header>

      <main id="tresc">
        <section className={`${styles.wrap} ${styles.hero}`} aria-labelledby="start">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Hydraulika · Kraków i okolice</p>
            <h1 id="start">Hydraulika<br />bez przecieków<span>.</span></h1>
            <p className={styles.intro}>Cieknący kran, zatkany odpływ lub montaż nowej armatury? Opisz, co się dzieje, i ustal zakres prac przed wizytą.</p>
            <a className={styles.button} href="#kontakt">Opisz usterkę <span aria-hidden="true">↗</span></a>
            <a className={`${styles.subLink} ${styles.heroSubLink}`} href="#uslugi">Zobacz usługi ↓</a>
          </div>
          <figure className={styles.heroImage}>
            <Image src="/demo1/hydraulik.webp" alt="Hydraulik w ciemnozielonej odzieży roboczej naprawia instalację pod umywalką" width={1448} height={1086} priority sizes="(max-width: 700px) 100vw, 50vw" />
            <figcaption><span /> Serwis domowych instalacji</figcaption>
          </figure>
        </section>

        <section className={styles.services} id="uslugi">
          <div className={`${styles.wrap} ${styles.sectionPad}`}>
            <p className={styles.eyebrow}>Zakres prac</p>
            <h2>W czym pomagamy</h2>
            <div className={styles.serviceGrid}>
              <article><span className={styles.serviceIcon} aria-hidden="true">◈</span><h3>Naprawy i wycieki</h3><p>Usuwanie przecieków spod zlewu, wymiana uszczelek i zaworów oraz naprawa spłuczek.</p></article>
              <article><span className={styles.serviceIcon} aria-hidden="true">≋</span><h3>Udrażnianie odpływów</h3><p>Czyszczenie syfonów i udrażnianie odpływów w kuchni, łazience i pralni.</p></article>
              <article><span className={styles.serviceIcon} aria-hidden="true">⊕</span><h3>Montaż armatury</h3><p>Wymiana baterii, montaż umywalek i toalet oraz podłączanie pralek i zmywarek.</p></article>
            </div>
          </div>
        </section>

        <section className={`${styles.wrap} ${styles.area} ${styles.sectionPad}`} id="obszar">
          <Image src="/demo1/krakow.webp" loading="lazy" width={1774} height={887} sizes="(max-width: 700px) 100vw, 55vw" alt="Widok na Wawel znad Wisły" />
          <div>
            <p className={styles.eyebrow}>Obszar działania</p>
            <h2>Kraków i okolice</h2>
            <p>Obsługujemy m.in. Krowodrzę, Podgórze, Nową Hutę, Prądnik i Dębniki. Dojeżdżamy także do Wieliczki, Skawiny i Zielonek.</p>
            <a className={styles.subLink} href="#kontakt">Podaj dzielnicę lub miejscowość ↗</a>
          </div>
        </section>

        <section className={styles.faq} id="faq">
          <div className={`${styles.wrap} ${styles.sectionPad} ${styles.split}`}>
            <div><p className={styles.eyebrow}>FAQ</p><h2>Przed wizytą</h2></div>
            <div className={styles.questions}>
              <details><summary>Od czego zależy koszt naprawy?</summary><p>Od zakresu prac, potrzebnych części i dojazdu. Wstępną wycenę ułatwi opis usterki oraz informacja, gdzie potrzebna jest pomoc.</p></details>
              <details><summary>Co podać w zgłoszeniu?</summary><p>Napisz, gdzie występuje problem, od kiedy trwa i czego dotyczy. Wystarczy dzielnica lub miejscowość.</p></details>
              <details><summary>Czy mogę kupić armaturę samodzielnie?</summary><p>Tak. W zgłoszeniu podaj model i opisz istniejące przyłącza, aby można było ocenić, czy pasują do nowej armatury.</p></details>
              <details><summary>Czy obsługujecie awarie poza Krakowem?</summary><p>W okolicznych miejscowościach możliwość dojazdu i termin ustalamy indywidualnie.</p></details>
            </div>
          </div>
        </section>

        <section className={styles.contact} id="kontakt">
          <div className={`${styles.wrap} ${styles.sectionPad} ${styles.split}`}>
            <div>
              <p className={styles.eyebrow}>Kontakt</p>
              <h2>Opisz, czego<br />potrzebujesz<span>.</span></h2>
              <p>Podaj rodzaj prac, lokalizację i krótki opis usterki.</p>
              <p className={styles.demoNote} id="form-note">Formularz demonstracyjny. Wpisz przykładowe dane. Formularz sprawdza pola i pokazuje potwierdzenie w przeglądarce.</p>
            </div>
            <form onSubmit={handleSubmit} onInput={() => setStatus("")} aria-describedby="form-note">
              <div className={styles.fields}>
                <label>Imię<input name="name" placeholder="np. Anna" required maxLength={80} /></label>
                <label>E-mail<input name="email" type="email" placeholder="anna@example.com" required maxLength={254} /></label>
              </div>
              <div className={styles.fields}>
                <label>Dzielnica lub miejscowość<input name="location" placeholder="np. Podgórze" required maxLength={100} /></label>
                <label>Usługa<select name="service" required defaultValue=""><option value="" disabled>Wybierz usługę</option><option>Naprawa lub wyciek</option><option>Udrożnienie odpływu</option><option>Montaż armatury</option><option>Inna sprawa</option></select></label>
              </div>
              <label>Opis usterki<textarea name="message" rows={4} placeholder="np. Po użyciu zlewu pojawia się woda pod syfonem." required maxLength={1500} /></label>
              <button className={styles.button} type="submit">Wyślij zgłoszenie testowe <span aria-hidden="true">↗</span></button>
              <p className={styles.status} role="status" hidden={!status}>{status}</p>
            </form>
          </div>
        </section>
      </main>

      <footer className={`${styles.wrap} ${styles.footer}`}>
        <a className={styles.brand} href="#tresc"><span className={styles.mark} aria-hidden="true">◒</span> Rura i Spółka</a>
        <p>Demo Crevis · Projekt do portfolio</p>
        <a href="#tresc">Do góry ↑</a>
      </footer>

      <div className={styles.mobileBar}><button className={styles.button} type="button" onClick={() => dialogRef.current?.showModal()}>☎ <span>Zadzwoń</span></button></div>
      <dialog ref={dialogRef} className={styles.modal} aria-labelledby="call-title">
        <h2 id="call-title">Połączenie w wersji demo</h2>
        <p>Rura i Spółka to fikcyjna firma. Możesz przetestować zgłoszenie w formularzu.</p>
        <div className={styles.dialogActions}>
          <button className={styles.subLink} type="button" onClick={() => dialogRef.current?.close()}>Zamknij</button>
          <a className={styles.button} href="#kontakt" onClick={() => dialogRef.current?.close()}>Do formularza ↗</a>
        </div>
      </dialog>
    </div>
  );
}
