import React from 'react';
import LoginForm from '../../../src/forms/LoginForm';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';

class LoginPage extends React.Component {
    submit = data => {
        console.log(data);
    }
    render(){
        return(
        <div style={{'padding-top': '15%'}} >
        <Button onClick={()=>this.props.history.push('/')}color="inherit">Home</Button>
          <h1 style = {{'text-align': 'center'}}>Login</h1>
        <LoginForm submit={this.submit}/>
        <Link to = "/Signup" style={{'position': 'relative','max-width': '50%', 'margin-left': '48%'}}>Signup</Link>
      </div>

    )
    }
}
export default LoginPage;
