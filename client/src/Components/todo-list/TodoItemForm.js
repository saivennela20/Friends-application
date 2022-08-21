import React from "react";
import './TodoItemForm.scss'
const regularExpression = RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)

/**
 * Validate the input values and error elements
 * @param {JSON} error - object which contain error values
 * @param {JSON} rest - object which contain values of the form
 */
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
export default class TodoItemFrom extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id:'',
            title: '',
            description: '',
            status: false,
            date:'',
            time:'',
            error: {
              title: '',
              date:'',
            }
        }
    }

/** 
 * to set the item state from the props
 */
    componentDidMount() {

      if(this.props.selectedItem){const  item   = this.props.selectedItem;
      this.setItemState( item );
    }
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
            console.log("Error occurred");
        }
        this.props.addItemHandler?this.props.addItemHandler(this.state):this.props.updateItemHandler(this.state);
    };

/** 
 * Function called on each input changes and update the error object in state
 * @param {JSON} event - to prevent the default 
 * input element is taken from event.target
 */
    formObject = event => {
        event.preventDefault();
        let { name, value } = event.target;
        let error = { ...this.state.error };

        switch (name) {
            case "title":
                error.title = value.length < 5 ? "title should be 5 characaters long" : "";
                break;
            case "date":
                error.date = value.length<0?'Date required':'';
                value = event.target.valueAsNumber;
                event.target.type='text'
                event.target.value = this.getDateValue(value);
                break;
            case "time":
                error.time = value.length<0?'Time required':'';
                break;
            case "status":
                error.status='';
                value=event.target.checked
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
     * Function to change the input element type to date type
     * @param {Event} event  event object that triggered 
     */
    dateFocus = event =>{
      event.preventDefault();
      event.target.type='date';
    }
    /**
     * Function to change the input element type to text on blur
     * @param {Event} event  event object that triggered 
     */
    dateBlur = event =>{
      event.preventDefault();
      let val = event.target.valueAsNumber
      console.log(val)
      event.target.type='text';
      if(val){
        event.target.timestamp= val;
        event.target.value = this.getDateValue(val);
      }
    }
    /**
     * function to display the item for update
     * @param {Item} item  to do item to show for update
     */
    setItemState(item){
      let tempState =
      {
        description:item.description,
        title:item.title,
        status:item.status,
        date:item.date,
        time:item.time,
        id:item.id
      }
        this.setState(tempState);
    }
    
    /**
     * function to get display value of date
     * @param {Number} value  timestamp for the date
     */
    getDateValue = value =>
    {
      let dateVal = new Date(value);
      let dateString = ("0" + (dateVal.getUTCMonth() + 1)).slice(-2)+"/" +("0" + dateVal.getUTCDate()).slice(-2)+"/"+dateVal.getFullYear();
      return dateString;
    }

    render() {
        const { error } = this.state;
        const containerClassName=this.props.hideForm?'hide':'form-container'
        
        return (
            <div className={containerClassName}>
                <div>
                    <span className="close-btn" onClick={this.props.closeHandler}>Close</span>
                    <form  onSubmit={this.onFormSubmit.bind(this)}>
                        <div className="form-group">
                            <label>Title</label>
                            <input 
                               required
                               type="text" 
                               name="title"
                               value={this.state.title}
                               placeholder="Title"
                               onChange={this.formObject}
                               className={error.title.length > 0 ? "is-invalid form-control" : "form-control"}/>
                                {error.title.length > 0 && (
                                <span className="invalid-feedback">{error.title}</span>
                                )}
                        </div>

                        <div className="form-group">
                            <label >Description</label>
                            <textarea
                                type="text"
                                value={this.state.description}
                                name="description"
                                placeholder="Description"
                                className= "form-control"
                                onChange={this.formObject}
                                />
                        </div>

                        <div className="form-group date-container">
                            <label >Date</label>
                            <input
                                required
                                type="text"
                                placeholder="MM/DD/YYYY"
                                name="date"
                                value={this.state.date==''?'':this.getDateValue(this.state.date)}
                                className={error.date.length > 0 ? "is-invalid form-control date-container date" : "form-control date-container date"}
                                onFocus={this.dateFocus}
                                onBlur={this.dateBlur}
                                onChange={this.formObject}/>
                            <input
                                required
                                type="time"
                                placeholder="HH:SS"
                                name="time"
                                value={this.state.time}
                                className={error.date.length > 0 ? "is-invalid form-control date-container time" : "form-control date-container time"}
                                onChange={this.formObject}/>
                                {error.date.length > 0 && (
                                    <span className="invalid-feedback">{error.description}</span>
                                )}
                        </div>


                        <div className="form-group">
                            <label >Completed:</label>
                            <input type="checkbox" checked={this.state.status} name="status" onChange={this.formObject}/>
                        </div>

                        <div >
                            <button type="submit" className="btn">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    } 
}