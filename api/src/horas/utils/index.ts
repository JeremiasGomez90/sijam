export const sumarHoras = (horario_a, horario_b) => {
  if (!(+horario_a && +horario_b)) return null;
  if (!+horario_a) return horario_b;
  if (!+horario_b) return horario_a;

  const valores_horario_a = horario_a ? horario_a?.toString().split('.') : null;
  const valores_horario_b = horario_b ? horario_b?.toString().split('.') : null;

  const hora_milisegundos_a = Math.floor(
    valores_horario_a[0] * (1000 * 60 * 60),
  );
  const minutos_milisegundos_a = Math.floor(valores_horario_a[1] * (1000 * 60));

  const hora_milisegundos_b = Math.floor(
    valores_horario_b[0] * (1000 * 60 * 60),
  );
  const minutos_milisegundos_b = Math.floor(valores_horario_b[1] * (1000 * 60));

  const ms =
    hora_milisegundos_a +
    minutos_milisegundos_a +
    hora_milisegundos_b +
    minutos_milisegundos_b;

  const segundos = Math.floor(ms / 1000);
  const minutos = Math.floor(segundos / 60);
  const horas = Math.floor(minutos / 60);

  const minutosRestantes = minutos % 60;
  // const segundosRestantes = segundos % 60;

  return `${horas.toString().padStart(2, '0')}.${minutosRestantes.toString().padStart(2, '0')}`;
};
