
/** GENERADOR DE CARACTERES
 * https://net-comber.com/charset.html
 */
const input_clave = document.getElementById('input-clave');
const clave_size = document.getElementById('clave-size');
const btnGenerador = document.getElementById('btnGenerador');
const rango = document.getElementById('range')
const copiar = document.getElementById('copy')

const mayusculas = document.getElementById('upper');
const minusculas = document.getElementById('lower');
const numeros = document.getElementById('number');
const simbolos = document.getElementById('symbols');

/* OBJETO  que contiene las funciones*/
const randomFuncion={
    min : getMinusculas,
    may : getMayusculas,
    num : getNumeros,
    sim : getSimbolos
}

/** FUNCIONES  */
/* Obtener las minusculas convirtiendo los numeros a una cadena*/
function getMinusculas() {
    return String.fromCharCode(Math.floor(Math.random()*26)+97);
}
/* Obtener las mayusculas convirtiendo los numeros a una cadena*/
function getMayusculas() {
    return String.fromCharCode(Math.floor(Math.random()*26)+65);
}
/* Obtener los numeros convirtiendo los numeros a una cadena*/
function getNumeros() {
    return String.fromCharCode(Math.floor(Math.random()*10)+48);
}

/* Obtener simbolos de una matriz y generarlo de forma aleatoria*/
function getSimbolos() {
    const symbols = '!@#$%^&*+-=.,<>';
    return symbols[Math.floor(Math.random()*symbols.length)];
}
//funcion para tomar el tamaño de la contraseña
function cambiarTamaño(value) {
    document.getElementById('clave-size').innerHTML = value
}
/** EVENTOS */
btnGenerador.addEventListener('click',()=>{
    const valor = +rango.value; // tomar el valor del rango
    const min = minusculas.checked; //devuelve true para saber si esta activo o inactivo = false
    const may = mayusculas.checked;
    const num = numeros.checked;
    const sim = simbolos.checked;
    input_clave.innerText = generarClave(min, may, num, sim, valor); 
});
/** copiar al portapales */
copiar.addEventListener(('click'),()=>{
    const textarea = document.createElement('textarea');
    const clave = input_clave.innerText;
    if(!clave){
        return;
    }
    textarea.value = clave;
    document.body.appendChild(textarea)
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Contraseña copiada con exito!!')
})
/// generar contraseña
function generarClave(min, may, num, sim, valor) {
    let generarClave = '';
    const tipos = min + may + num + sim;
    const arregloTipos = [{min}, {may}, {num}, {sim}].filter(item => Object.values(item)[0]); //crear arreglo y convertir en matriz/objeto luego se filtra por verdadeo y falso
    //console.log('arreglo', arregloTipos)
    //si no hay selecionado ninguno devuleve vacio
    if(tipos ===0){ 
        return '';
    }
    //recorrer los tipos
    for (let i = 0; i < valor; i +=tipos) {
        arregloTipos.forEach(tipo => {
            const nombreFuncion = Object.keys(tipo)[0];
            //console.log(nombreFuncion);
            generarClave += randomFuncion[nombreFuncion]()
        });        
    }
    const claveFinal = generarClave.slice(0, valor)
    return claveFinal;
}
function fecha() {
    const date = new Date();
    const tiempo = Date.now()
    const fecha = new Date(tiempo);
    const fechaActual = document.getElementById('fecha');
    fechaActual.innerText = fecha.toDateString();
}

fecha();