const ObjMail = {
    email: '',
    asunto: '',
    mensaje: ''
}

const formulario = document.getElementById('formulario');
const btnSubmit = document.querySelector('#formulario button[type="submit"]');
const btnReset = document.querySelector('#formulario button[type="reset"]');

document.addEventListener('DOMContentLoaded', function() {
    
    // Selecciona los campos de Input
    const inputEmail = document.getElementById('email');
    const inputAsunto = document.getElementById('asunto');
    const inputMensaje = document.getElementById('mensaje');


    // Asignar eventos
    inputEmail.addEventListener('blur', validar);
    inputAsunto.addEventListener('blur', validar);
    inputMensaje.addEventListener('input', validar);
})

// Para validar

function validar(e) {
    if(e.target.value === '') {
        alerta('error', `El campo ${e.target.id} no puede quedar vacío...`);
        ObjMail[e.target.name] = '';
        comprobarObjeto();
        return;
    }
    if( e.target.id === 'email' && !validarEmail(e.target.value) ) {
        alerta('error', 'El formato de email no es válido');
        ObjMail[e.target.name] = '';
        comprobarObjeto();
        return;
    }

    // Asignar los valores en el objeto
    ObjMail[e.target.name] = e.target.value.trim().toLowerCase();

    // Valida que el objeto esté lleno
    comprobarObjeto();
    

}

function validarEmail(email) {
    const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ;
    const resultado = regex.test(email);
    return resultado;
}

function comprobarObjeto() {
    if ( !Object.values(ObjMail).includes('') ) { // El arreglo que forma el objeto analiza si hay algún string vacio y arroja true
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
        return;
    }
        btnSubmit.classList.add('opacity-50');
        btnSubmit.disabled = true;
}

btnReset.addEventListener('click', (e) => {
    e.preventDefault();
    Swal.fire({
        title: '¿Desea reiniciar el formulario?',
        showDenyButton: true,
        confirmButtonText: 'Aceptar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
            if (result.isConfirmed) {
                formulario.reset();
                ObjMail.email = '';
                ObjMail.asunto = '';
                ObjMail.mensaje = '';
                comprobarObjeto();
            }
      })
})

btnSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    const divPadre = document.createElement('DIV');
    const divSpinner = document.createElement('DIV');
    divPadre.classList.add('flex', 'justify-center', 'mt-20');
    divSpinner.classList.add('sk-chase');
    divSpinner.innerHTML = `  
                            <div class="sk-chase-dot"></div>
                            <div class="sk-chase-dot"></div>
                            <div class="sk-chase-dot"></div>
                            <div class="sk-chase-dot"></div>
                            <div class="sk-chase-dot"></div>
                            <div class="sk-chase-dot"></div>
                        </div>
                        `

    divPadre.appendChild(divSpinner);
    formulario.appendChild(divPadre);

    setTimeout(() => {
    formulario.appendChild(divPadre).remove();
    alerta('success', 'Correo enviado exitosamente.');
    formulario.reset();
    ObjMail.email = '';
    ObjMail.asunto = '';
    ObjMail.mensaje = '';
    comprobarObjeto();
    }, 3000);

})

// Alerta de error
function alerta(icon, title) {
    Swal.fire({
        icon: icon,
        title: title,
        showConfirmButton: false,
        timer: 1500
      })
}
// const btnSubmit = document.querySelector('submit');
// const btnReset = document.querySelector('reset');