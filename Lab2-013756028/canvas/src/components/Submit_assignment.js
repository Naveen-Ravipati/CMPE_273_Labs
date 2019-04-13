import React, { Component } from 'react'

import axios, { post } from 'axios';
export default class Submitassignment extends Component {
    state = { selectedFile: null, loaded: 0,foldername:"" }

handleselectedFile = event => {

this.setState({
selectedFile: event.target.files[0],
loaded: 0,
},()=>{
// console.log(this.state.selectedFile);
})

}
// folderviewHandler=(e)=>{
// this.setState({
//   foldername:e.target.value
// })
// }
    canceloption=(e)=>{
        this.props.callbackFromParent()
    }
    handleUpload =async()=> {
   

      var data_assign={
        foldname:"./submissions/"+localStorage.getItem('course_id')
      }
         await axios.post('http://localhost:3001/createfolder',data_assign)
          .then((response) => {
            // alert("assignment folder created")
            if(response.status === 200){  
              console.log("success childddd")
              alert("created course_id folder")
              
      var data_assign={
        foldname:"./submissions/"+localStorage.getItem('course_id')+'/'+localStorage.getItem('login_id')
      }
           axios.post('http://localhost:3001/createfolder',data_assign)
          .then((response) => {
            alert("loginid folder created")
            if(response.status === 200){  
              console.log("success childddd")
              var data_assign={
                foldname:"./submissions/"+localStorage.getItem('course_id')+'/'+localStorage.getItem('login_id')+'/'+localStorage.getItem('assignment_id')
              }
                
                   axios.post('http://localhost:3001/createfolder',data_assign)
                  .then((response) => {
                    alert(" assignmentid folder created")
                    if(response.status === 200){  
                      const data = new FormData()
        
        data.append('file', this.state.selectedFile)
        console.log(this.state.selectedFile);
       console.log(data)
       alert("hello")
         axios.post('http://localhost:3001/upload',data,
        {params:{course_id:localStorage.getItem('course_id'),student_id:localStorage.getItem('login_id'),assignment_id:localStorage.getItem('assignment_id')}},
        {selectedFile: this.state.selectedFile,
        onUploadProgress: ProgressEvent => {
        this.setState({
        loaded: (ProgressEvent.loaded / ProgressEvent.total*100),})},})
        .then(res => {
        console.log(res.statusText)
        if(res.status === 200){
          alert("file upload done")
            this.props.callbackFromParent();
        }
        }).catch(error => {
        console.log(error.message);
        })
                      console.log("success childddd")
                  //update the state with the response data
                  // this.setState({
                  //     asgmnt_det:response.data
                  // });
                  
                 
                }
              });
          //update the state with the response data
          // this.setState({
          //     asgmnt_det:response.data
          // });
          
         
        }
      });
          //update the state with the response data
          // this.setState({
          //     asgmnt_det:response.data
          // });
          
         
        }
      });


      //   
        }
        
  render() {
    return (
      <div>
        <div class="border" style={{width:"60%"}}>
        <h4>File Upload</h4>
        {/* <input type="text"  onChange={this.folderviewHandler}class="form-control" placeholder="Folder Name"></input> */}
        
        <input type="file" name="file_name" id="file_id" onChange={this.handleselectedFile} />
<div class="lessspace"></div>
<div>
    <button onClick={this.canceloption} class="btn btn-light col-sm-4">Cancel</button>

     <div  class="col-sm-1"></div>
    <button onClick={this.handleUpload} type="submit" class="btn btn-primary col-sm-5-offset-1">Submit assignment</button>
 
    <div> {Math.round(this.state.loaded,2) } %</div>
</div>
        </div>
      </div>
    )
  }
}
