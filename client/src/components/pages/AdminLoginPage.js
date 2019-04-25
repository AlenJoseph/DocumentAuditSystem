import React from 'react';
import AdminLoginForm from '../../forms/AdminLoginForm';


class AdminLoginPage extends React.Component {
    submit = data => {
        console.log(data);
    }
    render(){
        return(
        <div style={{'padding-top': '15%'}} >
          <h1 style = {{'text-align': 'center'}}>Login</h1>
        <AdminLoginForm submit={this.submit}/>
       
      </div>

    )
    }
}
export default AdminLoginPage;
