<template>
  <div class="candidatos-container">
    <div class="search-box">
      <el-input v-model="searchQuery" placeholder="Filtrar candidatos...">
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
              :src="candidato.foto"
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
          <div class="expand-button-container">
            <button
              class="expand-button"
              @click="toggleExpand(candidato.id)"
            >
              <div
                class="triangle"
                :class="{ 'rotated': expandedCards.has(candidato.id) }"
              ></div>
            </button>
          </div>
          <div v-if="expandedCards.has(candidato.id)" class="expanded-content">
            <h3>Experiências</h3>
            <div v-if="candidato.experiencias.length > 0">
              <div v-for="(experiencia, index) in candidato.experiencias" :key="index" class="experience-item">
                <div class="experience-header">
                  <strong>{{ experiencia.empresa }}</strong>
                  <span class="experience-location">{{ experiencia.local }}</span>
                </div>
                <p v-if="experiencia.cargos && experiencia.cargos.length > 0">
                  <div v-for="(cargo, cargoIndex) in experiencia.cargos" :key="cargoIndex" class="cargo-item">
                    <span class="cargo-title">
                      <el-icon><Right /></el-icon> {{ cargo.titulo }}
                    </span>
                    <span class="cargo-period">{{ cargo.periodo }}</span>
                    <p class="cargo-description">{{ cargo.descricao }}</p>
                  </div>
                </p>
              </div>
            </div>
            <p v-else>Sem experiências disponíveis.</p>

            <h3 class="titulo-formacao">Formações</h3>
            <div v-if="candidato.formacoes.length > 0">
              <div v-for="(formacao, index) in candidato.formacoes" :key="index" class="education-item">
                <strong>{{ formacao.instituicao }}</strong>
                <p>{{ formacao.curso }}</p>
                <span class="education-period">{{ formacao.periodo }}</span>
              </div>
            </div>
            <p v-else>Sem formações disponíveis.</p>
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
import placeholderImage from "../assets/placeholder.png"; 
import { ref, computed, onMounted } from "vue";
import { Search, Right } from "@element-plus/icons-vue";
import { getCandidatos, deleteCandidato } from "../services/candidatoService";

const searchQuery = ref("");

const candidatos = ref([
  {
    id: "",
    nome: "",
    foto: "",
    urlPublica: "",
    descricaoProfissional: "",
    resumo: "",
    experiencias: [], 
    formacoes: []
  },
]);

const expandedCards = ref(new Set());

const toggleExpand = (id) => {
  if (expandedCards.value.has(id)) {
    expandedCards.value.delete(id);
  } else {
    expandedCards.value.add(id);
  }
};

const fetchCandidatos = async () => {
  try {
    const response = await getCandidatos();
    if (response && Array.isArray(response)) {
      candidatos.value = response.map((candidato) => ({
        id: candidato.id || "",
        nome: candidato.nome || "Nome não informado",
        foto: candidato.foto || placeholderImage,
        urlPublica: candidato.urlPublica || "#",
        descricaoProfissional: candidato.descricaoProfissional || "Descrição não informada",
        resumo: candidato.resumo || "Resumo não informado",
        experiencias: candidato.experiencias || [],
        formacoes: candidato.formacoes || [],
      }));
    } else {
      console.error("Resposta da API inválida:", response);
      candidatos.value = []; 
    }
  } catch (error) {
    console.error("Erro ao carregar candidatos:", error);
    candidatos.value = [];
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
  candidatos.value.filter((candidato) => {
    const query = searchQuery.value.toLowerCase();

    // Verificar nome, descrição profissional e resumo
    const matchesBasicFields =
      candidato.nome.toLowerCase().includes(query) ||
      candidato.descricaoProfissional?.toLowerCase().includes(query) ||
      candidato.resumo?.toLowerCase().includes(query);

    // Verificar em experiências
    const matchesExperiencias = candidato.experiencias?.some((experiencia) =>
      [experiencia.empresa, experiencia.local]
        .some((campo) => campo?.toLowerCase().includes(query))
    );

    // Verificar em cargos das experiências
    const matchesCargos = candidato.experiencias?.some((experiencia) =>
      experiencia.cargos?.some((cargo) =>
        [cargo.titulo, cargo.descricao]
          .some((campo) => campo?.toLowerCase().includes(query))
      )
    );

    // Verificar em formações
    const matchesFormacoes = candidato.formacoes?.some((formacao) =>
      [formacao.instituicao, formacao.curso]
        .some((campo) => campo?.toLowerCase().includes(query))
    );

    return matchesBasicFields || matchesExperiencias || matchesCargos || matchesFormacoes;
  })
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
  position: relative;
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

.candidato-info h2 {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
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
  position: absolute;
  margin: 7px;
  top: 10px;
  right: 10px;
  font-size: 15px;
  padding: 5px;
  border: none;
  cursor: pointer;
}

.expand-button-container {
  text-align: right;
}

.expand-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.triangle {
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 10px solid #6c63ff;
  transition: transform 0.3s ease;
}

.triangle.rotated {
  transform: rotate(180deg);
}

.expanded-content {
  font-size: 14px;
  color: #555;
}

.expanded-content h3 {
  margin-bottom: 5px;
  font-size: 18px;
  color: #333;
  font-weight: bold;
}

/* Estilo para itens de experiência */
.experience-item,
.education-item {
  margin-bottom: 20px;
  padding: 10px 15px;
  border-left: 3px solid #6c63ff;
  background: #f5f5f5;
  border-radius: 5px;
}

.experience-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
}

.experience-location {
  font-size: 14px;
  color: #888;
}

/* Estilo para os cargos */
.cargo-item {
  margin-top: 10px;
}

.cargo-title {
  font-weight: bold;
  font-size: 15px;
  display: block;
}

.cargo-title el-icon {
  color: #6c63ff; 
  margin-right: 5px; 
  font-size: 14px; 
}

.cargo-period {
  font-size: 14px;
  color: #555;
  display: block;
  margin-bottom: 5px;
}

.cargo-description {
  font-size: 14px;
  color: #666;
  margin-top: 5px;
}

/* Estilo para as formações */
.titulo-formacao{
  margin-top: 25px;
}

.education-period {
  font-size: 14px;
  color: #888;
  display: block;
  margin-top: 5px;
}

</style>
