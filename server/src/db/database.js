const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

initializeApp();

const firestore_database = getFirestore();

const saveURL = async () => {
const URL_data = {
  longURL: 'Los Angeles',
  shortURL: 'CA',
};
console.log(URL_data);

// Add a new document in collection "cities" with ID 'LA'
const res1 = await firestore_database.collection('URLs').doc('URL1').set(URL_data);

const URL_Ref = firestore_database.collection('URLs').doc('URL2');

const res = await URL_Ref.set({
  capital: true
}, { merge: true });

await firestore_database.collection('URLs').doc('URL-id').set(URL_data);

};

saveURL();
