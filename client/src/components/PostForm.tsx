import Button from './Button'
import TextArea from './TextArea'

const MAX_POST_LENGTH = 100

type Props = {
  postText: string
  setPostText: React.Dispatch<React.SetStateAction<string>>
  handlePost: () => void
}

export default function PostForm({ postText, setPostText, handlePost }: Props) {
  const isPostValid =
    postText.replace(/\s/g, '').length > 0 &&
    postText.replace(/\s/g, '').length <= MAX_POST_LENGTH

  return (
    <div className="flex flex-col m-2 border rounded-md">
      <TextArea
        placeholder="What's on your mind?"
        value={postText}
        onChange={(event) => setPostText(event.target.value)}
        className="grow m-2"
      />

      <div className="flex grow justify-end m-2">
        <p>
          {postText.replace(/\s/g, '').length}/{MAX_POST_LENGTH} characters
        </p>

        <div className="grow"></div>

        <Button onClick={handlePost} disabled={!isPostValid}>
          Post
        </Button>
      </div>
    </div>
  )
}
