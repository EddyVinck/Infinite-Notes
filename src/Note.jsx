import React from 'react';
import { shape, number, string, func } from 'prop-types';

const Note = (props) => {
  const { note, handleDeleteNote } = props;
  return (
    <div className="note">
      <button
        onClick={() => {
          handleDeleteNote(note.id);
        }}
        type="button"
      >
        Delete
      </button>
      <h2>{note.title}</h2>
      <p>{note.text}</p>
    </div>
  );
};

Note.propTypes = {
  note: shape({
    id: number,
    title: string,
    text: string,
  }).isRequired,
  handleDeleteNote: func.isRequired,
};

export default Note;
