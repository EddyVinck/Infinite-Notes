import React from 'react';
import { arrayOf, func } from 'prop-types';
import category from './types';

const Categories = (props) => {
  const { categories, navigateCategory } = props;
  return (
    <div className="categories">
      <h2>Categories:</h2>
      <button type="button" onClick={() => navigateCategory(null)}>
        Home
      </button>
      {categories.map((cat) => (
        <button onClick={() => navigateCategory(cat)} key={cat.categoryName} type="button">
          {cat.categoryName}
        </button>
      ))}
    </div>
  );
};

Categories.propTypes = {
  categories: arrayOf(category).isRequired,
  navigateCategory: func.isRequired,
};

export default Categories;
