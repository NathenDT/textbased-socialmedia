import moment from 'moment'

export default function formateDate(dateString: string) {
  const postDate = moment(dateString)
  const now = moment()

  const elapsed = now.diff(postDate, 'seconds')
  const elapsedMinutes = Math.floor(elapsed / 60)
  const elapsedHours = Math.floor(elapsedMinutes / 60)
  const elapsedDays = Math.floor(elapsedHours / 24)

  if (elapsed < 60) {
    return 'Just now'
  } else if (elapsedMinutes < 60) {
    return `${elapsedMinutes} ${
      elapsedMinutes === 1 ? 'minute' : 'minutes'
    } ago`
  } else if (elapsedHours < 24) {
    return `${elapsedHours} ${elapsedHours === 1 ? 'hour' : 'hours'} ago`
  } else if (elapsedDays === 1) {
    return 'Yesterday'
  } else {
    return postDate.format('MMMM D')
  }
}
