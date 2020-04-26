import React from 'react'
import defaultSource from '../../assets/profile.png'

export default function CardImage(props) {
    return (
        <img
            className="mt-2"
            width="550"
            height="250"
            src={`images/${props.image}`}
            alt={props.image}
            onError={function (event) {
                event.target.src = defaultSource
            }} />
    )
}
