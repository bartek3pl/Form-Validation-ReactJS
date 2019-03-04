import React, { Component } from 'react';
import './App.css';
import Input from './Input.js'
import Header from './Header.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: "",
      email: "",
      pass: "",
      accept: false,
      message: "",
      errors: {
        username: false,
        email: false,
        pass: false,
        accept: false,
      }
    }
  }

  messages = {
    username_incorrect: "Nazwa musi być dłuższa niż 10 znaków i nie może zawierać spacji",
    email_incorrect: "Nieprawidłowy email",
    pass_incorrect: "Hasło musi mieć co najmniej 8 znaków",
    accept_incorrect: "Nie wyrażona zgoda",
    empty: "Pole nie zostało wypełnione"
  } 

  your = {
    name: "Twoje imię:",
    email: "Twój email:",
    pass:  "Twoje hasło:",
    accept: "Wyrażam zgodę na przetwarzanie moich danych osobowych",
    sign: "Zapisz się",
  }

  handleChange = e => {
    const {value, name, type, checked} = e.target;
    if(type === "text" || type === "password" || type === "email") {
      this.setState({ 
        [name]: value  
      });
    } else if(type === "checkbox") {
      this.setState({ 
        [name]: checked
      });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const validation = this.formValidation();

    if(validation.correct) {
      this.setState({ 
        username: "",
        email: "",
        pass: "",
        accept: false,
        message: "Formularz został wysłany",
        errors: {
          username: false,
          email: false,
          pass: false,
          accept: false,
        }  
      });

    } else {
      this.setState({ 
        errors: {
          username: !validation.username,
          email: !validation.email,
          pass: !validation.password,
          accept: !validation.accept,
        }    
      });
    }
  }

  formValidation = () => {
    let username = false;
    let email = false;
    let password = false;
    let accept = false;
    let correct = false; //whole form
    const emailString = this.state.email.toString();

    if(this.state.username.length > 10 && this.state.username.indexOf(" ") === -1) {
      username = true;
    }
    if(this.validateEmail(emailString)) {
      email = true;
    }
    if(this.state.pass.length >= 8) {
      password = true;
    }
    if(this.state.accept === true) {
      accept = true;
    }
    if(username && email && password && accept) {
      correct = true;
    }
    return ({
      correct, 
      username,
      email,
      password,
      accept,
    });
  }

  validateEmail = email => {
    const regex = /\S+@\S+\.\S+/; //simple regex
    return regex.test(String(email).toLowerCase());
  }

  componentDidUpdate() {
    if(this.state.message !== "") {
      setTimeout(() => this.setState({
        message: ""
      }), 2000)
    }
  }

  render() {
    return ( 
      <div className="app">
        <Header/>
        <form onSubmit={this.handleSubmit} noValidate>
        
          <Input
            yourname={this.your.name}
            type="text"
            id="user"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            error={this.state.errors.username}
            incorrect={this.messages.username_incorrect}
          />

          <Input
            yourname={this.your.email}
            type="email"
            id="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            error={this.state.errors.email}
            incorrect={this.messages.email_incorrect}
          />

          <Input
            yourname={this.your.pass}
            type="password"
            id="password"
            name="pass"
            value={this.state.pass}
            onChange={this.handleChange}
            error={this.state.errors.pass}
            incorrect={this.messages.pass_incorrect}
          />

          <Input
            yourname={this.your.accept}
            type="checkbox"
            id="accept"
            name="accept"
            value={this.state.accept}
            onChange={this.handleChange}
            error={this.state.errors.accept}
            incorrect={this.messages.accept_incorrect}
          />

          <button>{this.your.sign}</button>

        </form>

        {this.state.message && <h3>{this.state.message}</h3>}
      </div>
     );
  }
}
 
export default App;
