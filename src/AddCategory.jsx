import React, { Component } from 'react';
import { func } from 'prop-types';
import category from './types';
import { basicButton } from './css/button';
import formStyle from './css/form';

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
    const { addCategory, currentCategory, hideAddCategories } = this.props;
    const { newCategory } = this.state;
    addCategory(newCategory.categoryName, currentCategory);
    hideAddCategories();
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
        <form className={formStyle} onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleInputChange}
            value={newCategory.categoryName}
            type="text"
            name=""
            id=""
          />
          <button className={basicButton} type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

AddCategory.propTypes = {
  addCategory: func.isRequired,
  hideAddCategories: func.isRequired,
  currentCategory: category.isRequired,
};

export default AddCategory;
