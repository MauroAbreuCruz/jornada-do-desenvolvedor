/*
Seu desafio de hoje é criar os destinos possíveis de um jogo, em que o usuário consiga escolher:

1. Se quer seguir para área de Front-End ou seguir para a área de Back-End.

2. Caso esteja na área de Front-End, se quer aprender React ou aprender Vue. Caso esteja na área de Back-End, poderá aprender C# ou aprender Java.

3. Depois, independente das escolhas anteriores, o usuário poderá escolher entre seguir se especializando na área escolhida ou seguir se desenvolvendo para se tornar Fullstack. Você deve exibir na tela uma mensagem específica para cada escolha.

4. Por fim, pergunte quais são as tecnologias nas quais a pessoa gostaria de se especializar ou de conhecer. Aqui, a pessoa pode responder N tecnologias, uma de cada vez. Então, enquanto ela continuar respondendo ok para a pergunta: “Tem mais alguma tecnologia que você gostaria de aprender?”, continue apresentando para ela o Prompt, para que ela complete o nome da tecnologia em questão. E, logo depois, apresente uma mensagem comentando algo sobre a linguagem inserida.

O importante é que a pessoa que estiver jogando possa sempre escolher qual decisão tomar para conseguir aprender e se desenvolver na área de programação.

Além disso, também é essencial que, ao final do jogo, ela possa inserir quantas tecnologias quiser na lista de aprendizado.
*/

// Variáveis para armazenar as escolhas
let userPath = '';
let userTechnology = '';
let userCareerPath = '';
let userTechnologies = [];
let pathHistory = [];

// Função para escolher o caminho inicial
function choosePath(path) {
    userPath = path;
    pathHistory.push(`Você escolheu seguir a área de ${path === 'frontend' ? 'Front-End' : 'Back-End'}`);
    
    // Ocultar a etapa atual e mostrar a próxima
    document.getElementById('step1').classList.add('hidden');
    document.getElementById(`step2-${path}`).classList.remove('hidden');
}

// Função para escolher a tecnologia
function chooseTechnology(tech) {
    userTechnology = tech;
    
    let techName = '';
    switch(tech) {
        case 'react':
            techName = 'React';
            break;
        case 'vue':
            techName = 'Vue';
            break;
        case 'csharp':
            techName = 'C#';
            break;
        case 'java':
            techName = 'Java';
            break;
    }
    
    pathHistory.push(`Você escolheu aprender ${techName}`);
    
    // Ocultar a etapa atual e mostrar a próxima
    document.getElementById(`step2-${userPath}`).classList.add('hidden');
    document.getElementById('step3').classList.remove('hidden');
}

// Função para escolher o caminho de carreira
function chooseCareerPath(path) {
    userCareerPath = path;
    
    pathHistory.push(`Você decidiu ${path === 'specialist' ? 'se especializar na área escolhida' : 'se desenvolver como Fullstack'}`);
    
    // Ocultar a etapa atual e mostrar a próxima
    document.getElementById('step3').classList.add('hidden');
    document.getElementById('step4').classList.remove('hidden');
}

// Função para adicionar tecnologia
function addTechnology() {
    const techInput = document.getElementById('techInput');
    const tech = techInput.value.trim();
    
    if (tech) {
        userTechnologies.push(tech);
        const techList = document.getElementById('techList');
        const techItem = document.createElement('div');
        techItem.className = 'tech-item';
        techItem.innerHTML = `<strong>${tech}:</strong> ${getTechComment(tech)}`;
        techList.appendChild(techItem);
        
        techInput.value = '';
        document.getElementById('techInput').focus();
    }
}

// Função para continuar adicionando tecnologias
function continueTechInput() {
    document.getElementById('techInput').focus();
}

// Função para finalizar o jogo
function finishGame() {
    // Ocultar a etapa atual e mostrar o resultado final
    document.getElementById('step4').classList.add('hidden');
    document.getElementById('finalResult').classList.remove('hidden');
    
    // Construir a mensagem final
    let resultMessage = getFinalMessage();
    document.getElementById('resultText').innerHTML = resultMessage;
    
    // Mostrar o histórico de escolhas
    document.getElementById('pathHistory').innerHTML = "Seu caminho:<br>" + pathHistory.join("<br>");
}

// Função para obter um comentário sobre a tecnologia
function getTechComment(tech) {
    const techLower = tech.toLowerCase();
    
    // Dicionário de comentários para tecnologias comuns
    const comments = {
        'javascript': "Excelente escolha! JavaScript é a linguagem da web e essencial para qualquer desenvolvedor.",
        'typescript': "TypeScript adiciona tipagem estática ao JavaScript, tornando seu código mais robusto e fácil de manter.",
        'react': "React é uma das bibliotecas mais populares para desenvolvimento de interfaces, mantida pelo Facebook.",
        'vue': "Vue.js é um framework progressivo e fácil de aprender, ideal para projetos de qualquer escala.",
        'angular': "Angular é um framework completo mantido pelo Google, excelente para aplicações empresariais.",
        'node': "Node.js permite usar JavaScript no backend, unificando a linguagem em toda sua stack.",
        'node.js': "Node.js permite usar JavaScript no backend, unificando a linguagem em toda sua stack.",
        'python': "Python é uma linguagem versátil, excelente para iniciantes e muito utilizada em ciência de dados.",
        'java': "Java é uma linguagem robusta e amplamente utilizada em empresas e aplicações Android.",
        'c#': "C# é a principal linguagem da plataforma .NET da Microsoft, ideal para desenvolvimento Windows e jogos com Unity.",
        'csharp': "C# é a principal linguagem da plataforma .NET da Microsoft, ideal para desenvolvimento Windows e jogos com Unity.",
        'php': "PHP é uma linguagem server-side popular, usada em grande parte dos sites da web.",
        'ruby': "Ruby é conhecida por sua elegância e produtividade, especialmente com o framework Rails.",
        'go': "Go é uma linguagem moderna focada em simplicidade e performance, ideal para sistemas distribuídos.",
        'golang': "Go é uma linguagem moderna focada em simplicidade e performance, ideal para sistemas distribuídos.",
        'rust': "Rust é uma linguagem focada em segurança de memória e performance, ganhando cada vez mais popularidade.",
        'kotlin': "Kotlin moderniza o desenvolvimento para a JVM e é a linguagem preferida para Android.",
        'swift': "Swift é a linguagem moderna da Apple para desenvolvimento iOS e macOS.",
        'sql': "SQL é essencial para trabalhar com bancos de dados relacionais."
    };
    
    // Verificar se temos um comentário específico para a tecnologia
    for (const key in comments) {
        if (techLower.includes(key) || key.includes(techLower)) {
            return comments[key];
        }
    }
    
    // Comentário genérico para tecnologias não listadas
    return `${tech} é uma ótima adição ao seu conjunto de habilidades. Continuar aprendendo novas tecnologias é fundamental para se manter relevante no mercado.`;
}

// Função para obter a mensagem final
function getFinalMessage() {
    let message = "";
    
    // Mensagem baseada nas escolhas do usuário
    if (userPath === 'frontend') {
        if (userTechnology === 'react') {
            message = "Você está seguindo o caminho do desenvolvimento Front-End com React! ";
            message += "React é uma das bibliotecas mais populares do mercado, utilizada por empresas como Facebook, Instagram e Airbnb. ";
        } else if (userTechnology === 'vue') {
            message = "Você está seguindo o caminho do desenvolvimento Front-End com Vue! ";
            message += "Vue.js é um framework progressivo que tem ganhado muita popularidade devido à sua curva de aprendizado suave. ";
        }
    } else if (userPath === 'backend') {
        if (userTechnology === 'csharp') {
            message = "Você está seguindo o caminho do desenvolvimento Back-End com C#! ";
            message += "C# é uma linguagem poderosa da Microsoft, ideal para aplicações empresariais e desenvolvimento de jogos com Unity. ";
        } else if (userTechnology === 'java') {
            message = "Você está seguindo o caminho do desenvolvimento Back-End com Java! ";
            message += "Java é uma linguagem robusta e portátil, utilizada em grandes sistemas empresariais e aplicações Android. ";
        }
    }
    
    // Adicionar mensagem sobre o caminho de carreira
    if (userCareerPath === 'specialist') {
        message += "Você decidiu se especializar na sua área, o que permitirá que você se torne uma referência e alcance posições mais avançadas. ";
    } else if (userCareerPath === 'fullstack') {
        message += "Você decidiu se desenvolver como Fullstack, o que te dará uma visão ampla do desenvolvimento e mais versatilidade no mercado. ";
    }
    
    // Adicionar mensagem sobre tecnologias escolhidas
    if (userTechnologies.length > 0) {
        message += `<br><br>Você demonstrou interesse em aprender ${userTechnologies.length} tecnologia(s): <strong>${userTechnologies.join(', ')}</strong>. `;
        message += "Continuar aprendendo é a chave para o sucesso na área de desenvolvimento!";
    }
    
    return message;
}

// Função para reiniciar o jogo
function restartGame() {
    // Redefinir variáveis
    userPath = '';
    userTechnology = '';
    userCareerPath = '';
    userTechnologies = [];
    pathHistory = [];
    
    // Redefinir a interface
    document.getElementById('techList').innerHTML = '';
    document.getElementById('finalResult').classList.add('hidden');
    document.getElementById('step1').classList.remove('hidden');
}