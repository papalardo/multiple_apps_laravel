export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{d}/{m}/{y} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['dia', 'um', 'dois', 'tres', 'quatro', 'cinco', 'seis'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return 'apenas'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + 'minutos atrás'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + 'horas atrás'
  } else if (diff < 3600 * 24 * 2) {
    return '1 dias atrás'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      'um mês' +
      d.getDate() +
      'dia' +
      d.getHours() +
      'um tempo' +
      d.getMinutes() +
      'minuto'
    )
  }
}
