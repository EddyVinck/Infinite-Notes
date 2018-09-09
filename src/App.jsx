import React, { Component } from 'react';
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

  navigateCategory = (categoryID) => {
    const { allNotes } = this.state;

    const newCategory = this.findCategory(categoryID, allNotes);
    this.setState({ selectedCategory: newCategory });
  };

  addNote = (newNote) => {
    console.log(newNote); // eslint-disable-line
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
