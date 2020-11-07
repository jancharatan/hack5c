import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import { Provider } from 'react-redux';
import Header from './features/header/Header';
import Main from './features/main/Main';
import rootReducer from './features/redux/rootReducer';

const store = configureStore({
  reducer: rootReducer,
});

function App() {
  return (
    <Provider store={store}>
      <div className="App w-100 h-100 d-flex flex-column">
        <Header />
        <div className="d-flex flex-grow-1 overflow-hidden">
          <Main />
        </div>
      </div>
    </Provider>
  );
}

export default App;
