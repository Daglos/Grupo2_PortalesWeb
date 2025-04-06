document.addEventListener("DOMContentLoaded", ()=>{
    const infoTarjeta=document.getElementById("infoTarjeta");
    const btnTarjeta=document.getElementById("btnTarjeta");

    btnTarjeta.addEventListener('click', ()=>{
        const currentDisplay = window.getComputedStyle(infoTarjeta).display;
        if (currentDisplay === "none") {
            infoTarjeta.style.display = "flex"; // Muestra el formulario
        } else {
            infoTarjeta.style.display = "none"; // Oculta el formulario
        }
    });
});