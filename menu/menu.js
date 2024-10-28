let ventana;
const btnAbrirVentana = document.getElementById('btnAbrirVentana');
function openWindow(){
    if(ventana && !ventana.closed){
        ventana.close();
    }
    ventana = window.open('../ventana emergente/ventana.html', '_blank', 'width=500,height=500');
}
btnAbrirVentana.addEventListener('click', openWindow);




async function leerJSON() {
    const response = await fetch("../data/horarios.json");
    const data = await response.json();
    return data;
}



const sltTurno = document.getElementById('sltTurno');

const horarios = document.getElementById('tablaControl');

const iptInicio = document.getElementById('iptInicio')

name();
async function name() {
    const horarios = await leerJSON();
    generarTabla(horarios);
    sltTurno.addEventListener('change', () =>{ changeSelect(horarios)})
}

function generarTabla(horarios){

    let i = 0;
    horarios.turnos.forEach(e => {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = e.nombre;
        sltTurno.appendChild(option);
        i++;
        
    });
    

    let td = document.createElement('td');
    let input = document.createElement('input');

}
function changeSelect(horarios){
    console.log("cambio")
    sltV = sltTurno.value != null ? sltTurno.value : 0;
    console.log(sltV)
    iptInicio.value = horarios.turnos[sltV].horainicio;
    
}
