document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.acordeon-boton');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const content = this.nextElementSibling;

            // La Condicion para alternar la visibilidad
            if (content.style.display === "block") {
                content.style.display = "none";
                this.classList.remove('activo'); // para quitar la clase rotar ícono hacia arriba
            } else {
                content.style.display = "block";
                this.classList.add('activo'); // para agregar la clase rotar ícono hacia abajo
            }
        });
    });
});
