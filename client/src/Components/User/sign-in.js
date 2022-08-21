import React from 'react';
import './sign-in.scss';
import * as userUtil from './../../js/user/userUtil'

class SignIn extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      username:'',
      password:'',
      error:{
        message:''
      }
    }
  }
  validateEmail = async (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  
  onChange = async event => {
    console.log(event.target);
    event.preventDefault();
    let { name, value } = event.target;
    let error = { ...this.state.error };

    switch (name) {
        case "username":
            error.message = await this.validateEmail(value) ?  '':'Invalid Email' ;
            break;
        case "password":
            error.message = value.length<0?'Password required':'';
            break;
        default:
            break;
    }

    this.setState({
        error,
        [name]: value
    })
  }

  onFormSubmit = async event => {
    event.preventDefault();
    if(this.state.error.message!==''){
      return;
    }
  
    const data = await userUtil.signInUser(this.state);
    if(data.status>=200 && data.status<300){
      const body = await data.json();
      if(body){
        sessionStorage.setItem('token',body.token);
        sessionStorage.setItem('user',JSON.stringify(body.user));
        let cookie =  `token=${body.token};expires=Sun, 1 Jan 2024 00:00:00 UTC; path=/`;
        document.cookie=cookie;
        window.location.href='/home';
      }
    }
    else{
      if(data.status>=400 && data.status<500){
        this.state.error.message="Invalid username/Password";
        this.setState(this.state);
    }
  }
}


  render() {
    console.log(this.state);
    return (
      <form className='sign-in-form' onSubmit={this.onFormSubmit.bind(this)}>
        <label className='label' htmlFor='username'>Username</label>
        <input type='text' required autocomplete="off"  placeholder="Email" name="username" id="username" onChange={this.onChange.bind(this)}></input>
        <label className='label' htmlFor="password">Password</label>
        <input type='password' name="password" autocomplete="off"  placeholder="Password" id="password" required onChange={this.onChange.bind(this)}></input>
        <span className={this.state.error.message.length!==0?'error-message':'error-message hide'}>{this.state.error.message}</span>
        <button type='submit'>Sign In</button>
      </form>
    );
  }
}

export default SignIn;
