import React, { useState, useLayoutEffect } from 'react'
import Layout from "../components/layout"
import BookCard from '../components/book-loader/book-card'
import { switchMap, catchError } from 'rxjs/operators'
import { fromFetch } from 'rxjs/fetch'
import { of } from 'rxjs'

const INITAL_BOOK_DATA = [
    {
        "description": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien ante, varius sed dapibus vel, tincidunt quis purus. In hac habitasse platea dictumst. Nulla rutrum facilisis dignissim. Nullam eget laoreet turpis. Aenean auctor leo et enim fermentum tempor. Sed fringilla justo quis libero fermentum, et tempus lorem tristique. Quisque placerat magna congue magna congue pretium at in ante.',
        "imageUrl": 'https://firebasestorage.googleapis.com/v0/b/all-turtles-interview.appspot.com/o/making-users-awesome.jpg?alt=media',
        "author": 'Thee Author',
        "title": 'This is a Book Title'
    }
]

const data$ = fromFetch('https://us-central1-all-turtles-interview.cloudfunctions.net/books').pipe(
    switchMap(fetchResponse => {
        const jsonToReturn = fetchResponse.ok ? fetchResponse.json() : of({ error: true, message: `Error ${fetchResponse.status}` })
        return jsonToReturn
    }),
    catchError(err => {
        // Network or other error, handle appropriately
        console.error(err);
        return of({ error: true, message: err.message })
    })
)

const getBookElements = (bookData) => (
    bookData.map(
        bookDatum => (
            <BookCard
                author={bookDatum.author}
                title={bookDatum.title}
                description={bookDatum.description}
                imageUrl={bookDatum.imageUrl}
            />
        )
    )
)

const BookLoader = () => {
    const [bookData, setBookData] = useState(INITAL_BOOK_DATA)

    useLayoutEffect(() => {
        data$.subscribe({
            next: dataResult => {
                if (!dataResult.error) {
                    setBookData(dataResult)
                }
            }
        })
    })
    
    return (
        <Layout>
            <h1>Bookshelf</h1>
            {getBookElements(bookData)}
        </Layout>
    )
}

export default BookLoader
