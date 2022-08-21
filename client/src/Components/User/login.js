import React from 'react';
import './login.scss';
import SignIn from './sign-in';
import SignUp from './sign-up';
import background from "./../../img/friends-back-drop.png";



class Login extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      signIn:true
    }
  }

  showSignInPage(){
    this.setState({signIn:true});
    console.log(this.state);
  }
  showSignUpPage(){
    this.setState({signIn:false});
    console.log(this.state);
  }
  render() {
    return (
      <React.Fragment>
      
        <div className='banner'>Welcome to 
          <br></br>
          <span>F.R.I.E.N.D.S</span>
        </div>
        <div className="login-container">
          {this.state.signIn?(''):(<a className='sign-in-link' href='#sign-in' onClick={this.showSignInPage.bind(this)}> &lt;- Back to Sign In</a>)}
          {this.state.signIn?(<SignIn></SignIn>):(<SignUp></SignUp>)}
          {this.state.signIn?(<a className='sign-up-link' href='#sign-up' onClick={this.showSignUpPage.bind(this)}>Don't have account? Create one</a>):('')}
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
