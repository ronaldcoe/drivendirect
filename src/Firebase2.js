// import React, { useState, useEffect } from "react";

// import {firestore} from "./Firebase/FirebaseConfig"
// import { createListing, getAllLisitings, getAllListingsByEntity } from "./Firebase/FirebaseStateManagement";

// function Firebase() {
//     const [title, setTitle] = useState("")
//     const [listings, setListings] = useState([])

//     const handleChange =(e)=>{
//     setTitle(e.target.value)
//     console.log(title)
//     }

//     const createTodo = async(e)=>{
//       e.preventDefault()
//       const result = await createListing({title:title})
//       if (result === 1) {
//         console.log("Success")
//       } else {
//         console.log("Fail"); // Error
//       }
//     }

//   useEffect(() => {
//     const fetchListings = async () => {
//       try {
//         const allListings = await getAllListingsByEntity("title","2004");
//         console.log(allListings)
//         setListings(allListings);
//       } catch (err) {
//         console.log(err);
//         // Handle error if needed
//       }
//     };

//     fetchListings();
//   }, []);
//   return <div>
//     <h1>Test</h1>
//     <form>
//         <input type="text" onChange={handleChange}/>
//         <button onClick={createTodo}>Add</button>
//     </form>
//       <div>
//       {listings?.map((listing) => (
//         <div key={listing.id}>
//           <p>{listing.title}</p>
//         </div>
//       ))}
//     </div>
//   </div>;
// }

// export default Firebase;
