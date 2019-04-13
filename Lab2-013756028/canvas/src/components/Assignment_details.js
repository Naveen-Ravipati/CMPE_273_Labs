import React, { Component } from 'react'
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import Submit_assignment from './Submit_assignment';
import { Document, Page } from 'react-pdf';
export default class Assignment_detail extends Component {
    constructor(props) {
        super(props);
        this.state={
            asgmnt_det:[],
            files : [],
            assignment_files : [],
            filename : "",
            downloadfile:"",
            filesvisible:"",
            filesfacvisible:"",
            framevis:"hidden",
            base64img : "",
            subvis:"hidden",
            altersub:"visible",
            studentlist:[],
            btntext:"Submit Assignment",
            clickid:localStorage.getItem('login_id')
        }
        if(localStorage.getItem('student_or_faculty')=="student"){
          this.state.filesvisible="visible"
          this.state.filesfacvisible="hidden"
        }

        else{
          this.state.filesvisible="hidden"
          this.state.filesfacvisible="visible"
          
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
      // alert("hi")
      axios.defaults.withCredentials = true;
      const FileDownload = require('js-file-download');
      axios.get('http://localhost:3001/downloadassign',{
        params: {
          file: '/submissions/'+localStorage.get('course_id')+'/'+localStorage.getItem('login_id')+'/'+localStorage.getItem('assignment_id')+this.state.filename
     
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

    viewAssignment(value){
      // e.preventDefault();
      this.state.assignment_files=[]
      this.setState({
        clickid:value
      })
      // alert("hi")
      console.log("id",value)
      axios.defaults.withCredentials = true;

      axios.get('http://localhost:3001/seeFiles',{params:{course_id:localStorage.getItem('course_id'),student_or_faculty:"student",student_id:value,assignment_id:localStorage.getItem('assignment_id')}},).
      then(response => {
              console.log("in then")
              // alert("in then")
              console.log(response.data)
              this.setState({assignment_files : this.state.assignment_files.concat(response.data) })
              console.log(this.state.assignment_files);
              console.log("After setting",this.state.assignment_files)
      })
      .catch(err=>{
        alert("in err")
        console.log(err.message)
      })
      // alert("hello")
  
    }
    handleDownload(value) {
      // alert("in handle download")
      this.state.base64img = ""
      this.state.filename = value.filename 
      
      //console.log(value);
      
      var url  = 'http://localhost:3001/download-file/'+value
     
      
      axios.post(url,{data:{course_id:localStorage.getItem('course_id'),student_id:this.state.clickid,assignment_id:localStorage.getItem('assignment_id')}},{
      }).then(response=>{
        this.state.framevis="visible"
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
      const data={
        course_id:localStorage.getItem('course_id'),
      }
      var token = localStorage.getItem("token");
        axios.post('http://localhost:3001/people',data,{
          headers: {"Authorization" : `Bearer ${token}`}})
        .then((response) => {
          if(response.status === 200){
            this.setState({
              studentlist:response.data
            })
          }

        })

// if(localStorage.getItem('stufac')=="student"){
  // alert("this")

      axios.get('http://localhost:3001/seeFiles',{params:{course_id:localStorage.getItem('course_id'),student_or_faculty:localStorage.getItem('student_or_faculty'),student_id:localStorage.getItem('login_id'),assignment_id:localStorage.getItem('assignment_id')}},).
      then(response => {
              console.log("in then")
              console.log(response.data)
              this.setState({files : this.state.files.concat(response.data)})
              console.log(this.state.files[0]);
              console.log("After setting",this.state.files)
      })
// }
  
        const datak={
          assignment_id:localStorage.getItem('assignment_id'),
          course_id:localStorage.getItem('course_id')
        }
       
       
          axios.post('http://localhost:3001/get_assignment_detail',datak)
          .then((response) => {
            if(response.status === 200){  
              console.log("success childddd")
          //update the state with the response data
          this.setState({
              asgmnt_det:response.data
          });
         
        }
      });
    }
  render() {
    let displayFiles = null;
    let studentlist = null;
    let displayStudentFiles = null;
    if(this.state.studentlist.length>0){
      studentlist  = this.state.studentlist.map((student,id)=>{
        // alert(this.state.filesfacvisible)
      return(
      <div >
        <a onClick={this.viewAssignment.bind(this,student.student_id)}>{student.student_id}</a>
      </div>
      )
      })
    }
    if(this.state.files){
    
    displayFiles = this.state.files.map((file,id)=>{
      console.log("sae" + this.state.base64img);
      return(
      
            <div>
           <td value={file} onClick={()=>this.handleDownload(file)}><a style={{color:"blue"}}>{file}</a></td><br></br>
           
           </div>
   )
      })
    }
    if(this.state.assignment_files.length>0){
    
      displayStudentFiles = this.state.assignment_files.map((file,id)=>{
        console.log("sae" + this.state.base64img);
  
        return(
        
              <div>
             <td value={file} onClick={()=>this.handleDownload(file)}><a style={{color:"blue"}}>{file}</a></td><br></br>
             
             </div>
     )
        })
      }
    if(this.state.asgmnt_det){
        var assign_det = this.state.asgmnt_det.map(assignment=>{
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
                <div style={{visibility:this.state.filesfacvisible}}>
                Student List
                <br></br>
                {studentlist}
                {displayStudentFiles}
                </div>
                <div style={{visibility:this.state.filesvisible}}>
            
                {displayFiles}
                </div>
                </tr>
                <a class="btn btn-primary" style={{position:"absolute"}} href = {"data:application/pdf;base64,"+this.state.base64img} download={this.state.filename}>Download</a>
                
                <iframe style={{visibility:this.state.framevis,marginTop:"40px"}} src = {"data:application/pdf;base64,"+this.state.base64img} width="80%" height="600" frameBorder="0"
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
        <Submit_assignment callbackFromParent={this.myCallback}/>
        </div>
        </div>
        
      </div>
    )
  }
}
