AI-Agent

E

1. Autonomie
2. Reaktivität
3. Proaktivität
4. Kommunikationsfähigkeit
5. Lernfähigkeit
6. Zielgerichtetheit
7. Nutzung von Werkzeugen
8. Wissen und Gedächtnis

Sensoren
Wetter API




#########

Ein AI-Agent für ein vereinfachtes Smart-Building (oder Smart Room), der die genannten Kriterien erfüllt, kann wie folgt gestaltet werden:

Konzept: Smart Room Agent

Der AI-Agent überwacht und steuert die Temperatur eines Raums auf Grundlage:
	•	eines Temperatursensors
	•	von Echtzeit-Wetterdaten
	•	und Benutzerinteraktionen

Funktionen des Smart Room Agents:
	1.	Autonomie: Der Agent reguliert selbstständig die Raumtemperatur basierend auf Sensordaten und Wettervorhersagen.
	2.	Reaktivität: Er reagiert auf Benutzeranfragen oder plötzliche Änderungen (z. B. stark sinkende Außentemperatur).
	3.	Proaktivität: Bei extremen Wetterbedingungen passt er die Temperatur an, bevor der Nutzer eingreift.
	4.	Kommunikationsfähigkeit: Er kann mit dem Nutzer kommunizieren (z. B. Warnungen senden: „Es wird morgen sehr kalt, soll ich die Heizung auf Standby lassen?“).
	5.	Lernfähigkeit: Der Agent speichert Vorlieben des Nutzers (z. B. bevorzugte Temperatur zu bestimmten Tageszeiten).
	6.	Zielgerichtetheit: Hauptziel ist, die Temperatur optimal zu regulieren, ohne Energie zu verschwenden.
	7.	Nutzung von Werkzeugen: Wetter-API, Sensordaten, Steuerung der Heizung.
	8.	Wissen und Gedächtnis: Der Agent merkt sich Sensordaten, Benutzerinteraktionen und Anpassungen.

Technologien
	•	LangChain / LangGraph für die KI-Logik und Tools.
	•	Sensorsimulation für Raumtemperatur.
	•	OpenWeather API für Wetterdaten.
	•	MemoryVectorStore für Gedächtnis und Präferenzen.

Beispiel-Implementierung mit LangGraph

Installation

npm install langchain axios

Code

import { ChatOpenAI } from "langchain/chat_models";
import { MemoryVectorStore } from "langchain/vectorstores";
import { AgentExecutor, ZeroShotAgent, Tool } from "langchain/agents";
import axios from "axios";

// Wetterdaten-Tool
const WeatherTool = new Tool({
  name: "WeatherAPI",
  description: "Fetches current weather data for a given location",
  func: async (location) => {
    const apiKey = "your_openweather_api_key"; // OpenWeather API Key
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
    );
    return `The temperature in ${location} is ${response.data.main.temp}°C with ${response.data.weather[0].description}.`;
  },
});

// Temperatursensor-Simulation
let roomTemperature = 20; // Startwert
const TempSensorTool = new Tool({
  name: "TempSensor",
  description: "Reads the current room temperature",
  func: async () => `The current room temperature is ${roomTemperature}°C.`,
});

// Heizungskontrolle
const HeatingControlTool = new Tool({
  name: "HeatingControl",
  description: "Adjusts the heating system to a desired temperature",
  func: async (targetTemperature) => {
    const target = parseFloat(targetTemperature);
    if (target > roomTemperature) {
      roomTemperature = target; // Simuliert das Erwärmen
      return `Heating turned on to reach ${target}°C.`;
    } else {
      return "Heating is not required.";
    }
  },
});

// Gedächtnis
const memory = new MemoryVectorStore();

// Agent-Setup
const agent = new ZeroShotAgent({
  llm: new ChatOpenAI({ temperature: 0.7 }),
  tools: [WeatherTool, TempSensorTool, HeatingControlTool],
  memory,
});

// Agent Executor
const executor = new AgentExecutor({
  agent,
  memory,
});

// Nutzerinteraktion
const userInteraction = async (input) => {
  const response = await executor.call({ input });
  console.log("User:", input);
  console.log("Agent:", response.output);
};

// Szenario
(async () => {
  console.log("Initial room temperature:", roomTemperature, "°C");

  // 1. Agent prüft Wetter und gibt Empfehlungen
  await userInteraction("What's the weather in Berlin?");
  
  // 2. Agent liest die aktuelle Raumtemperatur
  await userInteraction("What is the current room temperature?");
  
  // 3. Nutzer gibt eine gewünschte Temperatur vor
  await userInteraction("Set the room temperature to 22°C.");

  // 4. Agent merkt sich die Präferenz
  await userInteraction("Remember that I prefer 22°C in the evening.");

  // 5. Agent gibt proaktive Empfehlungen
  await userInteraction("Should I adjust the heating for tomorrow's weather?");
})();

Erläuterung des Codes
	1.	Wetter-Tool (WeatherTool):
	•	Holt aktuelle Wetterdaten für eine angegebene Stadt über die OpenWeather API.
	2.	Temperatursensor (TempSensorTool):
	•	Simuliert einen Temperatursensor im Raum, der die aktuelle Raumtemperatur liefert.
	3.	Heizungskontrolle (HeatingControlTool):
	•	Stellt die Temperatur ein und simuliert eine Heizungsregelung.
	4.	Gedächtnis (MemoryVectorStore):
	•	Speichert Benutzerpräferenzen, z. B. bevorzugte Temperaturen.
	5.	Autonomie und Proaktivität:
	•	Der Agent prüft eigenständig die Wetterbedingungen und gibt Empfehlungen.

Weitere Verbesserungsmöglichkeiten
	•	Tageszeiten berücksichtigen: Heizungssteuerung basierend auf Uhrzeit und Benutzerpräferenzen.
	•	Energieeffizienz-Tool: Warnungen bei übermäßigem Energieverbrauch.
	•	Integration realer Hardware: Anbindung an IoT-Geräte (z. B. Smart-Home-Systeme).

Dieses Beispiel ist überschaubar, erfüllt jedoch alle Kriterien für einen AI-Agenten in einem Smart-Room-Szenario.