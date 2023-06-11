import { firestore } from "./FirebaseConfig"
import {addDoc, collection, serverTimestamp, getDocs, query , where} from "@firebase/firestore"


const sellListCollectionRef = collection(firestore, 'sellListing');
const searchListCollectionRef = collection(firestore, 'searchList');

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
