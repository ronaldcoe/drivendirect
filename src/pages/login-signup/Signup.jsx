import React, { useState } from 'react'
import '../../styles/blocks/signup.css'
import {createUser} from "../../Firebase/FirebaseStateManagement"

export default function Signup() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword]= useState("")

    // Function to handle the SignUp, it will create the user and store in the DB
    const signUp= async (e)=>{
        e.preventDefault();
        try {
            const success = await createUser(email, password, firstName, lastName);
            if (success) {
              console.log('User was created');
            } else {
              console.log('User creation failed');
            }
          } catch (error) {
            console.log(error);
          }
    }

    const statesUSA = [
        'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
        'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
        'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
        'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
        'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
        'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
        'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
        'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia',
        'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
    ];

    const statesCanada = [
        'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador',
        'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island',
        'Quebec', 'Saskatchewan', 'Yukon'
      ];
    

    const [countrySelected, setCountrySelected] = useState('USA')

    const handleCountryChange = (event) => {
        setCountrySelected(event.target.value)
    }

  
  return (
    <div className='signup'>
        <div className='signup__wrapper'>
            <div className='signup__wrapper__content'>
                <h1>Create an Account</h1>
                <form onSubmit={signUp}>
                    <label>
                        <p>First Name</p>
                        <input type='text' value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}></input>  
                    </label>  
                    <label>
                        <p>Last Name</p>
                        <input type='text' value={lastName} onChange={(e)=>{setLastName(e.target.value)}}></input>  
                    </label>
                    <label>
                        <p>Email</p>
                        <input type='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>  
                    </label>
                    <label>
                        <p>Password</p>
                        <input type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>  
                    </label>
                    <label>
                        <p>Confirm password</p>
                        <input type='password'></input>  
                    </label>
                    <label>
                        <p>Dealership Name</p>
                        <input type='text'></input>  
                    </label>
                    <label>
                        <p>Website</p>
                        <input type='text'></input>  
                    </label>
                    <label>
                        <p>Country</p>
                        <select value={countrySelected} onChange={handleCountryChange}>
                            <option value='USA'>United States</option>
                            <option value='CA'>Canada</option>

                        </select>
                    </label>
                    <label>
                        <p>Region</p>
                    <select >
                        <option value="">Select a state</option>
                        {(countrySelected === 'USA'? statesUSA : statesCanada).map((state) => (
                        <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                    </label>
                    <label>
                        <p>City</p>
                        <input type='text'></input>  
                    </label>
                    <label>
                        <p>Phone Number</p>
                        <input type='text'></input>  
                    </label>
                    <label>
                        <div className='signup__wrapper__content__checkbox'>
                            <input type="checkbox" name="" id="" /> 
                            <p>I agree to the <a href='#'>Terms of Service</a> and <a href='/privacy-policy'>Privacy Policy</a></p>

                        </div>
                    </label>
                    <button type='submit'>
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}
