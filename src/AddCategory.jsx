import React, { Component } from 'react';
import { func } from 'prop-types';
import category from './types';

class AddCategory extends Component {
  state = {
    newCategory: {
      categoryName: '',
    },
  };

  handleAddCategory = () => {
    const { addCategory } = this.props;
    addCategory();
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { addCategory, currentCategory } = this.props;
    const { newCategory } = this.state;
    addCategory(newCategory.categoryName, currentCategory);
  };

  handleInputChange = (event) => {
    const { target } = event;
    this.setState({ newCategory: { categoryName: target.value } });
  };

  render() {
    const { currentCategory } = this.props;
    const { newCategory } = this.state;
    return (
      <div className="addCategory">
        <h3>Add a subcategory to {currentCategory.categoryName}:</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleInputChange}
            value={newCategory.categoryName}
            type="text"
            name=""
            id=""
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

AddCategory.propTypes = {
  addCategory: func.isRequired,
  currentCategory: category.isRequired,
};

export default AddCategory;
