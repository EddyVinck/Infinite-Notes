import React, { Component } from 'react';
import styled, { injectGlobal } from 'react-emotion';
import _ from 'lodash';
import Notes from './Notes';
import notes from './notes-data';
import globalStyles from './css/globalStyles';
import { contentWrapper } from './css/layout';
import SearchCategories from './SearchCategories';

/**
 * TODO:
 * 3. Styling
 * 4. Review where functions live. Can some of it be moved to the component?
 * 5. Localstorage
 * 6. Update note
 * 7. Delete category4
 * 8. Finetuning
 *    * no duplicate category names
 */

injectGlobal(globalStyles);

const Header = styled('header')`
  padding: 60px 0px;
  background: #4b79a1; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #283e51, #4b79a1); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #283e51,
    #4b79a1
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  h1 {
    color: #fff;
    margin-bottom: 0;
  }

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

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

  deleteNote = (noteID) => {
    this.setState((prevState) => {
      const notesCopy = _.cloneDeep(prevState.allNotes);
      let parentCategory = null;

      if (prevState.selectedCategory !== null && prevState.selectedCategory.categoryID) {
        parentCategory = this.findCategory(prevState.selectedCategory.categoryID, notesCopy);
      } else {
        parentCategory = notesCopy;
      }
      parentCategory.notes = parentCategory.notes.filter((note) => note.id !== noteID);

      return { allNotes: notesCopy, selectedCategory: parentCategory };
    });
  };

  // Let the call stack take care of the recursion since you don't know when the function will be finished
  // allCategories is the array you pass in. In this array all categories will be stored.
  getCategories = (categoryToSearch, allCategories) => {
    if (categoryToSearch && typeof categoryToSearch.categoryID === 'number') {
      allCategories.push(categoryToSearch);
      if (categoryToSearch.categories && categoryToSearch.categories.length > 0) {
        categoryToSearch.categories.forEach((subCategory) => {
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
        <Header>
          <div className={contentWrapper}>
            <h1>Infinite Notes</h1>
            <SearchCategories
              allNotes={allNotes}
              getCategories={this.getCategories}
              navigateCategory={this.navigateCategory}
              findCategory={this.findCategory}
            />
          </div>
        </Header>
        <Notes
          allNotes={allNotes}
          notes={notesToView}
          navigateCategory={this.navigateCategory}
          findCategory={this.findCategory}
          addNote={this.addNote}
          addCategory={this.addCategory}
          deleteNote={this.deleteNote}
          getCategories={this.getCategories}
        />
      </div>
    );
  }
}

export default App;
