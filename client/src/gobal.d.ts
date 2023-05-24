export {}

declare global {
  type PostType = {
    id: string
    userId: string
    text: string
    createdAt: string
    commentIds: string[]
    likeIds: string[]
  }

  type UserType = {
    id: string
    username: string
  }

  type TextInputType = {
    value: string
    error: string
  }

  type MoreErrorType = {
    condition: (value: string) => boolean
    message: string
  }
}
