document.addEventListener("DOMContentLoaded", () => {
    // Menú hamburguesa
    const menuBtn = document.getElementById("menu-hamburguesa");
    const navMenu = document.getElementById("nav-menu").querySelector("ul");

    menuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    // Resaltado visual 
    const cajasInfo = document.querySelectorAll(".info-box");

    cajasInfo.forEach(caja => {
        caja.addEventListener("click", () => {
            caja.classList.toggle("resaltado");
        });
    });
});


