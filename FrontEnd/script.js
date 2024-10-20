let progress = 0;
let countdownTime = 30; // Tempo inicial do contador
const character = document.getElementById('character');
const loadingContainer = document.getElementById("loading-container");
const content = document.getElementById("content");
const progressBarFill = document.getElementById("progress-bar-fill");
const progressText = document.getElementById("progress-text");
const countdown = document.getElementById("countdown");
const timeSpan = document.getElementById("time");
const divs = document.querySelectorAll('div');
divs.forEach(div => div.classList.add('hidden'));

// Função para atualizar o progresso da barra e o personagem
function updateProgress() {
    progress += 1;
    progressBarFill.style.width = `${progress}%`;
    progressText.innerText = `${progress}%`;

    if (progress <= 33) {
        progressText.innerText = `O primeiro passo é sempre o mais difícil! ${progress}%`;
    } else if (progress <= 66) {
        progressText.innerText = `Não vai desistir no meio do caminho? ${progress}%`;
    } else {
        progressText.innerText = `Você chegou tão longe, não desanime! ${progress}%`;
    }

    if (progress >= 100) {
        loadingContainer.style.transition = 'opacity 0.5s';
        loadingContainer.style.opacity = '0';
        setTimeout(() => {
            loadingContainer.style.display = 'none';
            content.style.display = 'block';
        }, 500);
        clearInterval(progressInterval);
    }
}

// Função para iniciar o contador
function startCountdown() {
    const countdownInterval = setInterval(() => {
        countdownTime -= 1;
        timeSpan.innerText = countdownTime;
        if (countdownTime <= 0) {
            clearInterval(countdownInterval);
            alert("O tempo para a oferta expirou!");
        }
    }, 1000);
}

// Observador de Interseção
const myObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});
const elements = document.querySelectorAll('.hidden');
elements.forEach((element) => myObs.observe(element));

// Função para limpar letras no campo de telefone
const phoneInput = document.getElementById("phone");
phoneInput.addEventListener("input", function () {
    phoneInput.value = phoneInput.value.replace(/[^\d\s()\-]/g, ''); // Limpa caracteres não numéricos
});

// Função para o carrossel de imagens
const images = ['img/stick1.png', 'img/stick2.png', 'img/stick3.png'];
let currentImageIndex = 0;
const carouselContainer = document.getElementById('carousel-container');
function updateCarousel() {
    carouselContainer.innerHTML = '';
    const img = document.createElement('img');
    img.src = images[currentImageIndex];
    img.style.width = '300px';
    img.style.height = '200px';
    img.style.borderRadius = '8px';
    carouselContainer.appendChild(img);

    currentImageIndex = (currentImageIndex + 1) % images.length;
}
setInterval(updateCarousel, 2000);
updateCarousel();

// Função para validar nome
function isValidName(name) {
    const nameRegex = /^[a-zA-Z\s]{2,}$/; // Apenas letras e espaços, com pelo menos 2 caracteres
    return nameRegex.test(name);
}

// Função para validar e-mail
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Valida formato de e-mail básico
    return emailRegex.test(email);
}

// Função para validar telefone
function isValidPhone(phone) {
    const phoneRegex = /^(?:\+?(\d{1,3}))?[-. ()]?(\d{2,3})?[-. ()]?(\d{4})[-. ]?(\d{4})$/; // Aceita diversos formatos de telefone
    return phoneRegex.test(phone);
}

// Evento de validação do campo de nome
const nameInput = document.getElementById("name");
nameInput.addEventListener("input", function () {
    // Limpa caracteres não permitidos
    this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
});

// Evento de envio do formulário
const form = document.getElementById("signup-form");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = nameInput.value;
    const email = document.getElementById("email").value;
    const phone = phoneInput.value; // Captura o telefone já limpo

    // Limpa mensagens anteriores
    document.getElementById("name-error").textContent = '';
    document.getElementById("email-error").textContent = '';
    document.getElementById("phone-error").textContent = '';

    // Validações
    let isValid = true;

    if (!isValidName(name)) {
        document.getElementById("name-error").textContent = "Por favor, insira um nome válido com pelo menos 2 caracteres.";
        isValid = false; // Impede o envio do formulário se o nome for inválido
    }

    if (!isValidEmail(email)) {
        document.getElementById("email-error").textContent = "Por favor, insira um e-mail válido.";
        isValid = false; // Impede o envio do formulário se o e-mail for inválido
    }

    if (!isValidPhone(phone)) {
        document.getElementById("phone-error").textContent = "Por favor, insira um número de telefone válido (formato aceito: (XX) XXXXX-XXXX).";
        isValid = false; // Impede o envio do formulário se o telefone for inválido
    }

    if (!isValid) return; // Se algum campo é inválido, não envia o formulário

    // Mensagem de sucesso
    document.getElementById("message").style.display = "block";
    document.getElementById("message").textContent = `Obrigado, ${name}! Você se inscreveu com sucesso!`;

    setTimeout(() => {
        document.getElementById("message").style.display = "none";
    }, 5000);

    // Resetar o formulário
    form.reset();

    // Abre o link do grupo do WhatsApp
    const whatsappGroupLink = `https://api.whatsapp.com/send?phone=YOUR_PHONE_NUMBER&text=Olá%20${encodeURIComponent(name)},%20eu%20me%20inscrevi%20no%20seu%20formulário!`;
    window.open(whatsappGroupLink, "_blank");
});

// Inicializa a barra de progresso e o contador
const progressInterval = setInterval(updateProgress, 100);
startCountdown();
