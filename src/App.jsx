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

    let newNoteID;
    if (category.notes && category.notes.length > 0) {
      newNoteID =
        category.notes
          .map((note) => note.id)
          .reduce((highestID, currentNote) => Math.max(currentNote, highestID)) + 1;
    } else {
      newNoteID = 0;
    }

    const pushedNote = { id: newNoteID, title: newNote.title, text: newNote.text };

    this.setState((prevState) => {
      const newNotes = _.cloneDeep(prevState.allNotes);
      const modifiedNotesCategory = this.findCategory(newNote.categoryID, newNotes);
      modifiedNotesCategory.notes.push(pushedNote);

      return { allNotes: newNotes, selectedCategory: modifiedNotesCategory };
    });
  };

  addCategory = (categoryName, parentCategory) => {
    const { allNotes } = this.state;
    const allCategories = [];
    this.getCategories(allNotes, allCategories);

    const highestCategoryNumber = this.findHighestCategoryNumber(allCategories);

    const newCategory = {
      categoryID: highestCategoryNumber + 1,
      categoryName,
      categories: [],
      notes: [],
    };

    this.setState((prevState) => {
      const notesCopy = _.cloneDeep(prevState.allNotes);
      const parentCategoryRef = this.findCategory(parentCategory.categoryID, notesCopy);

      parentCategoryRef.categories.push(newCategory);

      return { allNotes: notesCopy, selectedCategory: parentCategoryRef };
    });
  };

  // Let the call stack take care of the recursion since you don't know when the function will be finished
  getCategories = (cat, allCategories) => {
    if (cat && typeof cat.categoryID === 'number') {
      allCategories.push(cat);
      if (cat.categories && cat.categories.length > 0) {
        cat.categories.forEach((subCategory) => {
          this.getCategories(subCategory, allCategories);
        });
      }
    }
  };

  findHighestCategoryNumber = (allCategories) =>
    allCategories
      .map((cat) => cat.categoryID)
      .reduce(
        (accumulator, currentValue) => (currentValue > accumulator ? currentValue : accumulator)
      );

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
          addCategory={this.addCategory}
        />
      </div>
    );
  }
}

export default App;
