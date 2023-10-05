const toggleThemeButton = document.getElementById('theme-btn');
const nameLink = document.getElementById('name');
const htmlElement = document.documentElement;
toggleThemeButton.addEventListener('click', () => {
    if (htmlElement.getAttribute('data-theme') === 'light') {
        htmlElement.setAttribute('data-theme', 'dark');
        toggleThemeButton.innerHTML = `<ion-icon class="moon" name="moon-outline"></ion-icon> Light Mode `;
    } else {
        htmlElement.setAttribute('data-theme', 'light');
        toggleThemeButton.innerHTML = `<ion-icon class="moon" name="moon-outline"></ion-icon> Dark Mode `;
    }
});
nameLink.addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = 'index.html';
  });
function moveToDetails() {
    window.location.href = 'details.html';
}
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        moveToDetails();
    }
}
document.querySelectorAll('.card').forEach(function(card) {
    card.addEventListener('click', moveToDetails);
    card.addEventListener('keypress', handleKeyPress);
});
