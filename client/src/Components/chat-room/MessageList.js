import React, { Component } from "react";
import Message from './Message';
import ReactDOM from 'react-dom';
// const dummy_data =[
//     {
//         senderId: 'bowbow',
//         text:'heyy,im great,whats up with you ?'
//     },
//     {
//         senderId: 'peekaboo',
//         text:'amazing here ,good to hear from you ?'
//     },
// ]

class MessageList extends React.Component {
    
    componentWillUpdate() {
        const node = ReactDOM.findDOMNode(this)
        this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight
    }   
    componentDidUpdate() {
        if(this.shouldScrollToBottom){
           const node= ReactDOM.findDOMNode(this)
           node.scrollTop=node.scrollHeight
        }
      
    }   
    render(){
      const messages= this.props.messages.map((message, index)=> {
        return <Message key={index} user={message.username} text={message.message} /> 
    })
        return(
            <div className="message-list">
                {this.props.messages.length>0?messages:<span className='message-info'>No Messages in the Group yet</span>}
            </div>
        )
}
}
export default MessageList;