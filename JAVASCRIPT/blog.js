document.addEventListener("DOMContentLoaded", () => {
    // Resaltado visual 
    const cajasInfo = document.querySelectorAll(".info-box");

    cajasInfo.forEach(caja => {
        caja.addEventListener("click", () => {
            caja.classList.toggle("resaltado");
        });
    });
});


