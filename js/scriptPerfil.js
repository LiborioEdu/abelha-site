

const baseURL = BaseDeDados.getBaseUrl();
const chave = BaseDeDados.getChave();

let beeChart;
    
async function pegarDados() {
    try {
        const res = await fetch(`${baseURL}`, {
            headers: { "X-Master-Key": chave }
        });
        if (!res.ok) {
            throw new Error('Erro na API: ' + res.status);
        }
        const dados = await res.json();
        console.log('Dados recebidos:', dados);
        return dados;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        return null;
    }
}

function processarDados(dados) {
    if (!dados?.record?.usuarios) {
        console.error('Estrutura de dados inválida:', dados);
        return {};
    }
    
    const contador = {};
    dados.record.usuarios.forEach(usuario => {
        if (usuario.historico) {
            usuario.historico.forEach(item => {
                if (item.id >= 1 && item.id <= 5) {
                    const especie = item.especie;
                    contador[especie] = (contador[especie] || 0) + 1;
                }
            });
        }
    });
    return contador;
}

function atualizarDashboard(contador) {
    const entries = Object.entries(contador);
    const maisEncontrada = entries.length > 0 ? entries.reduce((a, b) => b[1] > a[1] ? b : a) : ['Nenhuma', 0];

    document.getElementById('maisIdentificada').textContent = maisEncontrada[0];
    document.getElementById('quantidadeMais').textContent = maisEncontrada[1];

    const tabela = document.getElementById('tabelaAbelhas');
    tabela.innerHTML = '';
    entries.forEach(([especie, quantidade]) => {
        const linha = `<tr><td>${especie}</td><td>${quantidade}</td></tr>`;
        tabela.innerHTML += linha;
    });

    const ctx = document.getElementById('beeChart');
    if (!ctx) {
        console.error('Canvas não encontrado!');
        return;
    }

    if (beeChart) beeChart.destroy();

    beeChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(contador),
            datasets: [{
                label: 'Quantidade de Identificações',
                data: Object.values(contador),
                backgroundColor: '#FCBE5C',
                borderColor: '#FCBE5C',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { labels: { color: '#FCBE5C' } }
            },
            scales: {
                y: { beginAtZero: true, ticks: { color: '#FCBE5C' } },
                x: { ticks: { color: '#FCBE5C' } }
            }
        }
    });
}

async function iniciarDashboard() {
    console.log('Iniciando dashboard...');
    const dados = await pegarDados();
    if (dados) {
        const contador = processarDados(dados);
        console.log('Dados processados:', contador);
        atualizarDashboard(contador);
    }
}

document.addEventListener('DOMContentLoaded', iniciarDashboard);
