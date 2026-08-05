export interface User {
  userId: number
  nickname: string
  avatarUrl: string
  avatarDetail?: {
    identityLevel: number
    identityIconUrl: string
  }
}
