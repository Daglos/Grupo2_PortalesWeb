document.addEventListener("DOMContentLoaded", () => {
    const hamburguesaBtn = document.getElementById("menu-hamburguesa");
    const navMenu = document.getElementById("nav-menu");

    hamburguesaBtn.addEventListener("click", () => {
        navMenu.classList.toggle("active");/*aqui hace que se muestre las lineas*/
    });
});