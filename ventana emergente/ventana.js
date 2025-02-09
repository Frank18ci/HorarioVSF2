const spanHora = document.getElementById("hora");
const textoP = document.getElementById("textoP");
const textoH = document.getElementById("textoH");

let horario = obtenerHorarioJSON();
let i = 0;
let isFirstReadHorario = true;
let diferenciaTiempo;
let horarioAnterior = horario.horainicio;
let horarioString = JSON.stringify(horario);

  // algoritmo para calcular el cambio de hora en cada determinado momento lo hace convertiendo
  // el tiempo a segundos, trae los datos de la otra ventana y realiza el calculo mediante un archivo 
  // temporal
setInterval(() => {
  let horario2 = obtenerHorarioJSON() 
  let horario2String = JSON.stringify(horario2);
  if(horarioString != horario2String){
    horario = horario2;
    horarioString = horario2String;
    i = 0;
    isFirstReadHorario = true;
    diferenciaTiempo = null;
    horarioAnterior = horario.horainicio;
  }
  const time = new Date();
  
  let hora = formatoHora(time.getHours());
  let minuto = formatoHora(time.getMinutes());
  let segundo = formatoHora(time.getSeconds());
  let tiempo = `${hora}:${minuto}:${segundo}`;
  
  let texto = horario.tiempos[i].texto;

  if (isFirstReadHorario) {
    diferenciaTiempo = getDiferenciaTiempo(sumaHoras(horarioAnterior, horario.tiempos[i].tiempo), tiempo);
    isFirstReadHorario = false;
  }

  if (diferenciaTiempo === "00:00" || diferenciaTiempo === "00:00:00") {
    i++;
    if (i < horario.tiempos.length - 1) {
      
      console.log({horario, i})
      texto = horario.tiempos[i].texto;
      horarioAnterior = sumaHoras(horarioAnterior, horario.tiempos[i - 1].tiempo);
      diferenciaTiempo = getDiferenciaTiempo(sumaHoras(horarioAnterior, horario.tiempos[i].tiempo), tiempo);
    } else {
      texto = "Tiempo fuera"
      diferenciaTiempo = ""
    }
  } else {
    if (i < horario.tiempos.length - 1) {
      diferenciaTiempo = getDiferenciaTiempo(sumaHoras(horarioAnterior, horario.tiempos[i].tiempo), tiempo);
    }
    else {
      texto = "Tiempo fuera"
      diferenciaTiempo = ""
    }
  }

  colocarTextoyHora(texto, diferenciaTiempo);
  spanHora.textContent = `${hora}:${minuto}`;
  console.log("ejecucion intervalo")
}, 1000);

function formatoHora(t) {
  return t < 10 ? "0" + t : t.toString();
}

function colocarTextoyHora(texto, hora) {
  textoP.textContent = texto;
  textoH.textContent = hora;
}

function sumaHoras(h1, minutos) {
  let valores = h1.split(":");
  let hora = parseInt(valores[0]);
  let minuto = parseInt(valores[1]) + parseInt(minutos);
  let segundos = parseInt(valores[2]);
  let totalSegundos = (hora * 3600) + (minuto * 60) + segundos;

  let horasN = Math.floor(totalSegundos / 3600);
  let minutosN = Math.floor((totalSegundos % 3600) / 60);
  let segundosN = totalSegundos % 60;
  return convierte1a2(horasN) + ":" + convierte1a2(minutosN) + ":" + convierte1a2(segundosN);
}

function convierte1a2(n) {
  return n < 10 ? "0" + n : n.toString();
}

function convertirSegundos(t) {
  let valores = t.split(":");
  let hora = parseInt(valores[0]);
  let minuto = parseInt(valores[1]);
  let segundos = parseInt(valores[2]);
  return (hora * 3600) + (minuto * 60) + segundos;
}

function desconvertirSegundos(t) {
  let horasN = Math.floor(t / 3600);
  console.log(horasN == 0)
  let minutosN = Math.floor((t % 3600) / 60);
  let segundosN = t % 60;
  return horasN != 0 ? convierte1a2(horasN) + ":" + convierte1a2(minutosN) + ":" + convierte1a2(segundosN) : convierte1a2(minutosN) + ":" + convierte1a2(segundosN);
}

function getDiferenciaTiempo(t1, t2) {
  let s1 = convertirSegundos(t1);
  let s2 = convertirSegundos(t2);
  let resta = s1 - s2;
  
  if (resta < 0) {
    return "00:00:00";
  }
  return desconvertirSegundos(resta);
}
