function validarCNPJ(cnpj) {
  // Remover caracteres especiais (pontos, traços e barras)
  cnpj = cnpj.replace(/[^\d]+/g, '');

  // Verifica se tem 14 dígitos
  if (cnpj.length !== 14) return false;

  // Elimina CNPJs inválidos conhecidos
  if (/^(\d)\1+$/.test(cnpj)) return false;

  // Cálculo dos primeiros 12 dígitos para encontrar o primeiro dígito verificador
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  
  for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
  }
  
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(0))) return false;

  // Cálculo dos 13 primeiros dígitos para encontrar o segundo dígito verificador
  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  
  for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
  }
  
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(1))) return false;

  return true;
}

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

  //verificar o CNPJ
  const cnpj = validarCNPJ(formRegData.CNPJ);

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

  if (!cnpj)
    errors.push('CNPJ INVÁLIDO');

  if (inputDate > today) 
    errors.push('A data de abertura não deve ser posterior ao dia atual');
  
  if (formRegData.password !== formRegData.confirmpassword) 
    errors.push('As senhas não coincidem');
  
  if (errors.length > 0) {
    alert('Dados inválidos, tente novamente!');
    return;
  }

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
    localStorage.setItem('empresaCodigo', data.empresa.Codigo);
    
    alert("realizado com sucesso")

    window.location.href = `/home`;
  } catch (error) {
   alert("Registro realizado com sucesso")
   window.location.href = `/home`;
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
    
    //console.log('Resposta do servidor:', data);
    //console.log("empresa", data.empresa)
    //console.log("ID da empresa", data.empresa.ID)
    //console.log("Codigo da empresa: ", data.empresa.Codigo)
    localStorage.setItem('empresaID', data.empresa.ID);
    localStorage.setItem('empresaCodigo', data.empresa.Codigo);
    localStorage.setItem('token', data.token);

    alert('Login bem-sucedido!');

    window.location.href = `/home`;
  } catch (error) {
    console.error('Fetch error:', error);
    alert("Login inválido!")
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

  const empresaID = localStorage.getItem("empresaID");
  console.log(empresaID)
  if(!empresaID) {
    alert('ID de Empresa não encontrado. Faça o login novamente!');
    return;
  }

  formRegData.ID_Empresa = empresaID;

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

    alert("Registro de Filial bem sucedido")

    // Redirecionar para a página principal
    window.location.href = `/home`;
  } catch (error) {
    alert(error.message);
  }
}


document.getElementById('formLogin').addEventListener('submit', handleLogin);
document.getElementById('empresaForm').addEventListener('submit', handleRegister);
document.getElementById('filialForm').addEventListener('submit', handleRegisterFilial);





