# URL Shortener

Als Benutzer möchte ich lange URLs in kurze Links umwandeln können, um sie leichter
teilen zu können. Zudem möchte ich Zugriff auf Statistiken über die Nutzung meiner
generierten Kurzlinks erhalten.

## Anforderungen

- URL-Kürzung
  - Implementierung eines Algorithmus zur Generierung kurzer Links aus eingegebenen URLs.
  - Generierung von eindeutigen und nicht leicht vorhersagbaren Kurzlink-Codes

- Benutzeroberfläche
  - Erstellung einer benutzerfreundlichen Web-Oberfläche zur Eingabe und Generierung von Kurzlinks.
  - Möglichkeit zur Anzeige von bereits erstellten Kurzlinks.

- Datenbank
  - Speicherung der ursprünglichen URLs und zugehörigen Kurzlinks in einer Datenbank.
  - Verknüpfung der Kurzlinks mit eindeutigen Schlüsseln (Keys).

- API
  - Entwicklung einer API zur Interaktion zwischen Frontend und Backend für das Erstellen von Kurzlinks und Abrufen von Statistiken.

- URL-Validierung
  - Implementierung einer URL-Validierung, um sicherzustellen, dass die eingegebenen URLs gültig sind.

- Statistik und Analyse
  - Sammlung und Speicherung von Daten über Klicks auf generierte Kurzlinks.
  - Generierung detaillierter Statistiken, einschließlich Anzahl der Klicks, Zeitpunkt der Nutzung und OS+Browser der Nutzer.

- Passwort für Link-Bearbeitung und Statistik
  - Generierung eines eindeutigen Schlüssels/Passworts für jeden generierten Kurzlink.
  - Mit dem Schlüssel/Passwort können Benutzer den Link bearbeiten und die Statistiken einsehen.
