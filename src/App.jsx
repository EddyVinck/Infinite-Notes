import React, { Component } from 'react';
import _ from 'lodash';
import Notes from './Notes';
import notes from './notes-data';

class App extends Component {
  state = {
    allNotes: notes,
    selectedCategory: null,
  };

  findCategory = (categoryID, notesCategory) => {
    if (notesCategory.categoryID === categoryID) {
      return notesCategory;
    }
    for (let i = 0; i < notesCategory.categories.length; i += 1) {
      const result = this.findCategory(categoryID, notesCategory.categories[i]);

      if (result) return result;
    }

    return null;
  };

  navigateCategory = (cat) => {
    const { allNotes } = this.state;
    let selectedCategory = null;

    if (cat === null) {
      selectedCategory = allNotes;
    } else {
      selectedCategory = this.findCategory(cat.categoryID, allNotes);
    }

    this.setState({ selectedCategory });
  };

  addNote = (newNote) => {
    const { allNotes } = this.state;
    const category = this.findCategory(newNote.categoryID, allNotes);

    const highestNoteID = category.notes
      .map((note) => note.id)
      .reduce((highestID, currentNote) => Math.max(currentNote, highestID));

    const pushedNote = { id: highestNoteID + 1, title: newNote.title, text: newNote.text };

    this.setState((prevState) => {
      const newNotes = _.cloneDeep(prevState.allNotes);
      const modifiedNotesCategory = this.findCategory(newNote.categoryID, newNotes);
      modifiedNotesCategory.notes.push(pushedNote);

      return { allNotes: newNotes, selectedCategory: modifiedNotesCategory };
    });
  };

  render() {
    const { allNotes, selectedCategory } = this.state;
    const notesToView = selectedCategory !== null ? selectedCategory : allNotes;

    return (
      <div>
        <h1>Infinite Notes!</h1>
        <Notes
          notes={notesToView}
          navigateCategory={this.navigateCategory}
          addNote={this.addNote}
        />
      </div>
    );
  }
}

export default App;
