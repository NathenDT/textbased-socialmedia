export {}

declare global {
  type PostInfoType = {
    id: string
    username: string
    text: string
    createdAt: string
    commentIds: string[]
    likeIds: string[]
  }

  type CommentInfoType = {
    id: string
    username: string
    text: string
    createdAt: string
    postId: string
    likeIds: string[]
    replyIds?: string[]
  }

  type UserInfoType = {
    id: string
    username: string
    postIds?: string[]
    followersIds?: string[]
    followingIds?: string[]
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
