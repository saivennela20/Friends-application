import React from 'react';
import './../Container.scss';

class ScheduleWrapper extends React.Component {
  render() {
    return (
        <div className='container-children'>
          {this.props.children[0]?<div className='child-1 append-animate'>{this.props.children[0]}</div>:''}
          {this.props.children[1]?<div className='child-2 append-animate'>{this.props.children[1]}</div>:''}
          {this.props.children[2]?<div className='child-3 append-animate'>{this.props.children[2]}</div>:''}
        </div>
    );
  }
}
export default ScheduleWrapper;
