import React, { Component } from 'react';
import axios from 'axios';

class DeckName extends Component {

    constructor() {
        super();

        this.state = {
            deckName: '',
            userInput: ''
        }        
    }

    handleChange(input) {
        this.setState({
            userInput: input
        })
    }

    saveDeckName(name) {
        axios.post('/api/deckname', {name: this.state.userInput}).then( res => {
            this.setState({
                deckName: res.data,
                userInput: ''
            })
        })
    }
    

    render() {

        

        return(
            <div>
                <input value={this.state.userInput} placeholder='Enter a deck name' onChange={e => this.handleChange(e.target.value)} />
                <button onClick={() => this.saveDeckName(this.state.userInput)}> Save </button>
                <h1>{this.state.deckName}</h1>
            </div>
        )
    }
}

export default DeckName