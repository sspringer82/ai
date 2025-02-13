# Tokens
Token eine kleine Texteinheit. Einzelne Wörter, Teile von Wörtern, Leerzeichen oder Satzzeichen.

`npm install tiktoken` 

# Open AI + API



## Pricing

| Modell             | Preis input     | Preis Output     |
| ------------------ | --------------- | ---------------- |
| gpt-4o             | $5.00/1M tokens | $15.00/1M tokens |
| gpt-4o mini        | $0.15/1M tokens | $0.60/1M tokens  |
| gpt-3.5-turbo-0125 | $0.50/1M tokens | $1.50/1M tokens  |
| DALL-E3            |                 | $0.040/Img       |
| Whsiper            | $0.006/min      |
| TTS                | $15.00/1M char  |

ältere Modellstände bei GPT sind günstiger.

## Endpunkte - REST

POST https://api.openai.com/v1/chat/completions

```sh
curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-4o-mini",
    "messages": [
      {
        "role": "system",
        "content": "You are a helpful assistant."
      },
      {
        "role": "user",
        "content": "Who won the world series in 2020?"
      },
      {
        "role": "assistant",
        "content": "The Los Angeles Dodgers won the World Series in 2020."
      },
      {
        "role": "user",
        "content": "Where was it played?"
      }
    ]
  }'
```

## API Doc
https://platform.openai.com/docs/guides/chat-completions
https://platform.openai.com/docs/api-reference/chat

Header:
- `"Content-Type": "application/json"`
- `"Authorization": "Bearer API_KEY"`

Body:
- model: `gpt-4o-mini`
- messages: Array von Messages mit `role` und `content`
  - role:
    - System: Set the behaviour of the assistant
    - User: Requests or comments for the assistant to respond to
    - Assistant: Previous assistant responses
- temperatur (opt): 0 - 2, geringere Werte (0.2) more focused, höhere werte (0.8) more random
- max_completion_tokens (opt): Max Anzahl von Tokens die in der chat completion generiert werden können

## Pakete
- Python: `pip install openai`
- Node.js: `npm install openai`


# Gemini

## Pricing

| Modell                         | Preis input      | Preis Output     |
| ------------------------------ | ---------------- | ---------------- |
| Gemini 1.5 pro < 128k tokens   | $3.50/1M tokens  | $10.50/1M tokens |
| Gemini 1.5 pro > 128k tokens   | $7.00/1M tokens  | $21.00/1M tokens |
| Gemini 1.5 Flash < 128k tokens | $0.075/1M tokens | $0.30/1M tokens  |
| Gemini 1.5 Flash > 128k tokens | $0.15/1M tokens  | $0.60/1M tokens  |
| Gemini 1.0 Pro (*)             | free             | free             |

*) 15 Requests/Minute, 32k Tokens/Minute, 1500 Requests/Tag


## Endpunkte - REST

POST https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=$GOOGLE_API_KEY

Header:
- `"Content-Type": "application/json"`

Body:
```js
"contents": [{
"parts":[{"text": "Write a story about a magic backpack."}]
}]
```

## Pakete
- Python: `pip install -U google-generativeai`
- Node.js: `npm install @google/generative-ai`
- Go: `go get github.com/google/generative-ai-go`

# Claude

## Pricing
| Modell            | Preis input      | Preis Output     |
| ----------------- | ---------------- | ---------------- |
| Claude 3.5 Sonnet | $3.00/1M tokens  | $15.00/1M tokens |
| Claude 3.5 Opus   | $15.00/1M tokens | $75.00/1M tokens |
| Claude 3.5 Haiku  | $0.25/1M tokens  | $1.25/1M tokens  |

## Endpunkte - REST

POST https://api.anthropic.com/v1/messages 

Header: 
- "x-api-key: $ANTHROPIC_API_KEY" 
- "anthropic-version: 2023-06-01" 
- "content-type: application/json" 

Body:
```json
{
    "model": "claude-3-5-sonnet-20240620",
    "max_tokens": 1024,
    "messages": [
        {"role": "user", "content": "Hello, world"}
    ]
}
```

## Pakete
- Python: `pip install anthropic`
- Node.js: `npm install @anthropic-ai/sdk`