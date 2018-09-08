import React, { Component, Fragment } from 'react';
import { func } from 'prop-types';
import Note from './Note';
import Categories from './Categories';
import AddNotes from './AddNote';

import category from './types';

class Notes extends Component {
  componentDidUpdate() {}

  handleDeleteNote = () => {};

  render() {
    const { notes, navigateCategory, addNote } = this.props;
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
    return (
      <Fragment>
        <Categories categories={notes.categories} navigateCategory={navigateCategory} />
        <h2>Notes for {notes.categoryName} category:</h2>
        <AddNotes addNote={addNote} availableCategories={availableCategories} />
        <div className="Notes">
          {notes.notes.map((note) => (
            <Note key={note.id} note={note} handleDeleteNote={this.handleDeleteNote} />
          ))}
        </div>
      </Fragment>
    );
  }
}

Notes.propTypes = {
  notes: category.isRequired,
  navigateCategory: func.isRequired,
  addNote: func.isRequired,
};

export default Notes;
