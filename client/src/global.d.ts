export {}

declare global {
  type PostInfoType = {
    id: string
    username: string
    content: string
    createdAt: string
    commentCount: number
    likeCount: number
    likedByMe?: boolean
  }

  type CommentInfoType = {
    id: string
    username: string
    content: string
    createdAt: string
    postId: string
    likeCount: number
    likedByMe?: boolean
  }

  type UserInfoType = {
    auth0Id: string
    username: string
    postCount: number
    followerCount: number
    followingCount: number
    isFollowing?: boolean
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
