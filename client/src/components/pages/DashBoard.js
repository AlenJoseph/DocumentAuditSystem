import React from 'react';
import { Redirect } from 'react-router';
import "./DashBoard.css";
import Upload from "../upload/Upload";
class DashBoard extends React.Component {
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
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    this.setState({loading:true})
}
  
    render(){
        if (this.state.loading === true) {
            return <Redirect to='/login' />
          }
        return(
            <div className="App">
        <div className="Card">
          <Upload />
        </div>
      
            <div>
          
            </div>
            </div>
        )
    }
}
export default DashBoard;
  
      
    
  

