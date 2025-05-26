        // Efeito de carregamento suave
        document.addEventListener('DOMContentLoaded', function() {
            const teamMembers = document.querySelectorAll('.team-member');
            
            // Animação para os cards dos membros da equipe
            teamMembers.forEach((member, index) => {
                setTimeout(() => {
                    member.style.opacity = '1';
                    member.style.transform = 'translateY(0)';
                }, 200 * index);
                
                // Estilos iniciais para a animação
                member.style.opacity = '0';
                member.style.transform = 'translateY(20px)';
                member.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            });
            
            // Efeito de hover mais elaborado
            teamMembers.forEach(member => {
                member.addEventListener('mouseenter', function() {
                    this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)';
                });
                
                member.addEventListener('mouseleave', function() {
                    this.style.boxShadow = '0 3px 10px rgba(0,0,0,0.1)';
                });
            });
        });

        



        function enviarWhats(event){
            event.preventDefault()

            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const telefoneDoCliente = document.getElementById('telefoneDoCliente').value;
            const conteudo = document.getElementById('conteudo').value;
            const mensagem = document.getElementById('mensagem').value;
            const telefone = '5586995430841'

            const texto = `Nome: ${nome}, 
                           Email: ${email}, 
                           Telefone: ${telefoneDoCliente}, 
                           Conteúdo: ${conteudo}, 
                            Mensagem: ${mensagem}.`
            const msgFormatada =encodeURIComponent(texto)

            const url = `https://whatsa.me/5586995430841/?t=${msgFormatada}`

            window.open(url, '_blank')
        }



