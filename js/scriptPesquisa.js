const initApp = () => {
    const droparea = document.querySelector('.droparea');

    const active = () => droparea.classList.add("green-border");

    const inactive = () => droparea.classList.remove("green-border");

    const prevents = (e) => e.preventDefault();

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evtName => {
        droparea.addEventListener(evtName, prevents);
    });

    ['dragenter', 'dragover'].forEach(evtName => {
        droparea.addEventListener(evtName, active);
    });

    ['dragleave', 'drop'].forEach(evtName => {
        droparea.addEventListener(evtName, inactive);
    });

    droparea.addEventListener("drop", handleDrop);

}

document.addEventListener("DOMContentLoaded", initApp);

const handleDrop = (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    const fileArray = [...files];
    console.log(files);
    console.log(fileArray);

    const lista = document.querySelector(".nomes-imagens")
    lista.innerHTML = ""

    fileArray.forEach(file => {
        const li = document.createElement("li");
        li.textContent = file.name.split(".")[0];
        lista.appendChild(li);
    })
}

{
    const baseURl = "https://api.jsonbin.io/v3/b/6833c0f28561e97a501b7f5b";
    const chave = "$2a$10$Lazw2g.tLVjtGNAD.G6Yc.chho5y9BPmmIOKVeiEKnOjely/HFZSW";


    function login(idUsuario){
        localStorage.setItem("usuarioLogado", idUsuario);
    }

    function getIdUsuarioLogado() {
        return parseInt(localStorage.getItem("usuarioLogado"));
    }

    login(4);

    async function pegarDados() {
        try {
            const res = await fetch(`${baseURl}`, {
                headers: {
                    "X-Master-Key": chave
                }
            })
            
            if (!res.ok) {
                alert(res.status)
            }
            
            const dados = await res.json();
            return dados;
        } catch (error) {
            console.error(error);
        }  
    }

    const botaoHistorico = document.querySelector(".historico");
    botaoHistorico.addEventListener("click", async ()=>{
        try{
            const listaOrdenada = document.querySelector("ol");
            listaOrdenada.innerHTML = "";

            const dados = await pegarDados();
            
            const idUsuarioLogado = getIdUsuarioLogado();
            const usuario = dados.record.usuarios.find(usuario => usuario.id===idUsuarioLogado);
            
            usuario.historico.forEach(item => { 
                const li = document.createElement("li");
                const button = document.createElement("button");
                button.textContent = "Excluir";
                li.innerHTML = `
                <strong>ID:</strong> ${item.id}<br>
                <strong>Data:</strong> ${item.data}<br>
                <strong>Espécie:</strong> ${item.especie}<br>
                `
            ;
            listaOrdenada.appendChild(li);

            });

        } catch (error) {
            console.error(error);
        }



    });

    const botaoEnviar = document.querySelector(".enviar-imagem");
    botaoEnviar.addEventListener("click", async () => {
        try {
            const especie = document.querySelector(".nomes-imagens").textContent;
            console.log(especie)

            const dados = await pegarDados();
            
            const idUsuarioLogado = getIdUsuarioLogado();
            const usuario = dados.record.usuarios.find(usuario => usuario.id === idUsuarioLogado);

            const dataAtual = new Date().toLocaleDateString("pt-BR");

            const novoItemHistorico = {
                id: usuario.historico.length + 1,
                data: dataAtual,
                especie: especie
            }

            const listaEspecies = document.querySelector(".listaEspecies")
            const nomesEspecies = ["jatai", "tiuba", "jandaira", "canudo", "urucu"];
            const nomesCientificos = {
                jatai: "Tetragonisca angustula",
                tiuba: "Melipona compressipes fasciculata",
                jandaira: "Melipona subnitida",
                canudo: "Scaptotrigona depilis",
                urucu: "Melipona scutellaris"
            };

            if (!nomesEspecies.includes(especie)) {
                const li = document.createElement("li");
                li.innerHTML = "Espécie diferente!";
                listaEspecies.appendChild(li);
                return;
            }

            usuario.historico.push(novoItemHistorico);

            await fetch(`${baseURl}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-Master-Key": chave
                },
                body: JSON.stringify({usuarios: dados.record.usuarios})
            });     

            // IMAGEM PARA LI
            const li = document.createElement("li");
            const img = document.createElement("img");
            img.src = `img/${especie}.png`;
            img.width = 400;
            img.height = 300;

            // TEXTO PARA LI
            const texto = document.createElement("p");
            texto.innerHTML = `
            <strong>Nome popular:</strong> Abelha-${especie}<br>
            <strong>Nome cientifico:</strong> ${nomesCientificos[especie]}
            `
            texto.style.fontSize = 16;


            li.appendChild(img);
            li.appendChild(texto);
            
            listaEspecies.appendChild(li);

        } catch (error) {
            console.error(error);
        }
    });

}