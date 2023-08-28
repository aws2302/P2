const crypto = require('crypto');

class URLShortener {
    constructor() {
        this.urlToCode = {};
        this.codeToUrl = {};
        this.baseURL = 'http://short.url/';
        this.codeLength = 6; // Länge des Kurzcodes
    }

    generateShortCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let shortCode = '';
        for (let i = 0; i < this.codeLength; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            shortCode += chars.charAt(randomIndex);
        }
        return shortCode;
    }

    shortenURL(longURL) {
        if (this.urlToCode.hasOwnProperty(longURL)) {
            return this.baseURL + this.urlToCode[longURL];
        }

        let shortCode = this.generateShortCode();
        while (this.codeToUrl.hasOwnProperty(shortCode)) {
            shortCode = this.generateShortCode();
        }

        this.urlToCode[longURL] = shortCode;
        this.codeToUrl[shortCode] = longURL;

        return this.baseURL + shortCode;
    }
}

// Beispiel-Nutzung
const shortener = new URLShortener();
const longURL = 'https://www.google.de/';
const shortURL = shortener.shortenURL(longURL);
console.log('Kurzer Link:', shortURL);
