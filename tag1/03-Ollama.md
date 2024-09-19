# Ollama
https://ollama.com/

Plattform und API zum Zugriff auf LLMs.

- Lokale Ausführung von Modellen (Kontrolle und Datensicherheit)
- API: eigene + OpenAI-kompatible API

ACHTUNG:
- genügend RAM
- Besser GPU als CPU, da schnellere Berechnung

## Installation
- Direkt auf dem System: MacOS, Linux, Windows
- Als Container

## Kommandos
- serve: ollama starten und ausführen
- create: Modell aus einer Modelfile erzeugen
- show: Informationen über ein Modell anzeigen `ollama show mistral-nemo`
- run: Modell ausführen (CLI Prompt) - bleibt standardmäßig für 5 Minuten geladen
- pull: Modell aus der registry laden
- push: Model in die Registry hochladen - Account erforderlich
- list: Lokale Modelle anzeigen
- ps: Aktuell ausgeführte Modelle zeigen (PROCESSOR, UNTIL)
- cp: Model kopieren
- rm: Model löschen

## Models
https://ollama.com/library

## APIs

REST API (https://github.com/ollama/ollama/blob/main/docs/api.md)

```bash
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.1",
  "prompt":"Why is the sky blue?"
}'
```

Open AI API (https://github.com/ollama/ollama/blob/main/docs/openai.md)

```bash
curl http://localhost:11434/v1/completions \
    -H "Content-Type: application/json" \
    -d '{
        "model": "llama3",
        "prompt": "Say this is a test"
    }'
```