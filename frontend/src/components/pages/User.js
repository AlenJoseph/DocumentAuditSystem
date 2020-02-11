import React from 'react';
import { Redirect } from 'react-router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';
const tick = require('./tick.svg');
class User extends React.Component {
  constructor(props)
  {
      super(props);
      this.logout=this.logout.bind(this);
      this.approve=this.approve.bind(this);
      this.reload=this.reload.bind(this);
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
approve(e){
    let id =e.target.id;
    console.log(id)

    fetch('http://localhost:5000/admin/user/id',{
        method : 'POST',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify({'id':id})
        
      }).then((response) => response.json())
      .then((responseData) =>
      {     if(responseData.reply=='approved'){
           swal({title:'User approved' ,icon:"success"}).then((willDelete) => {
            if (willDelete) {
             this.reload()
            }
            });
            }
          
    })
    
      
   
}
reload(){
    window.location.reload();
}
  
    render(){
        const {users}=this.state;
        if (this.state.loading === true) {
            return <Redirect to='/adminlogin' />
          }
        return(
            <div className="main">
              <AppBar >
                    <Toolbar >
                            <Typography variant="h6" color="inherit" style={{flexGrow: 1,"marginLeft":"2%"}}>
                              User Details 
                            </Typography>
                            <Button onClick={()=>this.props.history.push('/AdminDashBoard')}color="inherit">DashBoard</Button>
                            <Button onClick={this.logout}color="inherit" style={{"marginRight":"2%"}}>Log Out</Button>
                    </Toolbar>
                </AppBar>
              
                {users.map(value => (
                    <div className='Card2'>
                       <label style={{'fontSize':'17px',color:'#3081ed','fontWeight':700,'marginTop':'1em'}}>{value.name}</label><br></br>
                        <label>{value.username}</label><br></br>
                        <label>{value.email}</label><br></br>
                        <label>{value.phone}</label><br></br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img id={value.users_id} className='tick' src={tick} onClick={this.approve}></img>
                    </div>))}
            </div>
            
        )
    }
}
export default User;
  
      
    
  

