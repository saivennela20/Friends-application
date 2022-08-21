import React from 'react';
import * as RoomUtil  from '../../js/room/roomUtil';
import * as ScheduleUtil from '../../js/schedule/schedule-util';
import './List.scss';
import Item from './Item';
import { connect } from 'react-redux';
import { getCurrentUser } from '../../js/user/userUtil';
import  {showTasks as showTasksAction, showRooms as showRoomsAction} from '../../Store/Actions/schedule-action';

const mapDispatchToProps=(dispatch)=>{
  return{
    showTasks:(data) => dispatch(showTasksAction(data)),
    showRooms:(data) => dispatch(showRoomsAction(data))
  }
}
const mapStateToProps =  ({scheduleReducer}) =>{
  console.log(scheduleReducer);
  const rooms=[...scheduleReducer.rooms];
  const tasks=[...scheduleReducer.currentRoomTasks];
  console.log({rooms})
  console.log({rooms:[...scheduleReducer.rooms]});
  const currentRoom={...scheduleReducer.currentRoom};
  console.log({currentRoom})
  // console.log({rooms:[...scheduleReducer.rooms]});
  return {rooms,tasks,currentRoom:currentRoom}
}




class ListComponent extends React.Component {


  async componentDidMount (){
    let data=[];
    if(this.props.type==='ROOMS'){
      const rooms = await RoomUtil.getRoomsForUser();
      data = await rooms.json();
      console.log(data);
      this.props.showRooms({rooms:data});
    }
    
  }

  render() {
    let items;
    if(this.props.type==="ROOMS"){
      items= this.props.rooms;
    }
    else {
      items= this.props.items;
    }
    
    const rooms = items.map((c,i) => (
      <li key={i} >
        <Item   clickHandler={this.props.clickHandler} removeHandler={this.props.removeHandler} type={this.props.type} item={c}>
        </Item>
      </li>))
    const message= (<span className='init-msg'>{this.props.message}</span>);
    return (
        <div className='room-list-container'>
          { this.props.addHandler?<button onClick={this.props.addHandler} className='add-task-btn'>Add</button>:''}
          { this.props.closeHandler?<button onClick={this.props.closeHandler} className='close-tasks-btn'>Close</button>:''}
          <span className='list-title'>{this.props.title}</span>
          <ul className='list-container'>
            {items.length===0?this.props.children:rooms}
          </ul>
        </div>
    );
  }
}

const List = connect(mapStateToProps,mapDispatchToProps)(ListComponent);
export default List;
