// Captura o envio do formulário
document.getElementById('formInscricao').addEventListener('submit', async function(e) {
  e.preventDefault(); // Impede o envio tradicional do formulário
  
  const form = e.target;
  const formData = new FormData(form);
  const mensagemDiv = document.getElementById('mensagem');
  
  try {
    const response = await fetch('/inscricao', {
      method: 'POST',
      body: formData
    });
    
    if (response.ok) {
      // Mostra mensagem de sucesso
      mensagemDiv.textContent = '✓ Inscrição enviada com sucesso!';
      mensagemDiv.className = 'mensagem sucesso';
      
      // Limpa o formulário
      form.reset();
      
      // Remove a mensagem após 5 segundos
      setTimeout(() => {
        mensagemDiv.textContent = '';
        mensagemDiv.className = 'mensagem';
      }, 5000);
    } else {
      throw new Error('Erro ao enviar inscrição');
    }
  } catch (error) {
    // Mostra mensagem de erro
    mensagemDiv.textContent = '✗ Erro ao enviar inscrição. Tente novamente.';
    mensagemDiv.className = 'mensagem erro';
    
    setTimeout(() => {
      mensagemDiv.textContent = '';
      mensagemDiv.className = 'mensagem';
    }, 5000);
  }
});