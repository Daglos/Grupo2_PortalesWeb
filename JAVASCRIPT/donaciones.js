


document.addEventListener("DOMContentLoaded", ()=>{
    const infoTarjeta = document.getElementById("infoTarjeta");
    const btnTarjeta = document.getElementById("btnTarjeta");
    const btnDonar = document.getElementById("btnDonar");
    const frmDonacion = document.getElementById("frmDonaciones");
    const txtNombre = document.getElementById("txtNombre");
    const txtApellido = document.getElementById("txtApellido");
    const txtCorreo = document.getElementById("txtCorreo");
    const txtMonto = document.getElementById("txtMonto");
    const txtFechaVencimiento = document.getElementById("txtFechaVencimiento")
    const txtNumero = document.getElementById("txtNumero");
    const txtCSV = document.getElementById("txtCSV");
    const txtNombreTitular = document.getElementById("txtNombreTitular");



    btnTarjeta.addEventListener('click', ()=>{
        const currentDisplay = window.getComputedStyle(infoTarjeta).display;
        if (currentDisplay === "none") {
            infoTarjeta.style.display = "flex";
            btnDonar.style.display="block";
        } else {
            infoTarjeta.style.display = "none";
            btnDonar.style.display="none";
        }
    });

    txtFechaVencimiento.addEventListener("input", function(event) {
        let valor = txtFechaVencimiento.value;

        // Eliminar caracteres no numéricos para evitar problemas
        valor = valor.replace(/\D/g, '');

            // Agregar automáticamente la pleca (/) después de los primeros dos dígitos
        if (valor.length > 2) {
            valor = valor.slice(0, 2) + '/' + valor.slice(2);
        }

            // Limitar el valor a 5 caracteres (MM/YY)
        txtFechaVencimiento.value = valor.slice(0, 5);
    });

    function validarTarjetaDeCredito(numeroTarjeta) {

        numeroTarjeta = numeroTarjeta.replace(/\D/g, '');

        let suma = 0;
        let alternar = false;
    
        
        for (let i = numeroTarjeta.length - 1; i >= 0; i--) {
            let digito = parseInt(numeroTarjeta.charAt(i), 10);
    
            if (alternar) {
                digito *= 2;
                if (digito > 9) {
                    digito -= 9;
                }
            }
    
            suma += digito;
            alternar = !alternar;
        }
    
        return (suma % 10 === 0);
    }

    function removeError(){
        txtMonto.classList.remove('error');
        txtNombre.classList.remove('error');
        txtApellido.classList.remove('error');
        txtCorreo.classList.remove('error');
        txtNumero.classList.remove('error');
        txtFechaVencimiento.classList.remove('error');
        txtCSV.classList.remove('error');
        txtNombreTitular.classList.remove('error');
    }

    function OnSubmit_frmDonaciones(e){
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const regexNumero= /^\d{16}$/;
        const regexCSV = /^\d{3}$/;
        const regexNombreTitular = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s'-]+$/;
        const regexNombreApellido = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+ [A-Za-zÁÉÍÓÚáéíóúÑñ]+$/;

        const regexVacio = /^\s*$/;


        let numeroTarjeta = txtNumero.value;
        let hayErrores = false;
        const error = {};

        removeError();

        const errorContainers = document.querySelectorAll('[id^="div"]');
        errorContainers.forEach(container => {
            const existingErrorMessage = container.querySelector(".error");
            if (existingErrorMessage) {
                container.removeChild(existingErrorMessage);
            }
        });

        if(regexVacio.test(txtMonto.value)){
            error["Monto"]="El Monto no puede quedar vacio.";
        }
        
        if(!regexNombreApellido.test(txtNombre.value)){
            error["Nombre"]="Nombre Invalido.";
        }

        if(!regexNombreApellido.test(txtApellido.value)){
            error["Apellido"]="Apellido Invalido.";
        }

        if(!regexEmail.test(txtCorreo.value)){
            error["Correo"]="Correo Invalido.";
        }

        if(!validarTarjetaDeCredito(numeroTarjeta)){
            error["Numero"]="Tarjeta invalida.";
            hayErrores=true;
        }

        if (!regexNumero.test(numeroTarjeta)){
            error["Numero"]="El numero ingresado no debe ser mayor o menor a 16 digitos.";
            hayErrores=true;
        }

        let fechaVencimiento = txtFechaVencimiento.value.trim();

        const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!regex.test(fechaVencimiento)) {
            error["FechaVencimiento"]="El formato ingreado es incorrecto, MM/YY.";
            hayErrores=true;
        }

            // Verificar si la fecha no está vencida
        const [mes, ano] = fechaVencimiento.split("/").map(num => parseInt(num, 10));
        const fechaActual = new Date();
        const mesActual = fechaActual.getMonth() + 1; // Enero es 0, por eso sumamos 1
        const anoActual = fechaActual.getFullYear() % 100; // Tomar solo los últimos dos dígitos del año

        if (ano < anoActual || (ano === anoActual && mes < mesActual)) {
            error["FechaVencimiento"] = "La tarjeta está vencida.";
            hayErrores=true;
        }

        if(!regexCSV.test(txtCSV.value)){
            error["CSV"] = "Codigo de seguridad invalido.";
            hayErrores=true;
        }

        if(!regexNombreTitular.test(txtNombreTitular.value)){
            error["NombreTitular"]="Nombre Invalido.";
            hayErrores=true;
        }

        if (hayErrores){
            const errorKeys = Object.keys(error);
            let focusAssigned=false;
            for(errorKey of errorKeys) {
                const errorDivHolder = document.getElementById(`div${errorKey}`);
                if (errorDivHolder){
                    let errorDivMessage = document.getElementById(`${errorKey}Error`);
                    if (errorDivMessage) {
                        errorDivMessage.textContent = error[errorKey];
                    }else{
                        errorDivMessage = document.createElement("DIV");
                        errorDivMessage.textContent = error[errorKey];
                        errorDivMessage.classList.add('error');
                        errorDivHolder.appendChild(errorDivMessage);
                    }
                    let inputObject = errorDivHolder.querySelector('input');
                    inputObject.classList.add('error');
                    if(!focusAssigned){
                        inputObject.focus();
                        focusAssigned=true;
                    }
                }

            }

            e.preventDefault();
            e.stopPropagation();
        }
    }



    frmDonacion.addEventListener('submit', OnSubmit_frmDonaciones);
});