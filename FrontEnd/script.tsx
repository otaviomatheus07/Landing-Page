let progress = 0;
const progressBarFill = document.getElementById('progress-bar-fill') as HTMLElement;
const character = document.getElementById('character') as HTMLImageElement;
const loadingContainer = document.getElementById('loading-container') as HTMLElement;
const content = document.getElementById('content') as HTMLElement;

// Função para atualizar o progresso da barra e o personagem
function updateProgress() {
    progress += 1;
    progressBarFill.style.width = `${progress}%`;

    // Alterar o tamanho do personagem conforme o progresso
    if (progress <= 50) {
        character.src = "personagem_gordo.png"; // Exibe personagem "gordo"
        const scale = 1 + (progress / 100); // Escala crescente até 50%
        character.style.width = `${200 * scale}px`;
        character.style.height = `${300 * scale}px`;
    } else {
        character.src = "personagem_magro.png"; // Exibe personagem "magro"
        const scale = 2 - (progress / 100); // Escala decrescente após 50%
        character.style.width = `${200 * scale}px`;
        character.style.height = `${300 ** scale}px`;
    }

    // Se o progresso for 100%, ocultar a tela de carregamento e mostrar o conteúdo
    if (progress >= 100) {
        loadingContainer.style.display = 'none'; // Oculta a tela de carregamento
        content.style.display = 'block';         // Mostra o conteúdo principal
    } else {
        setTimeout(updateProgress, 50); // Atualiza o progresso a cada 50ms
    }
}

// Iniciar o progresso ao carregar a página
window.onload = () => {
    updateProgress();
};
