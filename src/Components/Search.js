import React, { Component } from "react";
import { Link } from "react-router-dom";
import Bookgrid from "./Bookgrid";
import * as BooksAPI from "../BooksAPI";

class Search extends Component {
    state = {
        searchDisplay: [],
        inputState: ""
    };

    updateBookShelfStatus(bookID, newBookShelf) {
        BooksAPI.update({ id: bookID }, newBookShelf);
    }
    handleBookShelfAppRef = (bookID, newBookShelf) => {
        this.updateBookShelfStatus(bookID, newBookShelf);
    };
    /**
     * Loop through each myBookBojSearch
     * and do a comparison with looping through myBookObjGetAll
     * if the same id exist in myBookObjGetAll, then use that Object
     * else use the object without the shelf
     */
    mergeObject = (myBookObjSearch, myBookObjGetAll) => {
        return myBookObjSearch.error === "empty query"
            ? ""
            : myBookObjSearch.map(eachSearchBook => {
                  const bookStatus = myBookObjGetAll.find(
                      myBook => eachSearchBook.id === myBook.id
                  );
                  return bookStatus !== undefined ? bookStatus : eachSearchBook;
              });
    };
    searchAll = inputBox => {
        if (inputBox) {
            BooksAPI.search(inputBox).then(myBookObjSearch => {
                BooksAPI.getAll().then(myBookObjGetAll => {
                    const completeObj = this.mergeObject(
                        myBookObjSearch,
                        myBookObjGetAll
                    );
                    this.setState({
                        searchDisplay: [...completeObj]
                    });
                });
            });
        } else if (inputBox === '') {
            this.setState({
                searchDisplay: []
            });
        }
    };

    handleInputChange = event => {
        const inputBox = event.target.value;
        this.setState({ inputState: inputBox });
        this.searchAll(inputBox);
    };
    render() {
        const { searchDisplay, inputState } = this.state;
        const showSearch =
            searchDisplay.length !== 0
                ? searchDisplay.map(book => (
                      <Bookgrid
                          key={book.id}
                          book={book}
                          handleBookShelfChangeRef={this.handleBookShelfAppRef}
                      />
                  ))
                : "Type something in search box";
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={inputState}
                            onChange={this.handleInputChange}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <div>{searchDisplay.length !== 0 && `${searchDisplay.length} Search Results`}</div>
                    <ol className="books-grid">{showSearch}</ol>
                </div>
            </div>
        );
    }
}

export default Search;
