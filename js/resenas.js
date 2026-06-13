const starButtons = document.querySelectorAll('.star-btn');
const calificacion = document.getElementById('calificacion');

starButtons.forEach(button => {
    button.addEventListener('click', () => {
        const value = Number(button.dataset.value);
        calificacion.value = value;

        starButtons.forEach(star => {
            const starValue = Number(star.dataset.value);

            if (starValue <= value) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    });
});