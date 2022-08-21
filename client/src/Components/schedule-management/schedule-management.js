import React from 'react';
import Container from '../Container';
import List from '../general/List';
import { connect } from 'react-redux';
import TaskFrom from './TaskForm';
import {
  addTask as addTaskAction,
  updateTask as updateTaskAction,
  showTask as showTaskAction,
  showTasks as showTasksAction,
  updateFormData as updateFormDataAction
} from './../../Store/Actions/schedule-action';
import * as ScheduleUtil from './../../js/schedule/schedule-util';
import ScheduleWrapper from './schedule-wrapper';
import * as userUtil from './../../js/user/userUtil';
const mapStateToProps = ({ scheduleReducer }) => {
  console.log(scheduleReducer);
  const currentRoom = scheduleReducer.currentRoom;
  const currentRoomTasks = scheduleReducer.currentRoomTasks;
  console.log({ currentRoom })
  const currentSelectedTask = scheduleReducer.currentSelectedTask
  // console.log({rooms:[...scheduleReducer.rooms]});
  return { currentRoom: currentRoom, currentSelectedTask: currentSelectedTask, currentRoomTasks: currentRoomTasks }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTask: (data) => dispatch(addTaskAction(data)),
    showTask: (data) => dispatch(showTaskAction(data)),
    updateTask: (data) => dispatch(updateTaskAction(data)),
    updateFormData: (data) => dispatch(updateFormDataAction(data)),
    showTasks: (data) => dispatch(showTasksAction(data))
  }
}
class ScheduleComponent extends React.Component {

  // constructor(props){
  //   super(props);
  // }

  constructor(props) {
    super(props);
    this.state = {
      showAddDialog: false
    }
    this.taskForm = React.createRef();
    this.addTaskForm = React.createRef();
  }
  clickAction = async (type, item) => {
    if (type === 'ROOMS') {
      const tasks = await ScheduleUtil.getTasksForRoom(item.room_name);
      const data = await tasks.json();
      this.setState({ showAddDialog: false });
      this.props.showTasks({ room: item, tasks: data.tasks, currentSelectedTask: {} });
    }
    else if (type === 'TASKS') {
      const rooms = await ScheduleUtil.getTask(this.props.currentRoom.room_name, item.name);
      const data = await rooms.json();
      this.setState({ showAddDialog: false,currentSelectedTask:item });
      this.props.showTask({ task: data });
    }
  }

  componentDidUpdate() {
    const temp = (this.taskForm && this.taskForm.current) ? this.taskForm.current.updateState(Object.assign({},this.props.currentSelectedTask,{allowedUsers:[...this.props.currentRoom.users]})) : '';
  }

  async removeItemHandler(item) {
    const resp = await ScheduleUtil.deleteTask(this.props.currentRoom.room_name, item.name);
    const tasks = await ScheduleUtil.getTasksForRoom(this.props.currentRoom.room_name);
    const data = await tasks.json();
    this.props.showTasks({ room: this.props.currentRoom,tasks: data.tasks, currentSelectedTask: {} });
    this.closeTaskDialog()
  }

  showAddTaskDialog() {
    this.taskForm.current && this.taskForm.current.updateState({
      id: '',
      _id: '',
      name: '',
      users: [],
      addUsers: [],
      removeUsers: [],
      allowedUsers:[...this.props.currentSelectedTask.users],
      addUserState: '',
      current_turn: '',
      created_by: '',
      error: {
        name: '',
        addUserState: '',
        current_turn: '',
      }

    });
    this.closeTaskDialog();
    this.props.showTask({ task: {} });
    this.setState({ showAddDialog: true })
  }
  async updateTask(taskData) {
    console.log(userUtil.getCurrentUsername());
    let state ;
    let markComplete = false;
    if (taskData.created_by !== userUtil.getCurrentUsername()) {
      let {id,_id,current_turn}=taskData;
      state={id,_id,current_turn};
      markComplete = true
    }
    else{
      state = taskData;
    }
    // let state = taskData;
    let oldTask = null;
    for (let i = 0; i < this.props.currentRoomTasks.length; i++) {
      if (state._id === this.props.currentRoomTasks[i]._id) {
        oldTask = this.props.currentRoomTasks[i];
        break;
      }
    }
    let config = {};

    if (!markComplete && state.current_turn !== oldTask.current_turn) {
      config.current_turn = state.current_turn;
    }
    if (!markComplete && state.name !== oldTask.name) {
      config.name = state.name;
    }
    if (!markComplete && state.users) {
      for (let i = 0; i < state.addUsers.length; i++) {
        if (state.users.indexOf(state.addUsers[i]) < 0) {
          state.users.push(state.addUsers[i])
        }
      }

      for (let i = 0; i < state.removeUsers.length; i++) {
        if (state.users.indexOf(state.removeUsers[i]) > -1) {
          state.users.splice(state.users.indexOf(state.removeUsers[i]), 1);
        }
      }

      if (state.users.length !== oldTask.users.length) {
        config.users = state.users;
      }
      else {
        let changed = false;
        for (let i = 0; i < state.users.length; i++) {
          if (state.users[i] !== oldTask.users[i]) {
            changed = true;
            break;
          }
        }
        if (changed) {
          config.users = state.users;
        }
      }
    }


    const tasks = await ScheduleUtil.updateTask(this.props.currentRoom.room_name, oldTask.name, { task: config });
    const data = await tasks.json();
    console.log({ "data after adding": data });

    this.props.showTasks({ room: this.props.currentRoom, tasks: data.tasks, currentSelectedTask: {} });
    this.closeTaskDialog()

  }

  async addTask(state) {
    state.created_by = userUtil.getCurrentUsername();
    state.current_turn = state.current_turn === '' ? state.users[0] : state.current_turn;
    for (let i = 0; i < state.addUsers.length; i++) {
      if (state.users.indexOf(state.addUsers[i]) < 0) {
        state.users.push(state.addUsers[i])
      }
    }

    for (let i = 0; i < state.removeUsers.length; i++) {
      if (state.users.indexOf(state.removeUsers[i]) > -1) {
        state.users.splice(state.users.indexOf(state.removeUsers[i]), 1);
      }
    }


    const tasks = await ScheduleUtil.addTask(this.props.currentRoom.room_name, { task: { name: state.name, users: state.users, created_by: state.created_by, current_turn: state.current_turn } });
    const data = await tasks.json();
    console.log({ "data after adding": data });

    this.props.showTasks({ room: this.props.currentRoom, tasks: data.tasks, currentSelectedTask: {} });
    this.closeTaskDialog()

  }
  closeTasksDialog() {
    this.props.showTasks({ room: {}, tasks: [], currentSelectedTask: {} });
  }

  closeTaskDialog() {
    this.props.showTask({ task: {} });
    this.setState({ showAddDialog: false })
  }

  closeAddTaskDialog() {
    this.setState({ showAddDialog: false });
  }


  render() {
    return (
      <Container selectedTab={this.props.selectedTab} title={this.props.title}>
        <ScheduleWrapper>
          <List type='ROOMS'
            title='Rooms'
            items={this.props.rooms}
            clickHandler={this.clickAction.bind(this)} >
            <span className='init-msg'>
              No Rooms,<br /> add one from Room Section
            </span>
          </List>


          {(this.props.currentRoom.room_name && this.props.currentRoom.room_name !== '' && this.props.currentRoom.room_name !== null) ?
            <List type='TASKS'
              title='Tasks'
              items={this.props.currentRoomTasks}
              closeHandler={this.closeTasksDialog.bind(this)}
              addHandler={this.showAddTaskDialog.bind(this)}
              removeHandler={this.removeItemHandler.bind(this)}
              clickHandler={this.clickAction.bind(this)} >
              <span className='init-msg'>
                No Tasks,<br /> add one by clicking on the add button
              </span>
            </List> : ''
          }

          {(this.props.currentSelectedTask && Object.keys(this.props.currentSelectedTask).length !== 0 && this.props.currentSelectedTask !== null) ?
            <TaskFrom ref={this.taskForm}
              type='TASKS'
              currentRoom={this.props.currentRoom.room_name}
              closeHandler={this.closeTaskDialog.bind(this)}
              updateTask={this.updateTask.bind(this)}
              currentSelectedTask={this.props.currentSelectedTask} >
            </TaskFrom> :


            (this.state.showAddDialog) ?
              <TaskFrom allowedUsers={this.props.currentRoom.users} closeHandler={this.closeAddTaskDialog.bind(this)} addTask={this.addTask.bind(this)} ></TaskFrom> : ''
          }


        </ScheduleWrapper>
      </Container>
    );
  }
}

const Schedule = connect(mapStateToProps, mapDispatchToProps)(ScheduleComponent);
export default Schedule;
