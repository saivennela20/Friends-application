import React from 'react';

import './TodoItem.scss'

//Item component
class TodoItem extends React.Component{

  
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
    this.props.removeItemHandler(this.props.item);
  }

  render(){

    return(
      <div className='todo-item' onClick={this.props.showItemHandler.bind(null,this.props.item)}>
        <input type='checkbox' disable='true' checked={this.props.item.status}></input>
        <span>{this.props.item.title}</span>
        <span className="delete-icon" onClick={this.removeItem}><img src="/delete24dp.svg"></img></span>
      </div>
    );
  }
}

export default TodoItem;