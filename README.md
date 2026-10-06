# DigitWorld

Spletna stran podjetja **DigitWorld** – digitalne rešitve za posameznike, podjetja in industrijo.

🌐 **Spletna stran:** https://DIGITWORLD84.github.io/digitwolrd

---

## Storitve

| # | Storitev | Na kratko |
|---|----------|-----------|
| 01 | **Računalniške storitve** | Vzdrževanje, popravila, strežniki, varnostne kopije, Microsoft 365, oddaljena pomoč |
| 02 | **Programiranje** | Spletne, namizne in mobilne aplikacije, avtomatizacija, integracije z ERP/API |
| 03 | **Mrežne rešitve** | Ožičenje, Wi-Fi, požarni zidovi, VPN, segmentacija, nadzor omrežja |
| 04 | **Industrija 4.0** | Programiranje robotov in PLC, merilne naprave, pametni senzorji, sledljivost, OEE |
| 05 | **Varnostne naprave** | IP kamere, snemalniki, alarmni sistemi, kontrola dostopa, požarna zaščita |
| 06 | **Pametne naprave** | Razsvetljava, ogrevanje, senčila, ključavnice, senzorji, glasovno upravljanje |

## Lastnosti strani

- Sodoben temen »digitalni« dizajn
- Interaktivni terminal s pregledom storitev
- Spustni meni storitev
- Interaktivne kartice pametnih naprav (stikala, termostat)
- Animirano ozadje z mrežo točk
- Prilagojeno za računalnik, tablico in telefon
- Ena sama datoteka `index.html` – brez gradnje, brez odvisnosti

## Tehnologije

- HTML5, CSS3, JavaScript (brez ogrodij)
- [Font Awesome 6](https://fontawesome.com/) – ikone
- [Google Fonts](https://fonts.google.com/) – Inter, Space Grotesk, JetBrains Mono
- [Unsplash](https://unsplash.com/) – fotografije

## Struktura

```
digitworld/
├── index.html   # celotna stran (HTML + CSS + JS)
└── README.md
```

---

## Objava na GitHub Pages (brezplačno)

1. Na GitHubu ustvari nov **public** repozitorij, npr. `digitworld`.
2. Naloži `index.html` in `README.md` (**Add file → Upload files → Commit changes**).
3. Pojdi v **Settings → Pages**.
4. Pod **Build and deployment** izberi:
   - **Source:** Deploy from a branch
   - **Branch:** `main` in mapa `/ (root)` → **Save**
5. Po 1–2 minutah bo stran dosegljiva na:
   `https://UPORABNIK.github.io/digitworld/`

### Lastna domena (npr. digitworld.si)

1. V **Settings → Pages → Custom domain** vpiši `digitworld.si` in shrani (GitHub sam ustvari datoteko `CNAME`).
2. Pri ponudniku domene nastavi DNS zapise:

   | Tip   | Ime  | Vrednost              |
   |-------|------|-----------------------|
   | A     | @    | 185.199.108.153       |
   | A     | @    | 185.199.109.153       |
   | A     | @    | 185.199.110.153       |
   | A     | @    | 185.199.111.153       |
   | CNAME | www  | UPORABNIK.github.io   |

3. Ko DNS zaživi (lahko traja do 24 ur), vklopi **Enforce HTTPS**.

### Kontaktni obrazec

GitHub Pages podpira samo statične strani, zato obrazec sam ne pošilja e-pošte.
Za delovanje ga poveži z brezplačno storitvijo, npr. [Formspree](https://formspree.io/):

1. Ustvari obrazec na Formspree in kopiraj svoj naslov (`https://formspree.io/f/xxxxxxx`).
2. V `index.html` poišči komentar `TODO` v funkciji `initContactForm` in tam dodaj pošiljanje:

```js
fetch('https://formspree.io/f/xxxxxxx', {
    method: 'POST',
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
});
```

---

## Lokalni ogled

Dovolj je, da `index.html` odpreš z dvoklikom v brskalniku.

## Kontakt

**DigitWorld**
📍 Kunaverjeva ulica 3, 1000 Ljubljana
📞 [070 450 341](tel:+38670450341)
✉️ [info@digitworld.si](mailto:info@digitworld.si)

---

© 2026 DigitWorld. Vse pravice pridržane.
