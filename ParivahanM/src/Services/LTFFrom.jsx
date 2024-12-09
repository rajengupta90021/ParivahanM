import axios from 'axios';

export const GetltfFrom = async () => {
    const tokenvalue = localStorage.getItem('authToken'); // Get the auth token from localStorage

    if (tokenvalue) {
        try {
            // Send a GET request with the Authorization header
            const response = await axios.get('https://us-central1-courtchallanrto.cloudfunctions.net/api/ltf/learningTestForms', {
                headers: {
                    'Authorization': tokenvalue, // Pass the token as Authorization header
                    'Content-Type': 'application/json' // Ensure content type is JSON
                }
            });

            // Check if the response contains success data
            if (response.data.success) {
                const data = response.data.data; // Get the data from the response
                console.log("Response Data:", data); // Print the data to the console
                return data;
            } else {
                console.error('Request was not successful');
            }
        } catch (error) {
            console.error('Error fetching data:', error); // Handle any errors
        }
    } else {
        console.log('Authorization token is not available');
    }
};

// New Method to get Learning Test Form by ID
export const getltffrombyid = async (id) => {
    const tokenvalue = localStorage.getItem('authToken'); // Get the auth token from localStorage

    if (tokenvalue) {
        try {
            const response = await axios.get(`https://us-central1-courtchallanrto.cloudfunctions.net/api/ltf/learningTestForms/${id}`, {
                headers: {
                    'Authorization': tokenvalue, // Pass the token as Authorization header
                    'Content-Type': 'application/json' // Ensure content type is JSON
                }
            });

            if (response.data.success) {
                const data = response.data.data; // Get the data from the response
                console.log("Response Data for ID:", data);
                return data;
            } else {
                console.error('Request was not successful');
            }
        } catch (error) {
            console.error('Error fetching data by ID:', error);
        }
    } else {
        console.log('Authorization token is not available');
    }
};




// Method to update transaction status with transactionId in the URL
export const updateTransactionStatus = async (transactionId, status) => {
    const tokenvalue = localStorage.getItem('authToken'); // Get the auth token from localStorage

    if (!tokenvalue) {
        console.log('Authorization token is not available');
        return;
    }

    // Log the transactionId and status before making the API call
    console.log('Updating transaction with ID:', transactionId, 'Status:', status);

    try {
        const response = await axios.put(
            `https://us-central1-courtchallanrto.cloudfunctions.net/api/payment/transaction/${transactionId}`,
            { status: status }, // Pass status in the request body
            {
                headers: {
                    'Authorization': tokenvalue, // Pass the token as Authorization header
                    'Content-Type': 'application/json' // Ensure content type is JSON
                }
            }
        );

        // Log the response to see if the status is updated
        console.log('Response from updating transaction status:', response);

        if (response.data.success) {
            console.log("Transaction Status Updated:", response.data.data);
            return response.data.data;  // Return the updated transaction data
        } else {
            console.error('Failed to update transaction status');
        }
    } catch (error) {
        console.error('Error updating transaction status:', error); // Handle any errors
    }
};

  