import React, { useEffect, useState } from 'react'
import '../../styles/blocks/signup.css'
import Error from '../../shared/notifications/Error'
import {createUser} from "../../Firebase/FirebaseStateManagement"
import { getCountries } from '../../Firebase/FirebaseStateManagement';
import DropDown from '../../shared/dropdown/DropDown';
import {useNavigate} from "react-router"

export default function Signup() {
    // Data for the Form
    const [countriesData, setCountriesData]= useState([])

    const navigate = useNavigate()
    
    // Get Static Data
    const fetchdata=async()=>{
        const data = await getCountries()
        console.log(data)
        setCountriesData(data[1])
   
      }
 
    
    // TODO store all the input values in a state
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [dealership, setDealership] = useState('')
    const [website, setWebsite] = useState('')
    const [country, setCountry] = useState(null)
    const [region, setRegion] = useState(null)
    const [city, setCity] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    
    // Errors 
    const [errors, setErrors] = useState('')
    const [showError, setShowError] = useState(false)

    // Function to handle the SignUp, it will create the user and store in the DB
    const signUp= async (e)=>{
        e.preventDefault();
        try {
            const success = await createUser(email, password, firstName, lastName, dealership,
                                                website, country, region, city, phoneNumber);
            if (success) {
                console.log('User was created');
                navigate("/login")
                
            } else {
              console.log('User creation failed');
            }
          } catch (error) {
            setErrors(error[0])
            setShowError(true)
            console.log(errors)
          }
    }
           
  useEffect(()=>{
    fetchdata()
    
  }, [])


  return (
    <div className='signup'>
        {errors.length > 0 && showError ? errors.map((error) => {return (<Error key={error} close={{showError, setShowError}} message={error}/>)}):''}
        <div className='signup__wrapper'>
            
            <div className='signup__wrapper__description'>
                <h1>Create an Account</h1>
                <p>Once registered your information will be verified and an email will then be sent to you allowing you to enter a username and password. Thank you.</p>
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
                        <input type='password' required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>  

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
                        {countriesData?<DropDown   selectedOption={country} setSelectedOption={setCountry} data={Object.keys(countriesData)}/>:''}                       
                    </label>
                    <label>
                        <p>Region</p>
                        {countriesData?<DropDown  selectedOption={region} setSelectedOption={setRegion} data={countriesData[country]}/>:''}

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
