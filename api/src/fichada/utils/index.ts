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

export const multiplicarHoras = (horario, valor) => {
  if (horario && valor) {
    const valores_horario = horario ? horario?.split('.') : null;

    const hora_milisegundos = Math.floor(valores_horario[0] * (1000 * 60 * 60));
    const minutos_milisegundos = Math.floor(valores_horario[1] * (1000 * 60));

    const ms = (hora_milisegundos + minutos_milisegundos) * +valor;

    const segundos = Math.floor(ms / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);

    const minutosRestantes = minutos % 60;
    // const segundosRestantes = segundos % 60;

    return `${horas.toString().padStart(2, '0')}.${minutosRestantes.toString().padStart(2, '0')}`;
  } else {
    return '0';
  }
};
