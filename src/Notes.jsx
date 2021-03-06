import React, { Component } from 'react';
import { func } from 'prop-types';
import styled, { css, keyframes } from 'react-emotion';
import { Note, noteStyle } from './Note';
import Categories from './Categories';
import NoteForm from './NoteForm';
import category from './types';
import Modal from './Modal';
import { contentWrapper, sectionPadding } from './css/layout';

const NotesWrapper = styled('div')`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const addNoteButton = css`
  background: none;
  border: none;
  font-size: 200px;
  color: inherit;
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: 0.2s ease-in;
`;

const addNoteStyle = css`
  ${noteStyle};
  padding: 0;
  background-color: rgba(255, 250, 7, 0.2);
  border-color: currentColor;
  color: #a78911;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s ease-in;
  label: add-button;

  &:hover,
  &:focus {
    box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.6);
    transform: translateY(-4px);

    .${addNoteButton} {
      color: #000;
    }
  }
  .${addNoteButton} {
    outline: 0;
    border: 0;
  }
`;

const modalWrapper = css`
  label: modal-wrapper;
  background-color: rgba(1, 5, 25, 0.5);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  outline: 0;
  opacity: 0;
  animation: ${fadeIn} 0.2s forwards;
`;

class Notes extends Component {
  state = {
    isShowingModal: false,
    noteToEdit: null,
  };

  handleShowModal = () => {
    this.setState({ isShowingModal: true });
  };

  handleHide = (event) => {
    if (
      event &&
      (event.target.hasAttribute('modal-wrapper') || event.target.hasAttribute('close-modal'))
    ) {
      this.resetNoteToEdit();
      this.hideModal();
    }
  };

  hideModal = () => {
    this.setState({ isShowingModal: false });
  };

  showEditModal = (noteToEdit) => {
    this.setState(
      {
        noteToEdit,
      },
      () => {
        this.handleShowModal();
      }
    );
  };

  resetNoteToEdit = () => {
    this.setState({
      noteToEdit: null,
    });
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
      editNote,
      getCategories,
    } = this.props;
    const { isShowingModal, noteToEdit } = this.state;

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

    const modal = isShowingModal ? (
      <Modal>
        <div
          role="button"
          tabIndex="-1"
          modal-wrapper=""
          className={modalWrapper}
          onKeyPress={this.handleHide}
          onClick={this.handleHide}
        >
          <NoteForm
            availableCategories={availableCategories}
            addNote={addNote}
            handleHide={this.handleHide}
            hideModal={this.hideModal}
            editNote={editNote}
            noteToEdit={noteToEdit}
            resetNoteToEdit={this.resetNoteToEdit}
          />
        </div>
      </Modal>
    ) : null;

    return (
      <div>
        <Categories
          allNotes={allNotes}
          currentCategory={notes}
          findCategory={findCategory}
          navigateCategory={navigateCategory}
          addCategory={addCategory}
          getCategories={getCategories}
        />
        <div className={`${contentWrapper} ${sectionPadding.standard}`}>
          <h2>Notes for {notes.categoryName} category:</h2>
          <NotesWrapper>
            <div className={addNoteStyle}>
              <button type="button" className={addNoteButton} onClick={this.handleShowModal}>
                +
              </button>
              {modal}
            </div>
            {notes.notes.map((note) => (
              <Note
                key={note.id}
                note={note}
                showEditModal={this.showEditModal}
                deleteNote={deleteNote}
              />
            ))}
          </NotesWrapper>
        </div>
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
  editNote: func.isRequired,
  getCategories: func.isRequired,
};

export default Notes;
