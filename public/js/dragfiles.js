let selectedFile = null;

function dropHandler(ev) {
    ev.preventDefault();
    const dropZone = document.getElementById('dropZone');
    dropZone.classList.remove('boxhover');
    dropZone.classList.add('divbox');

    if (ev.dataTransfer.items) {
        [...ev.dataTransfer.items].forEach((item) => {
            if (item.kind === "file") {
                const file = item.getAsFile();
                if (file.name.endsWith('.xlsx')) {
                    selectedFile = file;
                    handleFileDisplay(file);
                } else {
                    alert("Somente arquivos .xlsx são permitidos.");
                }
            }
        });
    } else {
        [...ev.dataTransfer.files].forEach((file) => {
            if (file.name.endsWith('.xlsx')) {
                selectedFile = file;
                handleFileDisplay(file);
            } else {
                alert("Somente arquivos .xlsx são permitidos.");
            }
        });
    }
}

function dragOverHandler(ev) {
    ev.preventDefault();
    const dropZone = document.getElementById('dropZone');
    dropZone.classList.add('boxhover');
    dropZone.classList.remove('divbox');
}

function dragLeaveHandler(ev) {
    const dropZone = document.getElementById('dropZone');
    dropZone.classList.remove('boxhover');
    dropZone.classList.add('divbox');
}

function openFileDialog() {
    document.getElementById('fileInput').click();
}

function handleFiles(files) {
    const file = files[0];
    if (file.name.endsWith('.xlsx')) {
        selectedFile = file;
        handleFileDisplay(file);
    } else {
        alert("Somente arquivos .xlsx são permitidos.");
    }
}

function handleFileDisplay(file) {
    const fileDetailsDiv = document.getElementById('fileDetails');
    const fileNameElement = document.getElementById('fileName');
    const dropZone = document.getElementById('dropZone');

    fileNameElement.textContent = file.name;
    fileDetailsDiv.style.display = 'block';
    dropZone.style.display = 'none';

    console.log("Selected file:", file);
}

function handleSubmit(event) {
    event.preventDefault();

    if (!selectedFile) {
        alert("Por favor, selecione um arquivo Excel primeiro.");
        return;
    }

    const qcValue = document.getElementById('qcInput').value;

    const reader = new FileReader();
    reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const filteredData = jsonData.filter(row => row['QC'] == qcValue);
        if (filteredData.length > 0) {
            let rowData = { ...filteredData[0] };
            const qcString = rowData['QC']; // Captura o valor de QC

            delete rowData['QC']; // Remove a coluna 'QC' do rowData

            // Substitui valores vazios ou indefinidos por null e troca '.' por '_'
            rowData = Object.fromEntries(
                Object.entries(rowData).map(([key, value]) => [
                    key.replace(/\./g, '_'), // Substitui '.' por '_'
                    value === "" || value === undefined ? null : value
                ])
            );

            console.log("Filtered Data (with null values and modified keys):", rowData);

            // Adiciona a string 'QC' aos dados enviados para a API
            const dataToSend = {
                QC: qcString,  // A string que estava na coluna 'QC'
                ...rowData     // Os outros dados processados
            };

            sendToAPI(dataToSend);
        } else {
            alert("Nenhuma linha encontrada para o QC fornecido.");
        }
    };

    reader.readAsArrayBuffer(selectedFile);
}


function sendToAPI(data) {
    const url = 'http://localhost:3000/proxy';  // Agora aponta para o proxy

    const requestData = {
        "Inputs": {
            "data": [data]
        }
    };

    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro da API: ${response.status}`);
        }
        return response.json();
    })
    .then(apiResponse => {
        console.log('Resposta da API:', apiResponse);
        
        // Após receber a predição, enviar para o servidor e salvar no banco
        savePredictionToDatabase(apiResponse, data); // Passa a predição e o QC para salvar no banco

        // Atualiza a tela de predição
        showPredictionScreen(apiResponse);
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro: ' + error.message);
    });
}


// Função para salvar a predição no banco de dados
function savePredictionToDatabase(apiResponse, qc) {
    const predictionData = {
        QC: qc,  // Valor do QC que foi enviado na predição
        Saida: apiResponse.result // O resultado retornado da API
    };

    fetch('http://localhost:3000/api/predictions', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(predictionData)  // Envia os dados corretos para salvar no banco
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao salvar predição');
        }
        return response.json();
    })
    .then(data => {
        console.log('Predição salva no banco de dados:', data);
    })
    .catch(error => {
        console.error('Erro ao salvar predição:', error.message);
    });
}



function showPredictionScreen(apiResponse) {
    // Hide the fileDetails screen and show predDetails screen
    document.getElementById('fileDetails').style.display = 'none';
    document.getElementById('predDetails').style.display = 'block';

    // Update the H1 text with the API response
    document.getElementById('predictionResult').textContent = apiResponse.result;

}

