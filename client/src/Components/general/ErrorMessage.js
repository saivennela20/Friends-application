import React from 'react';
import './ErrorMessage.scss';



class ErrorMessage extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      showMessage:true
    }
  }

  showMessage(){
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
