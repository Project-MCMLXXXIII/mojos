export interface MojoSeed {
  background: number;
  body: number;
  accessory: number;
  head: number;
  glasses: number;
}

export interface EncodedImage {
  filename: string;
  data: string;
}

export interface MojoData {
  parts: EncodedImage[];
  background: string;
}
