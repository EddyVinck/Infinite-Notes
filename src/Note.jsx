import React from 'react';
import { shape, number, string, func } from 'prop-types';
import { css } from 'react-emotion';
import buttonStyle from './css/button';

const deleteButton = css`
  ${buttonStyle} color: red;
  border-color: red;

  &:hover {
    color: #fff;
    background-color: red;
  }
`;

const noteStyle = css`
  border: 2px solid #979797;
  background-color: #fdfdfd;
  padding: 30px;
  width: 32%;
  margin-left: 2%;
  margin-bottom: 40px;

  &:nth-of-type(3n + 1) {
    margin-left: 0%;
  }

  @media (max-width: 920px) {
    width: 49%;
    margin-left: 2%;

    &:nth-of-type(2n + 1) {
      margin-left: 0%;
    }
  }

  @media (max-width: 600px) {
    width: 100%;
    margin-left: 0%;
  }
`;

const Note = (props) => {
  const { note, deleteNote } = props;
  return (
    <div className={noteStyle}>
      <h2>{note.title}</h2>
      <p>{note.text}</p>
      <button
        className={deleteButton}
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

export { Note, noteStyle };
