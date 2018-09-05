import React, { Component } from 'react';
import { arrayOf } from 'prop-types';
import category from './types';

class AddNote extends Component {
  state = {
    newNote: {
      categoryID: '',
      title: '',
      text: '',
    },
  };

  handleTextChange(val) {
    this.setState({ newNote: { text: val } });
  }

  render() {
    const { newNote } = this.state;
    const { availableCategories } = this.props;
    return (
      <div className="add-notes">
        <h3>Add a note</h3>
        <form action="">
          <label htmlFor="title">
            Title:
            <input type="text" id="title" name="title" value={newNote.title} />
          </label>
          {/* eslint-disable-next-line jsx-a11y/label-has-for */}
          <label htmlFor="myText">
            Text:
            <textarea name="myText" id="text" value={newNote.text} type="text" />
          </label>
          <select value={newNote.categoryID} name="">
            {availableCategories.map((cat) => (
              <option key={cat.categoryID} value={cat.categoryID}>
                {cat.categoryName}
              </option>
            ))}
          </select>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

AddNote.propTypes = {
  availableCategories: arrayOf(category).isRequired,
};

export default AddNote;
