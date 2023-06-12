import React, { useState } from 'react'
import '../../styles/blocks/signup.css'

export default function Signup() {



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
    
    
    
    const [isFocused, setIsFocused] = useState(false);


    // TODO store all the input values in a state
    const [name, setName] = useState('')
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
    const [passwordMatchError, setPasswordMatchError] = useState(true);
  
    let info = {
        name: name,
        lastName: lastName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        dealership: dealership,
        website: website,
        country: country,
        region: region,
        city: city,
        phoneNumber: phoneNumber,
    }
    console.log(confirmPassword)
    console.log(info)
    const handleFocus = () => {
      setIsFocused(true);
    };
  
    const handleBlur = () => {
      setIsFocused(false);
    };
  
    // HANDELERS FOR FORM VALUES
    const handleName = (event) => {
        setName(event.target.value)
    }

    const handleLastName = (event) => {
        setLastName(event.target.value)
    }

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }
    const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value)
    }

    const handleDealership = (event) => {
        setDealership(event.target.value)
    }
    
    const handleWebsite = (event) => {
        event.preventDefault()
        setWebsite(event.target.value)
    }

    const handleCountry = (event) => {
        setCountry(event.target.value);
    };
  
    const handleRegion = (event) => {
        setRegion(event.target.value)
    }

    const handleCity = (event) => {
        setCity(event.target.value)
    }

    const handlePhoneNumber = (event) => {
        setPhoneNumber(event.target.value)
    }
 
  
    const handleFormSubmit = (event) => {
      event.preventDefault();
  
      if (confirmPassword !== event.target.password.value) {
        setPasswordMatchError(true);
      } else {
        // Passwords match, proceed with form submission
        setPasswordMatchError(false);
        // TODO: Submit form data or perform further actions
      }
    };
  
  
  return (
    <div className='signup'>
        <div className='signup__wrapper'>
            <div className='signup__wrapper__description'>
                <h1>Create an Account</h1>
                <p>Once registered your information will be verified and an email will then be sent to you allowing you to enter a username and password. Thank you.</p>
            </div>
            <div className='signup__wrapper__content'>
                
                <form action="" method="get">
                    <label>
                        <p>First Name</p>
                        <input type='text' required pattern="[a-zA-ZÀ-ÿ\s'-]+" minLength="2" title='Please provide your first name' onChange={handleName}></input>  
                    </label>  
                    <label>
                        <p>Last Name</p>
                        <input type='text' required pattern="[a-zA-ZÀ-ÿ\s'-]+" minLength="2" title='Please provide your last name' onChange={handleLastName}></input>  
                    </label>
                    <label>
                        <p>Email</p>
                        <input type='email' required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" title='Please provide a valid email' onChange={handleEmail}></input>  
                    </label>
                    <label>
                        <p>Password</p>
                        <input type='password' required pattern="^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])[A-Za-z0-9!@#$%^&*]{8,}$"  onFocus={handleFocus} onBlur={handleBlur} onChange={handlePassword}></input>
                        <p className={`signup__wrapper__content__details ${isFocused ? 'show_details' : ''}`}>
                            *Must be at least 8 characters long, contain an uppercase letter, and include one of the following symbols: !@#$%^&*
                        </p>  
                    </label>
                    <label>
                        <p>Confirm password</p>
                        <input type='password' className={password !== confirmPassword? 'invalid' : password === ''? '' : 'valid'} onChange={handleConfirmPassword}></input>
                        {password != confirmPassword? <p className='signup__wrapper__content__details show_details'>*Passwords must match</p>: ''} 
                    </label>
                    <label>
                        <p>Dealership Name</p>
                        <input type='text' onChange={handleDealership} required minLength="2"></input>  
                    </label>
                    <label>
                        <p>Website</p>
                        <input type='text' onChange={handleWebsite} required pattern="^(https?://)?[\w.-]+\.[a-zA-Z]{2,}(\/\S*)?$"></input>  
                    </label>
                    <label>
                        <p>Country</p>
                        <select value={country} required onChange={handleCountry}>
                            <option value='' selected>Select Country</option>
                            <option value='USA'>United States</option>
                            <option value='CA'>Canada</option>

                        </select>
                    </label>
                    <label>
                        <p>Region</p>
                    <select onChange={handleRegion} required>
                        <option value="">Select a Region</option>
                        {(country === 'USA'? statesUSA : country === 'CA' ? statesCanada : []).map((state) => (
                        <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                    </label>
                    <label>
                        <p>City</p>
                        <input type='text' onChange={handleCity}  required minLength="2"></input>  
                    </label>
                    <label>
                        <p>Phone Number</p>
                        <input type='tel' onChange={handlePhoneNumber} required></input>  
                    </label>
                    <label>
                        <div className='signup__wrapper__content__checkbox'>
                            <input type="checkbox" name="" id="" /> 
                            <p>I agree to the <a href='#'>Terms of Service</a> and <a href='/privacy-policy'>Privacy Policy</a></p>

                        </div>
                    </label>
                    <button>
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}
