const URL = process.env.SERVER_URL as string
export default function getForYouURL(
  userId: string | undefined,
  startIndex: number,
  count: number
) {
  return (
    URL +
    'recommendation' +
    (userId && '?user_id=' + userId) +
    '&start_index=' +
    startIndex +
    '&count=' +
    count
  )
}

// http://127.0.0.1:5000/recommendation?user_id=clic1dtrw0004la08gavufafb&start_index=0&count=10
