import React, { useState } from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      type: ''
    };
  }

  onDataChange = (event) => {
    this.setState({data: event.target.value})
  }

  onTypeChange = (event) => {
    this.setState({type: event.target.value})
  }

  onSubmit = () => {
    fetch("http://localhost:8082/predict", {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          data: this.state.data,
          typ_paliwa: this.state.type
        })
    })
    .then(response => response.json())
    .then(data => {
      console.log("Działa:", data);
    })
    .catch(error => {
      console.error("Błąd:", error);
    });
  }

  render() {
    return (
      <div>
        <div className='form'>
          
          <label for="data">Podaj date: </label>
          <input type='date' name='date' id='date' onChange={this.onDataChange}/>
          
          <label for="fuel">Wybierz paliwo: </label>
          <select className='fuel' id='fuel' name='fuel' onChange={this.onTypeChange}>
            <option value="">---</option>
            <option value="ON">ON</option>
            <option value="PB95">PB95</option>
            <option value="PB98">PB98</option>
          </select>

          <input type='submit' id='btn' value='Pobierz dane' onClick={this.onSubmit} />
          
        </div>
      </div>
    );
  }
}

export default App;