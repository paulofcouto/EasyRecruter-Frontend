// src/services/authServices.js
import apiClient from './api'; 

export const login = async (email, senha) => {
  try {
    const response = await apiClient.post('/v1/autenticar', { email, senha });
    const token = response.data.token;
    sessionStorage.setItem('authToken', token);
    return response;
  } catch (error) {
    console.error('Erro no login:', error.response?.data || error.message);
    throw error;
  }
};

export const cadastrar = async (email, senha) => {
  try {
    const response = await apiClient.post('/v1/Usuario/cadastrar', { email, senha });
    return response; 
  } catch (error) {
    console.error('Erro no cadastro:', error.response?.data || error.message);
    throw error;
  }
};
