import React, { Component } from 'react';
import { func } from 'prop-types';
import category from './types';

class AddCategory extends Component {
  handleAddCategory = () => {
    const { addCategory } = this.props;
    addCategory();
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { addCategory, currentCategory } = this.props;
    addCategory('my new category name', currentCategory);
  };

  render() {
    return (
      <div className="addCategory">
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="" id="" />
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
