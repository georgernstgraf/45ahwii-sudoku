# 45ahwii-sudoku

## Aufgaben Teilung

### Unteraufgaben

- isInZeile(zahl, zeile) "ist die Zahl schon in der Zeile vorhanden?"
  zb. isInZeile(2,5) ist "2" in Zeile 5 schon vergeben? -> bool
- isInSpalte(zahl, zeile) "ist die Zahl schon in der Spalte vorhanden?" zb. isInSpalte(3, "D") -> bool
- isInSubquadrat(zahl, subquadrat) Subquadrate von 1-9 gezählt. zb. isInSubquadrat(8, 8) VORSICHT hier: Beide Parameter sind Integer und dürfen miteinander nicht verwechselt werden.
- express server, der die statischen files ausliefert
- code, der die .txt Angaben oder .json Angabedateien in unser vereinbartes Datenformat umwandelt und mittels express bereitstellt. unter `GET /sudokus` bzw. `GET /sudokus/schwerst1`.
- client-seitiges Empfangen und instanziieren der Sudoku Angabe
- lösen (konfigurierbare Anz. Lösungen)
- darstellen und durchnavigieren durch die Lösungen
- Farbabstufungen in der Anzeige je nach Rekursionstiefe (<https://www.youtube.com/shorts/CZ_LaL5DZk0>) Berechnung der max. zu erwartenden Rekursionstiefe
- installation auf grafg1

### Frontend

- Ben
- Jasim

#### Frontend Elemente

- select box zum Auswählen der verfügbaren Sudokus / und laden vom backend
- button "start solving"
- Anzeigen für: wieviele Lösungen gefunden / wieviele Lösungen max / wieviele Steps gegangen / maximale rekursionstiefe
- button für "watch me solve" der mit setInterval die allSteps wegshiftet
- botton für Anzeige der Lösung(en)

### Alg. Amin / Andreas

- Amin
- Andreas

### Alg. Massimo

- Massimo
- Emil

### Rekursion

- Jakob
- Matthias
