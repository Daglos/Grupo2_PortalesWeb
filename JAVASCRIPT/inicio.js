document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.track');
    const panels = document.querySelectorAll('.hero-panel');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    const total = panels.length;

    function goToSlide(index) {
        currentIndex = (index + total) % total;
        panels.forEach(panel => panel.classList.remove('zoom-out'));
        panels[currentIndex].classList.add('zoom-out');
        track.style.transform = `translateY(-${currentIndex * 100}vh)`;

        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    let slideInterval = setInterval(nextSlide, 3000);


    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetInterval();
        });
    });

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 3000);
    }
});