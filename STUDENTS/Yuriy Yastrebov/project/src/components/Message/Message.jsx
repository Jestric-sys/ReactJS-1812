import './style.css'
import React, {Component} from 'react'

let msg = (props) => {
    let senderName = props.sender
    let text = props.text
    //let senderType = props.msg.senderType

    return (
        //<div className={senderType}>
	<div className="d-flex flex-column">
            <strong>{senderName}</strong>
            <p>{text}</p>
        </div>
    )
}

export default msg