import React from 'react';
import './App.scss';
import Login from './Components/User/login';


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Login></Login>
      </div>
    );
  }
}

export default App;
