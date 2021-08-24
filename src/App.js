import React, { useState } from 'react';
import './App.css';
import { Started, Invitation } from './containers';
import store from './store';
import { Provider } from 'react-redux';

function App() {
  const [showInvitation, setShowInvitation] = useState(false);

  const goToInvitation = () => {
    setShowInvitation(true);
  }

  return (
    <Provider store={store}>
      <div className="App">
        {!showInvitation ?
          <Started goToInvitation={goToInvitation} />
          :
          <Invitation />
        }
      </div>
    </Provider>
  );
}

export default App;
