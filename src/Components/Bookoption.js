import React, { Component } from "react";

class Bookoption extends Component {
    constructor(props) {
        super(props);
        this.props.shelf !== undefined
            ? (this.state = { shelfSelect: this.props.shelf })
            : (this.state = { shelfSelect: "none" });
    }

    handleChangeBookOption = event => {
        const shelf = event.target.value;
        this.setState({ shelfSelect: shelf });
        this.props.handleChangeBookOption(event);
    };
    render() {
        return (
            <div className="book-shelf-changer">
                <select
                    value={this.state.shelfSelect}
                    onChange={this.handleChangeBookOption}
                >
                    <option value="dnone" disabled>
                        Move to...
                    </option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        );
    }
}

export default Bookoption;
