import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const validate_edit_profile = gql`
    query edit_profile($login_id: String, $student_or_faculty: String){
        edit_profile(login_id: $login_id, student_or_faculty: $student_or_faculty){
            status
            user_data{
                email
                about_me
                city
                country
                gender
                hometown
                languages
                mobile
                name
                phone_number
                school
            }
    }
}`

export { validate_edit_profile };