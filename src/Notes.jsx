import React, { Component } from 'react';
import { func } from 'prop-types';
import styled, { css } from 'react-emotion';
import contentWrapper from './css/layout';
import { Note, noteStyle } from './Note';
import Categories from './Categories';
import AddNoteForm from './AddNoteForm';
import category from './types';
import Modal from './Modal';

const NotesWrapper = styled('div')`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const modalWrapper = css`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  label: modal-wrapper;
  border: 0;
  outline: 0;
`;

const TwoColumns = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  > div {
    width: 48%;
    margin-left: 2%;

    &:first-of-type {
      margin-left: 0%;
    }
  }
`;

class Notes extends Component {
  state = {
    showModal: false,
  };

  handleShow = () => {
    this.setState({ showModal: true });
  };

  handleHide = (event) => {
    if (event.target.hasAttribute('modal-wrapper') || event.target.hasAttribute('close-modal')) {
      this.setState({ showModal: false });
    }
  };

  render() {
    const {
      notes,
      allNotes,
      findCategory,
      navigateCategory,
      addNote,
      addCategory,
      deleteNote,
      getCategories,
    } = this.props;
    const availableCategories = [
      {
        categoryID: notes.categoryID,
        categoryName: notes.categoryName,
      },
      ...notes.categories.map((cat) => ({
        categoryID: cat.categoryID,
        categoryName: cat.categoryName,
      })),
    ];

    const { showModal } = this.state;

    const modal = showModal ? (
      <Modal>
        <div
          role="button"
          tabIndex="-1"
          modal-wrapper=""
          className={modalWrapper}
          onKeyPress={this.handleHide}
          onClick={this.handleHide}
        >
          <AddNoteForm
            availableCategories={availableCategories}
            addNote={addNote}
            handleHide={this.handleHide}
          />
        </div>
      </Modal>
    ) : null;

    return (
      <div className={contentWrapper}>
        <TwoColumns>
          <Categories
            allNotes={allNotes}
            currentCategory={notes}
            findCategory={findCategory}
            navigateCategory={navigateCategory}
            addCategory={addCategory}
            getCategories={getCategories}
          />
        </TwoColumns>
        <h2>Notes for {notes.categoryName} category:</h2>
        <NotesWrapper>
          <div className={noteStyle}>
            <button type="button" onClick={this.handleShow}>
              Add note
            </button>
            {modal}
          </div>
          {notes.notes.map((note) => (
            <Note key={note.id} note={note} deleteNote={deleteNote} />
          ))}
        </NotesWrapper>
      </div>
    );
  }
}

Notes.propTypes = {
  allNotes: category.isRequired,
  notes: category.isRequired,
  navigateCategory: func.isRequired,
  addNote: func.isRequired,
  addCategory: func.isRequired,
  findCategory: func.isRequired,
  deleteNote: func.isRequired,
  getCategories: func.isRequired,
};

export default Notes;
