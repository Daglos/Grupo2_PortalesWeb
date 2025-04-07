document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menu-hamburguesa");
    const navMenu = document.getElementById("nav-menu").querySelector("ul");

    menuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
});

