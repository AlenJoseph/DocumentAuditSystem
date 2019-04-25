import React from 'react';
import { Redirect } from 'react-router';
class AdminDashBoard extends React.Component {
  constructor(props)
  {
      super(props);
      this.logout=this.logout.bind(this);
     
  }
  state={
 loading:false
}
logout()
{
    console.log("hereeeee")
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    this.setState({loading:true})
}
  
    render(){
        if (this.state.loading === true) {
            return <Redirect to='/adminlogin' />
          }
        return(
            <div>
            <h1>Hellooooooo</h1>
            <button onClick={this.logout}>Logout</button></div>
        )
    }
}
export default AdminDashBoard;
  
      
    
  

