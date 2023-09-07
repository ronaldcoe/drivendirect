import React, { useEffect, useState } from 'react'
import '../../styles/blocks/signup.css'
import {createUser} from "../../Firebase/FirebaseStateManagement"
import { getCountries } from '../../Firebase/FirebaseStateManagement';
import DropDown from '../../shared/dropdown/DropDown';
import {useNavigate} from "react-router"
import { Store } from 'react-notifications-component';
import { getAllStripeProducts, stripeCheckOut } from '../../Firebase/FirebaseStateManagement';
import LoadingAnimation from '../../shared/Loading';

export default function Signup() {
    // Data for the Form
    const [countriesData, setCountriesData]= useState([])

    const navigate = useNavigate()
    
    // Get Static Data
    const fetchdata=async()=>{
        const data = await getCountries()
        setCountriesData(data[1])
      }
 
    
    // TODO store all the input values in a state
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [businessType, setBusinessType] = useState('')
    const [businessName, setBusinessName] = useState('')
    const [website, setWebsite] = useState('')
    const [country, setCountry] = useState(null)
    const [region, setRegion] = useState(null)
    const [city, setCity] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [acceptTerms, setAcceptTerms] = useState(false)
    const [tradeMax, setTradeMax] = useState()
    const [searchMax, setSearchMax] = useState()
    const [openSubscription, setOpenSubscription] = useState(false)
    const [priceId, setPriceId] = useState(null)
    const [accountStatus, setAccountStatus] = useState("active")

    /**************************STRIPE *********************/
    const [products, setProducts]= useState([])
    const [loading, setLoading] = useState(false)
    const checkout = async()=>{
        const userId = localStorage.getItem("userId")
      
        console.log(userId, priceId)
        await stripeCheckOut(userId, priceId)
    }

    useEffect(()=>{
        const fetchStripeProducts = async()=>{
            const products = await getAllStripeProducts()
            
            setProducts(products)
        }
        fetchStripeProducts()
    }, [])

    useEffect(() => {
        if (businessType === "rental") {
            setAccountStatus("pending")
        } else {
            setAccountStatus("active")
        }
    },[businessType])
 
  
    // Function to make sure we're not sending incorrect data
    const checkData = () => {

        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

        let errors = []
        
        let firstNameError = firstName === "" 
        firstNameError && errors.push("First Name can't be empty.")

        let lastNameError = lastName === "" 
        lastNameError && errors.push("Last Name can't be empty.")
        
        let passwordError = regex.test(password)
        !passwordError && errors.push("Password must match pattern")

        let confirmPasswordError = password !== confirmPassword
        confirmPasswordError && errors.push("Password confirmation must match")

        let businessTypeError = businessType === ""
        businessTypeError && errors.push("You need to select a business type")

        let businessNameError = businessName === ""
        businessNameError && errors.push("Business Name can't be empty")

        let websiteError = website === ""
        websiteError && errors.push("Website can't be empty")

        // let countryError = country === null
        // countryError && errors.push("You need to select a country")

        // let regionError = region === null
        // regionError && errors.push("You need to select a region")

        let cityError = city === ""
        cityError && errors.push("City can't be empty")

        let phoneNumberError = phoneNumber === ""
        phoneNumberError && errors.push("Phone number can't be empty")

        let acceptTermsError = acceptTerms === false
        acceptTermsError && errors.push("You need to accept the Terms of service")
        return errors
    }

    // Function to handle the SignUp, it will create the user and store in the DB
    const signUp= async (e)=>{
        e.preventDefault();
        let errors = checkData()

        if (errors) {
            errors.forEach((error) => {
              Store.addNotification({
                title: "Error",
                message: error,
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeInDown"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  showIcon: true
                }
              })
            })
        }

        if (errors.length === 0) {
            
            try {
         
                const success = await createUser(email, password, firstName, lastName,          
                    businessName, businessType,
                    website, country, region, city, phoneNumber, tradeMax, searchMax, accountStatus);
                if (success) {
                    setLoading(true)
                    setOpenSubscription(true)
                    checkout()
                                        
                } else {
                    Store.addNotification({
                        title: "Error",
                        message: "There was an issue while creating new account.",
                        type: "danger",
                        insert: "top",
                        container: "top-right",
                        animationIn: ["animate__animated", "animate__fadeInDown"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                        duration: 5000,
                        showIcon: true
                        }
                    })
                }
            } catch(error) {

                // This will throw a notification if the email already exist
                Store.addNotification({
                    title: "Error",
                    message: `${(error.message==="FirebaseError: Firebase: Error (auth/email-already-in-use).")&&"Email already exist."}`,
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeInDown"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                    duration: 5000,
                    showIcon: true
                    }
                })
            }
              
        }
    }
       
           
  useEffect(()=>{
    fetchdata()
    
  }, [])

  useEffect(()=> {
    if (businessType === "rental") {
        setTradeMax(10)
        setSearchMax(-1)
    }
    if (businessType === "dealer") {
        setTradeMax(2)
        setSearchMax(2)
    }
  })


  return (
    <div className='signup'>
        <div className='signup__wrapper'>
          
            <div className='signup__wrapper__description'>
                <h1>Create an Account</h1>
                <p>Once registered your information will be verified and an email will then be sent to you allowing you to enter a username and password.</p>
                
            </div>
            <div className='signup__wrapper__form'>
                
                <form onSubmit={signUp}>
                    <h2>Personal Information</h2>
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
                        <p className='signup__wrapper__form__details show_details'>*Password must be at least 8 characters long, contain an upper case, lower case letter, and a special character.</p>
                    </label>
                    <label>
                        <p>Confirm password</p>
                        <input type='password' required className={password !== confirmPassword? 'invalid' : password === ''? '' : 'valid'} onChange={(e)=>{setConfirmPassword(e.target.value)}}></input>
                        {password != confirmPassword? <p className='signup__wrapper__form__details show_details'>*Passwords must match</p>: ''} 
                    </label>
                    <h2 className='second'>Business Information</h2>
                    <p>What type of business are you?</p>

                    <div className='business_type_container'>
                    {products?.map((product, index)=>{
                      
                        return <label className='business_type' key={index}>
                                    <input type="radio" value={product.name==="Basic Renter Plan"?"rental":"dealer"} name="bussinesType" onChange={(e)=>{
                                        setBusinessType(e.target.value)
                                        setPriceId(product.prices[0].id)
                                        }}/>
                                    <div>
                                        <h3>{product.name}</h3>
                                        {/* <img src={product.images[0]} alt={product.name}/> */}
                                        <p>{product.description}</p>
                                       
                                    </div>
                                    <div className='price'>
                                    <p><strong>${parseFloat(product.prices[0].unit_amount)/100 }{product.prices[0].currency}/mo</strong></p>
                                    </div>
                                </label>
                    })}
                      
                    </div>
                    <label>
                        <p>Business Name</p>
                        <input type='text' required onChange={(e)=>{setBusinessName(e.target.value)}} minLength="2"></input>  
                    </label>
                    <label>
                        <p>Website</p>
                        <input type='text' required onChange={(e)=>{setWebsite(e.target.value)}}></input>  
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
                            <input type="checkbox" required onChange={() =>setAcceptTerms(!acceptTerms)} /> 
                            <p>I agree to the <a href='#'>Terms of Service</a> and <a href='/privacy-policy' target='_blank'>Privacy Policy</a></p>

                        </div>
                    </label>
                    <button className="signup_button" type='submit'>
                        {loading?<><LoadingAnimation /> Processing</>:"Register"}
                    </button>
                    <p className='signup__wrapper__form__details show_details'>When you click <strong>register</strong>, you will be <strong>re-directed</strong> to our payment dashboard</p>
                </form>
            </div>
            
        </div>
    </div>
  )
}
