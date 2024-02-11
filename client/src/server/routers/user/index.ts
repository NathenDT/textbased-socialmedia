import { router } from '../../trpc'

import getByAuth0Id from './getByAuth0Id'
import getByUsername from './getByUsername'
import newUser from './newUser'
import toggleFollow from './toggleFollow'
import mutateUsername from './mutateUsername'

const user = router({
  getByAuth0Id,
  getByUsername,
  new: newUser,
  toggleFollow,
  mutateUsername,
})

export default user
