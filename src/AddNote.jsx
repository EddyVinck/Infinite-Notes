import React, { Component } from 'react';
import { shape, arrayOf, func, string, number } from 'prop-types';

class AddNote extends Component {
  state = {
    newNote: {
      categoryID: '',
      categoryName: '',
      title: '',
      text: '',
    },
  };

  handleInputChange = (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState((prevState) => ({
      newNote: Object.assign({}, prevState.newNote, { [name]: value }),
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { addNote } = this.props;
    const { selectedIndex } = this.categorySelect.options;
    const { value, innerText } = this.categorySelect.options[selectedIndex];

    this.setState((prevState) => {
      const newNote = Object.assign({}, prevState.newNote, {
        categoryID: value,
        categoryName: innerText,
      });
      addNote(newNote);
      return {
        newNote,
      };
    });
  };

  setCategorySelectRef = (element) => {
    this.categorySelect = element;
  };

  render() {
    const { newNote } = this.state;
    const { availableCategories } = this.props;
    return (
      <div className="add-notes">
        <h3>Add a note</h3>

        <form onSubmit={this.handleSubmit} action="">
          <label htmlFor="category">
            Category:
            <select id="category" name="category" ref={this.setCategorySelectRef}>
              {availableCategories.map((cat) => (
                <option key={cat.categoryID} value={cat.categoryID}>
                  {cat.categoryName}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="title">
            Title:
            <input
              type="text"
              id="title"
              name="title"
              value={newNote.title}
              onChange={this.handleInputChange}
            />
          </label>

          <label htmlFor="myText">
            Text:
            <textarea
              type="text"
              id="text"
              name="text"
              value={newNote.text}
              onChange={this.handleInputChange}
            />
          </label>

          <button type="submit">Submit</button>
        </form>
        {newNote.title !== '' || newNote.text !== '' ? (
          <div>
            <h3>Your new note preview:</h3>
            <h4>Title: {newNote.title}</h4>
            <p>{newNote.text}</p>
          </div>
        ) : (
          <p>Start writing to preview a new note.</p>
        )}
      </div>
    );
  }
}

AddNote.propTypes = {
  availableCategories: arrayOf(
    shape({
      categoryID: number,
      categoryName: string,
    })
  ).isRequired,
  addNote: func.isRequired,
};

export default AddNote;
