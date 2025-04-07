document.addEventListener("DOMContentLoaded", () => {
    const btnMenu = document.getElementById("menu-hamburguesa");
    const nav = document.getElementById("nav-menu");

    btnMenu.addEventListener("click", () => {
        nav.classList.toggle("mostrar");
    });
});
