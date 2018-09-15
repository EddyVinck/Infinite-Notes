import React, { Fragment } from 'react';
import { func } from 'prop-types';
import Note from './Note';
import Categories from './Categories';
import AddNotes from './AddNote';

import category from './types';

const Notes = (props) => {
  const { notes, navigateCategory, addNote, addCategory, deleteNote } = props;
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
      <Categories
        currentCategory={notes}
        navigateCategory={navigateCategory}
        addCategory={addCategory}
      />
      <h2>Notes for {notes.categoryName} category:</h2>
      <AddNotes addNote={addNote} availableCategories={availableCategories} />
      <div className="Notes">
        {notes.notes.map((note) => (
          <Note key={note.id} note={note} deleteNote={deleteNote} />
        ))}
      </div>
    </Fragment>
  );
};

Notes.propTypes = {
  notes: category.isRequired,
  navigateCategory: func.isRequired,
  addNote: func.isRequired,
  addCategory: func.isRequired,
  deleteNote: func.isRequired,
};

export default Notes;
