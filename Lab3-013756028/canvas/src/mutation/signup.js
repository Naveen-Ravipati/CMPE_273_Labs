import {gql} from 'apollo-boost';

const signup = gql`
mutation signup($new_email: String, $new_password: String, $new_student_id: String, $new_student_or_faculty: String){
    signup(new_email: $new_email, new_password: $new_password, new_student_id: $new_student_id, new_student_or_faculty: $new_student_or_faculty){
         status
         signup_data{
             email
             password
             student_id
         }     
    }
}`


export {signup};