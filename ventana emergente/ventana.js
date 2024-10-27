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
setInterval(() => {
  const time = new Date();
  let hora = formatoHora(time.getHours());
  let minuto = formatoHora(time.getMinutes());
  let segundo = formatoHora(time.getSeconds());
  spanHora.textContent = hora + ":" + minuto + ":" + segundo;
}, 1000);
