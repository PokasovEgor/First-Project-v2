// Получаем элементы
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('myVideo');
    const playBtn = document.getElementById('customPlayBtn');

    // Проверяем, существуют ли элементы
    if (!video || !playBtn) {
        console.error('Video or play button not found');
        return;
    }

    // Функция для обновления состояния кнопки
    function updatePlayButton() {
        if (video.paused) {
            playBtn.style.display = 'block';
        } else {
            playBtn.style.display = 'none';
        }
    }

    // Обработчик клика по кнопке Play
    playBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Предотвращаем всплытие события
        
        if (video.paused) {
            video.play()
                .then(() => {
                    playBtn.style.display = 'none';
                })
                .catch(error => {
                    console.error('Ошибка воспроизведения:', error);
                    // Показываем кнопку обратно при ошибке
                    playBtn.style.display = 'block';
                });
        } else {
            video.pause();
            playBtn.style.display = 'block';
        }
    });

    // Обработчик клика по видео - ставим на паузу и показываем кнопку
    video.addEventListener('click', function() {
        if (!video.paused) {
            video.pause();
            playBtn.style.display = 'block';
        }
    });

    // Обработчики событий видео
    video.addEventListener('play', function() {
        playBtn.style.display = 'none';
    });

    video.addEventListener('pause', function() {
        playBtn.style.display = 'block';
    });

    video.addEventListener('ended', function() {
        playBtn.style.display = 'block';
    });

    // Дополнительно: показывать кнопку при наведении на видео (опционально)
    let hideTimeout;
    video.addEventListener('mouseenter', function() {
        if (!video.paused) {
            clearTimeout(hideTimeout);
            playBtn.style.display = 'block';
        }
    });

    video.addEventListener('mouseleave', function() {
        if (!video.paused) {
            hideTimeout = setTimeout(() => {
                if (!video.paused) {
                    playBtn.style.display = 'none';
                }
            }, 500);
        }
    });

    // Инициализация состояния кнопки
    updatePlayButton();
});

// class SmoothViewportCSS {
//     constructor() {
//         this.resizeTimeout = null;
//         this.init();
//     }
    
//     init() {
//         this.updateViewportHeight();
        
//         window.addEventListener('resize', () => {
//             // Дебаунс ресайза
//             clearTimeout(this.resizeTimeout);
//             this.resizeTimeout = setTimeout(() => {
//                 this.updateViewportHeight();
//             }, 100);
//         });
        
//         window.addEventListener('orientationchange', () => {
//             setTimeout(() => {
//                 this.updateViewportHeight();
//             }, 500);
//         });
//     }
    
//     updateViewportHeight() {
//         const vh = window.innerHeight * 0.01;
//         document.documentElement.style.setProperty('--vh', `${vh}px`);
//     }
// }
