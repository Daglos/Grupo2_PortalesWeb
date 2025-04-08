const   regexIsEmpty = /^\s*$/;
const   regexIsEMail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

document.addEventListener('DOMContentLoaded', () => {
    const formSolicitud = document.getElementById("contact-form");
    const txtnombre = document.getElementById("txtnombre");
    const txtcorreo = document.getElementById("txtcorreo");
    const txttelefono = document.getElementById("txttelefono");

    function onSubmit_formSolicitud (e) {
        const errors = {};
        let hasErrors = false;
        
        if (regexIsEmpty.test(txtnombre.value)){
            hasErrors = true;
            txtnombre.style.border = "2px solid red";
            alert("Por favor, escriba el primer nombre.");
        }

        if (regexIsEmpty.test(txtcorreo.value) && (hasErrors == false) ){
            hasErrors = true;
            txtcorreo.style.border = "2px solid red";
            alert("Por favor, correo.");
        }

        if (regexIsEmpty.test(txttelefono.value) && (hasErrors == false)){
            hasErrors = true;
            txttelefono.style.border = "2px solid red";
            alert("Por favor, Por favor escriba el correo.");
        }

        if (!regexIsEMail.test(txtcorreo.value) && (hasErrors == false)){
            hasErrors = true;
            txtcorreo.style.border = "2px solid red";
            alert("El correo electrónico no cumple con el formato apropiado: mi.correo@dominio.region");
        }

        // if (hasErrors) {
        //     alert (
        //         JSON.stringify(errors, null, 2).replace('{','').replace('}','').replaceAll('"','').replaceAll(',','')
        //     );
        // }
        e.preventDefault();
        e.stopPropagation();
    }


    formSolicitud.addEventListener("submit", onSubmit_formSolicitud);
});