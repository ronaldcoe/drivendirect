import {auth, firestore } from "./FirebaseConfig"
import {addDoc, collection, serverTimestamp, getDocs,getDoc, query , where, doc, updateDoc, setDoc, onSnapshot} from "@firebase/firestore"
import { loadStripe } from "@stripe/stripe-js";
import { createUserWithEmailAndPassword , signInWithEmailAndPassword} from 'firebase/auth'

const inventoryTradeCollectionRef = collection(firestore, 'inventoryTrade');
const inventoryListCollectionRef = collection(firestore, 'inventoryList');
const usersCollectionRef = collection(firestore, 'users');
const staticCollectionRef = collection(firestore, 'static data');
const stripeProductCollectionRef = collection(firestore, 'products');


/***********************InventoryList and Inventorytrade****************************************************** */

/**********************************************************************************************************
 * Creates a new inventory item based on the provided data.
 * @param {Object} data - The data for the inventory item.
 * @param {string} data.type - The type of inventory ("listing" or "trade").
 * @returns {Promise<boolean>} - A promise that resolves to true if the inventory item is successfully created, false otherwise.
 *****************************************************************************************/
export const createInventory = async (data) => {
  try {
    if (data.type === "listing" || data.type === "trade") {
      const collectionRef =
        data.type === "listing" ? inventoryListCollectionRef : inventoryTradeCollectionRef;

      await addDoc(collectionRef, data);
      return true;
    } else {
      throw new Error("Invalid inventory type");
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

/********************************************************************************
 * Retrieves all inventory items based on the provided entity, value, and type.
 * Updates the status of items that have passed 7 days from the creation date.
 * @param {string} entity - The entity field to filter by.
 * @param {*} value - The value to match for the entity field.
 * @param {string} type - The type of inventory ("listing" or "trade").
 * @returns {Promise<Array>} - A promise that resolves to an array of inventory items.
 ********************************************************************************/
export const getAllInventoryByEntity = async (entity, value, type) => {
  try {
    const q = query(
      type === "listing" ? inventoryListCollectionRef : inventoryTradeCollectionRef,
      where(entity, '==', value),
      where("status", '==', "Publish")
    );
    // Create the Snap
    const querySnapshot = await getDocs(q)
    // Map and filter the objects
    const currentDate = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(currentDate.getDate() - 7);
    // Map and send the Object
    const allinventory = querySnapshot.docs
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
    return allinventory;
  } catch (err) {
    console.log(err);
    return [];
  }
};

/*******************************************************************
 * Retrieves all inventory items of a specific type.
 * Updates the status of items that have passed 7 days from the creation date.
 * @param {string} type - The type of inventory ("listing" or "trade").
 * @returns {Promise<Array>} - A promise that resolves to an array of inventory items.
 *****************************************************************/
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

/*******************************************************
 * Retrieves inventory items based on the provided filters and type.
 * @param {Array} filters - An array of filters to apply.
 * @param {string} type - The type of inventory ("listing" or "trade").
 * @returns {Promise<Array>} - A promise that resolves to an array of inventory items.
 **********************************************************/
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

/*************************************************
 * Updates the inventory record with the provided updated data.
 * @param {string} inventoryId - The ID of the inventory record to update.
 * @param {Object} updatedData - The updated data to set for the inventory record.
 * @param {string} type - The type of inventory ("listing" or "trade").
 * @returns {Promise<boolean>} - A promise that resolves to true if the inventory record is successfully updated, false otherwise.
 ***********************************************************/
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

/**
 * Creates a new user with the provided user details.
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 * @param {string} firstName - The first name of the user.
 * @param {string} lastName - The last name of the user.
 * @param {string} businessName - The name of the user's business.
 * @param {string} businessType - The type of the user's business.
 * @param {string} website - The website URL of the user's business.
 * @param {string} country - The country of the user.
 * @param {string} region - The region of the user.
 * @param {string} city - The city of the user.
 * @param {string} phoneNumber - The phone number of the user.
 * @param {number} tradeMax - The maximum number of trades allowed for the user.
 * @param {number} searchMax - The maximum number of searches allowed for the user.
 * @returns {Promise<boolean>} - A promise that resolves to true if the user is successfully created, throws an error otherwise.
 */
export const createUser = async (email, password, firstName, lastName, businessName, 
                                  businessType, website, country, region, city, phoneNumber, tradeMax, searchMax) => {
  try {
    const userCreds = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCreds.user;
    localStorage.setItem("userId", user.uid)
    // Create the new user object
    const userData = {
      userId: user.uid,
      firstName: firstName,
      lastName: lastName,
      email: user.email,
      // Add other custom fields as needed
      businessName: businessName,
      businessType:businessType,
      website: website,
      country: country,
      region: region,
      city: city,
      phoneNumber: phoneNumber,
      tradeMax:tradeMax,
      searchMax:searchMax
    };

    // Store additional fields in Firestore and create the user collection
    const userRef = doc(usersCollectionRef, user.uid);
    await setDoc(userRef, userData);
    return true;

  } catch (error) {
    
    throw new Error(error); 
  }
};

/********************************************
 * Logs in a user with the provided email and password.
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<object>} - A promise that resolves to the user credentials object if the login is successful, throws an error otherwise.
 **********************************************************/
export const loginUser = async (email, password) => {
  try {
    const userCreds = await signInWithEmailAndPassword(auth, email, password);
    return userCreds;
    
  } catch (error) {
    console.log(error);
    throw new Error('User Login failed'); 
  }
};

/***********************************
 * Retrieves the user information for the provided user ID.
 * @param {string} id - The ID of the user.
 * @returns {Promise<object|boolean>} - A promise that resolves to the user information if the user is found, or false if the user is not found or an error occurs.
 ************************************/
export const getUserInfo = async (id) => {
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
};

/*******************************************************
 * Edits the user information for the provided user ID with the updated user data.
 * @param {string} id - The ID of the user.
 * @param {object} updatedUser - The updated user data to set.
 * @returns {Promise<object|boolean>} - A promise that resolves to the user information if the user is found and the update is successful, or false if the user is not found or an error occurs.
 *******************************************/
export const editUserInfo = async (id, updatedUser) => {
  try {
    const userDocRef = doc(usersCollectionRef, id);
    const docSnapshot = await getDoc(userDocRef);

    if (docSnapshot.exists()) {
      await setDoc(userDocRef, updatedUser);
      return updatedUser;
    } else {
      console.log('User not found');
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

/************************************STRIP LOGIC*************************************************** */

/*******************************************************
 * @description Grabs all the Products on the the stripe account along with their prices
 * @returns {Promise<object|boolean>} - A promise is resolved when all the Products along with thier prices are found and organized.
 *******************************************/
export const getAllStripeProducts = async () => {
  try {
    const q = query(
      stripeProductCollectionRef,
      where("active", "==", true),
    );

    const querySnapshot = await getDocs(q);
    const allProducts = querySnapshot.docs.map(async (doc) => {
      const productData = doc.data();
      const productId = doc.id;

      // Retrieve prices from the subcollection within the product document
      const pricesQuerySnapshot = await getDocs(
        collection(stripeProductCollectionRef, productId, 'prices')
      );
      const pricesData = pricesQuerySnapshot.docs.map((priceDoc) => ({ ...priceDoc.data(), id: priceDoc.id }));

      // Merge product data with prices
      const productWithPrices = {
        ...productData,
        id: pricesData.id,
        product_id: productId,
        prices: pricesData,
      };

      return productWithPrices;
    });

    // Wait for all product promises to resolve
    const allProductsData = await Promise.all(allProducts);

    return allProductsData;
  } catch (err) {
    console.log(err);
    return [];
  }
};

/*******************************************************
 * Handles the checkout from the website to stripe
 * @param {string} id this is the user Id used to link the user to that checkout which will create the subscription obeject and checkout object
 * @param {string} priceId this is the obejct that holds the price object for the product, the price is a seperate object
 * @returns {Promise<object|boolean>} - A promise is resolved when all the Products along with thier prices are found and organized.
 *******************************************/
export const stripeCheckOut = async (id, priceId) => {
  try {
    const userDocRef = doc(usersCollectionRef, id);
    const docSnapshot = await getDoc(userDocRef);

    if (docSnapshot.exists()) {
      const userDocData = docSnapshot.data();

      // Create a new document in the "checkout_sessions" subcollection of the user document
      const checkoutSessionsCollectionRef = collection(userDocRef, 'checkout_sessions');
      const newCheckoutSessionDocRef = await addDoc(checkoutSessionsCollectionRef, {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

      const unsubscribe = onSnapshot(newCheckoutSessionDocRef, async (snap) => {
        const { error, sessionId } = snap.data();
        if (error) {
          alert(error.message);
        }
        if (sessionId) {
          const stripe = await loadStripe("pk_test_51NUI59J155flwudekbXeaqNnxVtkrsIUC4ifIH32OSpULU5Oem03xYWDajz8q4cMT5Vbe57RgoGTTqf3kepJPnTr00VN5F3tFm");
          stripe.redirectToCheckout({ sessionId });
        }
      });

      return unsubscribe; // Return the unsubscribe function if needed for later cleanup
    } else {
      console.log('User not found');
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

/*******************************************************
 * @description Grabs all the subscription that a specific user has and retunr the active ones
 * The subscription model is with in the user model as a collection
 * @param {string} id this is the user Id used to link the user to check the subscription model
 * @returns {Array} returns and array of subscription that the user has
 *******************************************/
export const getSubscription = async (userId) =>{
  try {
      const subscriptionQuerySnapshot = await getDocs(
        collection(usersCollectionRef, userId, 'subscriptions')
      );
      const subscriptionDoc = subscriptionQuerySnapshot.docs.map((subDoc) => ({ ...subDoc.data(), id: subDoc.id }))
      .filter((subscription)=>
      {
        return subscription.status !="canceled"
      }
      );
      return subscriptionDoc

  } catch (error) {
    console.log (error)
    return null
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
    