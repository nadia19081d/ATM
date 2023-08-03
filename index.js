const usersDB = [
    {
        user: 'Jorge',
        pass: '123',
        saldo: 120
    },
    {
        user: 'Jaime',
        pass: '234',
        saldo: 350
    },
    {
        user: 'Erik',
        pass: '345', 
        saldo: 600
    },
    {
        user: 'Nadia',
        pass: '456', 
        saldo: 550 
    },
    {
        user: 'Miguel',
        pass: '567', 
        saldo: 700
    }
]


const formulario = document.getElementById('formulario')
const bienvenidaBotones = document.getElementById('saldos')

const botones_forma = document.getElementsByClassName('button')
function crearBienvenida(){
    formulario.classList.remove('formulario')
    formulario.classList.add('esconder')
    bienvenidaBotones.classList.remove('esconder')
    bienvenidaBotones.classList.add('formulario')
    botones_forma.style.width("50%")
    botones_forma.style.marginTop("30px")
}
const headerBoton = document.getElementById('header')

function botonCerrarSesion (){
    const botonCerrar = document.createElement("button")
    botonCerrar.setAttribute('type', 'button');
    botonCerrar.innerText = 'Cerrar sesion';
    botonCerrar.style.position = "absolute";
    botonCerrar.style.top = "10px"; /* Ajusta el valor para cambiar la distancia desde la parte superior */
    botonCerrar.style.right = "10px"; /* Ajusta el valor para cambiar la distancia desde la parte derecha */

    headerBoton.appendChild(botonCerrar)
    botonCerrar.onclick = function() {

        location.reload();

    }
}




function validar(usuario, password){
    for(let index = 0; index < usersDB.length; index++){

        if(usuario === ''){
            mostrarError('Usuario')
        }
        else if(password === '' || password !== usersDB[index].pass){
            mostrarError('Password')
        }
        else if(usuario === usersDB[index].user && password === usersDB[index].pass){
            console.log('Bienvenido', usuario);
            crearBienvenida()
        }
        else{
            
            mostrarError('Datos')
        }

    }
}

function mostrarError(tipo){
    let errorAMostrar = document.getElementById(`error${tipo}`)

    errorAMostrar.classList.remove('esconder')
    errorAMostrar.classList.add('error')
    setTimeout(()=>{
        errorAMostrar.classList.remove('error')
        errorAMostrar.classList.add('esconder')
    }, 4000)
}


formulario.addEventListener('submit', (evento)=>{
    evento.preventDefault()

    let usuarioIngresado = document.getElementById('usuarioHtml').value

    let passwordIngresado = document.getElementById('passwordHtml').value
    let saldo= 0 ; 

    validar(usuarioIngresado, passwordIngresado)

})



function saldo(usuario){
    for(let index = 0; index < usersDB.length; index++){
        if(usuario === usersDB[index].user){
            return usersDB[index].saldo
        }
    }
}

function valorarSaldo(saldo){
    if(saldo < 990 && saldo >10 ){
        return saldo;
    }
    else{
        return "Tu saldo es menor o mayor a lo permitido"
    }
}
const areaSaldos = document.getElementById("areaSaldos")
function mostrarSaldo(event){
    botonCerrarSesion ()
    bienvenidaBotones.classList.add('esconder')
    areaSaldos.classList.add('formulario')
    
    let usuarioIngresado = document.getElementById('usuarioHtml').value
    let cash = parseInt(saldo(usuarioIngresado));
    let saldoUsuarioVerificado = valorarSaldo(cash); 
    const titulo_saldo = document.createElement('h1');
    let parrafo_saldo = document.createElement('p')

    titulo_saldo.innerHTML = "Bienvenido a tu cuenta " + usuarioIngresado;

    parrafo_saldo.innerHTML = " Tu saldo actual es:  $ " + saldoUsuarioVerificado
    areaSaldos.appendChild(titulo_saldo)
    areaSaldos.appendChild(parrafo_saldo)
    
}

function depositar(event){
    botonCerrarSesion ()
    bienvenidaBotones.classList.add('esconder')
    areaSaldos.classList.add('formulario')
    let usuarioIngresado = document.getElementById('usuarioHtml').value
    let cash = parseInt(saldo(usuarioIngresado));
    let saldoUsuarioVerificado = valorarSaldo(cash); 

    const titulo_deposito = document.createElement('h1');
    let parrafo_saldo = document.createElement('p')
    titulo_deposito.innerHTML = "Depósito"
    parrafo_saldo.innerHTML = " Tu saldo actual es:  $ " + saldoUsuarioVerificado

    /*Agregar boton */
    const boton_deposito = document.createElement("button"); 
    boton_deposito.setAttribute('type', 'button');
    boton_deposito.innerText = 'Enviar';
    // Poner el input para que se envie el valor ingresado 
    let saldoInput = document.createElement('input')
    saldoInput.setAttribute('placeholder', 'Ingresa el monto')
    saldoInput.value 
    areaSaldos.appendChild(titulo_deposito)
    areaSaldos.appendChild(parrafo_saldo)
    areaSaldos.appendChild(saldoInput)
    areaSaldos.appendChild(boton_deposito)
    

    boton_deposito.onclick = function() {
        let deposito = parseInt(saldoInput.value); 
        console.log(deposito)
        let nuevoDeposito = saldoUsuarioVerificado + deposito
        if (nuevoDeposito >10 && nuevoDeposito <990 && deposito >0){
            saldoInput.style.display = "none";
            boton_deposito.style.display = "none"; 
            parrafo_saldo.style.display = "none"
            agregarVentaDepositoRetiro (nuevoDeposito) 
        } else if(nuevoDeposito >990) {
            let errorNegativo = document.createElement('p')
                errorNegativo.style.marginTop = '20px' 
                errorNegativo.innerHTML = "Excediste el limite permitido en tu cuenta" 
                areaSaldos.appendChild(errorNegativo)
            setTimeout(()=>{
                
                errorNegativo.style.display = 'none'
                
            }, 4000)
        } else{
            let errorNegativo = document.createElement('p')
                errorNegativo.style.marginTop = '20px' 
                errorNegativo.innerHTML = "No puedes ingresar numeros negativos o caracteres" 
                areaSaldos.appendChild(errorNegativo)
            setTimeout(()=>{
                
                errorNegativo.style.display = 'none'
                
            }, 4000)

        }
        
        
        // Crear condicional para que no agrege mas de 990 y que la cuenta no quede en menos de 10

    };
}

function agregarVentaDepositoRetiro (nuevoDeposito){
    let saldoNuevo = document.createElement('p')
    saldoNuevo.style.marginTop = '20px' 
    saldoNuevo.innerHTML = "Tu saldo despues de la operacion es : $ " +  nuevoDeposito
    areaSaldos.appendChild(saldoNuevo)
}

function retiro(event){
    botonCerrarSesion ()
    bienvenidaBotones.classList.add('esconder')
    areaSaldos.classList.add('formulario')
    let usuarioIngresado = document.getElementById('usuarioHtml').value
    let cash = parseInt(saldo(usuarioIngresado));
    let saldoUsuarioVerificado = valorarSaldo(cash); 

    const titulo_deposito = document.createElement('h1');
    let parrafo_saldo = document.createElement('p')
    titulo_deposito.innerHTML = "Retiro"
    parrafo_saldo.innerHTML = " Tu saldo actual es:  $ " + saldoUsuarioVerificado

    /*Agregar boton */
    const boton_deposito = document.createElement("button"); 
    boton_deposito.setAttribute('type', 'button');
    boton_deposito.innerText = 'Enviar';
    // Poner el input para que se envie el valor ingresado 
    let saldoInput = document.createElement('input')
    saldoInput.setAttribute('placeholder', 'Ingresa el monto')
    saldoInput.value 
    areaSaldos.appendChild(titulo_deposito)
    areaSaldos.appendChild(parrafo_saldo)
    areaSaldos.appendChild(saldoInput)
    areaSaldos.appendChild(boton_deposito)
    

    
    

    boton_deposito.onclick = function() {
        let deposito = parseInt(saldoInput.value); 
        console.log(deposito)
        let nuevoDeposito = saldoUsuarioVerificado - deposito
        if (nuevoDeposito >10 && nuevoDeposito <990 && deposito >0){
            saldoInput.style.display = "none";
            boton_deposito.style.display = "none"; 
            parrafo_saldo.style.display = "none";
            
            agregarVentaDepositoRetiro (nuevoDeposito) 
            
            
            
        } else if(nuevoDeposito >990) {
            let errorNegativo = document.createElement('p')
                errorNegativo.style.marginTop = '20px' 
                errorNegativo.innerHTML = "Excediste el limite permitido" 
                areaSaldos.appendChild(errorNegativo)
            setTimeout(()=>{
                
                errorNegativo.style.display = 'none'
                
            }, 4000)
        } else{
            let errorNegativo = document.createElement('p')
                errorNegativo.style.marginTop = '20px' 
                errorNegativo.innerHTML = "Tu cuenta no puede quedar en negativo" 
                areaSaldos.appendChild(errorNegativo)
            setTimeout(()=>{
                
                errorNegativo.style.display = 'none'
                
            }, 4000)

        }
        
        
        // Crear condicional para que no agrege mas de 990 y que la cuenta no quede en menos de 10

    };
    
}









