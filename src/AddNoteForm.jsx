import React, { Component } from 'react';
import { shape, arrayOf, func, string, number } from 'prop-types';
import { css } from 'react-emotion';
import { buttonStyle } from './css/button';
import formStyle from './css/form';

const largeButton = css`
  ${buttonStyle};

  background: #4b79a1;
  background: -webkit-linear-gradient(to right, #283e51, #4b79a1);
  background: linear-gradient(to right, #283e51, #4b79a1);
  padding: 20px 70px;
  border-radius: 10px;
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
      background-position: right center;
    }
  }
`;

const closeButton = css`
  background: transparent;
  border: none;
  font-size: 20px;
  font-weight: bold;
  font-family: arial;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const newNoteStyle = css`
  background-color: #ffffa7;
  border: 2px solid rgba(0, 0, 0, 0.5);
  padding: 15px;
  width: 500px;
  max-width: 100%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const newNoteFormStyle = css`
  ${formStyle};
  select,
  input,
  textarea {
    margin-bottom: 5px;
  }

  label {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    span {
      font-weight: bold;
    }

    select {
      margin-left: 10px;
      flex-grow: 1;
      margin-bottom: 0;
    }
  }

  .${newNoteStyle} {
    input,
    textarea {
      padding: 8px 10px 6px 6px;

      &:-moz-placeholder,
      &::-moz-placeholder,
      &::-webkit-input-placeholder,
      &::-ms-input-placeholder,
      &::placeholder {
        color: rgba(0, 0, 0, 0.4);
      }
    }
    input {
      border: none;
      border-bottom: 2px dashed rgba(0, 0, 0, 0.4);
      font-weight: bold;

      &:focus,
      &:hover {
        outline: 0;
        border-bottom: 2px dashed #000;
      }
    }
    textarea {
      transition: 0.2s ease-in;
      border-color: transparent;
      position: relative;
      resize: none;
      height: 200px;

      &::before {
        content: '';
        width: 10px;
        height: 10px;
        position: absolute;
        bottom: 0;
        right: 0;
        z-index: 2000;
      }

      &:focus,
      &:hover {
        outline: 0;
        border-color: transparent;
      }
    }
  }
`;

const newNoteWrapper = css`
  z-index: 1000;
  position: relative;
  background-color: #fff;
  padding: 30px 30px;

  input,
  textarea {
    background-color: transparent;
    font-size: 18px;
  }
`;

class AddNoteForm extends Component {
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
    const { availableCategories, handleHide } = this.props;
    return (
      <div className={newNoteWrapper}>
        <button type="button" className={closeButton} close-modal="" onClick={handleHide}>
          X
        </button>
        <h2>Add a note</h2>

        <form className={newNoteFormStyle} onSubmit={this.handleSubmit} action="">
          <label htmlFor="category">
            <span>Category:</span>
            <select id="category" name="category" ref={this.setCategorySelectRef}>
              {availableCategories.map((cat) => (
                <option key={cat.categoryID} value={cat.categoryID}>
                  {cat.categoryName}
                </option>
              ))}
            </select>
          </label>

          <div className={newNoteStyle}>
            <input
              type="text"
              placeholder="My note's title..."
              id="title"
              name="title"
              value={newNote.title}
              onChange={this.handleInputChange}
              autoComplete="off"
            />
            <textarea
              placeholder="My note's description..."
              type="text"
              id="text"
              name="text"
              value={newNote.text}
              onChange={this.handleInputChange}
              autoComplete="off"
            />
          </div>

          <button className={largeButton} type="submit">
            <span>Submit</span>
          </button>
        </form>
      </div>
    );
  }
}

AddNoteForm.propTypes = {
  availableCategories: arrayOf(
    shape({
      categoryID: number,
      categoryName: string,
    })
  ).isRequired,
  addNote: func.isRequired,
  handleHide: func.isRequired,
};

export default AddNoteForm;
