import React from 'react';
import PropTypes from 'prop-types';
import {Form,Button} from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from "../../src/components/messages/InlineError";
import { Redirect } from 'react-router';
import swal from 'sweetalert';
class SignupForm extends React.Component {
    state={
        data: {
            uname: '',
            email: '',
            name:'',
            phone:'',
            password: '',
            cpassword:''

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
    fetch('http://localhost:5000/user/register',{
        method : 'POST',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(this.state.data)
        
      }).then((response) => response.json())
      .then((responseData) =>
      {
          console.log(responseData)
      if(responseData.reply==='registered successfully'){
      swal({title:'Registered Successfull',text:'The account needs to be approved, try loging after sometimes' ,icon:"success"});
        this.setState({loading:true})
      }
      });
    }
}
validate = (data) => {
    const errors = {};
    if(!Validator.isAlphanumeric(data.uname))errors.uname = "Invalid Username"
    if(!Validator.isEmail(data.email)) errors.email = "Invalid Email";
    if(!data.password) errors.password = "Can't be blank";
    if(!Validator.equals(data.password,data.cpassword)) errors.cpassword="Those passwords didn't match. Try again.";
    if(!data.name) errors.name = "Enter a valid name Can't be blank";
    if(!Validator.isMobilePhone(data.phone)) errors.phone = "Enter a valid phone number";
    return errors;
}
render() {
    const { data,errors } = this.state;
    if (this.state.loading === true) {
        return <Redirect to='/login' />
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
            <label htmlFor="name">Name</label>
            <input  type="text"
             id="name" 
             name="name"
             placeholder="Enter your fullname"
             value={data.name}
             onChange={this.onChange}/>
          {errors.name && <InlineError text={errors.name}/>}
          </Form.Field>
        <Form.Field>
            <label htmlFor="email">Email</label>
            <input  type="email"
             id="email" 
             name="email"
             placeholder="example@example.com"
             value={data.email}
             onChange={this.onChange}/>
          {errors.email && <InlineError text={errors.email}/>}
          </Form.Field>
          <Form.Field>
            <label htmlFor="name">Phone Number</label>
            <input  type="text"
             id="phone" 
             name="phone"
             placeholder="Enter your phone number"
             value={data.phone}
             onChange={this.onChange}/>
          {errors.phone && <InlineError text={errors.phone}/>}
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
        <Form.Field>
            <label htmlFor="password">Confirm  Password</label>
            <input 
            type="password"
            id="cpassword" 
            name="cpassword"
            placeholder="Make it Secure once more"
            value={data.cpassword}
            onChange={this.onChange}
            />
            {errors.cpassword && <InlineError text={errors.cpassword}/>}
        </Form.Field>
      <Button style={{'margin-left': '43%'}} primary>Signup</Button>
    </Form>
  )
}
}
SignupForm.propTypes = {
  submit:PropTypes.func.isRequired
};

export default SignupForm;