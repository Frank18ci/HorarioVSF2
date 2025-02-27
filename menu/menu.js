let ventana;
const btnAbrirVentana = document.getElementById('btnAbrirVentana');
function openWindow(horario) {
    setearHorario(horario);
    if (ventana && !ventana.closed) {
        ventana.close();
    }
    ventana = window.open('../ventana emergente/ventana.html', '_blank', 'width=500,height=500');
}

function horarioSeleccionado(horarios){
    let horario = horarios.turnos[sltTurno.value]
    return horario;
}

let totalTiempo = 0;
let tBodyTablaControl = document.querySelector('.tBodyTablaControl');
const btnEliminar = document.querySelector("#btnEliminar")
const sltTurno = document.getElementById('sltTurno');

const horarios = document.getElementById('tablaControl');

const iptInicio = document.getElementById('iptInicio')



function sumarTiempo(){
    let tiempos = document.getElementsByClassName('tiempo');
    let suma = 0;
    for(let i = 0; tiempos.length > i ; i++){
        
        suma += parseInt(tiempos[i].value);
    }
    return suma;
}
function cargarHoraUnitaria(){
    let tiempos = document.getElementsByClassName('tiempo');
    let inputTiempo = document.getElementsByClassName('tiempo_parte_final');
    let suma = 0
    for(let i = 0; tiempos.length > i ; i++){
        suma += parseInt(tiempos[i].value)
        inputTiempo[i].value = sumaHoras(iptInicio.value, suma)
    }   
}
function generarTabla(horarios) {
    const selectedIndex = sltTurno.value;
    let turno = horarios.turnos[selectedIndex]
    tBodyTablaControl.innerHTML = '';
    totalTiempo = 0;
    turno.tiempos.forEach((i, indice )=> {
        
        totalTiempo += parseInt(i.tiempo);
        let tr = document.createElement('tr')
        let td1 = document.createElement('td')
        let input1 = document.createElement('input')
        input1.className = "inpTexto"
        input1.type = "text"
        input1.value = i.texto;
        input1.addEventListener('keypress', () =>{
            cargarHoraFin();
            cargarHoraUnitaria()
        })
        td1.appendChild(input1)
        tr.appendChild(td1)

        let td2 = document.createElement('td')
        let input2 = document.createElement('input')
        input2.type = "number"
        input2.setAttribute("min", 0)
        input2.setAttribute("max", 1000)
        input2.value = i.tiempo;
        input2.className = "tiempo"
        input2.addEventListener('input', () =>{
            cargarHoraFin();
            cargarHoraUnitaria()
            
        })
        td2.appendChild(input2)
        tr.appendChild(td2)
        

        let td2_1 = document.createElement('td')
        let input2_1 = document.createElement('input')
        input2_1.type = "time"
        input2_1.disabled = "disabled"
        input2_1.className ="tiempo_parte_final"

        td2_1.appendChild(input2_1)
        tr.appendChild(td2_1)


        let td3 = document.createElement('td')
        let btnElimar = document.createElement('button')
        btnElimar.className = "btn-et"
        btnElimar.innerHTML = "Eliminar";
        td3.appendChild(btnElimar)
        tr.appendChild(td3)
        tBodyTablaControl.appendChild(tr)
        btnElimar.addEventListener('click', () =>{
            eliminarCampo(horarios,selectedIndex, indice)
        })
    })

    let tr2 = document.createElement('tr')
    let td22 = document.createElement('td')
    td22.className = "td-a btnCampoNuevo"
    td22.setAttribute('colspan', 4)
    let btn22 = document.createElement('button')
    btn22.classList.add('btn-agregar-tiempo')
    btn22.innerHTML = "agregar"
    td22.appendChild(btn22)
    tr2.appendChild(td22)
    tBodyTablaControl.appendChild(tr2)
    btn22.addEventListener('click', () => {
        generarCampo(horarios, selectedIndex)
    })
}
function eliminarCampo(horarios, selectedIndex, indice){
    horarios = obtenerJSON();
    let turno = horarios.turnos[selectedIndex]
    console.log(indice)
    turno.tiempos.splice(indice,1)
    guardarJSON(horarios)
    generarTabla(obtenerJSON())
}
function generarCampo(horarios, selectedIndex){
    horarios = obtenerJSON();
    let CampoNew = {
        "tiempo": "0",
        "texto": "Pon Texto"
    }
    let turno = horarios.turnos[selectedIndex]
    turno.tiempos.push(CampoNew)
    guardarJSON(horarios)
    generarTabla(obtenerJSON())
}

function generarComboBox(horarios) {

    let i = 0;
    sltTurno.innerHTML = ""
    try{
        horarios.turnos.forEach(e => {
            let option = document.createElement('option');
            option.value = i;
            option.textContent = e.nombre;
    
            sltTurno.appendChild(option);
            i++;
        });
    } catch{
        setearHorarios()
    }
    

}
function cargaPrimerTurno(horarios) {
    iptInicio.value = horarios.turnos[0].horainicio;
}
function changeSelect(horarios) {
    let sltV = sltTurno.value != null ? sltTurno.value : 0;
    iptInicio.value = horarios.turnos[sltV].horainicio;
    generarTabla(horarios);
    cargarHoraFin();
    cargarHoraUnitaria()
}

const btnAgregar = document.querySelector('#btnAgregar');
const btnConfirmar = document.querySelector('#btnConfirmar');
const btnCancelar = document.querySelector('#btnCancelar');
const boxNombre = document.querySelector('.box-nombre');

btnAgregar.addEventListener('click', () => {
    boxNombre.className = "box-nombre"
    btnCancelar.className = ""
    btnConfirmar.className = "btn-agregar"
})
btnCancelar.addEventListener('click', () => {
    boxNombre.className = "extraAgregar box-nombre"
    btnCancelar.className = "extraAgregar"
    btnConfirmar.className = "extraAgregar"
})
const iptNombre = document.querySelector('.iptNombre');


btnConfirmar.addEventListener('click', () => {
    if (iptNombre.value != null && iptNombre.value.length > 0) {
        let horario = {
            nombre: iptNombre.value,
            horainicio: "12:00:00",
            tiempos: []
        }
        let horarios = obtenerJSON();
        horarios.turnos.push(horario);
        console.log(horarios)
        guardarJSON(horarios);
        
        boxNombre.className = "extraAgregar box-nombre"
        iptNombre.value = ""
        btnCancelar.className = "extraAgregar"
        btnConfirmar.className = "extraAgregar"
        actualizarHorarios()
        generarComboBox(obtenerJSON())
    }
})
const iptFin = document.querySelector("#iptFin")
function cargarHoraFin(){
    let valorI = iptInicio.value;
    let varlorF = sumaHoras(valorI, sumarTiempo())
    iptFin.value = varlorF;
    
}

function sumaHoras(h1, minutos){
    let valores = h1.split(":")
    if(valores.length == 3){
        let hora =  parseInt(valores[0])
        let minuto = parseInt(valores[1]) + minutos
        let segundos = parseInt(valores[2]) 
        let totalSegundos = (hora * 3600) + (minuto * 60) + segundos;
        let horasN = Math.floor(totalSegundos / 3600);
        let minutosN = Math.floor((totalSegundos % 3600) / 60);
        let segundosN = totalSegundos % 60;
        return convierte1a2(horasN) + ":" + convierte1a2(minutosN) + ":" + convierte1a2(segundosN)    
    } else if(valores.length == 2){
        let hora =  parseInt(valores[0])
        let minuto = parseInt(valores[1]) + minutos
        let totalSegundos = (hora * 3600) + (minuto * 60);
        let horasN = Math.floor(totalSegundos / 3600);
        let minutosN = Math.floor((totalSegundos % 3600) / 60);
        return convierte1a2(horasN) + ":" + convierte1a2(minutosN) + ":00"    
    } else{
        console.log(this)
    }
    
    
}




function convierte1a2(n) {
    let nN = n.toString();
    return nN.length > 1 ? nN : "0" + nN;
}
function btnEliminarHorario(horarios ){
    horarios.turnos.splice(sltTurno.value,1)
    guardarJSON(horarios)
    generarComboBox(obtenerJSON())
    generarTabla(obtenerJSON())
}


const btnActualizar = document.getElementById('btnActualizar');
const btnDefecto = document.getElementById('btnDefecto');
function cargarTodo(){
    
    let horarios = obtenerJSON();
    generarComboBox(horarios);
    generarTabla(horarios)
    cargaPrimerTurno(horarios);
    sltTurno.addEventListener('change', () => { changeSelect(obtenerJSON())})    
    btnAbrirVentana.addEventListener('click', () => { openWindow(horarioSeleccionado(horarios))});
    btnEliminar.addEventListener('click', () => { btnEliminarHorario(horarios) } )
    cargarHoraFin()
    cargarHoraUnitaria()
    
}
cargadoInicial()
function cargadoInicial(){
    if(obtenerJSON() != null){
        cargarTodo();    
    }
}


btnDefecto.addEventListener('click', establecerDefecto)
function establecerDefecto(){
    setearHorarios()
    cargarTodo()
}
btnActualizar.addEventListener('click', actualizarHorarios)

function actualizarHorarios(){
    let horarios = obtenerJSON()
    horarios.turnos[sltTurno.value].horainicio = sumaHoras(iptInicio.value, 0);
    horarios.turnos[sltTurno.value].tiempos = crearTurnos()
    cargarHoraFin()
    cargarHoraUnitaria()
    guardarJSON(horarios)
    setearHorario(horarios.turnos[sltTurno.value]);
    console.log(obtenerJSON())
}

function crearTurnos(){
    let textos = document.getElementsByClassName('inpTexto');
    let tiempos = document.getElementsByClassName('tiempo');
    let horariosN = [];
    for(let i = 0; i < textos.length; i++){
        horariosN.push( 
            {
                tiempo: tiempos[i].value,
                texto: textos[i].value
            })
        
    }
    return horariosN
}

