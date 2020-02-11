import React from 'react';
import SignupForm from '../../../src/forms/SignupForm';

 class SignupPage extends React.Component{
     submit = data =>{
         console.log(data);
     }
     render(){
         return(
            <div>
            <h1 style = {{'text-align': 'center','paddingTop':'7%'}}>Signup</h1>
            <SignupForm submit={this.submit}/>
        </div>

         )
     }
    }
    export default SignupPage;
     
     
     
