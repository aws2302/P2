const express = require('express');
const app = express();
const port = 8080;

const cors = require('cors');
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hallo von Express!');
});


app.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
});
