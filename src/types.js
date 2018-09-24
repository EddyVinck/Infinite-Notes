import { shape, string, arrayOf, number } from 'prop-types';

const note = shape({
  title: string,
  text: string,
  categories: arrayOf(categoryStructure), // eslint-disable-line no-use-before-define
});

const categoryStructure = {
  categoryID: number,
  categoryName: string,
  notes: arrayOf(note),
};

const category = shape(categoryStructure);

export default category;
