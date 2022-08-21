import React from 'react';
import Container from '../Container';
import List from '../general/List';
import TodoItemForm from './TodoItemForm';
import ScheduleWrapper from './../schedule-management/schedule-wrapper';
import * as todoUtil from './../../js/todo/todoUtil';
class TodoListManagement extends React.Component {


  constructor(props){
    
    super(props);
    this.state={
      rooms:[],
      selectedRoom:{},
      selectedItem:{},
      currentRoomItems:[],
      showAddForm:false
    }

    this.todoForm= React.createRef()
  }


  async showItemsDialog(type,room){
    const resp = await todoUtil.getItemsForRoom(room.room_name);
    const data = await resp.json();
    this.setState({selectedRoom:room,currentRoomItems:[...data.todolist]});
  }

  closeItemsDialog(){
    this.setState({selectedRoom:{},selectedItem:{},showAddForm:false})
  }

  showAddItemDialog(){
    this.setState({selectedItem:{},showAddForm:true})
  }

  showItem(type,item){
    // this.todoForm.current.setItemState(item)
    this.setState({selectedItem:item});
  }

  async removeItemHandler(item){
    await todoUtil.deleteTask(this.state.selectedRoom.room_name,item.title);
    const resp = await todoUtil.getItemsForRoom(this.state.selectedRoom.room_name);
    const data = await resp.json();
    this.setState({currentRoomItems:[...data.todolist],selectedItem:{}});
  }

  closeUpdateItemDialog(){
    this.closeAddItemDialog();
    this.setState({selectedItem:{}})
  }

  async updateItemHandler(item){
    const {title,date,description,status,time}=item;
    const resp = await todoUtil.updateTodoItem(this.state.selectedRoom.room_name,this.state.selectedItem.title,{title,date,description,status,time})
    const data = await resp.json();
    this.setState({currentRoomItems:data.todolist,showAddForm:false,selectedItem:{}})
  }
  closeAddItemDialog(){
    this.setState({showAddForm:false});
  }

  async addItemHandler(item){
    const {title,date,description,status,time}=item;
    const resp = await todoUtil.addTodoItem(this.state.selectedRoom.room_name,{title,date,description,status,time})
    const data = await resp.json();
    this.setState({currentRoomItems:data.todolist,showAddForm:false})
  }
  render() {
    return (
      <Container selectedTab={this.props.selectedTab} title={this.props.title}>
        <ScheduleWrapper>
          <List type='ROOMS'
            title='Rooms'
            items={this.state.rooms}
            clickHandler={this.showItemsDialog.bind(this)} >
            <span className='init-msg'>
              No Rooms,<br /> add one from Room Section
            </span>
          </List>


          {(this.state.selectedRoom.room_name && this.state.selectedRoom.room_name !== '' && this.state.selectedRoom.room_name !== null) ?
            <List type='TODO'
              title='Todo Tasks'
              items={this.state.currentRoomItems}
              closeHandler={this.closeItemsDialog.bind(this)}
              addHandler={this.showAddItemDialog.bind(this)}
              removeHandler={this.removeItemHandler.bind(this)}
              clickHandler={this.showItem.bind(this)} >
              <span className='init-msg'>
                No todo tasks,<br /> add one by clicking on the add button
              </span>
            </List> : ''
          }

          {(this.state.selectedItem && Object.keys(this.state.selectedItem).length !== 0 && this.state.selectedItem !== null) ?
            <TodoItemForm ref={this.todoForm}
              currentRoom={this.state.selectedRoom.room_name}
              closeHandler={this.closeUpdateItemDialog.bind(this)}
              updateItemHandler={this.updateItemHandler.bind(this)}
              selectedItem={this.state.selectedItem} >
            </TodoItemForm> :


            (this.state.showAddForm) ?
              <TodoItemForm closeHandler={this.closeAddItemDialog.bind(this)} addItemHandler={this.addItemHandler.bind(this)} ></TodoItemForm> : ''
          }


        </ScheduleWrapper>
      </Container>
    );
  }
}
export default TodoListManagement;
