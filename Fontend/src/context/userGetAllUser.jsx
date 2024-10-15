// import React, { useEffect, useState } from 'react';
// import Cookies from "js-cookie";
// import axios from "axios";

// export default function userGetAllUser() {

//     const [allUsers, setAllUsers] = useState([]);
//     const [loading, setLoading] = useState([]);

//     useEffect(() => { 
//         const getUsers = async() => {
//             setLoading(true)
//     try {
//         const token = Cookies.get("jwt");
//         const response = await axios.get("/api/v1/getUserProfile", {
//             Credentials: "include",
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         }
//     );

//     setAllUsers(response.data);
//     setLoading(false);

//     } catch (error) {
//         console.log("Error on userGetAllUsers" + error);
//     }
// };
//   getUsers();
// }, []);

// return [allUsers, loading];
  
// }



import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import axios from "axios";

export default function userGetAllUser() {
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true); // Initialize loading to true

    useEffect(() => { 
        const getUsers = async() => {
            try {
                const token = Cookies.get("jwt");
                const response = await axios.get("/api/v1/getUserProfile", {
                    withCredentials: true, // Ensure this is set if you're using cookies
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log("API Response:", response.data); // Log the response to check the data format

                // Access the filterUsers array in the response
                const users = response.data.filterUsers || []; // Default to empty array if not found
                setAllUsers(users);
            } catch (error) {
                console.log("Error on userGetAllUsers:", error); // Log the error
            } finally {
                setLoading(false); // Ensure loading is set to false in the finally block
            }
        };

        getUsers();
    }, []);

    return [allUsers, loading];  
}
