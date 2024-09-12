import axios from 'axios';

export const API_BASE_URL = 'http://localhost:3000'; // Export this constant

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
// Get all users
export const getUsers = async (token) => {
  try {
    const response = await api.get('/users', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
};

// Create a new user
export const createUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
};

// Login a user
export const loginUser = async (loginData) => {
  try {
    const response = await api.post('/login', loginData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
};

// Create a new recipe
export const createRecipe = async (recipeData, token) => {
  try {
    const response = await api.post('/recipes', recipeData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
};

// Get all recipes
export const getRecipes = async (token) => {
    try {
      const response = await api.get('/recipes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data; // Ensure this is an array
    } catch (error) {
      console.error('Error fetching recipes:', error);
      throw error;
    }
  };
// Delete a recipe
export const deleteRecipe = async (recipeId, token) => {
  try {
    await api.delete(`/recipes/${recipeId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
};

// Create a new comment on a recipe
export const createComment = async (recipeId, commentData, token) => {
  try {
    const response = await api.post(`/recipes/${recipeId}/comments`, commentData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
};

// Delete a comment from a recipe
export const deleteComment = async (recipeId, commentId, token) => {
  try {
    await api.delete(`/recipes/${recipeId}/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
};

// Like a recipe
export const likeRecipe = async (recipeId, token) => {
  try {
    const response = await api.post(`/recipes/${recipeId}/like`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
};

// Unlike a recipe
export const unlikeRecipe = async (recipeId, token) => {
  try {
    const response = await api.post(`/recipes/${recipeId}/unlike`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
};

// Like a comment
export const likeComment = async (recipeId, commentId, token) => {
  try {
    const response = await api.post(`/recipes/${recipeId}/comments/${commentId}/like`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
};

// Unlike a comment
export const unlikeComment = async (recipeId, commentId, token) => {
  try {
    const response = await api.post(`/recipes/${recipeId}/comments/${commentId}/unlike`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
};
