import React, { Component } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

export default class SearchBar extends Component {
  state = {
    imageName: "",
  };

  handleImageName = (e) => {
    this.setState({ imageName: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.imageName.trim() === "") {
      return toast.error("Введіть правильний запит");
    }
    this.props.onSubmit(this.state.imageName);
    // this.setState({ imageName: "" });
    this.resetForm();
  };

  resetForm = () => {
    this.setState({
      imageName: "",
    });
  };

  render() {
    return (
      <header className="Searchbar">
        <form onSubmit={this.handleSubmit} className="SearchForm">
          <button type="button" className="SearchForm-button">
            <span className="SearchForm-button-label"></span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            //autocomplete="off"
            //autofocus
            placeholder="Search images and photos"
            value={this.state.imageName}
            onChange={this.handleImageName}
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
