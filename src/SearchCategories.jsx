import React, { Component } from 'react';
import { func } from 'prop-types';
import styled, { css } from 'react-emotion';
import category from './types';
import { basicButton } from './css/button';
import formStyle from './css/form';

const Options = styled('div')`
  background-color: #fff;
  border: 1px solid #979797;

  @media (min-width: 600px) {
    position: absolute;
    top: 100%;
  }
`;

const SearchBarWrapper = styled('div')`
  position: relative;
  margin-bottom: 20px;

  button {
    margin-bottom: 0;
  }
`;

const searchOption = css`
  background-color: #fff;
  border-bottom: 1px solid #979797;
  padding: 2px 4px;

  &:last-child {
    border-bottom: none;
  }

  &:hover,
  &:focus {
    background-color: #b8d4ff;
  }
`;

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

  handleSubmit = (event) => {
    event.preventDefault();
    const autoCompleteOptions = document.querySelectorAll('.auto-complete-option');
    if (autoCompleteOptions.length > 0) {
      // navigate to the top option
      autoCompleteOptions[0].click();
    }
  };

  handleCategoryKeyDown = (event) => {
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
      this.handleSubmit(event);
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
    if (searchTerm !== '' && autoCompleteOptions.length > 0) {
      searchOptions = (
        <Options className="auto-complete-options">
          {autoCompleteOptions.map((option) => (
            <div
              key={option.categoryID}
              className={`auto-complete-option ${searchOption}`}
              onClick={this.handleCategoryChange}
              onKeyDown={this.handleCategoryKeyDown}
              role="tab"
              tabIndex="-1"
              category-id={option.categoryID}
            >
              {option.categoryName}
            </div>
          ))}
        </Options>
      );
    }

    return (
      <form onSubmit={this.handleSubmit} className={`${formStyle}`}>
        <h3>Search for a category</h3>
        <SearchBarWrapper>
          <input
            onChange={this.handleSearchTermChange}
            onKeyDown={this.handleSearchbarKeyDown}
            type="search"
            name="search"
            id="search-input"
            autoComplete="off"
          />
          <button className={basicButton} type="submit">
            Search
          </button>
          {searchOptions}
        </SearchBarWrapper>
      </form>
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
