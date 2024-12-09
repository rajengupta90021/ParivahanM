import axios from 'axios';

// Use the provided token value

// Function to fetch users with Authorization token from localStorage
export const fetchUsers = async () => {
    const tokenvalue = localStorage.getItem('authToken');

    console.log("token value ",tokenvalue)
    if (tokenvalue) {
        try {
            const response = await axios.get('https://us-central1-courtchallanrto.cloudfunctions.net/api/users', {
                headers: {
                    'Authorization': tokenvalue, // Pass the token as Authorization header
                    'Content-Type': 'application/json' // Set the content type to JSON
                }
            });
            return response.data; // Return the response data
        } catch (error) {
            console.error('Error fetching data:', error); // Handle any errors
        }
    } else {
        console.log('Authorization token is not available');
    }
};



// Function to update a user with Authorization token from localStorage
export const updateUser = async (userId, userData) => {
    const tokenvalue = localStorage.getItem('authToken');
    console.log("token value ", tokenvalue);

    if (tokenvalue) {
        try {
            const response = await axios.put(
                `https://us-central1-courtchallanrto.cloudfunctions.net/api/updateUser/${userId}`,
                userData,
                {
                    headers: {
                        'Authorization': tokenvalue,
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response.data;  // Return the updated user data or any other response
        } catch (error) {
            console.error('Error updating user:', error);
        }
    } else {
        console.log('Authorization token is not available');
    }
};
