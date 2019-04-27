import React from 'react';
import AdminLoginForm from '../../forms/AdminLoginForm';
import Button from '@material-ui/core/Button';


class AdminLoginPage extends React.Component {
    submit = data => {
        console.log(data);
    }
    render(){
        return(
        <div style={{'padding-top': '15%'}} >
        <Button onClick={()=>this.props.history.push('/')}color="inherit">Home</Button>
          <h1 style = {{'text-align': 'center'}}>Admin Login</h1>
        <AdminLoginForm submit={this.submit}/>
       
      </div>

    )
    }
}
export default AdminLoginPage;
