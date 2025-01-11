// src/services/candidatoService.js
import api from "./api";

export const getCandidatos = async () => {
  try {
    const response = await api.get("/v1/Candidato/candidatos");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar candidatos:", error);
    throw error;
  }
};

export const deleteCandidato = async (id) => {
  try {
    await api.delete(`/v1/Candidato/${id}`);
  } catch (error) {
    console.error("Erro ao excluir candidato:", error);
    throw error;
  }
};
