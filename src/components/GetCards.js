import React, { Component } from 'react';
import axios from 'axios';

//Components
import CardList from './CardList'

class GetCards extends Component {

    constructor() {
        super();

        this.state = {
            cards: [],
            userInput: '',
            // filter: ''
        }
        this.getAllCards = this.getAllCards.bind(this)
    }
    
    handleChange(input) {
        this.setState({
            userInput: input
        })
    }

    getAllCards() {
        axios.get(`https://api.elderscrollslegends.io/v1/cards?pageSize=15&page=${this.state.userInput}`).then( res => {
            let { cards } = res.data
            this.setState({
                cards,
                userInput: ''
            })
        })
    }



    render() {
        
        
        let cardsToRender = this.state.cards.map( (card, i) => {
            return (
                <CardList
                key={ i } 
                name={ card.name }
                rarity={ card.rarity }
                type={ card.type }
                cost={ card.cost }
                img={ card.imageUrl }
                addCardFn={this.props.addCardFn} />
            )
        })

        return(
            <div>
                <input value={this.state.userInput} onChange={e => this.handleChange(e.target.value)} placeholder="Enter a page #" type='number' />
                <button onClick={this.getAllCards}> Get Cards </button>

                <div className='card-list'>
                { cardsToRender }
                </div>

            </div>
        )
    }
}

export default GetCards