/* eslint-disable no-console */
import React, { Component } from 'react';
import Note from './Note';

class Notes extends Component {
  state = {
    notes: [
      {
        id: 0,
        title: 'note 1',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, expedita.',
      },
      {
        id: 1,
        title: 'note 2',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, expedita.',
      },
    ],
  };

  componentDidUpdate() {
    // update db if the notes have changed
    // or maybe do this on a note basis instead of overwriting the entire notes in the database
  }

  handleDeleteNote = (noteID) => {
    const { notes } = this.state;

    // copy the array
    const newNotes = notes.slice();

    // delete one note
    const noteToDelete = newNotes.findIndex((note) => note.id === noteID);
    const deleteCount = 1;
    newNotes.splice(noteToDelete, deleteCount);

    this.setState({ notes: newNotes });
  };

  render() {
    const { notes } = this.state;
    return (
      <div className="Notes">
        {notes.map((note) => (
          <Note key={note.id} note={note} handleDeleteNote={this.handleDeleteNote} />
        ))}
      </div>
    );
  }
}

export default Notes;
