import React, { Component } from 'react';
import { Container } from 'reactstrap';

import NewGame from "./Components/NewGame";


import './App.css';

class App extends Component {




  componentDidMount() {

  }



  render() {


    return (
      <Container className="App">
        
        <NewGame />


      </Container>
    );
  }
}

export default App;