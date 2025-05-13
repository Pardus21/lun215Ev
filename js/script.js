// Анимация шагов при прокрутке
document.addEventListener('DOMContentLoaded', function() {
    // Анимация шагов
    const steps = document.querySelectorAll('.step');
    
    function animateSteps() {
        steps.forEach((step, index) => {
            setTimeout(() => {
                step.style.opacity = '1';
                step.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
    
    // Инициализация анимации шагов
    steps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(20px)';
        step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Запуск анимации при загрузке
    animateSteps();
    
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Валидация формы подписки
    const subscribeForm = document.querySelector('.subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput.value && emailInput.checkValidity()) {
                alert('Спасибо за подписку! Мы будем присылать вам информацию о специальных предложениях.');
                emailInput.value = '';
            } else {
                alert('Пожалуйста, введите корректный email адрес.');
            }
        });
    }
    
    // Инициализация выбора даты (минимум сегодня)
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        const minDate = yyyy + '-' + mm + '-' + dd;
        
        dateInput.setAttribute('min', minDate);
    }
    
    // Анимация при наведении на карточки
    const cards = document.querySelectorAll('.location-card, .promo-card, .review');
    cards.forEach(card => {
        card.style.transition = 'transform 0.3s ease';
    });
});

// Для страницы бронирования
if (document.getElementById('booking-form')) {
    // Расчет стоимости при изменении услуг
    const serviceCheckboxes = document.querySelectorAll('input[name="services"]');
    serviceCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            calculateTotalPrice();
        });
    });
    
    // Функция расчета общей стоимости
    function calculateTotalPrice() {
        let total = 5000; // Базовая стоимость
        
        // Добавляем стоимость выбранных услуг
        if (document.getElementById('food').checked) total += 3000;
        if (document.getElementById('animators').checked) total += 5000;
        if (document.getElementById('host').checked) total += 4000;
        if (document.getElementById('taxi').checked) total += 2000;
        
        // Обновляем отображение
        document.getElementById('total-price').textContent = total.toLocaleString('ru-RU') + ' руб.';
    }
    
    // Инициализация расчета
    calculateTotalPrice();
}