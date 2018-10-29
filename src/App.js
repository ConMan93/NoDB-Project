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
      myDeck: [],
      userInput: ''
    }
    this.addCardToDeck = this.addCardToDeck.bind(this)
    this.handleQuery = this.handleQuery.bind(this)
    this.resetDeck = this.resetDeck.bind(this)
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

  handleQuery() {
    axios.get(`/api/deck?name=${this.state.userInput}`).then( res => {
      this.setState({
        myDeck: res.data,
        userInput: ''
      })
    })
  }

  handleChange(input) {
    this.setState({
      userInput: input
    })
  }

  resetDeck() {
    axios.delete('/api/deck').then( res => {
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
        

        <DeckName />
        
        <input value={this.state.userInput} onChange={e => this.handleChange(e.target.value)} placeholder='Search your deck' />
        <button onClick={() => this.handleQuery(this.state.userInput)}> Search </button>
  
        <div className='card-list'>
        {deckToDisplay}
        </div>

         <div>
            <button onClick={() => this.resetDeck(this.state.myDeck)}> Reset Deck </button>
        </div>

      </div>
      </div>
    );
  }
}

export default App;
