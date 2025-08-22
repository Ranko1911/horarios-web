import dayjs from "dayjs";

export function generateSchedule({ apertura, cierre, trabajadores, numTurnos, fechaInicio }) {
  const fmt = "HH:mm";
  const horaApertura = dayjs(fechaInicio + " " + apertura);
  const horaCierre = dayjs(fechaInicio + " " + cierre);
  const horasTotal = horaCierre.diff(horaApertura, "minute") / 60;
  const duracionTurno = (horasTotal / numTurnos).toFixed(2);

  let horarios = {};
  let horasPorPersona = {};
  trabajadores.forEach(t => {
    horarios[t] = {};
    horasPorPersona[t] = 0;
  });

  for (let d = 0; d < 7; d++) {
    const fecha = dayjs(fechaInicio).add(d, "day").format("DD/MM/YYYY");
    let turnosDia = [];
    for (let i = 0; i < numTurnos; i++) {
      let inicio = horaApertura.add(i * duracionTurno, "hour").format(fmt);
      let fin = horaApertura.add((i + 1) * duracionTurno, "hour").format(fmt);
      if (i === numTurnos - 1) fin = cierre;
      turnosDia.push([inicio, fin]);
    }

    let trabajadoresOrdenados = Object.entries(horasPorPersona).sort((a, b) => a[1] - b[1]);
    let asignados = trabajadoresOrdenados.slice(0, numTurnos).map(t => t[0]);

    trabajadores.forEach(trab => {
      let turnoAsignado = "";
      let horasTrabajadas = 0;
      turnosDia.forEach((t, idx) => {
        if (asignados[idx] === trab) {
          turnoAsignado = `${t[0]}-${t[1]}`;
          horasTrabajadas += parseFloat(duracionTurno);
        }
      });
      horarios[trab][fecha] = turnoAsignado ? `${turnoAsignado}\n(${horasTrabajadas}h)` : "";
      horasPorPersona[trab] += horasTrabajadas;
    });
  }

  trabajadores.forEach(t => {
    horarios[t]["TOTAL"] = `${horasPorPersona[t]}h`;
  });

  const df = trabajadores.map(t => ({
    trabajador: t,
    horarios: horarios[t],
  }));

  return { df, horasPorPersona };
}
