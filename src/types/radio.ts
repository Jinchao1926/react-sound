/** 电台 */
export interface Radio {
  id: number
  name: string
  picUrl: string
  programCount: number
  subCount: number
  dj: {
    userId: number
    nickname: string
    avatarDetail?: {
      identityIconUrl: string
    }
  }
}

/** 电台节目 */
export interface Program {
  id: number
  name: string
  coverUrl: string
  createTime: number
  duration: number
  listenerCount: number
  radio: Radio
}
