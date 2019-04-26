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
 loading:false,
 users:[]
}
componentDidMount(e)
{
    fetch('http://localhost:5000/admin/users',{headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
},})
      .then(res => res.json())
      .then(users => this.setState({users}, () => console.log('Customers fetched...', users)));
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
            <div className="main">
              <AppBar position="static">
                    <Toolbar >
                            <Typography variant="h6" color="inherit" style={{flexGrow: 1,"marginLeft":"2%"}}>
                              Admin Dashboard
                            </Typography>
                            <Button onClick={()=>this.props.history.push('/AdminDashBoard')}color="inherit">DashBoard</Button>
                            <Button onClick={this.logout}color="inherit" style={{"marginRight":"2%"}}>Log Out</Button>
                    </Toolbar>
                </AppBar>
            </div>
            
        )
    }
}
export default User;
  
      
    
  

