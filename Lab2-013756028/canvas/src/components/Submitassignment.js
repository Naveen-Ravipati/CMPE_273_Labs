import React, { Component } from 'react'
import axios, { post } from 'axios';

export default class Submitassignment extends Component {
    state = { selectedFile: null, loaded: 0, }

handleselectedFile = event => {

this.setState({
selectedFile: event.target.files[0],
loaded: 0,
},()=>{
// console.log(this.state.selectedFile);
})

}
    canceloption=(e)=>{
        this.props.callbackFromParent()
    }

    handleUpload =()=> {

        const data = new FormData()
        
        data.append('file', this.state.selectedFile)
        console.log(this.state.selectedFile);
        data.append('studentid',localStorage.getItem('loginid'))
       console.log(data)
        axios.post('http://localhost:3001/upload',data,
        {selectedFile: this.state.selectedFile,
        onUploadProgress: ProgressEvent => {
        this.setState({
        loaded: (ProgressEvent.loaded / ProgressEvent.total*100),})},})
        .then(res => {
        console.log(res.statusText)
        if(res.status === 200){
            this.props.callbackFromParent();
        }
        }).catch(error => {
        console.log(error.message);
        })
        }
        
  render() {
    return (
      <div>
        <div class="border" style={{width:"60%"}}>
        <h4>File Upload</h4>
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
