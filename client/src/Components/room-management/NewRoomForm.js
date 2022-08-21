import React, { Component } from 'react'
import User from '../general/User';
import './rooms.scss';
import * as userUtil from './../../js/user/userUtil';



const validateEmail = async (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
class NewRoomForm extends Component{

    constructor(){
        super()
        this.state={
            name:'',
            users:[],
            created_by:'',
            addUserInput:'',
            error:{
                name:'',
                addUserInput:'',
                message:''
            }
        }

        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState(
            {
                room_name:e.target.value
            })

    }

   async handleSubmit(e){
       e.preventDefault();
       const resp = this.props.type==='add'?await this.props.createRoom(this.state):await this.props.updateRoom(this.state);
       const data = await resp.json();
       if(data.error) {
         if(data.error==="ROOM_ALREADY_EXISTS"){
          this.state.error.message="Room already exists";
         }
        this.setState({error:this.state.error})
       }
       else{
        this.props.closeHandler(true);
       }
       
    }

    setItemState(item){
        this.setState(
        {
          id:item.id,
          _id:item._id,
          created_by:item.created_by,
          name:item.room_name,
          users:item.users
        });
      }

      removeHandler(name){
          let idx = this.state.users.indexOf(name);
          this.state.users.splice(idx,1);
          this.setState({users:this.state.users});
      }

      formObject = async event => {
        event.preventDefault();
        let { name, value } = event.target;
        let error = { ...this.state.error };

        switch (name) {
            case "room_name":
                error.name = value.length < 5 ? "Name should be 5 characters long" : "";
                break;
            case "addUserInput":
              value = value.toLowerCase();
                if(!await validateEmail(value)){
                error.addUserInput ='Invalid Email ';
              }else if(this.state.users.indexOf(value)>-1){
                error.addUserInput ='User already in room';
              }
              else{
                error.addUserInput='';
              }
            break;
            default:
                break;
        }

        this.setState({
            error,
            [name]: value
        })
    };

      addHandler= event => {
          event.preventDefault();
          event.stopPropagation()
          let users = [...this.state.users,this.state.addUserInput]
          this.setState({users:users,addUserInput:''})
      }

      componentDidMount(){
        if(this.props.type==='update'){
            this.setItemState(this.props.currentRoom);
        }
        let enableEditing = this.props.type==='add' || this.state.created_by===userUtil.getCurrentUser().username;
        let el = document.getElementById('room-name');
        if(!enableEditing){
          el.setAttribute('disabled',true);
        }

      }

      closeHandler=(event)=>{
        event.stopPropagation();
        this.props.closeHandler();
      }

      deleteHandler = (event)=>{
        event.stopPropagation();
        this.props.deleteHandler(this.state);
      }
    render() {
        const { error } = this.state;
        let enableEditing = this.props.type==='add' || this.state.created_by===userUtil.getCurrentUser().username;

       let users= this.state.users.map((c,i) => 
       
       <li className="user-el" key={i}>
         {enableEditing?
         <User name={c} removeUserHandler={this.removeHandler.bind(this)}></User>
    :
      <User name={c} ></User>
    }
         </li>)
       
       
        return (
            <div className="room-container" >
                
                <form className="form-container" onSubmit={this.handleSubmit.bind(this)}>
                <span className="close-btn" onClick={this.closeHandler.bind(this)}>Close</span>
                 <div className="form-group">
                            <label className="form-label-el">Title</label>
                            <input 
                            id="room-name"
                            required={enableEditing?"true":"false"}
                               type="text" 
                               name="name"
                               value={this.state.name}
                               placeholder="Title"
                               onChange={this.formObject.bind(this)}
                               className={error.name.length > 0 ? "is-invalid form-control" : "form-control"}/>
                                {error.name.length > 0 && (
                                <span className="invalid-feedback">{error.name}</span>
                                )}
                        </div>

                        <div className="form-group ">
                            <label className="form-label-el" >Users</label>
                            <ol className="user-display-container">
                              {users}
                            </ol>
                            {(enableEditing)?(
                            <React.Fragment>
                            <input
                                type="text"
                                name="addUserInput"
                                placeholder="Add Users"
                                className= "form-control"
                                value={this.state.addUserInput}
                                onChange={this.formObject.bind(this)}
                                />
                                {error.addUserInput.length > 0 && (
                                <span className="invalid-feedback">{error.addUserInput}</span>
                                )}
                                <button className="add-user-btn"  onClick={this.addHandler.bind(this)}> Add </button>
                              </React.Fragment>) :('')     }
                        </div>
                      {this.props.type==='update'?
                        <div className="form-group">
                            <label className="form-label-el">Created by</label>
                            <input 
                              disabled
                               type="text" 
                               name="created_by"
                               value={this.state.created_by}
                               placeholder="Created By"
                               />
                        </div>:('')}
                  {enableEditing?  
                  <>
                    {error.message.length > 0 && (
                      <span className="room-create-msg invalid-feedback">{error.message}</span>
                    )}
                    <button className="submit-btn" type='submit'> Submit</button>
                    {this.props.type==='add'?(''):(<button className="delete-btn" onClick={this.deleteHandler.bind(this)}> Delete</button>)}
                  </>
                  :('')}
                </form> 
            </div>
        );
    }
}
export default NewRoomForm;
