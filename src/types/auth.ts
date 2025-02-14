export type CurrentUser = {
  user_id: string
  name: string
  nickname: string
  picture: string
  email: string
  permissions?: string[]
}