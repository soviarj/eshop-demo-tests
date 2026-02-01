## Nastavenie a použitie

### Krok 1: Nastavenie prostredia

1. Najništalujte dotenv:
npm install dotenv

2. Vytvorte `.env` súbor podľa `.env.example`

3. Vyplňte údaje svojho testovacieho uživateľa:
USER_NAME=
USER_PASSWORD=

Ak žiadneho vytvoreného nemáte, vyplňte údaje môjho uživateľa. Emailové konto je fiktívne, heslo k nemu slúži iba na testovacie účely, nejde o citlivé dáta reálneho používateľa.(USER_NAME=email@gmail.com, USER_PASSWORD=Heslo789@PWD)

### Krok 2: Spustenie testov

npx playwright test demo.spec.ts (headless mode)
npx playwright test demo.spec.ts --headed (headed mode s otváraním obrazoviek prehliadača)

### Poznámky

- Autentifikačný scenár stačí otvárať iba raz (pokým nevyprší platnosť uloženej session)
- Pre ďalšie behy scenárov, môžete kľudne nastaviť prvý test ako test.skip, nakoľko sa uživateľ overuje voči uloženej session pokým jej platnosť nevyprší

