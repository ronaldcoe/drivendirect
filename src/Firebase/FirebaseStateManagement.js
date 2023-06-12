import {auth, firestore } from "./FirebaseConfig"
import {addDoc, collection, serverTimestamp, getDocs, query , where} from "@firebase/firestore"
import { createUserWithEmailAndPassword , signInWithEmailAndPassword} from 'firebase/auth'

const sellListCollectionRef = collection(firestore, 'sellListing');
const searchListCollectionRef = collection(firestore, 'searchList');
const usersCollectionRef = collection(firestore, 'users');

/***********************SEARCH LIST CONTROLLER****************************************************** */
// create a list
export const createListing = async(data)=>{
      try{
          await addDoc(sellListCollectionRef, data)
          return 1
        }
      catch (err){
          console.log(err)
          return 0
        }
      }

// Get all listing
export const getAllLisitings = async()=>{
    try {
        const listingsSnapshot = await getDocs(sellListCollectionRef);
        const allListings = listingsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        return allListings;
        }
    catch (err){
        console.log(err)
        return 0
    }
}

// Getting All Listing by a value
export const getAllListingsByEntity = async (entity, value) => {
  try {

    // Create the Query
    const q = query(
      sellListCollectionRef,
      where(entity, '==', value)
    );
    // Create the Snap
    const querySnapshot = await getDocs(q)

    // Map and send the Object
    const allListings = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return allListings;
  
  } catch (err) {
    console.log(err);
    return [];
  }
};

/************************AUTH AND USER********************************************/

//Create new user
export const createUser = async (email, password, firstName, lastName) => {
  try {
    const userCreds = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCreds.user;
    
    // Create the new user object
    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: user.email,
      // Add other custom fields as needed
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
    throw new Error('User creation failed'); 
  }
};