import React from "react"
import ChatRoomElement from "./ChatRoomElement";

class RoomList extends React.Component {
    render () {
        const orderedRooms= [...this.props.rooms].sort((a,b)=>a.id-b.id)
        return (
            <div className="rooms-list">
                <ul>
                <h3>Your rooms:</h3>
                    {orderedRooms.map(room => {
                        const active= (this.props.currentRoom && (this.props.currentRoom.room_name===room.room_name)) ? "active":"";
                        return (
                            <li key={room.room_name} className={"room" + active}>
                                <ChatRoomElement 
                                room={room}
                                selectHandler={this.props.selectHandler}
                                />
                                
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default RoomList