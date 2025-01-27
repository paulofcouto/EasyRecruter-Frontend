// src/services/enumService.js
import apiClient from "./api";

export const getEstados= async () => {
  try {
    const response = await apiClient.get("/v1/Enum/Estados");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar candidatos:", error);
    throw error;
  }
};