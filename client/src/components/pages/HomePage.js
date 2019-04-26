import React from 'react';
import {Link} from 'react-router-dom';
import "./HomePage.css";
const user = require('./user.png');
const admin = require('./admin.png');

class HomePage extends React.Component {
    constructor(props)
    { 
        super(props);
        
       
    }
    render(){
        return(
    <div>
         <div style={{'alignContent':'center','marginLeft':'43%','paddingTop':'5%','paddingBottom':'10%'}}><h1>Home Page</h1></div>
    <div className='main'>
       <div style={{'marginLeft':'20%'}}>
        <div className="column1">
        <img className='center1' src={user}  onClick={()=>this.props.history.push('/login')}></img>    
            
        </div>
       
        <div className="column1">
        <img className='center1' src={admin} onClick={()=>this.props.history.push('/adminlogin')}></img>  
        </div>
        </div>
    </div>
    </div>
)
        }
    }
export default HomePage;
