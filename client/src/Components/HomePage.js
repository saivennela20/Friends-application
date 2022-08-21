import React from 'react';
import Container from './Container';
class HomePage extends React.Component {
  
  render() {
    return (
        <Container title='Homepage' selectedTab='HOME_PAGE'>
          {/* <ScheduleWrapper> */}

         
          <div className='welcome-message'>
            <div className='message-wrapper'>
            Welcome to   <br/>
           <span className='title'>F.R.I.E.N.D.S</span>
              <br/><br/><br/>
            <p className='info-message'>
              Please select the option from the left to explore
            <br/>
            <br/>
            <br/>
            <br/><br/><br/>
              Note:<br/>
              Notifications will be show here (under development)

            </p> 
            </div>
          </div> 
          {/* </ScheduleWrapper> */}
        </Container>
    );
  }
}

export default HomePage;
