// src/router/index.js
import { createRouter, createWebHashHistory  } from 'vue-router';

import Login from '@/views/Login.vue';
import Candidatos from '@/views/Candidatos.vue';
import Sobre from '@/views/Sobre.vue';
import Sugestoes from '@/views/Sugestoes.vue';
import CadastroEmpresa from "@/components/CadastroEmpresa.vue";
import Usuario from "@/views/Usuario.vue";


const routes = [
  {
    path: '/',
    redirect: '/candidatos',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { showMenu: false, showHeader: false  },
  },
  {
    path: '/candidatos',
    name: 'Candidatos',
    component: Candidatos,
    meta: { showMenu: true, showHeader: true, title: 'Candidatos' },
  },
  {
    path: "/sobre",
    name: "Sobre",
    component: Sobre,
    meta: { showMenu: true, showHeader: true, title: 'Sobre'  },
  },
  {
    path: "/sugestoes",
    name: "Sugestões",
    component: Sugestoes,
    meta: { showMenu: true, showHeader: true, title: 'Sugestões'   },
  },
  {
    path: "/usuario",
    name: "usuario",
    component: Usuario,
    meta: { showMenu: true, showHeader: true, title: 'Usuário'  },
  },
  { 
    path: "/cadastro-empresa", 
    name: "CadastroEmpresa", 
    component: CadastroEmpresa 
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = sessionStorage.getItem('authToken') !== null;

  if (to.path != '/login' && !isAuthenticated) {
    next('/login');
  } else if (to.path === '/login' && isAuthenticated) {
    next('/candidatos');
  } else {
    next();
  }
});

export default router;
