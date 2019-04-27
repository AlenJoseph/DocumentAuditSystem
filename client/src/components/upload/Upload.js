import React, { Component } from "react";
import Dropzone from "../dropzone/Dropzone";
import "./Upload.css";
import Progress from "../progress/Progress";
import swal from 'sweetalert';
const tick = require('./tick.svg');


class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploading: false,
      uploadProgress: {},
      successfullUploaded: false,
      time:0,
      blockno:0,
      a:'',
      b:'',
      c:''
    };

    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.renderActions = this.renderActions.bind(this);
  }

  onFilesAdded(files) {
    this.setState(prevState => ({
      files: prevState.files.concat(files)
    }));
  }

  async uploadFiles() {
    this.setState({ uploadProgress: {}, uploading: true });
    const promises = [];
    this.state.files.forEach(file => {
      promises.push(this.sendRequest(file));
    });
    try {
      await Promise.all(promises);

      this.setState({ successfullUploaded: true, uploading: false });
    } catch (e) {
      // Not Production ready! Do some error handling here instead...
      this.setState({ successfullUploaded: true, uploading: false });
    }
  }

  sendRequest(file) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      req.upload.addEventListener("progress", event => {
        if (event.lengthComputable) {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100
          };
          this.setState({ uploadProgress: copy });
        }
      });

      req.upload.addEventListener("load", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "done", percentage: 100 };
        this.setState({ uploadProgress: copy });
        resolve(req.response);
      });

      req.upload.addEventListener("error", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "error", percentage: 0 };
        this.setState({ uploadProgress: copy });
        reject(req.response);
      });

      const formData = new FormData();
      formData.append("file", file, file.name);

      req.open("POST", "http://localhost:5000/upload");
      req.send(formData);
      req.onreadystatechange = function() {
        if (req.readyState == XMLHttpRequest.DONE) {
          let jsonResponse = JSON.parse(req.responseText);
          
         
          var Data = {
                
            password: 'admin',
            method:'doesProofExist',
            value:0,
            args:{documentHash:jsonResponse.hash}
          }
          console.log(Data)
          var user = 'admin'
          var userAddress= '93cddaee0b3babb55dbddd923ca4048bb4a49ac2'//change address here
          var contractName= 'ProofOfExistence'
          var contractAddress= '2f79fd3cbeb4a2dc2d39421db934f085d65075ac'//change address here
          var ti='The time stamp is:'
         var bh='The block number is:' 
         
         
          fetch(`http://localhost/bloc/v2.2/users/${user}/${userAddress}/contract/${contractName}/${contractAddress}/call?resolve=true`,
          {
            method : 'POST',
            headers : {'Content-Type': 'application/json'},
            body : JSON.stringify(Data)
            }).then(res=> res.json())
              .then(json=>{
             if(json.status=='Success'){
              var Data = {
                
                password: 'admin',
                method:'returnData',
                value:0,
                args:{documentHash:jsonResponse.hash}
              }
              fetch(`http://localhost/bloc/v2.2/users/${user}/${userAddress}/contract/${contractName}/${contractAddress}/call?resolve=true`,
              {
               
                method : 'POST',
                headers : {'Content-Type': 'application/json'},
                body : JSON.stringify(Data)
                }).then(res=> res.json())
                .then(json=>{
                  console.log(json.data.contents[0])
                  this.setState({
                    time: json.data.contents[0],
                    blockno:json.data.contents[1]
                  })
                  var newDate = new Date();
                  newDate.setTime(this.state.time*1000);
                  var dateString = newDate.toLocaleString();
               
                  this.setState({
                    a:dateString,
                    b:ti,
                    c:bh
                  })
        
        
        
                  console.log(this.state.time ,this.state.blockno)
                }).then(()=>{
                  if(this.state.time==0){
                    swal({title:'Document not found',text:'Please validate your document',icon:"error"});
                  }
                  else{
                    swal({title:"It is a Valid Document", text:" It was added on "+this.state.a+" the blocknumber is: "+this.state.blockno,icon: "success",});
                  }
                })
        
             }
            })
        }
    }.bind(this)
      
    });
  }

  renderProgress(file) {
    const uploadProgress = this.state.uploadProgress[file.name];
    if (this.state.uploading || this.state.successfullUploaded) {
      return (
        <div className="ProgressWrapper">
          <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
          <img
            className="CheckIcon"
            alt="done"
            src={tick}
            style={{
              opacity:
                uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
            }}
          />
        </div>
      );
    }
  }

  renderActions() {
    if (this.state.successfullUploaded) {
      return (
        <button
          onClick={() =>
            this.setState({ files: [], successfullUploaded: false })
          }
        >
          Clear
        </button>
      );
    } else {
      return (
        <button
          disabled={this.state.files.length < 0 || this.state.uploading}
          onClick={this.uploadFiles}
        >
          Search
        </button>
      );
    }
  }

  render() {
    return (
      <div className="Upload">
        <span className="Title">Upload Files</span>
        <div className="Content">
          <div>
            <Dropzone
              onFilesAdded={this.onFilesAdded}
              disabled={this.state.uploading || this.state.successfullUploaded}
            />
          </div>
          <div className="Files">
            {this.state.files.map(file => {
              return (
                <div key={file.name} className="Row">
                  <span className="Filename">{file.name}</span>
                  {this.renderProgress(file)}
                </div>
              );
            })}
          </div>
        </div>
        <div className="Actions">{this.renderActions()}</div>
        
      </div>
    );
  }
}

export default Upload;
