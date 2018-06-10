import React, { Component } from "react";
import { Link } from "react-router-dom";
import Bookshelf from "./Bookshelf";
import * as BooksAPI from "../BooksAPI";

class Bookhome extends Component {
    state = {
        booksOnDisplay: []
    };
    getAllBookShelf() {
        BooksAPI.getAll().then(myBookObj => {
            this.setState({
                booksOnDisplay: [...myBookObj]
            });
        });
    }
    componentDidMount() {
        this.getAllBookShelf();
    }
    updateBookShelfStatus(bookID, newBookShelf) {
        BooksAPI.update({ id: bookID }, newBookShelf);
    }
    getBookShelf = shelf =>
        this.state.booksOnDisplay.filter(bookObj => bookObj.shelf === shelf);
    /**
     *   Uses bookID and moves it to the newBookShelf
     *   Updates state of booksOnDisplay
     */
    handleBookShelfChange = (bookID, newBookShelf) => {
        this.setState(prevState => {
            // Extracts the one Book that is modified
            const oneBookToModify = [
                ...prevState.booksOnDisplay.filter(
                    bookObj => bookObj.id === bookID
                )
            ];
            // Updates the one BookID with the new shelf
            const modifiedBook = { ...oneBookToModify[0], shelf: newBookShelf };
            // Extracts the whole bookshelf removing out the bookID
            const tempBookShelf = [
                ...prevState.booksOnDisplay.filter(
                    bookObj => bookObj.id !== bookID
                )
            ];
            // Puts the book back on the new bookshelf or removes if none
            if (newBookShelf === "none") {
                return { booksOnDisplay: [...tempBookShelf] };
            } else {
                return { booksOnDisplay: [...tempBookShelf, modifiedBook] };
            }
        });
        this.updateBookShelfStatus(bookID, newBookShelf);
    };
    render() {
        const shelfDisplay = {
            currentlyReading: ["currentlyReading", "Curently Reading"],
            wantToRead: ["wantToRead", "Want To Read"],
            read: ["read", "Read"]
        };
        const bookShelfDisplay = Object.keys(shelfDisplay).map(eachShelf => {
            return (
                <Bookshelf
                    whichBookShelf={shelfDisplay[eachShelf]['1']}
                    bookshelf={this.getBookShelf(shelfDisplay[eachShelf]['0'])}
                    handleBookShelfChangeRef={this.handleBookShelfChange}
                />
            );
        });
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>My Reads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {bookShelfDisplay}
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        );
    }
}

export default Bookhome;
