import React, { Component } from 'react';
import axios from 'axios';

//Some of this code is irrelevant after adding in the code with put request to local server

class DeckName extends Component {

    constructor() {
        super();

        this.state = {
            deckName: 'My Deck',
            userInput: '',
            edit: false,
            editUserInput: ''
        }   
        this.toggleEdit = this.toggleEdit.bind(this)     
    }

    handleChange(input) {
        this.setState({
            userInput: input,

        })
    }

    handleEdit(input) {
        this.setState({
            editUserInput: input
        })
    }

    saveDeckName(name) {
        axios.post('/api/deckname', {name: this.state.userInput}).then( res => {
            this.setState({
                deckName: res.data,
                userInput: '',
                editUserInput: res.data
            })
        })
    }

    toggleEdit() {
        this.setState({
            edit: !this.state.edit
        })
    }


    editDeckName() {
        axios.put('/api/deckName', {deckName: this.state.editUserInput}).then( res => {
            this.setState({
                deckName: res.data
            })
        })
    }
    

    render() {

        

        return(
            <div>
                {/* <input value={this.state.userInput} placeholder='Enter a deck name' onChange={e => this.handleChange(e.target.value)} />
                <button onClick={() => this.saveDeckName(this.state.userInput)}> Save </button> */}
                {
                    this.state.edit ?
                    (
                        <div>
                            <input value={this.state.editUserInput} onChange={e => this.handleEdit(e.target.value)}/>
                            <button onClick={() => {
                                this.editDeckName(this.state.editUserInput)
                                this.toggleEdit()
                                }}>Submit</button>
                            <button onClick={this.toggleEdit}>Cancel</button>

                        </div>
                    ) :
                    (
                        <div>
                            <h1>{this.state.deckName}</h1>
                            <button onClick={this.toggleEdit}>Edit</button>
                        </div>

                    )
                }
            </div>
        )
    }
}

export default DeckName