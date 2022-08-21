import React from 'react';
import { Link } from 'react-router-dom';

import './NavBar.scss'
class NavBar extends React.Component {
  constructor(props){
    super(props);
  }


  render() {
    return (
      <div className='nav-bar'>
        <ul className='nav-container'>
          <Link to="/room-management"><li className={this.props.selectedTab==='room'?'nav-item selected':'nav-item'}>Room</li></Link>
          <Link to="/chat-room"><li className={this.props.selectedTab==='chat'?'nav-item selected':'nav-item'}>Chat</li></Link>
          <Link to="/todo-list"><li className={this.props.selectedTab==='todo'?'nav-item selected':'nav-item'}>Todo</li></Link>
          <Link to="/schedule"><li className={this.props.selectedTab==='schedule'?'nav-item selected':'nav-item'}>Tasks</li></Link>
        </ul>
      </div>
    );
  }
}
export default NavBar;
