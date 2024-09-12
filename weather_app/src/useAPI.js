import { useState, useEffect } from 'react';
import axios from 'axios';

const useAPI = (endpoint) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(endpoint);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const saveData = async (newData) => {
    console.log('Saving data:', newData);
    try {
      const response = await axios.post(endpoint, newData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setData([...data, response.data]);
      console.log('Data saved successfully:', response.data);
    } catch (error) {
      if (error.response) {
        console.error('Server error:', error.response.status, error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Request setup error:', error.message);
      }
      alert('Failed to save data.');
    }
  };
  

  const updateData = async (id, updatedData) => {
    try {
      const response = await axios.patch(`${endpoint}/${id}`, updatedData);
      setData(data.map((item) => (item.id === id ? response.data : item)));
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return { data, saveData, updateData };
};

export default useAPI;
