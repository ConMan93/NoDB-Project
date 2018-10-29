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
            filter: '',
            filterType: '',
            subtypes: []
        }
        this.getAllCards = this.getAllCards.bind(this)
        this.getCardsByRarity = this.getCardsByRarity.bind(this)
        this.getCardsByFilter = this.getCardsByFilter.bind(this)
        this.getCardSubTypes = this.getCardSubTypes.bind(this)
    }
    
    handleChange(input) {
        this.setState({
            userInput: input
        })
    }

    getAllCards() {
        axios.get(`https://api.elderscrollslegends.io/v1/cards?pageSize=15&page=${this.state.userInput}`).then( res => {
            console.log(res)
            let { cards } = res.data
            this.setState({
                cards,
                userInput: ''
            })
        })
    }

    handleFilter(input) {
        this.setState({
            filter: input
        })
    }

    handleFilterType(input) {
        this.setState({
            filterType: input
        })
    }

    getCardsByRarity() {

        axios.get(`https://api.elderscrollslegends.io/v1/cards?rarity=${this.state.filter}&pageSize=15`).then( res => {
            let { cards } = res.data
            this.setState({
                cards,
                filter: ''
            })
        })

    }

    getCardsByFilter() {

        axios.get(`https://api.elderscrollslegends.io/v1/cards?${this.state.filter}=${this.state.filterType}&pageSize=15&page=${this.state.userInput}`).then( res => {
            let { cards } = res.data
            this.setState({
                cards,
                filter: '',
                filterType: ''
            })
        })
    }

    getCardSubTypes() {

        axios.get(`https://api.elderscrollslegends.io/v1/subtypes?pageSize=55`).then( res => {
            this.setState({
                subtypes: res.data.subtypes
            })
        })
    }



    render() {
        console.log(this.state.subtypes)
        let subtypesMenu = this.state.subtypes.map( (subtype, i) => {
            return(
                // <select key={ i }>
                    <option value={subtype}>{subtype}</option>
                // </select>
            )
        })
        
        
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
                <select onChange={e => this.handleFilterType(e.target.value)}>
                {subtypesMenu}
                </select>


                <input onChange={e => this.handleFilter(e.target.value)} placeholder='name, rarity, cost, type' value={this.state.filter} />
                <input onChange={e => this.handleFilterType(e.target.value)} value={this.state.filterType} />
                <input value={this.state.userInput} onChange={e => this.handleChange(e.target.value)} placeholder="Enter a page #" type='number' />
                <button onClick={this.getCardsByFilter}> Filter Cards </button>
                <button onClick={this.getAllCards}> Get All Cards </button>
                <button onClick={this.getCardSubTypes}> SubTypes </button>


                <div className='card-list'>
                { cardsToRender }
                </div>

            </div>
        )
    }
}

export default GetCards