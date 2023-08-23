require('dotenv').config()
const express = require('express');
const app = express();
const hostname = 'localhost';
const port = 8080;

const cors = require('cors');
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hallo von Express!');
});


app.listen(port, hostname, () => {
    console.log(`Server listening on ${hostname}:${port}`);
});
