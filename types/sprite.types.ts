export type SpriteCoordinates = {
   x: number;
   y: number;
   id?: string;
   image?: Buffer;
};

export type SpriteData = {
   tileWidth: number;
   tileHeight: number;
   totalWidth: number;
   totalHeight: number;
   sprites: Record<string, SpriteCoordinates>;
};

export type TileOptions = {
   id?: string;
   image?: Buffer;
   enabled?: boolean;
}

export type SpriteClassOptions = {
   totalWidth?: number | "AUTO";
   totalHeight?: number | "AUTO";
   gap?: boolean | number;
}

export type Tile = {
   image?: Buffer,
   id: string
}