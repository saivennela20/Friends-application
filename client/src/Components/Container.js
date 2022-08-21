import React from 'react';
import './Container.scss'
import NavBar from './NavBar'
import TopBar from './TopBar';

class Container extends React.Component {
  render() {
    return (
      <div className='wrapper'>
        <div className='logo'><strong>F.R.I.E.N.D.S</strong></div>
        <TopBar className='.left-bar' title={this.props.title}></TopBar>
        <NavBar selectedTab={this.props.selectedTab}></NavBar>
        {this.props.children}
      </div>
    );
  }
}
export default Container;
