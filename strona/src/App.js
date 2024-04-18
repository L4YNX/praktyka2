import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        date: '',
        fuel: '',
        cena: '',
      }
    }

    onDateChange = (event) => {
      this.setState({date:event.target.value});
    }

    onFuelChange = (event) => {
      this.setState({fuel:event.target.value});
    }

    displayPrice = (cena) => {
      this.setState({cena:cena});
    }

    onSubmit = () => {
      fetch('http://localhost:8082/predict', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
        body: JSON.stringify({
          data: this.state.date,
          typ_paliwa: this.state.fuel
      })
    })
      .then((response) => response.json())
      .then(cena => {
        this.setState({cena:cena});
      })
  }
    
  render() {
    return (
      <div>
          <label for="date">Podaj date: </label>
          <input type="date" name="date" id='date' required onChange={this.onDateChange}/>

          <label for="fuel">Zaznacz rodzaj paliwa: </label>
          <select name='fuel' id='fuel' required onChange={this.onFuelChange}>
            <option value="">---</option>
            <option value="PB95">PB95</option>
            <option value="PB98">PB98</option>
            <option value="ON">Disel</option>
          </select>
          
          <input type="submit" name="btn" id='btn' value="Pokaz cene" onClick={this.onSubmit}/>
      </div>
    );
  }
}

export default App;