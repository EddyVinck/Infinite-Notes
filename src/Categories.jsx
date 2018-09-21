import React from 'react';
import { func } from 'prop-types';
import styled from 'react-emotion';
import category from './types';
import AddCategory from './AddCategory';
import SearchCategories from './SearchCategories';
import { buttonStyle } from './css/button';

const CategoryControls = styled('div')`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

  button {
    padding: 10px 20px;
    border-radius: 3px;
    margin-right: 15px;

    &:nth-of-type(n + 2) {
    }

    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
    transition: 0.3s ease-out;
    transform: translateY(0px);
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.4);
    }
  }
`;

const Categories = (props) => {
  const {
    allNotes,
    findCategory,
    navigateCategory,
    currentCategory,
    addCategory,
    getCategories,
  } = props;
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
      </CategoryControls>
      <SearchCategories
        allNotes={allNotes}
        getCategories={getCategories}
        navigateCategory={navigateCategory}
        findCategory={findCategory}
      />
      <AddCategory addCategory={addCategory} currentCategory={currentCategory} />
    </div>
  );
};

Categories.propTypes = {
  allNotes: category.isRequired,
  currentCategory: category.isRequired,
  navigateCategory: func.isRequired,
  addCategory: func.isRequired,
  getCategories: func.isRequired,
  findCategory: func.isRequired,
};

export default Categories;
