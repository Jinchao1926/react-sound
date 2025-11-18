export interface SpriteData {
  x: number
  y: number
  width: number
  height: number
}

export interface SpriteConfig {
  [category: string]: {
    image: string
    sprites: {
      [name: string]: SpriteData
    }
  }
}
