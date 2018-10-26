import React from 'react';

export default function CardList(props) {
    return (
        <div>
            {/* <h2>{props.name}</h2>
            <p>rarity: {props.rarity}</p>
            <p>type: {props.type}</p>
            <p>cost: {props.cost}</p> */}
            <img src={`${props.img}`} alt=''/>
            <button onClick={() => props.addCardFn(props)}> Add Card </button>
        </div>
    )
}