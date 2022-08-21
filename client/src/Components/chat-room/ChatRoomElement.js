import React from "react"




class ChatRoomElement extends React.Component {
    selectElement = event =>{
        event.stopPropagation();
        this.props.selectHandler(this.props.room)
    }


    render () {
        return (
            <div className="rooms-element"
                onClick={this.selectElement.bind(this)}>
                {this.props.room.room_name}
            </div>
        )
    }
}

export default ChatRoomElement