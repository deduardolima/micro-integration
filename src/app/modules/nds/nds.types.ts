export interface Campaign {
  campanhaId: number,
  titulo: string,
  inicioPublic: string,
  fimPublic: string,
  banner: Banner,
  regulamento: Regulamento
  publishAt: string,
}

export interface Banner {
  name: string,
  formats?: {
    small: {
      url: string,
      hash: string,
      mime: string,
      name: string,
      path: null,
      size: number,
      width: number,
      height: number
    },
    medium: {
      ext: string,
      url: string,
      hash: string,
      mime: string,
      name: string,
      path: null,
      size: number,
      width: number,
      height: number
    },
    thumbnail: {
      ext: string,
      url: string,
      hash: string,
      mime: string,
      name: string,
      path: null,
      size: number,
      width: number,
      height: number
    }
  }
  hash?: string,
  mime?: string,
  size?: number,
  url?: string,
}

export interface Regulamento {
  name?: string,
  hash?: string,
  ext?: string,
  mime?: string,
  size?: number,
  url?: string,
}