import React, { Component } from 'react';
import { shape, arrayOf, func, string, number } from 'prop-types';
import styled, { css } from 'react-emotion';
import { noteStyle } from './Note';
import { buttonStyle } from './css/button';
import formStyle from './css/form';

const largeButton = css`
  ${buttonStyle};

  background: #4b79a1;
  background: -webkit-linear-gradient(to right, #283e51, #4b79a1);
  background: linear-gradient(to right, #283e51, #4b79a1);
  padding: 20px 70px;
  border-radius: 10px;
  align-self: flex-end;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 22px;

  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #21d4fd;
    background-image: linear-gradient(270deg, #21d4fd 0%, #b721ff 100%);
    background-size: 200% auto;
    /* background-position: left center; */
    transition: 0.5s;
    z-index: 0;
  }

  span {
    z-index: 1;
    position: relative;
  }

  &:hover,
  &:focus {
    &:before {
      /* background-size: 200% auto; */
      background-position: right center;
    }
  }
`;

const previewNote = css`
  ${noteStyle} background-color: #ffffa7;
  padding: 15px;
  border: 1px dashed #000;
  position: relative;

  &:before {
    content: '(concept)';
    position: absolute;
    top: 10px;
    right: 10px;
    color: rgba(0, 0, 0, 0.6);
  }
`;

const Form = styled('form')`
  width: 500px;
  max-width: 100%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;

  > label {
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;

    > input,
    > textarea {
      width: 300px;
    }
    > input {
    }

    > textarea {
    }
  }

  @media (max-width: 600px) {
    > label {
      justify-content: flex-start;
      flex-direction: column;
    }
  }
`;

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
        categoryID: Number(value),
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
    const showNotePreview = newNote.title !== '' || newNote.text !== '';
    return (
      <div className="add-notes">
        <h2>Add a note</h2>

        <Form className={formStyle} onSubmit={this.handleSubmit} action="">
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
              autoComplete="off"
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
              autoComplete="off"
            />
          </label>

          <button className={largeButton} type="submit">
            <span>Submit</span>
          </button>
          {!showNotePreview ? (
            <p style={{ alignSelf: 'flex-end' }}>Start writing to preview a new note.</p>
          ) : (
            ''
          )}
        </Form>
        {showNotePreview ? (
          <div className={previewNote}>
            <h4>{newNote.title}</h4>
            <p>{newNote.text}</p>
          </div>
        ) : (
          ''
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
