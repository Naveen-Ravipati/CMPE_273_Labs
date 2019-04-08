import React, { Component } from 'react'
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import Submitassignment from './Submitassignment';
import { Document, Page } from 'react-pdf';

export default class Assignment_details extends Component {
    constructor(props) {
        super(props);
        this.state={
            assignment_detail:[],
            files : [],
            filename : "",
            frame_visibility:"hidden",
            base64img : "",
            subvis:"hidden",
            altersub:"visible",
            btntext:"Submit Assignment"
        }
    }
    popsubmit=(e)=>{
this.setState({
    subvis:"visible",
    altersub:"hidden"
})
    }
    myCallback=(e)=>{
        this.setState({
            subvis:"hidden",
            altersub:"visible",
            btntext:"Resubmit Assignment"
        })

    }
    viewdownload=(e)=>{
      axios.defaults.withCredentials = true;
      const FileDownload = require('js-file-download');
      axios.get('http://localhost:3001/downloadassign',{
        params: {
          file: '/submissions/200-HW4_013707187.pdf'
     
        }
      
    })
      .then((response) => {
        if(response.status === 200){  
          // alert(response.data)
          // console.log(response.data)
          // window.open('/downloadassign?file=/submissions/200-HW4_013707187.pdf');

    }
  });
    }
    handleDownload(value) {
      //console.log(value);
      
      var url  = 'http://localhost:3001/download-file/'+value
      
      axios.post(url,{
      }).then(response=>{
        this.state.frame_visibility="visible"
          // console.log("Downloaded");
          alert("hello")
          this.setState({
              base64img : response.data
          })
          
       })
       .catch(response=>console.log(response.data))
  }
  
    componentDidMount(){
      axios.defaults.withCredentials = true;
      axios.get('http://localhost:3001/seeFiles').
      then(response => {
              console.log("in then")
              console.log(response.data)
              this.setState({files : this.state.files.concat(response.data)})
              console.log(this.state.files[0]);
              console.log("After setting",this.state.files)
      })
  
        const dataq={
          assignmentid:localStorage.getItem('assignmentid'),
          courseid:localStorage.getItem('course_id')
        }
       
       
          axios.post('http://localhost:3001/getassignmentdet',dataq)
          .then((response) => {
            if(response.status === 200){  
              console.log("success childddd")
          //update the state with the response data
          this.setState({
            assignment_detail:response.data
          });
         
        }
      });
    }
  render() {
    let displayFiles = null;
    if(this.state.files){
    
    displayFiles = this.state.files.map((file,id)=>{
      console.log("sae" + this.state.base64img);
      return(
      
            <div>
           <td value={file} onClick={()=>this.handleDownload(file)}><a style={{color:"blue"}}>{"View "+file}</a></td><br></br>
           
           </div>
   )
      })
    }
    if(this.state.assignment_detail){
        var assign_det = this.state.assignment_detail.map(assignment=>{
          return (

            <div>
                <h3>{assignment.name}
                <button onClick={this.popsubmit} class="btn btn-primary" style={{float:"right",visibility:this.state.altersub}} type="button">{this.state.btntext}</button>
                </h3>
               
              
                <hr></hr>
                <div>
                <div class="col col-sm-1"><span><b>Date</b></span></div>
                <div class="col col-sm-2">
                {assignment.due.substring(0,10)}</div>
                <div class="col col-sm-1"><span><b>Points</b></span></div>
                <div class="col col-sm-2">{assignment.marks}</div>
                <div class="col col-sm-3"><span><b>Submitting: </b></span>
                <div class="col col-sm-2"></div>File upload</div>
                </div>
                <div class="lessspace"></div>
                <div class="col  col-sm-1">
                    <span><b>Available:  </b></span>
                </div>
                <div class="col col-sm-3">
                    <span>{assignment.due.substring(0,10)}</span>
                </div>
                <div class="lessspace"></div>
                <hr></hr>
            
                <span>No Content</span>
                <div style={{padding:"30px"}}>
                <tr style={{float:"right",position:"relative"}}>
                {displayFiles}
                </tr>
                <a class="btn btn-primary" style={{position:"absolute"}} href = {"data:application/pdf;base64,"+this.state.base64img} download="200-HW4_013707187.pdf">Download</a>
                
                <iframe style={{visibility:this.state.frame_visibility,marginTop:"40px"}} src = {"data:application/pdf;base64,"+this.state.base64img} width="80%" height="600" frameBorder="0"
        allowFullScreen></iframe>
                </div>
            </div>
          )
        })
    }

    return (
      <div>
          <div class="container border" style={{width:"80%"}}>
        {assign_det}
        <div class="border" style={{visibility:this.state.subvis,marginTop:"10%"}}>
        <Submitassignment callbackFromParent={this.myCallback}/>
        </div>
        </div>
        
      </div>
    )
  }
}
