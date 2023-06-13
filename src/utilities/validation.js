// Validate Data for user creation
function isValidUserDocument(firstName, lastName, email, dealership, website, country, region, city, phoneNumber) {

  
    let errors = []
  
    // Validation rules
    const validFirstName = firstName && typeof firstName === 'string' && firstName.length > 0;
    const validLastName = lastName && typeof lastName === 'string' && lastName.length > 0;
    const validEmail = email && typeof email === 'string' && email.length > 0;
    const validDealership = dealership && typeof dealership === 'string' && dealership.length > 0;
    const validWebsite = website && typeof website === 'string' && website.length > 0;
    const validCountry = country && typeof country === 'string' && country.length > 0;
    const validRegion = region && typeof region === 'string' && region.length > 0;
    const validCity = city && typeof city === 'string' && city.length > 0;
    const validPhoneNumber = phoneNumber && typeof phoneNumber === 'string' && phoneNumber.length > 0;
  
    !validFirstName && errors.push("Invalid First name");
    !validLastName && errors.push("Invalid Last name");
    !validEmail && errors.push("Invalid Email")
  
    return (
      errors
    );
  }