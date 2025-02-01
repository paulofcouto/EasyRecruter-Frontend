// src/services/empresaService.js
import apiClient from "./api";

export const cadastrarEmpresa = async (empresa) => {
  try {
    const response = await apiClient.post('/v1/Empresa', empresa);
    return response.data; // Retorna os dados da resposta do backend
  } catch (error) {
    console.error('Erro no cadastro de empresa:', error.response?.data || error.message);
    throw error;
  }
};

export const obterEmpresaDetalhado = async () => {
  try {
    const response = await apiClient.get('/v1/Empresa/EmpresaDetalhado');
    return response.data; // Retorna os dados detalhados da empresa
  } catch (error) {
    console.error('Erro ao obter os dados da empresa:', error.response?.data || error.message);
    throw error;
  }
};