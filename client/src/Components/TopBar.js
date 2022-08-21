import React from 'react';
import { getCurrentUser,signOutUser } from '../js/user/userUtil';

import './TopBar.scss'
class TopBar extends React.Component {

  signOut(){
    signOutUser();
  }
  render() {
    const user = getCurrentUser();
    return (
      <div className='top-bar'>
        <span className='page-title'> {this.props.title}</span>
        <div className='sign-out' onClick={this.signOut.bind(this)}> Sign-Out<br/>
        ({(user.username)})</div>
      </div>
    );
  }
}
export default TopBar;
