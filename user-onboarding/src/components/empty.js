//Ignore all of this this was my first failed attempt with Formik. I couldnt figure out how to get my user card to render so i had to go back and learn the yup schema.






import React, {useState, useEffect} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";
import axios from 'axios';

const validate = ({name, email, password}) => {
    const errors = {};
    //validating name
    if (!name) {
        errors.name ='You need a name!'
    }
    //validating email
    if (!email){
        errors.email = 'You need an email!'
    }
    //validating password
    if (!password){
        errors.password = 'You need a password!'
    }
    return errors;
}



export default function Forms (props){

    const[users, setUsers] = useState([]);

    useEffect(() => {
                setUsers(users => [...users]);
            }, [setUsers]);
   

    const handleSubmit = (values)=>{      
       

        axios.post('https://reqres.in/api/users', values)
        .then(res => {

            console.log(values);
        })
        axios.get('https://reqres.in/api/users')
        .then(res =>{
             return(
                 <div>
                     {res.data}
                 </div>
             )
        })
        
    }

 

    return(
        <Formik
        initialValues ={{name:'',email:'', password:''}}
        onSubmit = {handleSubmit}        
        validate = {validate}
        
        render = {props =>{
            return(
                <div>
                <Form>                                        
                    <Field
                        
                        type = "text"
                        name = "name"
                        placeholder ="Enter Name"
                        
                        
                                                
                    />
                    <ErrorMessage name = 'name' component = 'div'/>
                    <Field
                        
                        type = "email"
                        name = "email"
                        placeholder ="Enter Email"
                        
                        
                    />  
                    <ErrorMessage name = 'email' component = 'div'/>                  
                    <Field
                        
                        type ="password"
                        name = "password"
                        placeholder ="Enter Password"
                        
                    />  
                    <ErrorMessage name = 'password' component = 'div'/>          
                    <button type="submit">
                    submit
                    </button>
                </Form>
                <div>
                 {users.map(user => {
                    return (
                        <div key = {user.id} className = 'User-card'>
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                        </div>
                    )
                })}
                </div>
                </div>
            
            )
        }}
/>
    );

}