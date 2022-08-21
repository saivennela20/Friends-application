import React, { Component }  from "react";
import Card from './Card';

// rooms is passed as props

class CardList extends Component{

    

    render(){

    const cardComponent=
    this.props.rooms.map((user,i)=>{
          return  (<Card key={i} clickHandler={this.props.showRoomHandler} room={user}/>);
        })
    return( 
        <div className="card-container">
              {this.props.rooms?cardComponent:'No Rooms '}
        </div>
    );
  }
}
export default CardList;