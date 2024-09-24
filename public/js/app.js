async function handleRegister(event) {
  event.preventDefault();

  const formRegData = {
    nameCompany: document.getElementById('nameCompany').value,
    CNPJ: document.getElementById('cnpj').value,
    CEP: document.getElementById('cep').value,
    country: document.getElementById('country').value,
    state: document.getElementById('state').value,
    city: document.getElementById('city').value,
    street: document.getElementById('street').value,
    neighborhood: document.getElementById('neighborhood').value,
    number: document.getElementById('number').value,
    complement: document.getElementById('complement').value,
    date: document.getElementById('date').value,
    filials: document.getElementById('filials').value,
    phoneCode: document.getElementById('phoneCode').value,
    phone: document.getElementById('phone').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
    confirmpassword: document.getElementById('confirmpassword').value,
  };

  // console.log(formRegData);
  const today = new Date();
  const inputDate = new Date(formRegData.date);

  let errors = [];

  // Validações finais antes de enviar
  if (formRegData.phoneCode.length !== 3) 
    errors.push('O código telefônico deve ter exatamente 2 dígitos.');

  if (formRegData.nameCompany.length < 3) 
    errors.push('O nome da empresa não deve ter menos de 3 caracteres.');

  if (formRegData.CNPJ.length !== 14) 
    errors.push('O CNPJ deve ter exatamente 14 dígitos.');
  
  if (formRegData.CEP.length !== 8) 
    errors.push('O CEP deve ter exatamente 8 dígitos.');

  if (inputDate > today) 
    errors.push('A data de abertura não deve ser posterior ao dia atual');
  
  if (formRegData.password !== formRegData.confirmpassword) 
    errors.push('As senhas não coincidem');
  
  if (errors.length > 0) return;

  try {
    const response = await fetch('http://localhost:3000/api/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formRegData),
    });

    console.log(response)

    if (!response.ok)
      throw new Error('Não foi possível registrar, tente novamente!');

    const data = await response.json();
    localStorage.setItem('token', data.token);

    alert('Registro bem-sucedido!');
    // Redirecionar para a página principal
    window.location.href = `/home`;
  } catch (error) {
    alert(error.message);
  }
}

async function handleLogin(event) {
  event.preventDefault();

  const formLoginData = {
    login: document.getElementById('login').value,
    password: document.getElementById('password').value,
  };

  console.log(formLoginData);

  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formLoginData),
    });

    console.log('Status HTTP:', response.status);

    if (!response.ok) {
      console.error('Erro retornado pelo servidor:', errorData);
      throw new Error('Login falhou, tente inserir as credenciais novamente!');
    }

    const data = await response.json();
    console.log('Resposta do servidor:', data);
    localStorage.setItem('token', data.token);

    alert('Login bem-sucedido!');
    window.location.href = `/home`;
  } catch (error) {
    console.error('Fetch error:', error);
    alert(error.message);
  }
}

async function handleRegisterFilial(event) {
  event.preventDefault();

  const formRegData = {
    nameCompany: document.getElementById('nameCompany').value,
    CNPJ: document.getElementById('cnpj').value,
    CEP: document.getElementById('cep').value,
    country: document.getElementById('country').value,
    state: document.getElementById('state').value,
    city: document.getElementById('city').value,
    street: document.getElementById('street').value,
    neighborhood: document.getElementById('neighborhood').value,
    number: document.getElementById('number').value,
    complement: document.getElementById('complement').value,
    date: document.getElementById('date').value,
    phoneCode: document.getElementById('phoneCode').value,
    phone: document.getElementById('phone').value,
    email: document.getElementById('email').value,
  };

  // console.log(formRegData);
  const today = new Date();
  const inputDate = new Date(formRegData.date);

  let errors = [];

  // Validações finais antes de enviar
  if (formRegData.phoneCode.length !== 3) 
    errors.push('O código telefônico deve ter exatamente 2 dígitos.');

  if (formRegData.nameCompany.length < 3) 
    errors.push('O nome da empresa não deve ter menos de 3 caracteres.');

  if (formRegData.CNPJ.length !== 14) 
    errors.push('O CNPJ deve ter exatamente 14 dígitos.');
  
  if (formRegData.CEP.length !== 8) 
    errors.push('O CEP deve ter exatamente 8 dígitos.');

  if (inputDate > today) 
    errors.push('A data de abertura não deve ser posterior ao dia atual');
  
  if (errors.length > 0) return;

  try {
    const response = await fetch('http://localhost:3000/api/add-filial', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formRegData),
    });

    console.log(response)

    if (!response.ok)
      throw new Error('Não foi possível registrar, tente novamente!');

    const data = await response.json();

    alert('Registro de Filial bem-sucedido!');
    // Redirecionar para a página principal
    window.location.href = `/home`;
  } catch (error) {
    alert(error.message);
  }
}


document.getElementById('formLogin').addEventListener('submit', handleLogin);
document.getElementById('empresaForm').addEventListener('submit', handleRegister);
document.getElementById('filialForm').addEventListener('submit', handleRegisterFilial);




