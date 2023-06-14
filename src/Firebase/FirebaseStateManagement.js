import {auth, firestore } from "./FirebaseConfig"
import {addDoc, collection, serverTimestamp, getDocs, query , where} from "@firebase/firestore"
import { createUserWithEmailAndPassword , signInWithEmailAndPassword} from 'firebase/auth'

const inventoryTradeCollectionRef = collection(firestore, 'inventoryTrade');
const inventoryListCollectionRef = collection(firestore, 'inventoryList');
const usersCollectionRef = collection(firestore, 'users');


/***********************InventoryList and Inventorytrade****************************************************** */
// create an inventory
export const createInventory = async(data)=>{
      try{
        if(data.type =="list"){
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

// Getting All Listing by a value
export const getAllInventoryByEntity = async (entity, value, type) => {
  try {
    let q = ''

     // Create the Query
    if (type =="list"){
      q = query(
      inventoryListCollectionRef,
      where(entity, '==', value)
    );}

    else if (type == "trade"){
      q = query(
      inventoryListCollectionRef,
      where(entity, '==', value)
    );}
   
    // Create the Snap
    const querySnapshot = await getDocs(q)

    // Map and send the Object
    const allinventory = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return allinventory;
  

  } catch (err) {
    console.log(err);
    return [];
  }
};


// get inventory based on Filters
export const getAllInventoryByFilters = async (filters, type) => {
  try {

    let queryRef = ''
    if(type == "list"){
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

// Edit a inventory
export const updateInventoryRecord = async (inventoryId, updatedData, type) => {
  try {
    let inventoryRef = ''
    if (type =="list"){
      inventoryRef = doc(inventoryListCollectionRef, inventoryId);
    }

    else if (type == "trade"){
      inventoryRef = doc(inventoryTradeCollectionRef, inventoryId);
    }
    
    await updateDoc(inventoryRef, updatedData);
    console.log("Record updated successfully");
    return true

  } catch (err) {
    console.log(err);
    return false
  }
};

// Change status of the Inventory (Sold, Found)
export const updateInventoryStatus = async (inventoryId) => {
  try {

    let inventoryRef = ''
    if (type =="list"){
      inventoryRef = doc(inventoryListCollectionRef, inventoryId);
    }

    else if (type == "trade"){
      inventoryRef = doc(inventoryTradeCollectionRef, inventoryId);
    }

    await updateDoc(inventoryRef, { ["Status"]: false  });
    console.log("Value updated successfully");
  } catch (err) {
    console.log(err);
  }
};

/******************************************************************************** */

/************************AUTH AND USER********************************************/

//Create new user
export const createUser = async (email, password, firstName, lastName, dealership,
                                  website, country, region, city, phoneNumber) => {
  try {
    const userCreds = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCreds.user;
    
    // Create the new user object
    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: user.email,
      // Add other custom fields as needed
      dealership: dealership,
      website: website,
      country: country,
      region: region,
      city: city,
      phoneNumber: phoneNumber
    };

    // Store additional fields in Firestore and create the user collection
    await addDoc(usersCollectionRef, userData);
    return true;

  } catch (error) {
    console.log(error);
    throw new Error('User creation failed'); 
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

/****************************************************************************************** */


