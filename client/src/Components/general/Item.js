import React from 'react';
import { connect } from 'react-redux';
import './Item.scss';
import  {showTasks as showTasksAction, showTask as showTaskAction} from '../../Store/Actions/schedule-action';
import { getCurrentUser } from '../../js/user/userUtil';
const mapDispatchToProps=(dispatch)=>{
  return{
    showTasks:(room) => dispatch(showTasksAction(room)),
    showTask:(room) => dispatch(showTaskAction(room))
  }
}
const mapStateToProps =  ({scheduleReducer}) =>{
  const rooms=[...scheduleReducer.rooms];
  const tasks=[...scheduleReducer.currentRoomTasks];
  const currentRoom={...scheduleReducer.currentRoom};
  const currentSelectedTask = scheduleReducer.currentSelectedTask;
  return {rooms,tasks,currentRoom:currentRoom,currentSelectedTask:currentSelectedTask}
}

class ItemComponent extends React.Component {
  deleteTask = async (event) =>{
    event.preventDefault();
    event.stopPropagation();
    this.props.removeHandler(this.props.item);
  }
  clickAction= event =>{
    event.preventDefault();
    this.props.clickHandler(this.props.type,this.props.item);
  }
  render() {
    let name, additionalInfo;
    if(this.props.type==='ROOMS'){
      name=this.props.item.room_name;
      additionalInfo= `${this.props.item.users.length} people`;
    }
    else if(this.props.type==="TASKS"){
      name=this.props.item.name;
      additionalInfo= `${this.props.item.users.length} people  - current turn: ${this.props.item.current_turn}`
    }else if(this.props.type==="TODO"){
      name=this.props.item.title;
      additionalInfo= `${this.props.item.status?"Completed":"Pending"} task`
    }
    const user =getCurrentUser();
    return (
      <div className='room-wrapper' onClick={this.clickAction}>
        <label>{name}</label>
        
        {((this.props.type==='TASKS' && user.username===this.props.item.created_by) || this.props.type==='TODO')?
        <span className="delete-icon" onClick={this.deleteTask.bind(this)}><img src="/delete24dp.svg"></img></span>:''}

        <label className='info-el'>{additionalInfo}</label>
      </div>  
    );
  }
}
const Item = connect(mapStateToProps,mapDispatchToProps)(ItemComponent);
export default Item;
