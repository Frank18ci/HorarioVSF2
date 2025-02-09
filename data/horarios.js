function setearHorario(horario) {
    localStorage.setItem("horario", JSON.stringify(horario))
}
function obtenerHorarioJSON() {
    return JSON.parse(localStorage.getItem("horario"));
}
function guardarHorarioJSON(horario) {
    localStorage.setItem("horario", JSON.stringify(horario))
}


function setearHorarios() {
    localStorage.setItem("horarios", JSON.stringify(horariosJSON))
}
function obtenerJSON() {
    
    return JSON.parse(localStorage.getItem("horarios"));
}
function guardarJSON(horarios) {
    localStorage.setItem("horarios", JSON.stringify(horarios))
}
let horariosJSON = {
    "turnos": [
        {
            "nombre": "primero",
            "horainicio": "08:00:00",
            "tiempos": [
                {
                    "tiempo": "25",
                    "texto": "Alabanza"
                },
                {
                    "tiempo": "55",
                    "texto": "Predica"
                },
                {
                    "tiempo": "5",
                    "texto": "Ofrenda"
                },
                {
                    "tiempo": "5",
                    "texto": "Anuncios"
                }
            ]
        },
        {
            "nombre": "segundo",
            "horainicio": "11:45:00",
            "tiempos": [
                {
                    "tiempo": "25",
                    "texto": "Alabanza"
                },
                {
                    "tiempo": "55",
                    "texto": "Predica"
                },
                {
                    "tiempo": "5",
                    "texto": "Ofrenda"
                },
                {
                    "tiempo": "5",
                    "texto": "Anuncios"
                }
            ]
        },
        {
            "nombre": "tercero",
            "horainicio": "18:00:00",
            "tiempos": [
                {
                    "tiempo": "25",
                    "texto": "Alabanza"
                },
                {
                    "tiempo": "55",
                    "texto": "Predica"
                },
                {
                    "tiempo": "5",
                    "texto": "Ofrenda"
                },
                {
                    "tiempo": "5",
                    "texto": "Anuncios"
                }
            ]
        },
        {
            "nombre": "sabado",
            "horainicio": "06:00:00",
            "tiempos": [
                {
                    "tiempo": "25",
                    "texto": "Alabanza"
                },
                {
                    "tiempo": "55",
                    "texto": "Predica"
                },
                {
                    "tiempo": "5",
                    "texto": "Ofrenda"
                },
                {
                    "tiempo": "5",
                    "texto": "Anuncios"
                }
            ]
        }
    ]
}