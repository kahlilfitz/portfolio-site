import React from 'react'
import './strength-item.css'

const StrengthItem = (props) => {
    const { text, link } = props
    const classes = `strength-item ${text.toLowerCase()}`
    return (
        <div className={classes}>
            <a href={link} target='_blank'><span>{text}</span></a>
        </div>
    )
}

export default StrengthItem