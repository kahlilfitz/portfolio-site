import React from 'react'
import './book-card.css'

const shorten = (text) => {
    const shortText =  text.length > 351 ? `${text.substr(0,350)}...` : text

    return shortText
}

const BookCard = (props) => {
    const { description, imageUrl, author, title } = props


    return (
        <div class='book-card-container'>
            <img alt='Book Cover' src={imageUrl} />
            <div class='book-meta'>
                <span class='book-title'>{title}</span>
                <span class='book-author'>{author}</span>
                <span class='book-description'>{shorten(description)}</span>
            </div>

        </div>
    )
}

export default BookCard
