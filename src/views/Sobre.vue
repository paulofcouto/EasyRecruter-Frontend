<template>
  <div class="Candidatos-container">
    <div class="guia-sistema">
      <h1 class="titulo">Guia de Utilização</h1>
      <p class="descricao">
        O <strong>Easy Recruter</strong> é uma plataforma desenvolvida para atuar como um
        <strong>banco de talentos</strong>, permitindo que empresas armazenem perfis de candidatos e realizem
        seleções de forma eficiente. Ele centraliza informações importantes, como o resumo profissional,
        habilidades e links de perfis públicos, facilitando a busca e o gerenciamento de candidatos. Ideal para
        equipes de RH que precisam otimizar o processo de recrutamento e seleção.
      </p>

      <h2 class="subtitulo">Passo 1: Instalar a extensão do Google Chrome "Salvar Perfil"</h2>
      <p>
        Para realizar a captura de informações dos candidatos, você precisa instalar a extensão
        <strong>Salvar Perfil</strong> no navegador Google Chrome. Acesse o link abaixo e clique em
        <strong>"Usar no Chrome"</strong>:
      </p>
      <p>
        <a
          href="https://chromewebstore.google.com/detail/salvar-perfil/cincfbjngclenlaabmhoflckfmeacjcc?hl=pt-BR&utm_source=ext_sidebar"
          target="_blank"
          class="link-extensao"
        >Extensão Salvar Perfil</a>
      </p>

      <h2 class="subtitulo">Passo 2: Fazer login na extensão</h2>
      <p>
        Após instalar a extensão, clique no ícone dela no navegador e faça login com suas credenciais do Easy Recruter.
      </p>
      <p>
        A inserção de informações dos candidatos é feita diretamente a partir do
        <strong>perfil público do LinkedIn</strong>. Basta acessar o perfil do candidato que possui esse formato:
      </p>
      <div class="url-container">
        https://www.linkedin.com/in/nome-candidato
      </div>

      <h2 class="subtitulo">Passo 3: Abrir o perfil desejado no LinkedIn</h2>
      <p>
        Com a extensão instalada e logada, abra o perfil do candidato desejado no LinkedIn.
      </p>

      <h2 class="subtitulo">Passo 4: Clicar em "Enviar"</h2>
      <p>
        Na extensão, clique no botão "Enviar". Isso enviará as informações do perfil diretamente para a plataforma do Easy Recruter, alimentando automaticamente a tela de candidatos.
      </p>

      <h2 class="conclusao">Conclusão</h2>
      <p>
        Seguindo esses passos, você poderá inserir e gerenciar candidatos de maneira prática e eficiente. Sempre que precisar adicionar novos perfis, basta repetir o processo a partir do LinkedIn. Se tiver dúvidas, volte para este guia ou entre em contato com o suporte.
      </p>
    </div>
  </div>
</template>

<style scoped>
.candidatos-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

.titulo {
  font-size: 25px;
  text-align: center;
  color: #6c63ff;
  margin-bottom: 20px;
  font-weight: bold;
}

.descricao {
  text-align: justify;
  margin-bottom: 20px;
  font-size: 16px;
  line-height: 1.6;
}

.subtitulo {
  margin-top: 20px;
  font-size: 18px;
  color: #34495e;
  border-bottom: 2px solid #ddd;
  padding-bottom: 5px;
}

.url-container {
  background-color: #eaeaea;
  padding: 8px 12px;
  border-radius: 6px;
  font-family: monospace;
  color: #333;
  border: 1px solid #ccc;
  display: inline-block;
  margin-top: 8px;
}

.link-extensao {
  color: #2980b9;
  text-decoration: none;
}

.link-extensao:hover {
  text-decoration: underline;
}

.conclusao {
  margin-top: 30px;
  font-weight: bold;
}
</style>
