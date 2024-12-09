import axios from 'axios';

export const PUCRepository = async () => {
  const token = localStorage.getItem('authToken');  // Retrieve the auth token from localStorage

  // Check if token exists before making the request
  if (!token) {
    throw new Error('Authentication token is missing.');
  }

  try {
    // Make the API request with authorization headers
    const response = await axios.get('https://us-central1-courtchallanrto.cloudfunctions.net/api/puc/vehicles', {
      headers: {
        Authorization: `${token}`,  // Set the Authorization header with the token
      },
    });

    // Log the response data to understand its structure
    console.log('API response:', response);

    // Ensure response.data is defined and check if it contains success and data fields
    if (response.data && response.data.success && Array.isArray(response.data.data)) {
      const vehicles = response.data.data;
      
      // Map over the response data to extract necessary information
      const formattedVehicles = vehicles.map(vehicle => {
        return {
          id: vehicle.id,
          userId: vehicle.userId,
          vehicleNumber: vehicle.vehicleNumber,
          rtoCode: vehicle.rtoCode,
          fuelType: vehicle.fuelType,
          status: vehicle.status,
          timestamp: new Date(vehicle.timestamp._seconds * 1000).toLocaleString(),
          frontImageUrl: vehicle.frontImageUrl,
          backImageUrl: vehicle.backImageUrl,
          fileUrl: vehicle.fileUrl || null,
          textContent: vehicle.textContent || null,
        };
      });

      // Sort the formatted vehicles by timestamp in descending order (most recent first)
      const sortedVehicles = formattedVehicles.sort((a, b) => {
        const timestampA = new Date(a.timestamp).getTime();  // Convert to milliseconds for comparison
        const timestampB = new Date(b.timestamp).getTime();
        return timestampB - timestampA;  // Most recent first
      });

      return sortedVehicles; // Return the sorted and formatted vehicle data
    } else {
      throw new Error('Failed to retrieve valid vehicle data or response format is incorrect');
    }
  } catch (error) {
    console.error('Error fetching PUC data:', error);
    throw new Error('Failed to fetch data from the PUC API');
  }
};
