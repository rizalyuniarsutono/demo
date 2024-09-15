export const urlParamToStr = (objParams, { questionMark = true } = {}) => {
  if (typeof objParams === 'undefined') {
    return ''
  }

  const objFormatted = Object.fromEntries(Object.entries(objParams).filter(([_, v]) => v != null && v !== ''))
  if (Object.keys(objFormatted).length === 0) {
    return ''
  }

  const str = `${questionMark ? '?' : '&'}${Object.keys(objFormatted)
    .map(key =>
      objFormatted[key] === '' || objFormatted[key] === null || typeof objFormatted[key] === 'undefined'
        ? ''
        : `${key}=${encodeURIComponent(objFormatted[key])}`
    )
    .join('&')}`

  return str
}
