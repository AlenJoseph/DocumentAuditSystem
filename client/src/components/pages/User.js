import React from 'react';
import { Redirect } from 'react-router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class User extends React.Component {
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
       
        return(
            <div className="App">
                hiiiiiiiiiii
            </div>
            
        )
    }
}
export default User;
  
      
    
  

