import {auth, firestore } from "./FirebaseConfig"
import {addDoc, collection, serverTimestamp, getDocs,getDoc, query , where, doc, updateDoc, setDoc} from "@firebase/firestore"
import { createUserWithEmailAndPassword , signInWithEmailAndPassword} from 'firebase/auth'

const inventoryTradeCollectionRef = collection(firestore, 'inventoryTrade');
const inventoryListCollectionRef = collection(firestore, 'inventoryList');
const usersCollectionRef = collection(firestore, 'users');
const staticCollectionRef = collection(firestore, 'static data');


/***********************InventoryList and Inventorytrade****************************************************** */
// create an inventory
export const createInventory = async(data)=>{
      try{
        if(data.type =="listing"){
          await addDoc(inventoryListCollectionRef, data)
          return true
        }
        else if (data.type == "trade"){
          await addDoc(inventoryTradeCollectionRef, data)
          return true
        }}
      catch (err){
          console.log(err)
          return false
        }
      }

// Getting All Listing by a value and Filter all the active products
// Also only return items that are within the 7 days from creation
export const getAllInventoryByEntity = async (entity, value, type) => {
  
  try {
    let q = ''
     // Create the Query
    if (type == "listing"){
      q = query(
      inventoryListCollectionRef,
      where(entity, '==', value),
      where("status", '==',"Publish")
    );}

    else if (type == "trade"){
      q = query(
      inventoryTradeCollectionRef,
      where(entity, '==', value),
      where("status", '==',"Publish")
    );}
   
    // Create the Snap
    const querySnapshot = await getDocs(q)
    // Map and filter the objects
    const currentDate = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(currentDate.getDate() - 7);
    // Map and send the Object
    const allinventory = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    .filter((vehicle) => {
      const targetDate = new Date(vehicle.dateCreate.seconds * 1000);

      const timeDifference = currentDate.getTime() - targetDate.getTime();
      const daysDifference = timeDifference / (1000 * 3600 * 24);

      if (daysDifference >= 7) {
        // Make the update
        // This needs to be done in Cloud Function and not here because its slow and not efficient
        const updatedData = {
          ...vehicle,
          status: "Delete"
        };
        console.log(updatedData);

        if (type === "listing") {
          const inventoryRef = doc(inventoryListCollectionRef, vehicle.id);
          setDoc(inventoryRef, updatedData);
        } else if (type === "trade") {
          const inventoryRef = doc(inventoryTradeCollectionRef, vehicle.id);
          setDoc(inventoryRef, updatedData);
        }

        return false; // Exclude vehicles where 7 days have passed
      } else {
        return true; // Include vehicles within the last 7 days
      }
    });
    return allinventory;
  

  } catch (err) {
    console.log(err);
    return [];
  }
};

// Getting Inventory By Type, this also filters out the deleted products
// It also update products that has a passed the 7 Days mark
// which needs to be done elsewhere in the future
export const getAllInventoryBytype = async (type) => {
  try {
    let q = '';
    // Create the Query
    if (type === "listing") {
      q = query(
        inventoryListCollectionRef,
        where("status", "!=", "Delete")
      );
    } else if (type === "trade") {
      q = query(
        inventoryTradeCollectionRef,
        where("status", "!=", "Delete")
      );
    }

    // Create the Snap
    const querySnapshot = await getDocs(q);
    // Map and filter the objects
    const currentDate = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(currentDate.getDate() - 7);

    const allInventory = querySnapshot.docs
      .map((doc) => ({ ...doc.data(), id: doc.id }))
      .filter((vehicle) => {
        const targetDate = new Date(vehicle.dateCreate.seconds * 1000);

        const timeDifference = currentDate.getTime() - targetDate.getTime();
        const daysDifference = timeDifference / (1000 * 3600 * 24);

        if (daysDifference >= 7) {
          // Make the update
          // This needs to be done in Cloud Function and not here because its slow and not efficient
          const updatedData = {
            ...vehicle,
            status: "Delete"
          };
          console.log(updatedData);

          if (type === "listing") {
            const inventoryRef = doc(inventoryListCollectionRef, vehicle.id);
            setDoc(inventoryRef, updatedData);
          } else if (type === "trade") {
            const inventoryRef = doc(inventoryTradeCollectionRef, vehicle.id);
            setDoc(inventoryRef, updatedData);
          }

          return false; // Exclude vehicles where 7 days have passed
        } else {
          return true; // Include vehicles within the last 7 days
        }
      });

    return allInventory;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// get inventory based on Filters
export const getAllInventoryByFilters = async (filters, type) => {
  try {

    let queryRef = ''
    if(type == "listing"){
      queryRef = inventoryListCollectionRef;
    }
    else if(type == "trade"){
      queryRef = inventoryTradeCollectionRef;
    }

    // Apply multiple where clauses based on the filters
    filters.forEach((filter) => {
      const { entity, operator, value } = filter;
      queryRef = queryRef.where(entity, operator, value);
    });

    // Execute the query
    const querySnapshot = await queryRef.get();

    // Map and send the objects
    const allInventory = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return allInventory;
    
  } catch (err) {
    console.log(err);
    return [];
  }
};

// Edit a inventory based on the Type
export const updateInventoryRecord = async (inventoryId, updatedData, type) => {
  try {
    let inventoryRef = ''
    if (type =="listing"){
      inventoryRef = doc(inventoryListCollectionRef, inventoryId);
    }
    

    else if (type == "trade"){
      inventoryRef = doc(inventoryTradeCollectionRef, inventoryId);
    }

    const docSnapshot = await getDoc(inventoryRef);

    if (docSnapshot.exists()) {
      const inventory = docSnapshot.data();
      await setDoc(inventoryRef, updatedData);
      return true
    } else {
      console.log('Inventory not updated');
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};


/******************************************************************************** */

/************************AUTH AND USER********************************************/

//Create new user
export const createUser = async (email, password, firstName, lastName, dealership, 
                                  businessType, website, country, region, city, phoneNumber) => {
  try {
    const userCreds = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCreds.user;
    
    // Create the new user object
    const userData = {
      userId: user.uid,
      firstName: firstName,
      lastName: lastName,
      email: user.email,
      // Add other custom fields as needed
      dealership: dealership,
      businessType:businessType,
      website: website,
      country: country,
      region: region,
      city: city,
      phoneNumber: phoneNumber
    };

    // Store additional fields in Firestore and create the user collection
    const userRef = doc(usersCollectionRef, user.uid);
    await setDoc(userRef, userData);
    return true;

  } catch (error) {
    
    throw new Error(error); 
  }
};


// Login user
export const loginUser = async (email, password) => {
  try {
    const userCreds = await signInWithEmailAndPassword(auth, email, password);
    return userCreds;
    
  } catch (error) {
    console.log(error);
    throw new Error('User Login failed'); 
  }
};

// Get User by ID
export const getUserInfo= async (id)=>{
  try {
    const userDocRef = doc(usersCollectionRef, id);
    const docSnapshot = await getDoc(userDocRef);
  
    if (docSnapshot.exists()) {
      const user = docSnapshot.data();  
      return user;
    } else {
      console.log('User not found');
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

// Edit User
export const editUserInfo = async (id, updatedUser)=>{
  try {
    const userDocRef = doc(usersCollectionRef, id);
    const docSnapshot = await getDoc(userDocRef);
  
    if (docSnapshot.exists()) {
      const user = docSnapshot.data();  
      await setDoc(userDocRef, updatedUser);
      return user;
    } else {
      console.log('User not found');
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}
/****************************************************************************************** */

/*************************************ENTER STATIC DATA****************
 *  const data ={
      countries:{
        USA :[
          'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
          'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
          'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
          'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
          'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
          'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
          'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
          'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia',
          'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
        ],
        Canada : [
        'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador',
        'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island',
        'Quebec', 'Saskatchewan', 'Yukon'
        ]
      }
    }
    const enter =async()=>{
      await enterStaticData(data)
    }
 * enter()
 * ****************** */
export const enterStaticData= async(data)=>{
  await addDoc(staticCollectionRef, data)
  return true
}




// Get all countries
export const getCountries = async () => {
  try {
    const querySnapshot = await getDocs(staticCollectionRef);

    // Map the data and extract the countries field
    const countries = querySnapshot.docs.map((doc) => doc.data().countries);
    return countries;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Get all Vehicles
export const getVehicles = async () => {
  try {
    const querySnapshot = await getDocs(staticCollectionRef);

    // Map the data and extract the vehicles field
    const vehicles = querySnapshot.docs.map((doc) => doc.data().vehicles);
    return vehicles;
  } catch (error) {
    console.log(error);
    return [];
  }
};

/*************************************************************************************** */
