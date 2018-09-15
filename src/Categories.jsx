import React from 'react';
import { func } from 'prop-types';
import category from './types';
import AddCategory from './AddCategory';
import SearchCategories from './SearchCategories';

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
      <button type="button" onClick={() => navigateCategory(null)}>
        Home
      </button>
      {currentCategory.categories.map((cat) => (
        <button onClick={() => navigateCategory(cat)} key={cat.categoryID} type="button">
          {cat.categoryName}
        </button>
      ))}
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
