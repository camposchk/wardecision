document.addEventListener('DOMContentLoaded', function() {
    const semComplementoCheckbox = document.getElementById('semComplemento');
    const complementoInput = document.getElementById('complement');
    const complementoLabel = document.getElementById('complementLabel');
  
    // Função para ativar/desativar o campo de complemento
    function toggleComplemento() {
      if (semComplementoCheckbox.checked) {
        complementoInput.disabled = true;
        complementoLabel.style.color = '#ccc'; // Opcional: mudar a cor da label para indicar que está desativada
      } else {
        complementoInput.disabled = false;
        complementoLabel.style.color = ''; // Restaurar cor original da label
      }
    }
  
    // Adicionar listener para o checkbox
    semComplementoCheckbox.addEventListener('change', toggleComplemento);
  
    // Chamar a função inicialmente para garantir que o estado inicial esteja correto
    toggleComplemento();
  });