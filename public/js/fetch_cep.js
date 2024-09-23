// Função de busca de CEP na API ViaCEP
async function fetchAddressByCEP(cep) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.ok) throw new Error('Erro ao consultar o CEP');
      const data = await response.json();
  
      if (data.erro) {
        showError('cep', 'CEP não encontrado.');
        clearAddressFields();
      } else {
        fillAddressFields(data);
        showError('cep', '');
      }
    } catch (error) {
      console.error(error);
      showError('cep', 'Não foi possível buscar o CEP.');
    }
  }
  
  function fillAddressFields(data) {
    document.getElementById('street').value = data.logradouro || '';
    document.getElementById('neighborhood').value = data.bairro || '';
    document.getElementById('city').value = data.localidade || '';
    document.getElementById('state').value = data.uf || '';
  }
  
  function clearAddressFields() {
    document.getElementById('street').value = '';
    document.getElementById('neighborhood').value = '';
    document.getElementById('city').value = '';
    document.getElementById('state').value = '';
  }
  
  // Função para mostrar ou esconder mensagens de erro
  function showError(fieldId, message) {
    const errorField = document.getElementById(fieldId + 'Error');
    if (message) {
      errorField.textContent = message;
      errorField.style.display = 'block';
    } else
      errorField.style.display = 'none';
  }
  
  // Adicionar evento no campo de CEP
  document.getElementById('cep').addEventListener('input', function () {
    const cep = this.value.replace(/\D/g, '');
    if (cep.length === 8) {
      fetchAddressByCEP(cep); // Chama a API quando o CEP tem 8 dígitos
    } else {
      clearAddressFields(); // Limpa os campos de endereço enquanto o CEP não é válido
      showError('cep', 'O CEP deve ter exatamente 8 dígitos.');
    }
  });
  