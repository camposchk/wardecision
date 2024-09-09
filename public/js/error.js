// Função para exibir ou ocultar mensagens de erro
function showError(fieldId, message) {
    const errorField = document.getElementById(fieldId + 'Error');
    if (message) {
      errorField.textContent = message;
      errorField.style.display = 'block';
    } else {
      errorField.style.display = 'none';
    }
  }
  
  // validação CODIGO TELEFONE
  document.getElementById('phoneCode').addEventListener('input', function () {
    const phoneCode = this.value;
    if (phoneCode.length !== 2)
      showError('phoneCode', 'O código telefônico deve ter exatamente 2 dígitos.');
    else
      showError('phoneCode', ''); // Sem erro
  });
  
  // validação CNPJ
  document.getElementById('cnpj').addEventListener('input', function () {
    const cnpj = this.value;
    if (cnpj.length !== 14) 
      showError('cnpj', 'O CNPJ deve ter exatamente 14 dígitos.');
    else
      showError('cnpj', ''); 
  });
  
  // validação CEP
  document.getElementById('cep').addEventListener('input', function () {
    const cep = this.value;
    if (cep.length !== 8) 
      showError('cep', 'O CEP deve ter exatamente 8 dígitos.');
    else
      showError('cep', ''); 
  });