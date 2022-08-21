import React, { Component } from 'react';
import CardList from './CardList';
import NewRoomForm from './NewRoomForm';
import SearchBox from './SearchBox';
import Scroll from './Scroll';
import './rooms.scss';
import * as RoomUtil from './../../js/room/roomUtil';
import Container from './../Container';
import ScheduleWrapper from '../schedule-management/schedule-wrapper';


class  RoomManagement extends Component{
    constructor(){
        super();
        //parent passes the state to different child components
        // state can change and affects our App and is in our parent Component 
        this.state  = {
            rooms: [],
            searchfield:'',
            showform:false,
            
            currentRoom:{},
            type:'add'
          //  createroom:''
            
        }
        this.createNewForm = React.createRef();
        //this.createRoom=this.createRoom.bind(this);
        console.log("ctt");
    }
   async componentDidMount(){
       const rooms1 = await RoomUtil.getRoomsForUser();
       const data = await rooms1.json();
       this.setState( {rooms: data});  
              
        
      }

    //on search chnage I get an event
    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value})
        
    }

    // create New Room 
    async createRoom(room){

            const resp = await RoomUtil.createRoom({room_name:room.name,users:room.users});
            if(resp.status >399 && resp.status<500){
              return resp
            }
            const rooms = await RoomUtil.getRoomsForUser();
            const data = await rooms.json();
            // this.setState( {rooms: data,showform:false}); 
            return data

    }

    async updateRoom(room){
        await RoomUtil.updateRoom( {room_name:room.name,users:room.users},this.state.currentRoom.room_name);
        const rooms = await RoomUtil.getRoomsForUser();
            const data = await rooms.json();
            this.setState( {rooms: data,showform:false}); 
    }
    showAddForm(){
        this.setState({showform:true,type:'add'})
    }

    showRoomHandler(room){
    //    await  RoomUtil.updateRoom(room.name,{room_name:room.name,users:room.users})
        this.setState({showform:true,type:'update',
        currentRoom:room})
        // this.createNewForm.current.setItemState({room});
    }
    
    async closeHandler(updateData){
      if(updateData){
        const rooms1 = await RoomUtil.getRoomsForUser();
        const data = await rooms1.json();
        this.setState( {rooms: data,showform:false,searchfield:''});  
      }
      else{
        this.setState({showform:false,searchfield:''})
      }
    }
    async deleteHandler(room){
      await RoomUtil.deleteRoom(this.state.currentRoom.room_name);
      const rooms1 = await RoomUtil.getRoomsForUser();
      const data = await rooms1.json();
      this.setState( {rooms: data,showform:false,currentRoom:{}});  

    }
    // hideAddForm(){
    //     this.setState({showform:false})
    // }
    render(){
        //filter rooms and iterate thru each room
        const {rooms,searchfield}=this.state;

        const filteredRooms= rooms.filter( room => {
            return room.room_name.toLowerCase().includes(searchfield.toLowerCase());
        })
        return(
      <Container title={this.props.title}>
        <div class="container-children">
           <div className='child-1 tc'>
              <h1 className='f1'>Manage Rooms</h1>
            {!this.state.showform?(
              <React.Fragment>
              {this.state.rooms.length>0?(<SearchBox searchChange={this.onSearchChange}/>):('')}
              <input type='submit' class='new-room-btn' value='Create New Room' onClick={this.showAddForm.bind(this)}/>
              <Scroll>
                  <CardList  showRoomHandler={this.showRoomHandler.bind(this)} rooms={filteredRooms}/>
              </Scroll>
              </React.Fragment>):(<NewRoomForm ref ={this.createNewForm} deleteHandler={this.deleteHandler.bind(this)} closeHandler={this.closeHandler.bind(this)} currentRoom={this.state.currentRoom} type={this.state.type} updateRoom={this.updateRoom.bind(this)} createRoom={this.createRoom.bind(this)} />)
            }
            
          </div> 
        </div>
      </Container>
    );
    }
}

export default RoomManagement;