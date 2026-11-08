# ThePhoneStore CLI Webshop

Een Command Line Interface (CLI) webshop voor telefoonaccessoires. 
Met deze applicatie kunnen klanten het assortiment bekijken, producten toevoegen 
aan hun winkelmandje, bestellingen plaatsen, 
producten retourneren en een alert instellen voor als een product niet beschikbaar is.



## Use cases

1. **Assortiment & Voorraad bekijken**: Bekijk alle beschikbare telefoonaccessoires 
inclusief prijzen en actuele voorraadstatus UITVERKOCHT.

2. **Winkelmandje & Checkout**: Voeg producten toe aan je winkelmandje, bekijk het overzicht met het totaalbedrag,
en reken af met een bestaand of nieuw klant-ID.

3. **Stock Alerts**: Stel bij uitverkochte artikelen een voorraadmelding in gekoppeld aan je klant-ID (Bestaande of
nieuwe klant).

4. **Producten Retourneren**: Stuur eerder gekochte artikelen of bestellingen terug.


## Installatie

1. Clone het project: git@gitlab.fdmci.hva.nl:hbo-ict-deeltijd/studiejaar-2627/jaar-1/blok-1/bdd101/humphrey-spa.git
2. Installeer dependencies: `npm install`
3. Maak de database aan: open `sql/create-tables.sql` in WebStorm en voer uit
4. Vul met testdata: voer `sql/seed-data.sql` uit
5. Start het programma: `node src/index.js`


## Database-ontwerp

![ERD.png](ERD.png)


## Technologieën

- JavaScript (Node.js)
- SQLite (better-sqlite3)
- Git / GitLab