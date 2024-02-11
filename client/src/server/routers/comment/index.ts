import { router } from '../../trpc'

import newComment from './newComment'
import getByPostId from './getByPostId'

const comment = router({
  new: newComment,
  getByPostId,
})

export default comment
