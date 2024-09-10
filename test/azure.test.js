// azureApi.test.js

const axios = require('axios');
const https = require('https');

describe('Testes da API do Azure', () => {
  const url = 'https://8541538b-c296-4900-b21a-975667d6b551.brazilsouth.azurecontainer.io/score';
  
  const data = {
    "Inputs": {
        "data": [
            {        
                "ProdDat Mat_(RB Type)": "27916",
                "CD Code (Pos_ 1000)": "A026",
                "CD Code Group (Pos_ 1000)": "C00ALLG",
                "CD Codegroup text": "General defect",
                "CD text (Pos_ 1000)": "VAZAMENTO DE ÓLEO DIESEL",
                "Claimed Qty_ Mat_": 1,
                "Claimed Qty_ Mod_": 0,
                "Breakdown Level": 1,
                "compl_ Material": "414799044",
                "Complaint Mode": "40",
                "Country": "BR",
                "CuCo Code": 2,
                "CuCo Code Group": "C10ALLG",
                "CuCo text": "VAZAMENTO DE ÓLEO DIESEL",
                "Document Type": "G40",
                "Ez-Group": "UIN",
                "Item CD Code Group Text (Pos_ 1000)": "General defect",
                "Item CD Code Text (Pos_ 1000)": "for investigation to investigation point",
                "Material Text": "Pump element",
                "Mileage": 37848,
                "mileage qty_ unit": "KM",
                "Pos Ez-Typformel (Pos_ 1000)": "UP2020",
                "PostalCode": "09680-900",
                "Primary language": "E",
                "ProdDat Mat_(RB Type) (Pos_ 1000)": "20221116",
                "ProdDat Material (Calender)": "16/11/2022",
                "Product type formula": "UP2020",
                "Reference number": "1682145",
                "Report required": "X",
                "Return Delivery Qty": 1,
                "RPN": 0,
                "RPN text": "unused OEM product/part",
                "SearchTerm": "DAI",
                "Serial-No_ Mat_": "N6TN3J9"
            }
        ]
    }
  };
  
  const headers = {
    'Content-Type': 'application/json'
  };

  
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false
  });

  it('Deve retornar uma resposta bem-sucedida', async () => {
    try {
      const response = await axios.post(url, data, {
        headers: headers,
        httpsAgent: httpsAgent 
      });
      
      console.log('Resposta:', response.data);
      
      expect(response.status).toBe(200);

    } catch (error) {
      if (error.response) {
        console.error("A requisição falhou com o status:", error.response.status);
        console.error("Cabeçalhos:", error.response.headers);
        console.error("Corpo:", error.response.data);
        
        throw new Error(`Requisição falhou com o status ${error.response.status}`);
      } else if (error.request) {
        console.error("Nenhuma resposta recebida:", error.request);
        throw new Error('Nenhuma resposta recebida da API');
      } else {
        console.error('Erro na configuração da requisição:', error.message);
        throw error;
      }
    }
  });

  it('Deve retornar erro para dados inválidos', async () => {
    const dadosInvalidos = {
    };

    try {
      const response = await axios.post(url, dadosInvalidos, {
        headers: headers,
        httpsAgent: httpsAgent
      });
      
      throw new Error('Esperava que a requisição falhasse, mas ela foi bem-sucedida');
    } catch (error) {
      if (error.response) {
        expect(error.response.status).toBe(400);
        
      } else {
        throw error;
      }
    }
  });
});
