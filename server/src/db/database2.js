const { collection, addDoc } = require("firebase/firestore");
const { firestore_database } = require("firebase");

const saveURL = async () => {
  try {
    const longURL = 100;
    const shortURL = 10;
    const URL = { longURL, shortURL };

    // Pfad zur Sammlung angeben (z.B. "URLs")
    const URLDatabase = collection(firestore_database, "URLs");

    await addDoc(URLDatabase, URL);
    
    console.log("URL erfolgreich gespeichert:", longURL, shortURL);
    return true;
  } catch (error) {
    console.error("Fehler beim Speichern der URL:", error);
    return false;
  }
};

(async () => {
  await saveURL();
})();
