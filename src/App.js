import React, { Component } from 'react';
import './reset.css';
import './App.css';
import axios from 'axios';

//Components
import GetCards from './components/GetCards';
import DeckName from './components/DeckName';


class App extends Component {

  constructor() {
    super();

    this.state = {
      myDeck: []
    }
    this.addCardToDeck = this.addCardToDeck.bind(this)
  }

  addCardToDeck (card) {

    axios.post('/api/deck', card).then( res => {
      this.setState({
        myDeck: res.data
      })
    })
    
  }

  removeCardFromDeck(id) {

    axios.delete(`/api/deck/${id}`).then( res => {
      this.setState({
        myDeck: res.data
      })
    })

  }

  componentDidMount() {
    axios.get('/api/deck').then( res => {
        this.setState({
            myDeck: res.data
        })
    })
}

  render() {
    let deckToDisplay = this.state.myDeck.map( (card, i) => {
      return (
        <div key={ i }>
          {/* <h2>{card.name}</h2>
          <p>rarity: {card.rarity}</p>
          <p>type: {card.type}</p>
          <p>cost: {card.cost}</p> */}
          <img src={`${card.img}`} alt=''/>
          <button onClick={() => this.removeCardFromDeck(card.id)}>Remove Card</button>
        </div>
      )
    })

    return (
      <div className='background'>
      <div className="App">

        <h1> Cards List </h1>

        
        <GetCards 
        addCardFn={this.addCardToDeck} />
        

        <h1> My Deck </h1>
        <DeckName />
        
        <div className='card-list'>
        {deckToDisplay}
        </div>
  
      </div>
      </div>
    );
  }
}

export default App;
