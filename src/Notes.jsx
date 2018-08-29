/* eslint-disable no-console */
import React, { Component, Fragment } from 'react';
import Note from './Note';
import Categories from './Categories';

import category from './types';

class Notes extends Component {
  componentDidUpdate() {
    // update db if the notes have changed
    // or maybe do this on a note basis instead of overwriting the entire notes in the database
  }

  handleDeleteNote = () => {};

  render() {
    const { notes } = this.props;
    console.log(notes);
    return (
      <Fragment>
        <Categories categories={notes.categories} />
        <h2>Notes for {notes.categoryName} category</h2>
        <div className="Notes">
          {notes.notes.map((note) => (
            <Note key={note.id} note={note} handleDeleteNote={this.handleDeleteNote} />
          ))}
        </div>
      </Fragment>
    );
  }
}

Notes.propTypes = { notes: category.isRequired };

export default Notes;
