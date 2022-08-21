import React, { Component } from 'react';
//import 'tachyons';

//const { name,email,id }= this.props;
class Card extends Component{
    constructor(props){
        super(props);
    }

    clickHandle = event =>{
      event.stopPropagation();
      this.props.clickHandler(this.props.room);
    }
    render(){
        return(
            <div className='room-card' onClick={this.clickHandle.bind(this)} >
                <img alt='rooms' src={require('./images/room.png')} />
                <div>
                    <h2>{this.props.room.room_name}</h2>
                    <p>{this.props.room.users.length} People</p>
                </div>
            </div>
        );
    }
}

export default Card;