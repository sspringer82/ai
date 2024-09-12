# Alternativen zu ChatGPT
- Google Gemini https://gemini.google.com/app, Transformer-Architektur
- Anthropic Claude https://claude.ai/new - Fokus auf Sicherheit und Ethik, Transformer-Architektur

## Modelle
- GPT-1 (Juni 2018) - 117M Parameter
- GPT-2 (Februar 2019) - 1,5B Parameter
- GPT-3 (Juni 2020) - 175B Parameter
- GPT-3.5 (November 2022) - 175B Parameter
- GPT-4 (März 2023) - 1.5T Parameter
- GPT-4o (Mai 2024) - ? Parameter

Zum Vergleich:
- LLama 3.1 8B, 70B, 405B Parameter

# Best Practices

## Be Specific
Sei präzise und detailliert. Klare und spezifische Anweidungen sind wichtig, damit ChatGPT die Aufgabe genau versteht und passende Code-Vorschläge liefern kann. Vage oder allgemeine Aufgaben führen dazu, dass die Erwartungen nicht erfüllt werden.

| Don't                                              | Do                                                                                                                                                                                                     |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Sort an array of numbers                           | Sort an array of numbers in descending order in JavaScript, ensuring that negative numbers and decimals are handled correctly                                                                          |
| Fetch from an array of URLs with Promises          | Write a JavaScript function that takes an array of URLs, fetches data from each URL in parallel using Promise.all(), and logs the response times for each request.                                     |
| Create a login form in React                       | Create a controlled form component in React with validation that handles emaila nd password input, showing error messages when the input is invalid, using React Hook Form and Material-UI             |
| Create a enum for HTTP status codes  in TypeScript | Define a TypeScript enum for HTTP status codes, including 200: OK, 404: Not Found, and 500: Internal Server Error, and create a function that takes a status code and returns a corresponding message. |

## Use Keywords

Verwende in deinen Anweisungen gezilet die wichtigen Schlüsselwörter doer Fachbegriffe, die für die jeweilige Aufgabe oder Technologie relevant sind. Dadurch versteht ChatGPT besser, worauf sich die Anfrage bezieht und kann präzisere und spezifischere Antworten liefern. Programmiersprachen, Frameworks, Funktionen oder Konzepte erwähnen.

| Don't                               | Do                                                                                                                                                                                            | Keywords                       |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| Handle errors in an API call        | Use try...catch to handle errors in a JavaScript fetch API call and log any failed responses.                                                                                                 | try...catch                    |
| Create a function that returns data | Create a generic function in TypeScript that returns a Promise<Array<T>> where T is a type passed to the function.                                                                            | generic, Promise<Array<T>>     |
| Create a class for a user           | Create a TypeScript class User with private properties name (string) and age (number), and include a public method getProfile() that returns a formatted string with the user’s name and age. | private, public und class      |
| Handle asynchronous requests        | Use async/await in JavaScript to make an API request to /api/data, handle the response as JSON, and log any errors using a try...catch block.                                                 | async/await, try...catch, JSON |

## Instruct, Don't Ask

Nicht fragen, sondern direkte und klare Anweisungen geben. Das sorgt für bessere Qualität, da ChatGPT den gewünschten Code oder die Löstung liefert und keine allgemeinen Informationen oder Erklärungen.

| Don't                                                                    | Do                                                                                                                                    |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| How to merge two arrays in JavaScript                                    | Merge two arrays arr1 and arr2 in JavaScript, removing any duplicate elements.                                                        |
| How to define a type for a function that returns a promise in TypeScript | Define a TypeScript type for a function that takes a string argument and returns a Promise<number>.                                   |
| How to debounce a function in JavaScript                                 | Implement a debounce function in JavaScript that delays the execution of a provided function by 300 milliseconds after the last call. |
| How to create a generic function in TypeScript                           | Create a generic TypeScript function identity<T> that returns its argument without modifying it, preserving the type of the input.    |

## Provide Examples
Gib bei deinen Prompts Beispiele oder Code Snipptes an, um den Kontext besser zu erklären und genauere Antworten zu erhalten. Besonders hilfreich bei komplexen Aufgaben. Auch wenn der Code nicht direkt verwendet werden kann, gibt er eine gute Vorstellung, wie die Lösung aussehen soll.

Du hast bereits eine Funktion, die eine Liste von Benutzern nach ihrem Erstellungsdatum sortiert. Jetzt möchtest du eine neue Funktion schreiben, die Benutzerdaten filtert und nur die Benutzer zurückgibt, die innerhalb der letzten 30 Tage erstellt wurden. Du möchtest, dass die neue Funktion dem Stil und der Struktur der bestehenden Funktion folgt.

```ts
interface User {
    name: string;
    createdAt: string; // Date in 'YYYY-MM-DD' format
}

// Sorts users by creation date in descending order
function sortUsersByCreationDate(users: User[]): User[] {
    return users.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}
```

Reference code above: The sortUsersByCreationDate function sorts users by created date.
Please write a new TypeScript function `filterRecentUsers` that returns only the users created within the last 30 days.
The `users` array has the same `User` type, and the `createdAt` field is a string in the format `YYYY-MM-DD`.
Make sure the function follows a similar structure to the sorting function above, using the Date object to calculate the date difference.

## Formatting Instructions

genaue Anweisungen geben, wie das generierte Code-Snippet formatiert und präsentiert werden soll, damit es direkt und effizient nutzbar ist.

- Verwende ES6+ Syntax: Moderne Syntax
- Typannotationen in TypeScript: Immer explizite Typen verwenden
- Keine unnötigen Kommentare und Leerzeilen
- Nutze Template Literals für String-Konkatenation
- Nutze Destructuring für Objekte und Arrays
- Verwende Default-Parameter in Funktionen
- Bevorzuge async/await über Promises
- Folge den Regeln des AirBnB Code Styles/JavaScript Standards/Google Style
- Vermeide direkte Mutationen von Objekten und Arrays