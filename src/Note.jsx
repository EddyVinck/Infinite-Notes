import React from 'react';
import { shape, number, string, func } from 'prop-types';
import { css } from 'react-emotion';
import { buttonStyle } from './css/button';
import colors from './css/colors';
import breakpoints from './css/breakpoints';

const editButton = css`
  ${buttonStyle};
  padding: 15px 30px;
  border-radius: 5px;
`;

const deleteButton = css`
  ${buttonStyle};
  margin-right: 10px;
  color: red;
  border-color: red;
  transition: 0.2s;
  padding: 15px 30px;
  overflow: hidden;
  position: relative;
  border-radius: 5px;
  background-color: #fff;

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 0px;
    top: 0;
    left: 0;
    background-color: #7d0606;
    background-image: linear-gradient(147deg, #7d0606 0%, #ff2525 74%);
    opacity: 0;
    transition: 0.3s ease-out;
    transform-origin: top;
    z-index: 0;
  }

  span {
    z-index: 1;
    position: relative;
  }

  &:hover,
  &:focus {
    color: #fff;
    background-color: transparent;
    border-color: red;

    &:before {
      height: 200%;
      width: 200%;
      opacity: 1;
    }
  }
`;

const noteStyle = css`
  border: 2px solid #979797;
  background-color: ${colors.white};
  padding: 30px;
  width: 32%;
  margin-left: 2%;
  margin-bottom: 40px;
  label: note;

  ${breakpoints.tabletUp} {
    &:nth-of-type(3n + 1) {
      margin-left: 0%;
    }
  }

  ${breakpoints.tabletDown} {
    width: 49%;
    margin-left: 2%;

    &:nth-of-type(2n + 1) {
      margin-left: 0%;
    }
  }

  ${breakpoints.mobileDown} {
    width: 100%;
    margin-left: 0%;
  }

  p {
    white-space: pre-line;
  }
`;

const Note = (props) => {
  const { note, deleteNote, editNote } = props;
  return (
    <div className={noteStyle}>
      <h3>{note.title}</h3>
      <p>{note.text}</p>
      <button
        className={deleteButton}
        onClick={() => {
          deleteNote(note.id);
        }}
        type="button"
      >
        <span>Delete</span>
      </button>
      <button
        className={editButton}
        onClick={() => {
          editNote(note.id);
        }}
        type="button"
      >
        <span>Edit</span>
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
  editNote: func.isRequired,
};

export { Note, noteStyle };
