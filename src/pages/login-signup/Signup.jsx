import React, { useState } from 'react'
import '../../styles/blocks/signup.css'
import {createUser} from "../../Firebase/FirebaseStateManagement"

export default function Signup() {

    // TODO store all the input values in a state
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [dealership, setDealership] = useState('')
    const [website, setWebsite] = useState('')
    const [country, setCountry] = useState('')
    const [region, setRegion] = useState('')
    const [city, setCity] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    
    // Function to handle the SignUp, it will create the user and store in the DB
    const signUp= async (e)=>{
        e.preventDefault();
        try {
            const success = await createUser(email, password, firstName, lastName, dealership,
                                                website, country, region, city, phoneNumber);
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
    
       
  

  return (
    <div className='signup'>
        <div className='signup__wrapper'>
            <div className='signup__wrapper__description'>
                <h1>Create an Account</h1>
            </div>
            <div className='signup__wrapper__form'>
                <form onSubmit={signUp}>
                    <label>
                        <p>First Name</p>
                        <input type='text' required value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}></input>  
                    </label>  
                    <label>
                        <p>Last Name</p>
                        <input type='text' required value={lastName} onChange={(e)=>{setLastName(e.target.value)}}></input>  
                    </label>
                    <label>
                        <p>Email</p>
                        <input type='email' required value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>  
                    </label>
                    <label>
                        <p>Password</p>
                        <input type='password' required value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>  

                    </label>
                    <label>
                        <p>Confirm password</p>
                        <input type='password' required className={password !== confirmPassword? 'invalid' : password === ''? '' : 'valid'} onChange={(e)=>{setConfirmPassword(e.target.value)}}></input>
                        {password != confirmPassword? <p className='signup__wrapper__form__details show_details'>*Passwords must match</p>: ''} 
                    </label>
                    <label>
                        <p>Dealership Name</p>
                        <input type='text' required onChange={(e)=>{setDealership(e.target.value)}} minLength="2"></input>  
                    </label>
                    <label>
                        <p>Website</p>
                        <input type='text' required onChange={(e)=>{setWebsite(e.target.value)}} pattern="^(https?://)?[\w.-]+\.[a-zA-Z]{2,}(\/\S*)?$"></input>  
                    </label>
                    <label>
                        <p>Country</p>
                        <select value={country} required onChange={(e)=>{setCountry(e.target.value)}}>
                            <option value='' selected>Select Country</option>
                            <option value='USA'>United States</option>
                            <option value='CA'>Canada</option>

                        </select>
                    </label>
                    <label>
                        <p>Region</p>
                    <select onChange={(e)=>{setRegion(e.target.value)}} required>
                        <option value="">Select a Region</option>
                        {(country === 'USA'? statesUSA : country === 'CA' ? statesCanada : []).map((state) => (
                        <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                    </label>
                    <label>
                        <p>City</p>
                        <input type='text' onChange={(e)=>{setCity(e.target.value)}}  required minLength="2"></input>  
                    </label>
                    <label>
                        <p>Phone Number</p>
                        <input type='tel' onChange={(e)=>{setPhoneNumber(e.target.value)}} required></input>  
                    </label>
                    <label>
                        <div className='signup__wrapper__form__checkbox'>
                            <input type="checkbox" required name="" id="" /> 
                            <p>I agree to the <a href='#'>Terms of Service</a> and <a href='/privacy-policy' target='_blank'>Privacy Policy</a></p>

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
