const { firestore_database, collection } = require("./firebase"); // Importiere collection

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const addURLs = async (longURL, shortURL) => {
  try {
    const collectionRef = collection(firestore_database, 'URLs');
    const data = {
      longURL,
      shortURL
    };

    const docRef = await collectionRef.add(data);
    console.log(`URLs have been added to the database with ID: ${docRef.id}`);
  } catch (error) {
    console.error('Error adding URLs to the database:', error);
  }
};

const databasefunc = async () => {
  readline.question('Original: ', async longURL => {
    readline.question('short: ', async shortURL => {
      await addURLs(longURL, shortURL);
      readline.close();
    });
  });
};

databasefunc();
