export const getStartOfWeek = (date: Date): Date => {
  const day = date.getDay()
  const diff = date.getDate() - day + (day === 0 ? -6 : 1)
  return new Date(date.setDate(diff))
}

export const getEndOfWeek = (date: Date): Date => {
  const startOfWeek = getStartOfWeek(new Date(date))
  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 6)
  return endOfWeek
}

export const subtractWeeks = (date: Date, weeks: number): Date => {
  const newDate = new Date(date)
  newDate.setDate(date.getDate() - weeks * 7)
  return newDate
}

export const subtractMonths = (date: Date, months: number): Date => {
  const newDate = new Date(date)
  newDate.setMonth(date.getMonth() - months)
  return newDate
}
