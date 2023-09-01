const { connect } = require('firefose');
const { Schema, SchemaTypes, Query } = require('firefose');
const { String } = SchemaTypes;
const { Model } = require('firefose');

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
    readline.question('Enter the OS: ', os => {
      readline.question('Enter the Browser: ', browser => {
        readline.question('Enter the number of Clicks: ', clicks => {
          saveURL(longURL, os, browser, clicks);
          readline.close();
        });
      });
    });
  });
};

const saveURL = (longURL, os, browser, clicks) => {
  const shortURL = generateShortURL();
  const URL = new Model('URLs', urlSchema);
  const data = URL.create({
    Browser: browser,
    OS: os,
    Clicks: clicks,
    shortURL,
    longURL,
    lastClick: new Date().toLocaleString()
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
    type: String,
    required: true
  },
  Browser: {
    type: String,
    required: true
  },
  lastClick: {
    type: String,
    required: true
  }
}, { timestamp: true });

askForURLData();
