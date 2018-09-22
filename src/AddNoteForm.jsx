import React, { Component } from 'react';
import { shape, arrayOf, func, string, number } from 'prop-types';
import styled, { css } from 'react-emotion';
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
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const newNoteWrapper = css`
  z-index: 1000;
  position: relative;
  background-color: #fff;
  padding: 20px 10px;
`;

const Form = styled('form')`
  background-color: #ffffa7;
  border: 1px dashed #000;
  padding: 15px;
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

class AddNoteForm extends Component {
  state = {
    newNote: {
      categoryID: '',
      categoryName: '',
      title: 'title',
      text: 'text',
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

          <label htmlFor="text">
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
        </Form>
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
