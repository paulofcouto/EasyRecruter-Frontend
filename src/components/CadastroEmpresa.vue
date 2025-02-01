<template>
  <el-dialog v-model="mostrarModal" title="Empresa" width="600px">
    <el-tabs v-model="abaAtiva" :style="{ height: '450px'}">
      <el-tab-pane label="Dados da Empresa" name="0">
        <el-form @submit.prevent="salvarEmpresa">
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="CNPJ" required label-position="top">
                <el-input v-model="empresa.cnpj" v-mask="'##.###.###/####-##'" />
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="Nome Fantasia" required label-position="top">
                <el-input v-model="empresa.nomeFantasia" maxlength="55" />
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="Razão Social" label-position="top">
                <el-input v-model="empresa.razaoSocial" maxlength="150" />
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="Site" label-position="top">
                <el-input v-model="empresa.site" type="url" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="Endereço" name="1">
        <el-form :model="empresa" @submit.prevent="salvarEmpresa">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="CEP" label-position="top">
                <el-input v-model="empresa.endereco.cep" v-mask="'#####-###'" placeholder="00000-000" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item label="Estado" label-position="top">
              <el-select v-model="empresa.endereco.estado" placeholder="Selecione o estado">
                <el-option
                  v-for="estado in estados"
                  :key="estado.id"
                  :label="estado.descricao"
                  :value="estado.descricao"
                />
              </el-select>
            </el-form-item>
          </el-col>
            <el-col :span="8">
              <el-form-item label="País" label-position="top">
                <el-input v-model="empresa.endereco.pais" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="Cidade" label-position="top">
                <el-input v-model="empresa.endereco.cidade" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="Bairro" label-position="top">
                <el-input v-model="empresa.endereco.bairro" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="Rua" label-position="top">
                <el-input v-model="empresa.endereco.rua" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="Número" label-position="top">
                <el-input v-model="empresa.endereco.numero" />
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="Complemento" label-position="top">
                <el-input v-model="empresa.endereco.complemento" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="Contatos" name="2"  style="overflow : auto; overflow-x: hidden; height: 100%;">
        <el-form @submit.prevent="salvarEmpresa">
          <el-row v-for="(email, index) in empresa.contato.emails" :key="index" :gutter="20">
            <el-col :span="20">
              <el-form-item label="Email" label-position="top">
                <el-input v-model="email.endereco" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="4" class="email-actions">
              <el-form-item label=""  label-position="top" style="display: flex; height: 100%; align-items: flex-end;">
                <el-button v-if="index === 0" type="primary" icon="Plus" @click="adicionarEmail" style="margin-bottom: 18px"></el-button>
                <el-button v-else type="danger" icon="Delete" @click="removerEmail(index)" style="margin-bottom: 18px"></el-button>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row v-for="(telefone, index) in empresa.contato.telefones" :key="index" :gutter="20">
            <el-col :span="6">
              <el-form-item label="DDD" label-position="top">
                <el-input v-model="telefone.ddd" maxlength="2" v-mask="'##'" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="Número" label-position="top">
                <el-input  v-model="telefone.numero" maxlength="10" v-mask="['####-####','#####-####']"  clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="4" class="phone-actions">
              <el-form-item label="" label-position="top" style="display: flex; height: 100%; align-items: flex-end; ">
                <el-button v-if="index === 0" type="primary" icon="Plus" @click="adicionarTelefone" style="margin-bottom: 18px"></el-button>
                <el-button v-else type="danger" icon="Delete" @click="removerTelefone(index)" style="margin-bottom: 18px"></el-button>
              </el-form-item>
            </el-col>
          </el-row>
          
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <template #footer class="modal-footer">  
      <div class="modal-footer">
        <el-button type="primary" @click="salvarEmpresa" :loading="loading">
          Salvar Empresa
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { cadastrarEmpresa, obterEmpresaDetalhado } from "../services/empresaService";
import { getEstados } from "../services/enumService";
import { Delete, Plus } from "@element-plus/icons-vue";

export default {
  name: "CadastroEmpresa",
  components: {
    Delete,
    Plus,
  },
  data() {
    return {
      mostrarModal: false,
      loading: false,
      abaAtiva: "0",
      empresa: {
        nomeFantasia: "",
        razaoSocial: "",
        cnpj: "",
        site: "",
        endereco: {
          rua: "",
          numero: "",
          complemento: "",
          bairro: "",
          cidade: "",
          estado: "",
          cep: "",
          pais: "Brasil",
        },
        contato: {
          emails: [{ endereco: "" }],
          telefones: [{ ddd: "", numero: "" }],
        },
      },
      estados: []
    };
  },
  methods: {
    async abrirModal() {
      this.mostrarModal = true;
      await this.carregarDadosEmpresa();
    },
    async fecharModal() {
      this.mostrarModal = false;
      await this.$nextTick();
    },
    async carregarEstados() {
      try {
        this.estados = await getEstados();
      } catch (error) {
        alert("Não foi possível carregar os estados.");
      }
    },
    async carregarDadosEmpresa() {
      try {
        const dados = await obterEmpresaDetalhado();

        if (!dados || Object.keys(dados).length === 0) {
          this.resetarFormulario();
        } else {
          this.empresa = dados;
        }
      } catch (error) {
        alert("Erro ao carregar os dados da empresa. Tente novamente mais tarde.");
      }
    },
    async salvarEmpresa() {
      try {
        this.loading = true;

        const response = await cadastrarEmpresa(this.empresa); 
        this.$emit("empresaSalva", response);
        await this.fecharModal();
        this.resetarFormulario();
      } 
      catch (error) {
        alert("Erro ao cadastrar a empresa. Verifique os dados e tente novamente.");
      } 
      finally {
        this.loading = false;
      }
    },
    adicionarEmail() {
      this.empresa.contato.emails.push({ endereco: "" });
    },
    removerEmail(index) {
      this.empresa.contato.emails.splice(index, 1);
    },
    adicionarTelefone() {
      this.empresa.contato.telefones.push({ ddd: "", numero: "" });
    },
    removerTelefone(index) {
      this.empresa.contato.telefones.splice(index, 1);
    },
    resetarFormulario() {
      this.empresa = {
        nomeFantasia: "",
        razaoSocial: "",
        cnpj: "",
        site: "",
        endereco: {
          rua: "",
          numero: "",
          complemento: "",
          bairro: "",
          cidade: "",
          estado: "",
          cep: "",
          pais: "Brasil",
        },
        contato: {
          emails: [{ endereco: "" }],
          telefones: [{ ddd: "", numero: "" }],
        },
      };
    },
  },
  mounted() {
    this.carregarEstados();
    this.carregarDadosEmpresa();
  },
};
</script>

<style scoped>
.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 10px 20px;
  border-top: 1px solid #ccc;
}
</style>
