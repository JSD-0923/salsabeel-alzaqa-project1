const toggleThemeButton = document.getElementById('theme-btn');
const ThemeButtonName = document.getElementById('theme-name');
const openButton = document.getElementById('favourite-btn');
const drawer = document.getElementById('drawer');
const htmlElement = document.documentElement;
toggleThemeButton.addEventListener('click', () => {
debugger
if (htmlElement.getAttribute('data-theme') === 'light') {
        htmlElement.setAttribute('data-theme', 'dark');
        ThemeButtonName.innerHTML = "Light Mode";
    } else {
        htmlElement.setAttribute('data-theme', 'light');
        ThemeButtonName.innerHTML = "Dark Mode";
    }
});

openButton.addEventListener('click', () => {
    drawer.style.transform = 'translateY(0)';
});
document.body.addEventListener('click', (event) => {
    if (!drawer.contains(event.target) && event.target !== openButton) {
        drawer.style.transform = 'translateY(100%)';
    }
});