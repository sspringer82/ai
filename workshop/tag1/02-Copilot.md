# GitHub Copilot

Copilot kostet: https://docs.github.com/en/copilot/about-github-copilot/subscription-plans-for-github-copilot#comparing-copilot-subscriptions
- Individual: 10$ pro Person pro Monat
- Business: 19$ pro Person pro Monat
- Enterprise: 39$ pro Person pro Monat

## Wo ist der Copilot gut und wo nicht

Gut:
- Tests, wiederholender Code
- Debugging, Syntax korrigieren
- Code erklären und kommentieren
- Regex erzeugen

Nicht gut:
- Prompts die nichts mit Code und Technologie zu tun haben
- Expertiese und Skills eines Programmierers ersetzen - es ist nur ein Werkzeug


## Features

### Code Completion
Empfehlungen in der IDE direkt beim Code Schreiben. Vorschläge während des Tippens, die mit Tab bestätigt werden können.

- Codesnipptes vervollständigen, Variablennamen und Funktionen während man sie schreibt
- Wiederholenden Code schreiben
- Code aus inline Kommentaren in natürlicher Sprache schreiben
- Tests für TDD schreiben

- Context:
  - Offene Dateien
  - Top level Kommentar
  - Includes & Referenzen
  - Sprechende Funktionsnamen
  - Spezifische und klar abgegrenzte Funktionskommentare
  - Codebeispiele vorgeben

### Copilot Chat
- Fragen zum Code beantworten
- Größere Codeabschnitte erzeugen, darüber iterieren und anpassen
- Bestimmte Aufgaben anhand von Skills und Keywords erledigen.
- Code als Persona (z.B. Senior JS Engineer) schreiben lassen

- Copilot Chat
  - Participants und Slash Commands verwenden
  - Variablen im Chat für mehr Kontext nutzen
  - Spezifisch und einfach halten
  - Die Lösung schrittweise verbessern

#### Participants
- @workspace: Kontext des aktuellen Workspaces. Struktur des Projekts, wie unterschiedliche Teile zusammenspielen oder welche Designpatterns verwendet werden
- @vscode: Kennt VSCode Commands und Features, wenn man Hilfe mit VSCode braucht
- @Terminal: Kennt das VSCode Terminal und den Inhalt, wenn man Kommandos erzeugen oder debuggen will

#### Slash Commands
- /tests: Unittests für den ausgewählten Code erzeugen
- /fix: Fix für Probleme im ausgewählten Code
- /doc: Dokumentation erzeugen
- /explain: Ausgewählten Code erklären lassen
- /clear: neuen Chat starten

https://code.visualstudio.com/docs/copilot/copilot-chat#_slash-commands

Commands und Participants können kombiniert werden

#### Chat variables
- #file: bestimmte Datei inkludieren
- #git: Infos über das aktuelle Repo
- #terminalLastCommand: das letzte Kommando im Terminal

#### Aufrufe
- Inline: CMD + I
- Quick Chat: Shift + Command + i


### Copilot in the CLI
Chat Interface im Terminal, über das man Fragen stellen kann.


## Prompt Engineering

https://docs.github.com/en/copilot/using-github-copilot/prompt-engineering-for-github-copilot

- Allgemein beginnen, spezifischer werden. Erst Allgemeine Beschreibung, dann spezifische Anforderungen
- Beispiele wie Eingaben, Ausgaben oder Implementierungen angeben
- Komplexe Aufgaben herunterbrechen
- Spezifisch sein, Uneindeutigkeit vermeiden
- Good Coding Practices folgen
- Relevanten Code angeben (@Workspace, #file)
- Experimentieren und iterieren
- Chat history relevant halten (History verwenden vs. neuen chat starten)

## Fazit
- Vorschläge verstehen, bevor man sie umsetzt
- Vorschläge immer überprüfen
- Automatisierte Tests verwenden

- Kontext geben
- Prompts umformulieren
- Den besten Vorschlag verwenden
- Feedback geben