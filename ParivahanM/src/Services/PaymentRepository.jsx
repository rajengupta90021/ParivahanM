import axios from 'axios';

// Define the function to get all payment transactions
export const PaymentRepository = async () => {
  const token = localStorage.getItem('authToken');  // Retrieve the auth token from localStorage

  if (token) {
    try {
      // Send the GET request with the Authorization header
      const response = await axios.get('https://us-central1-courtchallanrto.cloudfunctions.net/api/payment/transaction', {
        headers: {
          'Authorization': token, // Pass the token in the Authorization header
          'Content-Type': 'application/json', // Ensure content type is JSON
        },
      });

      // Check if the response was successful
      if (response.data.success) {
        console.log('Payments Retrieved Successfully:', response.data.data);
        return response.data.data; // Return the data of transactions
      } else {
        console.error('Failed to retrieve payments:', response.data.message);
        return [];
      }
    } catch (error) {
      console.error('Error fetching payment transactions:', error); // Handle any errors during the request
      return [];
    }
  } else {
    console.error('Authorization token not available');
    return [];  // Return an empty array if no token is found
  }
};
