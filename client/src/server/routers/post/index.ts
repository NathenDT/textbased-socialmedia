import { router } from '../../trpc'

import newPost from './newPost'
import getPost from './getPost'
import getForYou from './getForYou'
import getFollowing from './getFollowing'
import getProfile from './getProfile'
import toggleLike from './toggleLike'

const post = router({
  new: newPost,
  getPost,
  getForYou,
  getFollowing,
  getProfile,
  toggleLike,
})

export default post
