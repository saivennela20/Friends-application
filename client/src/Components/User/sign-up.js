import React from 'react';
import './sign-up.scss';
import * as userUtil from './../../js/user/userUtil.js';



class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      error: {
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        message:''
      }
    }
  }
  validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  onChange = event => {
    console.log(event.target);
    event.preventDefault();
    let { name, value } = event.target;
    let error = { ...this.state.error };

    switch (name) {
      case "username":
        error.username = this.validateEmail(value) ? '' : 'Invalid Email';
        break;
      case "password":
        error.password = value.length < 0 ? 'Password required' : '';
        break;
      case "first_name":
        error.first_name = value.length < 0 ? 'First Name required' : '';
        break;
      case "last_name":
        error.last_name = value.length < 0 ? 'Last Name required' : '';
        break;
      default:
        break;
    }
    error.message='';
    this.setState({
      error,
      [name]: value
    })
  }

  onFormSubmit = async (event) => {
    event.preventDefault();
    for (let message in this.state.error) {
      if (this.state.error[message].length !== 0) {
        return;
      }
    }

    const data = await userUtil.signUpUser(this.state);
    console.log(data)
    if (data.status >= 200 && data.status < 300) {
      // const body = await data.json();
      // if (body) {
        window.location.href = '/';
      // }
    }
    else {
      if (data.status >= 400 && data.status < 500) {
        const body = await data.json();
        this.state.error.message = body.reason;
        this.setState(this.state);
      }

    }
  }

  render() {
    return (
      <form className='sign-up-form' onSubmit={this.onFormSubmit.bind(this)}>
        <label className='label' htmlFor='first_name'>First Name</label>
        <input type='text' required placeholder='First Name' name="first_name" onChange={this.onChange.bind(this)}></input>
        <span className={this.state.error.first_name.length !== 0 ? 'error-message' : 'error-message hide'}>{this.state.error.first_name}</span>
        <label className='label' htmlFor='last_name'>Last Name</label>
        <input type='text' required placeholder='Last Name' name="last_name" onChange={this.onChange.bind(this)}></input>
        <span className={this.state.error.last_name.length !== 0 ? 'error-message' : 'error-message hide'}>{this.state.error.last_name}</span>
        <label className='label' htmlFor='username'>Username</label>
        <input type='text' required placeholder='Email' name="username" onChange={this.onChange.bind(this)}></input>
        <span className={this.state.error.username.length !== 0 ? 'error-message' : 'error-message hide'}>{this.state.error.username}</span>
        <label className='label' htmlFor="password">Password</label>
        <input type='password' name="password" placeholder='Password' required onChange={this.onChange.bind(this)}></input>
        <span className={this.state.error.password.length !== 0 ? 'error-message' : 'error-message hide'}>{this.state.error.password}</span>
        <span className={this.state.error.message.length !== 0 ? 'error-message' : 'error-message hide'}>{this.state.error.message}</span>
        <button type='submit'>Sign Up</button>
      </form>
    );
  }
}

export default SignUp;
