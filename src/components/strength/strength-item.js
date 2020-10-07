import React from 'react'
import './strength-item.css'

const StrengthItem = (props) => {
    const {text} = props
    const classes = `strength-item ${text.toLowerCase()}`
    return(
        <span className={classes}>{text}</span>
    )
}

export default StrengthItem