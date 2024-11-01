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
setearHorarios();

name();
function name() {
    const horarios = obtenerJSON();
    generarComboBox(horarios);
    generarTabla(horarios)
    cargaPrimerTurno(horarios);
    sltTurno.addEventListener('change', () => { changeSelect(horarios) })
    btnAbrirVentana.addEventListener('click', () => { openWindow(horarioSeleccionado(horarios))});
    btnEliminar.addEventListener('click', () => { btnEliminarHorario(horarios) } )
}
function sumarTiempo(){
    let tiempos = document.getElementsByClassName('tiempo');
    let suma = 0;
    for(let i = 0; tiempos.length > i ; i++){
        suma += parseInt(tiempos[i].value);
    }
    return suma;
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
        })
        td1.appendChild(input1)
        tr.appendChild(td1)

        let td2 = document.createElement('td')
        let input2 = document.createElement('input')
        input2.type = "number"
        input2.value = i.tiempo;
        input2.className = "tiempo"
        input2.addEventListener('keypress', () =>{
            cargarHoraFin();
        })
        td2.appendChild(input2)
        tr.appendChild(td2)

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
    td22.setAttribute('colspan', 3)
    let btn22 = document.createElement('button')
    btn22.innerHTML = "agregar"
    td22.appendChild(btn22)
    tr2.appendChild(td22)
    tBodyTablaControl.appendChild(tr2)
    btn22.addEventListener('click', () => {
        generarCampo(horarios, selectedIndex)
    })
}
function eliminarCampo(horarios, selectedIndex, indice){
    let turno = horarios.turnos[selectedIndex]
    console.log(indice)
    turno.tiempos.splice(indice,1)
    guardarJSON(horarios)
    generarTabla(obtenerJSON())
}
function generarCampo(horarios, selectedIndex){
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
    horarios.turnos.forEach(e => {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = e.nombre;

        sltTurno.appendChild(option);
        i++;
    });

}
function cargaPrimerTurno(horarios) {
    iptInicio.value = horarios.turnos[0].horainicio;
}
function changeSelect(horarios) {
    let sltV = sltTurno.value != null ? sltTurno.value : 0;
    iptInicio.value = horarios.turnos[sltV].horainicio;
    generarTabla(horarios);
    cargarHoraFin();
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
        name();
        boxNombre.className = "extraAgregar box-nombre"
        iptNombre.value = ""
        btnCancelar.className = "extraAgregar"
        btnConfirmar.className = "extraAgregar"
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
    let hora =  parseInt(valores[0])
    let minuto = parseInt(valores[1]) + minutos
    let segundos = parseInt(valores[2]) 
    let totalSegundos = (hora * 3600) + (minuto * 60) + segundos;
    let horasN = Math.floor(totalSegundos / 3600);
    let minutosN = Math.floor((totalSegundos % 3600) / 60);
    let segundosN = totalSegundos % 60;
    return convierte1a2(horasN) + ":" + convierte1a2(minutosN) + ":" + convierte1a2(segundosN)
    
}



cargarHoraFin()

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