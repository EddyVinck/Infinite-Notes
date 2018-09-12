import React from 'react';
import { func } from 'prop-types';
import category from './types';
import AddCategory from './AddCategory';

const Categories = (props) => {
  const { navigateCategory, currentCategory, addCategory } = props;
  // const categories = { currentCategory };
  // console.log('categories', categories);
  return (
    <div className="categories">
      <h2>Categories:</h2>
      <button type="button" onClick={() => navigateCategory(null)}>
        Home
      </button>
      {currentCategory.categories.map((cat) => (
        <button onClick={() => navigateCategory(cat)} key={cat.categoryName} type="button">
          {cat.categoryName}
        </button>
      ))}
      <AddCategory addCategory={addCategory} currentCategory={currentCategory} />
    </div>
  );
};

Categories.propTypes = {
  currentCategory: category.isRequired,
  navigateCategory: func.isRequired,
  addCategory: func.isRequired,
};

export default Categories;
