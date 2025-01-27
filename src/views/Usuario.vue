<template>
    <div class="usuario">
      <button @click="abrirModalEmpresa">Cadastrar Empresa</button>
      <CadastroEmpresa ref="cadastroEmpresa" @empresaSalva="handleEmpresaSalva" />
    </div>
  </template>
  
  <script>
  import CadastroEmpresa from "../components/CadastroEmpresa.vue";
  
  export default {
    name: "Usuario",
    components: { CadastroEmpresa },
    data() {
      return {
      };
    },
    methods: {
      salvarUsuario() {
        console.log("Usuário salvo:", this.usuario);
      },
      abrirModalEmpresa() {
        this.$refs.cadastroEmpresa.abrirModal();
      },
      handleEmpresaSalva(empresa) {
        console.log("Empresa salva:", empresa);
      },
    },
  };
  </script>
  