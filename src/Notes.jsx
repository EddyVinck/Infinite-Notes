import React, { Fragment } from 'react';
import { func } from 'prop-types';
import Note from './Note';
import Categories from './Categories';
import AddNotes from './AddNote';

import category from './types';

const Notes = (props) => {
  const {
    notes,
    allNotes,
    findCategory,
    navigateCategory,
    addNote,
    addCategory,
    deleteNote,
    getCategories,
  } = props;
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
        allNotes={allNotes}
        currentCategory={notes}
        findCategory={findCategory}
        navigateCategory={navigateCategory}
        addCategory={addCategory}
        getCategories={getCategories}
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
