import React from 'react';
import Notes from './Notes';
import notes from './notes-data';

const App = () => (
  <div>
    <h1>Infinite Notes!</h1>
    <Notes notes={notes} />
  </div>
);

export default App;
