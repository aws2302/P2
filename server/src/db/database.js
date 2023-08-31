const { connect } = require('firefose');
const { Schema, SchemaTypes, Query } = require('firefose');
const { String, Object } = SchemaTypes;
const { Model } = require('firefose');
// Datenempfang von Markus
// const { stats } = require('../stats');
// Clickhandler muss aus dem Frontend kommen!
// Funktion bei Click auf den Link, eins hoch zählen. (Front oder Backend?)
// Aktualisierung der Clicks in der DB (Funktion schreiben)

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const serviceAccount = require('./p2-url-shortener-firebase-adminsdk-lfau4-b3cddbd6af.json');

const db = connect(
  serviceAccount, 'https://p2-url-shortener-default-rtdb.europe-west1.firebasedatabase.app'
);

const generateShortURL = () => {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let shortURL = 'short.li/';
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    shortURL += characters.charAt(randomIndex);
  }
  return shortURL;
};

const askForURLData = () => {
  readline.question('Enter the long URL: ', longURL => {
//     readline.question('Enter the OS: ', os => {
//       readline.question('Enter the Browser: ', browser => {
//         readline.question('Enter the number of Clicks: ', clicks => {
          saveURL(longURL);
          readline.close();
//         });
//       });
//     });
  });
};

const saveURL = (longURL) => {
  const shortURL = generateShortURL();
  const URL = new Model('Test', urlSchema);

  let lastClick = new Date().toLocaleString();

  // Frontend müsste dies bei sich einbauen, oder?
  // if (parseInt(clicks) < 1) {
  //   clicks = "0";
  //   lastClick = "No clicks yet";
  // }

  const browser = {
    Sonstige: 0,
    Opera: 0,
    Firefox: 0,
    Chrome: 0
  };

  switch (browser) {
    case 'Opera':
      browser.Opera++;
      break;
    case 'Firefox':
      browser.Firefox++;
      break;
    case 'Chrome':
      browser.Chrome++;
      break;
    default:
      browser.Sonstige++;
  }

  const os = {
    Sonstige: 0,
    Windows: 0,
    Linux: 0,
    MacOS: 0
  };

  switch (os) {
    case 'Windows':
      os.Windows++;
      break;
    case 'Linux':
      os.Linux++;
      break;
    case 'MacOS':
      os.MacOS++;
      break;
    default:
      os.Sonstige++;
  }

  const data = URL.create({
    Browser: browser,
    OS: os,
    Clicks: "0",
    shortURL,
    longURL,
    lastClick
  });

  const query = new Query();
  URL.find(query).then((res) => console.warn(res));
};

const urlSchema = new Schema({
  shortURL: {
    type: String,
    required: true
  },
  longURL: {
    type: String,
    required: true
  },
  Clicks: {
    type: String,
    required: true
  },
  OS: {
    type: Object,
    required: true
  },
  Browser: {
    type: Object,
    required: true
  },
  lastClick: {
    type: String,
    required: true
  }
}, { timestamp: true });

askForURLData();
