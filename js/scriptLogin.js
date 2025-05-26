class BaseDeDados {
    
    static baseURL = "https://api.jsonbin.io/v3/b/6833c0f28561e97a501b7f5b";
    static chave = "$2a$10$Lazw2g.tLVjtGNAD.G6Yc.chho5y9BPmmIOKVeiEKnOjely/HFZSW";

    static getBaseUrl() {
        return BaseDeDados.baseURL;
    }

    static getChave() {
        return BaseDeDados.chave;
    }

}

{

const baseURL = BaseDeDados.getBaseUrl();
const chave = BaseDeDados.getChave();
    
const linkCadastro = document.querySelector(".link-cadastro a");
const linkLogin = document.querySelector(".link-login a");
const containerLogin = document.querySelector(".container-login");
const containerCadastro = document.querySelector(".container-cadastro");

linkCadastro.addEventListener("click", (e) => {
    console.log("Elementos:", {
        linkCadastro,
        linkLogin,
        containerLogin,
        containerCadastro
    });
    e.preventDefault();
    containerLogin.style.display = "none";
    containerCadastro.style.display = "block";
});

linkLogin.addEventListener("click", (e) => {
    e.preventDefault();
    containerCadastro.style.display = "none";
    containerLogin.style.display = "block";
}); 

function initCadastroLink() {
    const btnCadastro = document.getElementById("btn-cadastro-link");
    
    if (!btnCadastro) {
        console.error("Botão de cadastro não encontrado!");
        return;
    }

    btnCadastro.onclick = function(e) {
        e.preventDefault();
        
        const loginDiv = document.querySelector(".container-login");
        const cadastroDiv = document.querySelector(".container-cadastro");
        
        if (!loginDiv || !cadastroDiv) {
            console.error("Divs de login/cadastro não encontradas!");
            return;
        }

        loginDiv.style.display = "none";
        cadastroDiv.style.display = "block";
        
        // Debug visual (opcional)
        cadastroDiv.style.border = "2px solid green";
        setTimeout(() => cadastroDiv.style.border = "", 2000);
        
        console.log("Formulário de cadastro exibido com sucesso!");
    };
}

// Execute quando o DOM estiver pronto
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCadastroLink);
} else {
    initCadastroLink();
}

// Função para pegar dados do banco
async function pegarDados() {
    try {
        const res = await fetch(`${baseURL}`, {
            headers: {
                "X-Master-Key": chave
            }
        });

        if (!res.ok) {
            alert(`Erro ao buscar dados: ${res.status}`);
            return;
        }

        const dados = await res.json();
        return dados;
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
    }
}

// Função para atualizar os dados no banco
async function atualizarDados(novosDados) {
    try {
        const res = await fetch(`${baseURL}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": chave
            },
            body: JSON.stringify(novosDados)
        });

        if (!res.ok) {
            alert(`Erro ao atualizar dados: ${res.status}`);
            return;
        }

        return await res.json();
    } catch (error) {
        console.error("Erro ao atualizar dados:", error);
    }
}

// Lidar com o botão de cadastro
const botaoCadastrar = document.querySelector("#btn-cadastrar");
botaoCadastrar.addEventListener("click", async (e) => {
    e.preventDefault();
    const nome = document.querySelector("#nome-cadastro").value;
    const email = document.querySelector("#email-cadastro").value;
    const senha = document.querySelector("#senha-cadastro").value;

    if (!nome || !email || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    const dadosAtuais = await pegarDados();
    const usuarios = dadosAtuais?.record?.usuarios || [];

    const usuarioExistente = usuarios.find(user => user.email === email);
    if (usuarioExistente) {
        alert("Este e-mail já está cadastrado!");
        return;
    }

    const historico = []
    const id = usuarios.length + 1 

    usuarios.push({id, nome, email, senha, historico});
    await atualizarDados({ usuarios });

    alert("Cadastro realizado com sucesso!");
    document.querySelector("#nome-cadastro").value = "";
    document.querySelector("#email-cadastro").value = "";
    document.querySelector("#senha-cadastro").value = "";

    containerCadastro.style.display = "none";
    containerLogin.style.display = "block";
});

const botaoLogin = document.querySelector("#btn-login");
botaoLogin.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = document.querySelector("#email-login").value;
    const senha = document.querySelector("#senha-login").value;

    if (!email || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    const dados = await pegarDados();
    const usuarios = dados.record.usuarios;

    const usuario = usuarios.find(user => user.email === email && user.senha === senha);

    if (usuario) {
        alert("Login realizado com sucesso!");
    } else {
        alert("E-mail ou senha incorretos!");
    }
});
}