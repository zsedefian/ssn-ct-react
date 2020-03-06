import React from 'react';
import './ImageDisplay.css';
import {RedactedImage} from "./RedactedImage";

function ImageDisplay(props: RedactedImage) {
    return (
        <div className="row" style={{backgroundColor: props.backgroundColor}}>
            <img
                id="image"
                className="column"
                src={props.imageUrl}
                alt={props.text.substring(0, 10) + "..."}
            />
            <p
                id="text"
                className="column"
            >
                {props.text}
            </p>
        </div>
    )
}

export default ImageDisplay;
