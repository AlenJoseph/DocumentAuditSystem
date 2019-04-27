import React from 'react';
import { Redirect } from 'react-router';
import Upload from "../upload/aUpload";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
  };
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
    localStorage.removeItem('uname');
    localStorage.removeItem('password');
    this.setState({loading:true})
}
  
    render(){
        if (this.state.loading === true) {
            return <Redirect to='/adminlogin' />
          }
        
        return(
         
            <div className="main"> 
                <AppBar >
                    <Toolbar >
                            <Typography variant="h6" color="inherit" style={{flexGrow: 1,"marginLeft":"2%"}}>
                              Admin Dashboard
                            </Typography>
                            <Button onClick={()=>this.props.history.push('/User')}color="inherit">User Details</Button>
                            <Button onClick={this.logout}color="inherit" style={{"marginRight":"2%"}}>Log Out</Button>
                    </Toolbar>
                </AppBar>
            <div className="App">
                <div className="Card">
                     <Upload />
                </div>
  
            </div>
        </div>
        )
    }
}
export default AdminDashBoard;
  
      
    
  

