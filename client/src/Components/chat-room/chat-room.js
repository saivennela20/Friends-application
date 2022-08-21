import React from 'react';
import * as chatUtil  from './../../js/chat/chatUtil';
import * as roomUtil from './../../js/room/roomUtil';
import Container from './../Container';
import ScheduleWrapper from '../schedule-management/schedule-wrapper';
//import Message from './Message';
import MessageList from './MessageList';
import RoomList from './RoomList';
import SendMessageForm from './SendMessageForm';
import './style.scss';
class ChatRoom extends React.Component {
  
  constructor() {
      super()
      this.state={
          roomId:null,
          currentRoom: {},
        //   joinableRooms:[],
          joinedRooms:[],
          messages:[],
    }
    
  }


  async componentDidMount(){
    const resp = await roomUtil.getRoomsForUser();
    const data = await resp.json();
    this.setState({joinedRooms:data});
  }

  async sendMessage(text) {
    await chatUtil.sendMessage(this.props.roomId,{message:this.state.message});
      this.setState((state) => state.messages.push({ senderId: 'bowbow', text }));
  }

  async selectHandler(room){
    const resp = await chatUtil.getAllMessage(room.room_name);
    const data = await resp.json();
    this.setState({currentRoom:room,messages:data.messages});
  }

  async sendMessage(message){
    const resp = await chatUtil.sendMessage(this.state.currentRoom.room_name,{message:message});
    const data = await resp.json();
    this.setState({messages:data.messages});
  }

  render() {
    return (
      <Container title={this.props.title}>
        <ScheduleWrapper>
            <RoomList
                  roomId={this.state.roomId}
                  selectHandler={this.selectHandler.bind(this)}
                  rooms={[...this.state.joinedRooms]}
                  currentRoom={this.state.currentRoom} />
              {(this.state.currentRoom!=={} && Object.keys(this.state.currentRoom).length!==0)?
              <><MessageList
                  currentRoom={this.state.currentRoom}
                  messages={this.state.messages} />
              <SendMessageForm
                  roomId={this.state.roomId}
                  sendMessage={this.sendMessage.bind(this)}
                />)
                </>:('')}
        </ScheduleWrapper>
      </Container>

    );
  }
}
export default ChatRoom;
