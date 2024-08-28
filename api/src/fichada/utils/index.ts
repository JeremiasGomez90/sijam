export const calcularHoras = (fechaInicial, fechaFinal) => {
  const fechaEntrada = fechaInicial?.split('-');
  const fechaSalida = fechaFinal?.split('-');

  const time_start = new Date();
  const time_end = new Date();
  const value_start = fechaEntrada ? fechaEntrada[1]?.split(':') : null;
  const value_end = fechaSalida ? fechaSalida[1]?.split(':') : null;

  if (value_start) {
    time_start.setHours(+value_start[0], +value_start[1]);
  }
  if (value_end) {
    time_end.setHours(+value_end[0], +value_end[1]);
  }

  const diferenciaEnMilisegundos =
    value_start && value_end ? +time_end - +time_start : null;
  const diferenciaEnHoras = diferenciaEnMilisegundos
    ? Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60))
    : null;
  const diferenciaEnMinutos = diferenciaEnMilisegundos
    ? Math.floor((diferenciaEnMilisegundos % (1000 * 60 * 60)) / (1000 * 60))
    : null;

  return diferenciaEnHoras && diferenciaEnMinutos
    ? `${diferenciaEnHoras}.${diferenciaEnMinutos}`
    : '';
};
