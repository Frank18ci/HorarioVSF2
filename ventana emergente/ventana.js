const spanHora = document.getElementById("hora");
function formatoHora(t) {
  let te = t;
  switch (t) {
    case 0:
      te = "00";
      break;
    case 1:
      te = "01";
      break;
    case 2:
      te = "02";
      break;
    case 3:
      te = "03";
      break;
    case 4:
      te = "04";
      break;
    case 5:
      te = "05";
      break;
    case 6:
      te = "06";
      break;
    case 7:
      te = "07";
      break;
    case 8:
      te = "08";
      break;
    case 9:
      te = "09";
      break;
  }
  return te;
}

const textoP = document.getElementById("textoP")
const textoH = document.getElementById("textoH")
let horario = obtenerHorarioJSON();
let i = 0;
setInterval(() => {
  const time = new Date();
  time.setHours(6)
  time.setMinutes(55)
  let hora = formatoHora(time.getHours());

  let minuto = formatoHora(time.getMinutes());

  let segundo = formatoHora(time.getSeconds());
  
  let tiempo = hora + ":" + minuto + ":" + segundo
  

  let texto = horario.tiempos[i].texto;
  
  let diferenciaTiempo = getDiferenciaTiempo(sumaHoras(horario.horainicio, horario.tiempos[i].tiempo), tiempo)
  if(diferenciaTiempo == 0){
    i++;
    texto = horario.tiempos[i].texto;
    let horarioAnterior = sumaHoras(horario.horainicio, horario.tiempos[i - 1].tiempo)
    diferenciaTiempo = getDiferenciaTiempo(sumaHoras(horarioAnterior, horario.tiempos[i].tiempo), tiempo)
  }
  colocarTextoyHora(texto, diferenciaTiempo);
  let tiempoCorto = hora + ":" + minuto;


  spanHora.textContent = tiempoCorto;

  
}, 1000);

function colocarTextoyHora(texto, hora){
  textoP.textContent = texto
  textoH.textContent = hora
}

function sumaHoras(h1, minutos){
  let valores = h1.split(":")
  let hora =  parseInt(valores[0])
  let minuto = parseInt(valores[1]) + parseInt(minutos)
  let segundos = parseInt(valores[2]) 
  let totalSegundos = (hora * 3600) + (minuto * 60) + segundos;
  let horasN = Math.floor(totalSegundos / 3600);
  let minutosN = Math.floor((totalSegundos % 3600) / 60);
  let segundosN = totalSegundos % 60;
  return convierte1a2(horasN) + ":" + convierte1a2(minutosN) + ":" + convierte1a2(segundosN)
  
}
function convierte1a2(n) {
  let nN = n.toString();
  return nN.length > 1 ? nN : "0" + nN;
}
function convertirSegundos(t){
  let valores = t.split(":")
  let hora =  parseInt(valores[0])
  let minuto = parseInt(valores[1])
  let segundos = parseInt(valores[2]) 
  return (hora * 3600) + (minuto * 60) + segundos;
}

function desconvertirSegundos(t){
  let horasN = Math.floor(t / 3600);
  let minutosN = Math.floor((t % 3600) / 60);
  
  let segundosN = t % 60;
  return convierte1a2(horasN) + ":" + convierte1a2(minutosN) + ":" + convierte1a2(segundosN)
}
function getDiferenciaTiempo(t1, t2){
  console.log(t1, t2)
  let s1 = convertirSegundos(t1);
  let s2 = convertirSegundos(t2);
  let resta = s1 - s2;
  if(resta < 0){
    return 0;
  }
  return desconvertirSegundos(resta);
}