import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const validate_dashboard = gql`
    query dashboard($login_id: String, $student_or_faculty: String){
        dashboard(login_id: $login_id, student_or_faculty: $student_or_faculty){
        status
        course_data{
             course_id
             course_name
             course_color
         }
        
    }
}`

export { validate_dashboard };