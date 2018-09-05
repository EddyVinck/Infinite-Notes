import React, { Component } from 'react';
import { arrayOf, func } from 'prop-types';
import category from './types';

class AddNote extends Component {
  state = {
    newNote: {
      categoryID: '',
      categoryName: '',
      title: '',
      text: '',
    },
  };

  handleCategoryChange = (event) => {
    const { selectedIndex } = event.target.options;
    const { innerText } = event.target.options[selectedIndex];

    // Still not keeping the text in the note preview for some reason
    this.setState({ newNote: Object.assign({}, this.state.newNote, { categoryName: innerText }) }); // eslint-disable-line

    this.setState({
      newNote: {
        categoryName: innerText,
      },
    });
  };

  handleInputChange = (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({ newNote: Object.assign({}, this.state.newNote, { [name]: value }) }); // eslint-disable-line
  };

  handleSubmit() {
    const { addNote } = this.props;
    addNote();
  }

  render() {
    const { newNote } = this.state;
    const { availableCategories } = this.props;
    return (
      <div className="add-notes">
        <h3>Add a note</h3>
        <form onSubmit={this.handleSubmit} action="">
          {/* eslint-disable-next-line jsx-a11y/label-has-for */}
          <label htmlFor="category">
            Category:
            {/* onChange is causing the following: 
                Warning: A component is changing a controlled input of type text to be uncontrolled. 
            */}
            <select value={newNote.categoryID} name="category" onChange={this.handleCategoryChange}>
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
          {/* eslint-disable-next-line jsx-a11y/label-has-for */}
          <label htmlFor="myText">
            Text:
            <textarea
              name="text"
              id="text"
              value={newNote.text}
              type="text"
              onChange={this.handleInputChange}
            />
          </label>

          <button type="submit">Submit</button>
        </form>
        {newNote.categoryName !== '' ? (
          <div>
            <h3>Your new note for the {newNote.categoryName} category like:</h3>
            <h4>{newNote.title}</h4>
            <p>{newNote.text}</p>
          </div>
        ) : (
          <p>Select a category to preview a new note.</p>
        )}
      </div>
    );
  }
}

AddNote.propTypes = {
  availableCategories: arrayOf(category).isRequired,
  addNote: func.isRequired,
};

export default AddNote;
