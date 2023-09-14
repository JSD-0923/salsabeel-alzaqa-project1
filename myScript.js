const toggleThemeButton = document.getElementById('theme-btn');
const ThemeButtonName = document.getElementById('theme-name');
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
    window.location.href = "/details";
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