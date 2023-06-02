import { useUser } from '@auth0/nextjs-auth0/client'
import { useState } from 'react'

import Button from './Button'
import TextArea from './TextArea'

import { trpc } from '../utils/trpc'
import formatAuth0Sub from '../utils/formatAuth0Sub'

const MAX_POST_LENGTH = 100

export default function PostForm() {
  const { user, isLoading } = useUser()
  const trpcUtils = trpc.useContext()
  const { mutate: newPost } = trpc.post.new.useMutation({
    onSuccess: (newPost) => {
      setContent('')

      trpcUtils.post.getForYou.setInfiniteData(
        { auth0Id: user!.sub!.split('|')[1] },
        (oldData) => {
          if (oldData == null || oldData.pages[0] == null) return

          return {
            ...oldData,
            pages: [
              {
                ...oldData.pages[0],
                posts: [newPost.post, ...oldData.pages[0].posts],
              },
              ...oldData.pages.slice(1),
            ],
          }
        }
      )
    },
  })

  const [content, setContent] = useState('')

  const isPostValid =
    content.replace(/\s/g, '').length > 0 &&
    content.replace(/\s/g, '').length <= MAX_POST_LENGTH

  const handlePost = () => {
    const [_, auth0Id] = formatAuth0Sub(user!.sub!)

    newPost({ auth0Id, content })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex flex-col m-2 border rounded-md">
      <TextArea
        placeholder="What's on your mind?"
        value={content}
        onChange={(event) => setContent(event.target.value)}
        className="grow m-2"
      />

      <div className="flex grow justify-end m-2">
        <p>
          {content.replace(/\s/g, '').length}/{MAX_POST_LENGTH} characters
        </p>

        <div className="grow"></div>

        <Button onClick={handlePost} disabled={!isPostValid}>
          Post
        </Button>
      </div>
    </div>
  )
}
