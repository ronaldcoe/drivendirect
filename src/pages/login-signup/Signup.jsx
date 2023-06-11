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
    

    const [countrySelected, setCountrySelected] = useState('USA')

    const handleCountryChange = (event) => {
        setCountrySelected(event.target.value)
    }

  
  return (
    <div className='signup'>
        <div className='signup__wrapper'>
            <div className='signup__wrapper__content'>
                <h1>Create an Account</h1>
                <form action="" method="get">
                    <label>
                        <p>First Name</p>
                        <input type='text'></input>  
                    </label>  
                    <label>
                        <p>Last Name</p>
                        <input type='text'></input>  
                    </label>
                    <label>
                        <p>Email</p>
                        <input type='email'></input>  
                    </label>
                    <label>
                        <p>Password</p>
                        <input type='password'></input>  
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
                    <button>
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}
