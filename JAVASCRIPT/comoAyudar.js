document.addEventListener("DOMContentLoaded", ()=>{
    const frmVoluntario = document.getElementById("frmVoluntarios");
    const txtNombre = document.getElementById("txtNombre");
    const txtFechaNacimiento = document.getElementById("txtFechaNacimiento");
    const txtCiudad = document.getElementById("txtCiudad");
    const txtMotivacion = document.getElementById("txtMotivacion");

    const btnMostrar = document.getElementById("btnMostrarFrm");
    const btnCerrar = document.getElementById("btnCerrar");
    const fondoBorroso = document.getElementById("fondoBorroso");
    const infoVoluntario = document.getElementById("infoVoluntario");
    const seccion = document.getElementById("seccion");

    

    btnMostrar.addEventListener("click", () => {
        fondoBorroso.style.display = "flex";
        infoVoluntario.style.display = "flex";
        seccion.classList.add("blur");
    });

    btnCerrar.addEventListener("click", () => {
        fondoBorroso.style.display = "none";
        infoVoluntario.style.display = "none";
        seccion.classList.remove("blur");
    });

    function removeErrors(){
        txtCiudad.classList.remove("error");
        txtNombre.classList.remove("error");
        txtFechaNacimiento.classList.remove("error");
        txtMotivacion.classList.remove("error");
    }

    function OnSubmit_frmVoluntario(e){
        const error = {};
        let hayErrores=false;
        const regexVacio = /^\s*$/;

        removeErrors();

        const errorContainers = document.querySelectorAll('[id^="div"]');
        errorContainers.forEach(container => {
            const existingErrorMessage = container.querySelector(".error");
            if (existingErrorMessage) {
                container.removeChild(existingErrorMessage);
            }
        });

        if(regexVacio.test(txtNombre.value)){
            error["Nombre"] = "El nombre no puede ir vacio";
            console.log("no vacio")
            hayErrores=true;
        }
        if(regexVacio.test(txtFechaNacimiento.value)){
            error["FechaNacimiento"] = "El FechaNacimiento no puede ir vacio";
            hayErrores=true;
        }
        if(regexVacio.test(txtCiudad.value)){
            error["Ciudad"] = "El ciudad no puede ir vacio";
            hayErrores=true;
        }
        if(regexVacio.test(txtMotivacion.value)){
            error["Motivacion"] = "El motivacion no puede ir vacio";
            hayErrores=true;
        }

        if (hayErrores){
            e.preventDefault();
            console.log("Encontro Errores")
            const errorKeys = Object.keys(error);
            let focusAssigned=false;
            for(errorKey of errorKeys) {
                const errorDivHolder = document.getElementById(`div${errorKey}`);
                console.log("entro al for");
                if (errorDivHolder){
                    console.log("tiene errores error")
                    let errorDivMessage = document.getElementById(`${errorKey}Error`);
                    if (errorDivMessage) {
                        errorDivMessage.textContent = error[errorKey];
                        console.log("metio mensaje en error");
                    }else{
                        errorDivMessage = document.createElement("DIV");
                        errorDivMessage.textContent = error[errorKey];
                        errorDivMessage.classList.add('error');
                        errorDivHolder.appendChild(errorDivMessage);
                        console.log("creo error");
                    }
                    let inputObject = errorDivHolder.querySelector('input, textarea');
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

    frmVoluntario.addEventListener('submit', OnSubmit_frmVoluntario);
})