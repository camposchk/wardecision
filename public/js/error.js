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
  if (phoneCode.length !== 3)
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

// validação nome da empresa
document.getElementById('nameCompany').addEventListener('input', function () {
  const nameCompany = this.value;
  if (nameCompany.length < 3)
    showError('nameCompany', 'O nome da Empresa deve ter mais de 3 caracteres.');
  else
    showError('nameCompany', '');
})

// validação data de abertura 
document.getElementById('date').addEventListener('input', function () {
  const inputDate = new Date(this.value); // Converte a data inserida em um objeto Date
  const currentDate = new Date(); // Data atual

  // Zera a hora da data atual para comparação apenas das datas (sem horas)
  currentDate.setHours(0, 0, 0, 0);

  if (inputDate > currentDate) {
    showError('date', 'A data de abertura não pode ser maior que a data de hoje.');
  } else {
    showError('date', ''); // Limpa a mensagem de erro se a data estiver correta
  }
});
