import React from 'react';

import './User.scss'

//Usr component
class User extends React.Component{
  
  constructor(props){
    super(props)
  }



/**
 * Function to stop event propagation and then invoke remove item
 * @param {Event} event - url path for PUT request
 */
  removeItem = event => {
    console.log('triggered');
    event.preventDefault();
    event.stopPropagation();
    this.props.removeUserHandler(this.props.name);
  }

  render(){

    return(
      <div className='user-display'>
        <label>{this.props.name}</label>
        {this.props.removeUserHandler?(<span className="delete-icon" onClick={this.removeItem.bind(this)}><img src="/delete24dp.svg"></img></span>):''}
      </div>
    );
  }
}

export default User;