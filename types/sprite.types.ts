export type SpriteCoordinates = {
   x: number;
   y: number;
   id?: string;
};

export type SpriteData = {
   tileWidth: number;
   tileHeight: number;
   totalWidth: number;
   totalHeight: number;
   sprites: Record<string, SpriteCoordinates>;
};



export type SpriteClassOptions = {
   totalWidth?: number | "AUTO";
   totalHeight?: number | "AUTO";
}

export type Tile = {
   image?: Blob,
   id: string
}