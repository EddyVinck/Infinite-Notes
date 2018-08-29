import React from 'react';
import { arrayOf } from 'prop-types';
import category from './types';

const Categories = (props) => {
  const { categories } = props;
  console.log(categories);
  return (
    <div className="categories">
      <h2>Categories:</h2>
      {categories.map((cat) => (
        <button key={cat.categoryName} type="button">
          {cat.categoryName}
        </button>
      ))}
    </div>
  );
};

Categories.propTypes = { categories: arrayOf(category).isRequired };

export default Categories;
