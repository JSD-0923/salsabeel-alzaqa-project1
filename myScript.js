const toggleThemeButton = document.getElementById('theme-btn');
const ThemeButtonName = document.getElementsByClassName('theme-name');
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