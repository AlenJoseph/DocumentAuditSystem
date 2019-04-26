import React from 'react';
import PropTypes from 'prop-types';
import {Form,Button} from 'semantic-ui-react';
import InlineError from "../../src/components/messages/InlineError";
import { Redirect } from 'react-router';
import swal from 'sweetalert';
class LoginForm extends React.Component {
    state={
        data: {
            uname: '',
            password: ''
        },
        loading: false,
        errors: {}
    };
onChange = e =>
 this.setState({
     data: {...this.state.data,[e.target.name]: e.target.value}
    });

onSubmit = () => {
    
    const errors = this.validate(this.state.data);
    this.setState({ errors});
    if(Object.keys(errors).length === 0){
        this.props.submit(this.state.data);
    }
   
    fetch('http://localhost:5000/user/login',{
        method : 'POST',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(this.state.data)
        
      }).then((response) => response.json())
      .then((responseData) =>
      {
          console.log(responseData)
          localStorage.setItem('uname',responseData.username);
          
          if (responseData.reply === 'login sucessfull')
          {
            swal({title:'Login Successfull' ,icon:"success"});
            this.setState({loading:true})
          }
          else if(responseData.reply === 'Waiting for approvel'){
            swal({title:'Account needs to be approved' ,icon:"info"});
          }
          else if(responseData.reply === 'Username and password does not match'){
            swal({title:'Username and password does not match' ,icon:"error"});
          }
          else if(responseData.reply === 'Username does not exits'){
            swal({title:'Username does not exits' ,icon:"error"});
          }
          else{
            swal({title:'Network Error' ,icon:"error"});
          }
          
      })
}
validate = (data) => {
    const errors = {};
    if(!data.uemail) errors.uemail = "Can't be blank";
    if(!data.password) errors.password = "Can't be blank";
    return errors;
}
  render() {
      const { data,errors } = this.state;
      if (this.state.loading === true) {
        return <Redirect to='/dashboard' />
      }
  
    return (
      <Form style={{'position': 'relative','max-width': '50%', 'margin-left': '25%'}}onSubmit = {this.onSubmit}>
         <Form.Field>
            <label htmlFor="uname">UserName</label>
            <input type = "text"
              id="uname"
              name="uname"
              placeholder="Enter your username"
              value={data.uname}
              onChange={this.onChange}/>
            {errors.uname && <InlineError text={errors.uname}/>}
            </Form.Field>
          <Form.Field>
              <label htmlFor="password">Password</label>
              <input 
              type="password"
              id="password" 
              name="password"
              placeholder="Make it Secure"
              value={data.password}
              onChange={this.onChange}
              />
              {errors.password && <InlineError text={errors.password}/>}
          </Form.Field>
        <Button style={{'margin-left': '43%'}} primary>Login</Button>
      </Form>
    )
  }
}
 LoginForm.propTypes = {
    submit:PropTypes.func.isRequired
};

export default LoginForm;
