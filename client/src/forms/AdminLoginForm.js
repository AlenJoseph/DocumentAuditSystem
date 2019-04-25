import React from 'react';
import PropTypes from 'prop-types';
import {Form,Button} from 'semantic-ui-react';
import InlineError from "../../src/components/messages/InlineError";
import { Redirect } from 'react-router';

class AdminLoginForm extends React.Component {
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
    localStorage.setItem('uname',this.state.data.uname);
    localStorage.setItem('password',this.state.data.password);
    let uname=localStorage.getItem('uname');
    let upassword=localStorage.getItem('password')
    if((uname === 'aaa')&&(upassword=== 'aaa')){
     this.setState({loading:true})
    

    }
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
        return <Redirect to='/AdminDashBoard' />
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
 AdminLoginForm.propTypes = {
    submit:PropTypes.func.isRequired
};

export default AdminLoginForm;
