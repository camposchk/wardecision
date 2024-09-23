function formatCNPJInput(event) {
    const cnpjInput = event.target;
    if (cnpjInput && cnpjInput.value)
        cnpjInput.value = cnpjInput.value.replace(/\D/g, '');
}

function formatCEPInput(event) {
    const cepInput = event.target;
    if (cepInput && cepInput.value)
        cepInput.value = cepInput.value.replace(/\D/g, ''); 
}

function formatPhoneCodeInput(event) {
    const phoneCodeInput = event.target;
    if (phoneCodeInput && phoneCodeInput.value)
        phoneCodeInput.value = `+${phoneCodeInput.value.replace(/\D/g, '')}`;
}

function formatPhoneInput(event) {
    const phoneInput = event.target;
    if (phoneInput && phoneInput.value) {
        let cleaned = phoneInput.value.replace(/\D/g, ''); // Remove tudo que não é número
        if (cleaned.length > 10)
            cleaned = cleaned.slice(0, 11); // Limita o número de caracteres a 11
        const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/) || cleaned.match(/^(\d{2})(\d{4})(\d{4})$/);
        if (match)
            phoneInput.value = `(${match[1]}) ${match[2]}-${match[3]}`;
    }
}

document.getElementById('phone').addEventListener('input', formatPhoneInput);
document.getElementById('phoneCode').addEventListener('input', formatPhoneCodeInput);
document.getElementById('cnpj').addEventListener('input', formatCNPJInput);
document.getElementById('cep').addEventListener('input', formatCEPInput);

