
import React from 'react'

class SendMessageForm extends React.Component {
    constructor() {
        super();
        this.state = {
            message: ''
        };
    }
    
    handleChange(e) {
        this.setState({
            message: e.target.value
        });
    }
    
     handleSubmit (e) {
        e.preventDefault();
        this.props.sendMessage(this.state.message);
        this.setState({
            message: ''
        })
    }
    
    render() {
        return (
            <form className="send-message-form" onSubmit={this.handleSubmit.bind(this)}>
                <input
                    placeholder="Type message and hit ENTER" type="text"
                    onChange={this.handleChange.bind(this)}
                    value={this.state.message}
                    disabled={this.props.disabled} />
            </form>
        )
    }
}

export default SendMessageForm