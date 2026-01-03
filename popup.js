document.addEventListener('DOMContentLoaded', () => {
    const aboutButton = document.getElementById('about-button');
    const popupContainer = document.getElementById('popup-container');
    const closeButton = document.getElementById('close-button');

    aboutButton.addEventListener('click', () => {
        popupContainer.classList.add('show');
    });

    closeButton.addEventListener('click', () => {
        popupContainer.classList.remove('show');
    });

    popupContainer.addEventListener('click', (event) => {
        if (event.target === popupContainer) {
            popupContainer.classList.remove('show');
        }
    });
});





