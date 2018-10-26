const express = require('express');
const bodyParser = require('body-parser');
const dc = require('./controllers/DeckController');
const app = express();
const port = 3003;

app.use(bodyParser.json());

app.get('/api/deck', dc.getDeck)
app.post('/api/deck', dc.addCard)
app.delete('/api/deck/:id', dc.deleteCard)
app.post('/api/deckname', dc.addDeckName)
app.put('/api/deckname', dc.updateDeckName)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})