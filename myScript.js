const toggleThemeButton = document.getElementById('theme-btn');
const ThemeButtonName = document.getElementById('theme-name');
const openButton = document.getElementById('favourite-btn');
const drawer = document.getElementById('drawer');
const htmlElement = document.documentElement;
toggleThemeButton.addEventListener('click', () => {
    if (htmlElement.getAttribute('data-theme') === 'light') {
        htmlElement.setAttribute('data-theme', 'dark');
        ThemeButtonName.innerHTML = "Light Mode";
    } else {
        htmlElement.setAttribute('data-theme', 'light');
        ThemeButtonName.innerHTML = "Dark Mode";
    }
});
function moveToDetails() {
    let link = window.location.hostname;
    window.location.href = `${link}details.html`;
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
openButton.addEventListener('click', () => {
    drawer.style.transform = 'translateY(0)';
});
document.body.addEventListener('click', (event) => {
    if (!drawer.contains(event.target) && event.target !== openButton) {
        drawer.style.transform = 'translateY(100%)';
    }
});
