import React, { Component } from 'react';
import { func } from 'prop-types';
import category from './types';

class SearchCategories extends Component {
  state = {
    searchTerm: '',
    autoCompleteOptions: [],
  };

  handleSearchTermChange = (event) => {
    const { value } = event.target;
    const autoCompleteOptions = this.getAutoCompleteOptions(value);

    this.setState({
      searchTerm: value,
      autoCompleteOptions,
    });
  };

  handleCategoryKeyDown = (event) => {
    // https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_autocomplete
    const enter = 13;
    const arrowUp = 38;
    const arrowDown = 40;
    const autoCompleteOptions = document.querySelectorAll('.auto-complete-option');

    const currentlySelectedIndex = Array.prototype.indexOf.call(autoCompleteOptions, event.target);

    if (autoCompleteOptions.length > 0) {
      event.preventDefault();

      if (event.keyCode === enter) {
        this.handleCategoryChange(event);
      }
      if (event.keyCode === arrowUp) {
        // move focus up
        if (autoCompleteOptions[currentlySelectedIndex - 1]) {
          autoCompleteOptions[currentlySelectedIndex - 1].focus();
        }
      }
      if (event.keyCode === arrowDown) {
        // move focus down
        if (autoCompleteOptions[currentlySelectedIndex + 1]) {
          autoCompleteOptions[currentlySelectedIndex + 1].focus();
        }
      }
    }
  };

  handleSearchbarKeyDown = (event) => {
    const enter = 13;
    const arrowDown = 40;
    const autoCompleteOptions = document.querySelectorAll('.auto-complete-option');

    if (event.keyCode === enter) {
      if (autoCompleteOptions.length > 0) {
        // navigate to the top option
        autoCompleteOptions[0].click();
      }
    }
    if (event.keyCode === arrowDown) {
      event.preventDefault();
      // move focus to the autocomplete options
      if (autoCompleteOptions.length > 0) {
        autoCompleteOptions[0].focus();
      }
    }
  };

  getAutoCompleteOptions = (searchTerm) => {
    const { allNotes, getCategories } = this.props;
    const categoriesToSearch = []; // mutated in getCategories
    getCategories(allNotes, categoriesToSearch);

    return categoriesToSearch.filter(
      (cat) => cat.categoryName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
    );
  };

  handleCategoryChange = (event) => {
    const { findCategory, navigateCategory, allNotes } = this.props;
    const categoryID = Number(event.target.getAttribute('category-id'));
    const cat = findCategory(categoryID, allNotes);
    navigateCategory(cat);
  };

  render() {
    const { searchTerm, autoCompleteOptions } = this.state;
    let searchOptions = '';
    if (searchTerm !== '') {
      searchOptions = (
        <div className="auto-complete-options">
          {autoCompleteOptions.map((option) => (
            <div
              key={option.categoryID}
              className="auto-complete-option"
              onClick={this.handleCategoryChange}
              onKeyDown={this.handleCategoryKeyDown}
              role="tab"
              tabIndex="-1"
              category-id={option.categoryID}
            >
              {option.categoryName}
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="search-categories">
        <h3>Search for a category</h3>
        <input
          onChange={this.handleSearchTermChange}
          onKeyDown={this.handleSearchbarKeyDown}
          type="search"
          name="search"
          id="search-input"
        />
        {searchOptions}
        <button type="submit">Search</button>
      </div>
    );
  }
}

SearchCategories.propTypes = {
  allNotes: category.isRequired,
  getCategories: func.isRequired,
  navigateCategory: func.isRequired,
  findCategory: func.isRequired,
};

export default SearchCategories;
