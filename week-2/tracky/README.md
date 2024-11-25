# Tracky

Voorbeeld applicatie Programming 6

Structuur:

- `src/` bevat de code van de applicatie
  - `app/` bevat de routes en de algemene layout van de applicatie
  - `components/` bevat de componenten van de applicatie
    - `design/` bevat de design componenten ("domme" componenten die enkel de layout bepalen)
    - `functional/` bevat de functionele componenten (componenten die data ophalen en tonen, logica hebben, ...) en die gebruik maken van de design componenten voor layout
  - `core/` bevat de algemene logica (los van React), bv. services, utils, types van API data, ...
  - `styles/` bevat de globale styles van de applicatie
- `ts.config.json` bevat de configuratie van de paths, bv. `@design` verwijst naar `src/components/design`