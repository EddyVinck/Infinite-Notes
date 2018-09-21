import React from 'react';
import { func } from 'prop-types';
import styled from 'react-emotion';
import contentWrapper from './css/layout';
import { Note } from './Note';
import Categories from './Categories';
import AddNotes from './AddNote';
import category from './types';

const NotesWrapper = styled('div')`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
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
        <AddNotes addNote={addNote} availableCategories={availableCategories} />
      </TwoColumns>
      <h2>Notes for {notes.categoryName} category:</h2>
      <NotesWrapper>
        {notes.notes.map((note) => (
          <Note key={note.id} note={note} deleteNote={deleteNote} />
        ))}
      </NotesWrapper>
    </div>
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
