// const { connect } = require('firefose');
// const { Schema, SchemaTypes, Query } = require('firefose');
// const { String } = SchemaTypes;
// const { Model } = require('firefose');
// const { addStats } = require('../maintainStats');
// const { getShortUrl, getLongUrl } = require('../urlShortener');


// const serviceAccount = require('./p2-url-shortener-firebase-adminsdk-lfau4-b3cddbd6af.json');

// const firebase = connect(
//   serviceAccount, 'https://p2-url-shortener-default-rtdb.europe-west1.firebasedatabase.app'
// );

// const schemaURL = new Schema({
//   shortURL: {
//     type: String,
//     required: true
//   },
//   longURL: {
//     type: String,
//     required: true
//   }
// });

// const dataSave = () => {
//   const URL = new Model('Test1', urlSchema);
//   URL.longURL = getLongUrl;
//   URL.shortURL = getShortUrl;
//   URL.stats = addStats;

//   console.log(URL);

// };

// function getStats(short) {
//   return {
//     clicks: 0,
//     lastClick: Date.now(),
//     OS: {
//       Linux: 0,
//       Windows: 0,
//       MacOs: 0,
//     },
//     Browser: {
//       Chrome: 0,
//       Edge: 0,
//       Firefox: 0,
//       Opera: 0,
//       Safari: 0,
//       Sonstige: 0,
//     },
//     createDate: new Date().toLocaleString(),
//     expireDate: new Date().toLocaleString(),
//     longURL: getLongUrl(short), // Änderung: Hier sollten Sie die Funktion aufrufen, um die tatsächliche URL zu erhalten
//     shortURL: getShortUrl(), // Änderung: Hier sollte "getShortUrl" aufgerufen werden
//     // Password: 'password',
//   };
// };

// module.exports = { getStats, dataSave };


const admin = require('firebase-admin');
const { Schema, SchemaTypes, Model } = require('firefose');
const { String, Object } = SchemaTypes;
const { getShortUrl, getLongUrl } = require('../urlShortener');

// Überprüfen, ob die Firebase-App bereits initialisiert wurde, falls nicht, initialisieren Sie sie
if (!admin.apps.length) {
  const serviceAccount = require('./p2-url-shortener-firebase-adminsdk-lfau4-038ac2a67a.json');

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://p2-url-shortener-default-rtdb.europe-west1.firebasedatabase.app'
  });
}

const schemaURL = new Schema({
  shortURL: {
    type: String,
    required: true
  },
  longURL: {
    type: String,
    required: true
  },
  stats: {
    type: Object,
    required: true,
    properties: {
      clicks: {
        type: Number,
        default: 0
      },
      lastClick: {
        type: Date,
        default: Date.now()
      },
      OS: {
        type: Object,
        properties: {
          Linux: {
            type: Number,
            default: 0
          },
          Windows: {
            type: Number,
            default: 0
          },
          MacOs: {
            type: Number,
            default: 0
          }
        }
      },
      Browser: {
        type: Object,
        properties: {
          Chrome: {
            type: Number,
            default: 0
          },
          Edge: {
            type: Number,
            default: 0
          },
          Firefox: {
            type: Number,
            default: 0
          },
          Opera: {
            type: Number,
            default: 0
          },
          Safari: {
            type: Number,
            default: 0
          },
          Sonstige: {
            type: Number,
            default: 0
          }
        }
      }
    }
  }
}, { timestamp: true });

const URL = new Model('Test1', schemaURL);

const dataSave = async (shortURL, stats) => {
  const longURL = getLongUrl(shortURL);
  // Erstellen Sie ein neues URL-Objekt mit den Daten
  const urlInstance = new URL({
    longURL,
    shortURL,
    stats: stats
  });

  // Daten in die Datenbank speichern
  try {
    await urlInstance.save();
    console.log('URL erfolgreich gespeichert:', urlInstance);
  } catch (error) {
    console.error('Fehler beim Speichern der URL:', error);
  }
};

function getStats(short) {
  return {
    clicks: 0,
    lastClick: Date.now(),
    OS: {
      Linux: 0,
      Windows: 0,
      MacOs: 0,
    },
    Browser: {
      Chrome: 0,
      Edge: 0,
      Firefox: 0,
      Opera: 0,
      Safari: 0,
      Sonstige: 0,
    },
    createDate: new Date().toLocaleString(),
    expireDate: new Date().toLocaleString(),
    longURL: getLongUrl(short), // Änderung: Hier sollten Sie die Funktion aufrufen, um die tatsächliche URL zu erhalten
    shortURL: short // Änderung: Hier sollte die übergebene shortURL verwendet werden
  };
}

module.exports = { getStats, dataSave };

