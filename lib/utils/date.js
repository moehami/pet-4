import { format, parseISO } from 'date-fns'

export function formatDate(date) {
  return format(parseISO(date), 'MMMM d, yyyy')
}

export function formatReadingTime(minutes) {
  return `${minutes} min read`
}