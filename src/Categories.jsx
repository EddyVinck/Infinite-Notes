import React, { Component } from 'react';
import { func } from 'prop-types';
import styled from 'react-emotion';
import category from './types';
import AddCategory from './AddCategory';
import { buttonStyle } from './css/button';

const CategoryControls = styled('div')`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

  button {
    padding: 10px 20px;
    border-radius: 3px;
    margin-right: 15px;

    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
    transition: 0.3s ease-out;
    transform: translateY(0px);
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.4);
    }
  }
`;

class Categories extends Component {
  state = {
    showAddCategories: false,
  };

  handleShowAddCategories = () => {
    this.setState({ showAddCategories: true });
  };

  hideAddCategories = () => {
    this.setState({ showAddCategories: false });
  };

  render() {
    const { showAddCategories } = this.state;
    const { navigateCategory, currentCategory, addCategory } = this.props;
    return (
      <div className="categories">
        <h2>Categories:</h2>
        <CategoryControls>
          <button className={buttonStyle} type="button" onClick={() => navigateCategory(null)}>
            Home
          </button>
          {currentCategory.categories.map((cat) => (
            <button
              className={buttonStyle}
              onClick={() => navigateCategory(cat)}
              key={cat.categoryID}
              type="button"
            >
              {cat.categoryName}
            </button>
          ))}
          <button className={buttonStyle} onClick={this.handleShowAddCategories} type="button">
            +
          </button>
        </CategoryControls>
        {showAddCategories ? (
          <AddCategory
            hideAddCategories={this.hideAddCategories}
            addCategory={addCategory}
            currentCategory={currentCategory}
          />
        ) : null}
      </div>
    );
  }
}

Categories.propTypes = {
  currentCategory: category.isRequired,
  navigateCategory: func.isRequired,
  addCategory: func.isRequired,
};

export default Categories;
