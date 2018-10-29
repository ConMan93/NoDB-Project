let deck = [];
let deckName = '';
let id = 0;

module.exports = {

    getDeck(req, res) {
        res.status(200).send(deck)
    },

    addCard(req, res) {
        let { name, rarity, type, cost, img } = req.body
        let newCard = {
            name,
            rarity,
            type,
            cost,
            img,
            id
        }
        id++
        deck.push(newCard)
        res.status(200).send(deck)
    },

    deleteCard(req, res) {
        let { id } = req.params

        for(let i = 0; i < deck.length; i++) {
            if(deck[i].id === Number(id)) {
                deck.splice(i, 1)
            }
        }
        res.status(200).send(deck)
    },

    addDeckName(req, res) {
        let { name } = req.body
        deckName = name
        res.status(200).send(deckName)
    },

    updateDeckName(req, res) {
        let { deckName } = req.body
        deckName = deckName
        res.status(200).send(deckName)
    },

    getQuery(req, res) {
        let result = deck 
        if (req.query.name) {
            result = result.filter( card => {
                // return card.name.toLowerCase() === req.query.name.toLowerCase()
                return card.name.toLowerCase().includes(req.query.name.toLowerCase())
            })
        }
        res.status(200).send(result);
    },

    resetDeck(req, res) {
    
        deck = []
        res.status(200).send(deck)
    }
}