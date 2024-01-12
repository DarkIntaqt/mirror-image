import { SpriteClassOptions, SpriteCoordinates, SpriteData, Tile } from "../../types/sprite.types";

export default class Sprite {

   tileHeight?: number;
   tileWidth?: number;

   tiles: Tile[] = [];

   constructor(tileWidth: number, tileHeight: number, options?: SpriteClassOptions) {

      this.tileHeight = tileWidth
      this.tileWidth = tileHeight;

   }

   setTileHeight(height: number) {
      this.tileHeight = height;
   }

   setTileWidth(width: number) {
      this.tileWidth = width;
   }

   addTile(id: string, image: Blob) {
      this.tiles.push({
         id,
         image
      })
   }


   json(): SpriteData {

      const rows = Math.ceil(Math.sqrt(this.tiles.length));

      const width = (this.tileWidth ?? 0);
      const height = (this.tileHeight ?? 0);

      const totalWidth = width * rows;
      const totalHeight = height * rows;

      const sprites: Record<string, SpriteCoordinates> = {};
      this.tiles.forEach((tile, i) => {

         if (sprites.hasOwnProperty(tile.id)) {
            console.warn("Duplicate tile id. Skipping over it")
            return;
         }

         console.log(i)

         sprites[tile.id] = {
            x: (i % rows) * width,
            y: Math.floor((i) / rows) * height
         };
      })

      return {
         tileWidth: this.tileWidth ?? 0,
         tileHeight: this.tileHeight ?? 0,
         totalWidth: totalWidth,
         totalHeight: totalHeight,
         sprites: sprites
      }

   }

}