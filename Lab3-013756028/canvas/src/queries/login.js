import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const validate_student_login = gql`
    query student_login($username: String, $password: String){
        student_login(username: $username, password: $password){
        result
        status
        userData{
            student_id
            password
            email
            about_me
            country
            courses_registered{
                course_id
            }
        }
    }
}`

const validate_faculty_login = gql`
    query faculty_login($username: String, $password: String){
        faculty_login(username: $username, password: $password){
        result
        status
        userData{
            faculty_id
            password
            email
            about_me
            country
        }
    }
}`

export { validate_student_login, validate_faculty_login };