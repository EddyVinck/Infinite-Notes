/* eslint-disable no-console */

import React, { Component } from 'react';
import Notes from './Notes';
import notes from './notes-data';

class App extends Component {
  state = {
    allNotes: notes,
    selectedCategory: null,
  };

  navigateCategory = (categoryID) => {
    const { allNotes } = this.state;

    const newCategory = this.findCategory(categoryID, allNotes);
    this.setState({ selectedCategory: newCategory });
    console.log(newCategory);
  };

  // findCategory = (id, object) => {
  //   let temp;
  //   if (object.id === id) {
  //       return object;
  //   }
  //   object.categories.some(o => temp = findCategory(o, id));
  //   return temp;
  // }

  findCategory = (categoryID, notesCategory) => {
    // debugger; // eslint-disable-line
    console.log('function call');
    console.log(notesCategory);
    if (notesCategory.categoryID === categoryID) {
      return notesCategory;
    }
    for (let i = 0; i < notesCategory.categories.length; i += 1) {
      const result = this.findCategory(categoryID, notesCategory.categories[i]);

      if (result) return result;
    }

    return null;
  };

  render() {
    const { allNotes, selectedCategory } = this.state;
    const notesToView = selectedCategory !== null ? selectedCategory : allNotes;

    return (
      <div>
        <h1>Infinite Notes!</h1>
        <Notes notes={notesToView} navigateCategory={this.navigateCategory} />
      </div>
    );
  }
}

export default App;
