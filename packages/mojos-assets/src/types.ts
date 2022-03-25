export interface MojoSeed {
  background: number;
  body: number;
  bodyAccessory: number;
  face: number;
  headAccessory: number;
}

export interface EncodedImage {
  name: string;
  data: string;
}

export interface MojoData {
  parts: EncodedImage[];
  background: string;
}
