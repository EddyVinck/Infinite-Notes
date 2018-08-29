import { shape, string, arrayOf } from 'prop-types';

const note = {
  title: string,
  text: string,
};

const categoryStructure = {
  categoryName: string,
  notes: arrayOf(note),
  categories: [],
};

categoryStructure.categories = arrayOf(categoryStructure);

const category = shape(categoryStructure);

export default category;
