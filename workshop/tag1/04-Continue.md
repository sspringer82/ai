# Continue 
(https://www.continue.dev/)

Plugin für VSCode und JetBrains

## keyfeatures
- Flexible Model Integratio: open source oder commercial, local oder remote
- Versatile Applications: Chat, Autocomplete, embeddings
- Highly Customizable

## Was kann Continue?
- Understand code sections easily: Code markieren und CMD+L
- Autocomplete code with tab
- Refactor functions in-place: Markieren und CMD+I
- Query your codebase: @codebase + Anfrage oder CMD + Enter
- Leverage documentations as context: @docs command
- Use slash commands for quick actions
- Add various elements to context: mit @files in den Kontext einfügen
- Instantly understand terminal errors: CMD + Shift + R um Fehler erklären zu lassen

## Setup
Konfiguration in ~/.continue/config.json

Verschiedene Models: https://docs.continue.dev/setup/select-model
- Chat: z.B. llama3-8b oder deepseek-coder-v2:16b oder claude 3.5/gpt-4o/gemini => Chat Feature
- Autocomplete: Codestral, DeepSeek CoderV2 oder StarCoder2
- Embeddings (Codebase retrieval): nomic-embed-text (open), voyage-code-2 (commerziell)
- Remote Model: `apiBase` mit URL zum Server
  
## Context Poviders
- BuiltIn: https://docs.continue.dev/customization/context-providers#built-in-context-providers
- Files: @file - Referenz auf eine beliebige Datei im Workspace
- Code: @code - Referenz auf eine Klasse oder Funktion
- Git Diff: @diff - Zugriff auf den Git diff des aktuellen Branches
- Terminal: @terminal - Zugriff auf das Terminal der IDE
- Documentation: @docs: Dokumentationsindex
- Offene Dateien: @open offene Dateien
- Codebase: @codebase
- Verzeichnis: @folder - wie codebase nur auf ein Verzeichnis
- Exact Search: @search: VSCode Suche
- URL: @url - in MD umgewandelt und ans modell übergeben
- File Tree: @tree: LLM sieht die verschachtelte Struktur des Projekts
- Google: @google - googlen, Key: serper.dev
- GitHub Issues: @issue TOKEN angeben!
- GitLab Merge Request: @gitlab-mr
- Jira Issues: @jira
- Postgres: @postgres
- Database Tables: @database
- Debugger: local variables @locals
- Operating System: @os

## Slash Commands
- /edit: Select code with ctrl/cmd + L (VS Code) or ctrl/cmd + J (JetBrains), and then type "/edit", followed by instructions for the edit. Continue will stream the changes into a side-by-side diff editor.
- /comment: Comment works just like /edit, except it will automatically prompt the LLM to comment the code.
- /share: Type "/share" to generate a shareable markdown transcript of your current chat history.
- /cmd: Generate a shell command from natural language and (only in VS Code) automatically paste it into the terminal.
- /commit: Shows the LLM your current git diff and asks it to generate a commit message.
- /http: Write a custom slash command at your own HTTP endpoint. Set 'url' in the params object for the endpoint you have setup. The endpoint should return a sequence of string updates, which will be streamed to the Continue sidebar. See our basic FastAPI example for reference.
- /issue: Describe the issue you'd like to generate, and Continue will turn into a well-formatted title and body, then give you a link to the draft so you can submit. Make sure to set the URL of the repository you want to generate issues for.
- /so: The StackOverflow slash command will automatically pull results from StackOverflow to answer your question, quoting links along with its answer.
- /onboard: The Onboard slash command helps to familiarize yourself with a new project by analyzing the project structure, READMEs, and dependency files. It identifies key folders, explains their purpose, and highlights popular packages used. Additionally, it offers insights into the project's architecture.
