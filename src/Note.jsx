import React from 'react';
import { shape, number, string, func } from 'prop-types';

const Note = (props) => {
  const { note, deleteNote } = props;
  return (
    <div className="note">
      <h2>{note.title}</h2>
      <p>{note.text}</p>
      <button
        onClick={() => {
          deleteNote(note.id);
        }}
        type="button"
      >
        Delete
      </button>
    </div>
  );
};

Note.propTypes = {
  note: shape({
    id: number,
    title: string,
    text: string,
  }).isRequired,
  deleteNote: func.isRequired,
};

export default Note;
