<template>
  <div class="recrutamento-container">
    <div class="search-box">
      <el-input v-model="searchQuery" placeholder="Buscar candidatos...">
        <template #prepend>
          <el-button :icon="Search" />
        </template>
      </el-input>
    </div>

    <el-row v-if="filteredCandidatos.length > 0" :gutter="20">
      <el-col
        v-for="candidato in filteredCandidatos"
        :key="candidato.id"
        :span="24"
        class="card-col"
      >
        <el-card class="candidato-card" shadow="hover">
          <div class="card-content">
            <img
              :src="candidato.foto || 'https://via.placeholder.com/80'"
              alt="Foto do candidato"
              class="candidato-foto"
            />
            <div class="candidato-info">
              <h2>{{ candidato.nome }}</h2>
              <p>
                <strong>Perfil: </strong>
                <a :href="candidato.urlPublica" target="_blank">{{ candidato.urlPublica }}</a>
              </p>
              <p><strong>Descrição: </strong>{{ candidato.descricaoProfissional }}</p>
              <p><strong>Resumo: </strong>{{ candidato.resumo }}</p>
            </div>
            <el-button
              class="delete-button"
              type="danger"
              size="small"
              icon="Delete"
              @click="deletarCandidato(candidato.id)"
            >
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <p v-else class="no-results">
      Nenhum candidato encontrado. <br>
      Se você é novo no sistema e precisa de ajuda para começar, 
      <a href="#/sobre">clique aqui</a> e saiba mais sobre como utilizar a plataforma de recrutamento.
    </p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { Search } from "@element-plus/icons-vue";
import { getCandidatos, deleteCandidato } from "../services/candidatoService";

const searchQuery = ref("");
const candidatos = ref([]);

const fetchCandidatos = async () => {
  try {
    candidatos.value = await getCandidatos();
  } catch (error) {
    console.error("Erro ao carregar candidatos:", error);
  }
};

const deletarCandidato = async (id) => {
  try {
    await deleteCandidato(id); 
    candidatos.value = candidatos.value.filter((candidato) => candidato.id !== id);
  } catch (error) {
    console.error("Erro ao excluir candidato:", error);
  }
};


const filteredCandidatos = computed(() =>
  candidatos.value.filter((candidato) =>
    candidato.nome.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    candidato.descricaoProfissional?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    candidato.resumo?.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

onMounted(() => {
  fetchCandidatos();
});
</script>

<style scoped>
.search-box {
  margin-bottom: 20px;
}

.el-input {
  max-width: 600px;
  width: 100%;
  border: 2px solid #6c63ff;
  border-radius: 5px;
}

.el-input__inner {
  height: 40px;
}

.el-icon-search {
  color: #6c63ff;
  font-size: 18px;
}

.candidato-card {
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: auto;
}

.card-content {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

.candidato-foto {
  margin-top: 10px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.candidato-info {
  display: flex;
  flex-direction: column;
}

.candidato-info h3 {
  margin: 0;
  font-size: 16px;
}

.candidato-info p {
  font-size: 14px;
  margin: 1px 0;
}

.no-results {
  text-align: center;
  font-size: 16px;
  color: #666;
  margin-top: 60px;
}

.card-col {
  margin-bottom: 20px;
}

.delete-button {
  top: 10px;
  right: 10px;
  font-size: 15px;
  padding: 5px;
}
</style>
