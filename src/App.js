import React, { Component } from 'react';
import { Container } from 'reactstrap';

import NewGame from "./Components/NewGame";
import Header from "./Components/Header";

import './App.css';

class App extends Component {




  componentDidMount() {

  }



  render() {


    return (
      <Container className="App">
        <Header />
        <NewGame />


      </Container>
    );
  }
}

export default App;