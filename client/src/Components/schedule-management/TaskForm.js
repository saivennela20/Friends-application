import React from "react";
import { connect } from "react-redux";
import './TaskForm.scss';
import { addTask as addTaskAction, 
  updateTask as updateTaskAction,
  showTask as showTaskAction, 
  updateFormData as updateFormDataAction } from './../../Store/Actions/schedule-action';
import User from "../general/User";
import * as userUtil from './../../js/user/userUtil';
import * as ScheduleUtil  from './../../js/schedule/schedule-util';

// const mapDispatchToProps=(dispatch)=>{
//   return{
//     addTask:(data) => dispatch(addTaskAction(data)),
//     showTask:(data) => dispatch(showTaskAction(data)),
//     updateTask:(data) => dispatch(updateTaskAction(data)),
//     updateFormData:(data) => dispatch(updateFormDataAction(data))
//   }
// }
// const mapStateToProps =  ({scheduleReducer}) =>{
//   const currentSelectedTask=scheduleReducer.currentSelectedTask;
//   return {currentSelectedTask:currentSelectedTask}
// }
const validateEmail = async (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
const validation = ({ error, ...rest }) => {
  let checkValidation = false;
  Object.values(error).forEach(val => {
      if (val.length > 0) {
          checkValidation = false
      } else {
          checkValidation = true
      }
  });
  Object.values(rest).forEach(val => {
      if (val === null) {
          checkValidation = false
      } else {
          checkValidation = true
      }
  });
  return checkValidation;
};

//form to add/update the todo item
 class TaskFromComponent extends React.Component {
  

  constructor(props){
    super(props);
    this.state={
      id:'',
      name:'',
      users:[],
      allowedUsers:[],
      addUsers:[],
      removeUsers:[],
      addUserState:'',
      current_turn:'',
      created_by:'',
      error:{
        name:'',
        addUserState:'',
        current_turn:'',
      }
    
    }
  }
  
  componentDidMount(){
    if(this.props.allowedUsers){
      this.setState({allowedUsers:[...this.props.allowedUsers]});
    }
  }

  updateState(currentTask){
    this.setState(Object.assign({},this.state,currentTask))
  }

/** 
 * to call update/add the item based
 * item is taken from the state object
 * @param {JSON} event - to prevent the default 
 */
    onFormSubmit = event => {
        event.preventDefault();
        if (validation(this.state)) {
            console.log(this.state)
        } else {
            console.log("Error occured");
        }
        this.props.addTask?this.props.addTask(this.state):this.props.updateTask(this.state);
    };

/** 
 * Function called on each input changes and update the error object in state
 * @param {JSON} event - to prevent the default 
 * input element is taken from event.target
 */
    formObject = async event => {
        event.preventDefault();
        let { name, value } = event.target;
        let error = { ...this.state.error };

        switch (name) {
            case "title":
                error.name = value.length < 5 ? "Name should be 5 characters long" : "";
                break;
            case "addUserState":
              value = value.toLowerCase();
              if(this.state.users.indexOf(value)>-1){
                error.addUserState='User already in Queue';
              } 
              else if(!await validateEmail(value)){
                error.addUserState ='Invalid Email ';
              }
              else if(this.state.allowedUsers.indexOf(value)<0)
              {
                error.addUserState ='User Not in room ';
              }
              else{
                error.addUserState='';
              }
            break;
            case "current_turn":
              if(value.length<0)    {
                error.current_turn="current_turn required";  
              }
              else if(!await validateEmail(value)){
                error.current_turn ='Invalid Email ';
              } 
              else if(this.state.users.indexOf(value)<0)
              {
                error.current_turn ='User not in Queue ';
              }
              else{
                error.current_turn='';
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

    /**
     * function to display the item for update
     * @param {Item} item  to do item to show for update
     */
    setItemState(item){
      let tempState =
      {
        id:item.id,
        _id:item._id,
        name:item.name,
        allowedUsers:item.allowedUsers,
        users:item.users,
        created_by:item.created_by,
        current_turn:item.current_turn,
        id:item.id
      }
        this.setState(tempState);
    }
  
    closeTaskForm = event =>{
      event.preventDefault();
      this.props.closeHandler();
    }

    markComplete = async event =>{
      event.preventDefault();
      let idx =this.state.users.indexOf(userUtil.getCurrentUsername());
      idx+=1;
      if(idx>=this.state.users.length){
        idx-=this.state.users.length;
      }
      const config={};
      config.current_turn=this.state.users[idx];
      config._id = this.state._id
      this.setState(config);
      // this.props.updateTask(config);
    }
    deleteUser = (user) =>{
      const removedUsers = [...this.state.removeUsers,user];
      const users = [...this.state.users];
      const idx = users.indexOf(user);
      let current_turn = this.state.current_turn;
      if(current_turn===user){
        let temp_idx = idx+1;
        if(temp_idx>=users.length){
          temp_idx-=users.length;
        }
        current_turn = users[temp_idx];
      }
      users.splice(idx,1);
      
      this.setState({users:users,current_turn:current_turn,removeUsers:removedUsers})
    }

    addUser = event =>{
      event.preventDefault();
      event.stopPropagation();
      if(this.state.error.addUserState.length!==0){
        return;
      }
      if(this.state.addUserState ===''){
        this.state.error.addUserState='Invalid Email'
        this.setState(this.state);
        return;
      }
      
      const addedUsers = [...this.state.addUsers,this.state.addUserState];
      const users = [...this.state.users,this.state.addUserState];
      const config={users:users,addUsers:addedUsers};
      if(this.state.current_turn.length===0){
        config.current_turn=users[0];
      }
      this.setState(config);
      event.target.previousElementSibling.value='';
    }
    
    componentDidUpdate(){
      const current_turn_el = document.getElementById('current_turn');
      const task_name_el = document.getElementById('task-name');
      const current_user = userUtil.getCurrentUsername();
      const enableEditing = (current_user === this.state.created_by || this.props.addTask)
      if(enableEditing){
        current_turn_el.removeAttribute('disabled')
        task_name_el.removeAttribute('disabled')
      }
      else{
        current_turn_el.setAttribute('disabled',true);
        task_name_el.setAttribute('disabled',true);
      }
    }
    render() {
        const { error } = this.state;
        const containerClassName=this.props.hideForm?'hide':'form-container'
        const current_user = userUtil.getCurrentUsername();
        const enableEditing = (current_user === this.state.created_by || this.props.addTask)
        const users = this.state.users.map((c,i)=>(<li key={i}>
          {enableEditing?(<User name={c} removeUserHandler={this.deleteUser.bind(this)}></User>):
          (<User name={c} ></User>)}
          </li>))
        return (
            <div className={containerClassName}>
                <div>
                    <button className="close-btn" onClick={this.closeTaskForm.bind(this)}>Close</button>
                    <form  onSubmit={this.onFormSubmit}>
                        <div className="form-group">
                            <label>Title</label>
                            <input 
                            id="task-name"
                               required
                               type="text" 
                               name="name"
                               value={this.state.name}
                               placeholder="Title"
                               onChange={this.formObject}
                               className={error.name.length > 0 ? "is-invalid form-control" : "form-control"}/>
                                {error.name.length > 0 && (
                                <span className="invalid-feedback">{error.name}</span>
                                )}
                        </div>

                        <div className="form-group ">
                            <label >Users</label>
                            <ol className="user-display-container">
                              {users}
                            </ol>
                            {(enableEditing)?(
                            <React.Fragment>
                            {/* <label >Add Users</label> */}
                            <input
                                type="text"
                                name="addUserState"
                                placeholder="Add Users"
                                className= "form-control"
                                onChange={this.formObject}
                                />
                                {error.addUserState.length > 0 && (
                                <span className="invalid-feedback">{error.addUserState}</span>
                                )}
                                <button className="add-user-btn"  onClick={this.addUser.bind(this)}> Add </button>
                              </React.Fragment>) :('')     }
                        </div>

                        

                        <div className="form-group current-turn">
                            <label >Current Turn</label>
                            <input
                                
                                id="current_turn"
                                required
                                type="text"
                                name="current_turn"
                                value={this.state.current_turn}
                                className="form-control "
                                onChange={this.formObject}/>
                                {error.current_turn.length > 0 && (
                                <span className="invalid-feedback">{error.current_turn}</span>
                                )}
                                {current_user===this.state.current_turn && !this.props.addTask && error.current_turn.length<1?(
                              <React.Fragment>
                                <button className="mark-complete-btn"  onClick={this.markComplete.bind(this)}> Mark<br/> Complete </button>
                              </React.Fragment>):''}
                        </div>
{this.props.addTask?(''):
                        <div className="form-group created-by">
                            <label >Created By</label>
                            <input
                                disabled
                                required
                                type="text"
                                name="created_by"
                                value={this.state.created_by}
                                className="form-control"/>
                        </div>}
                        

                        <div >
                            <button type="submit" className="btn">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    } 
}

// const TaskFrom = connect(mapStateToProps,mapDispatchToProps)(TaskFromComponent);
export default TaskFromComponent;