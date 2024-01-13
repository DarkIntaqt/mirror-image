import { Tile } from "./tile";
import { SpriteClassOptions, SpriteCoordinates, SpriteData, TileOptions, Tile as TileTypes } from "../../types/sprite.types";

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


   addTile(options: Tile | TileOptions) {
      let tile;
      if (options instanceof Tile) {
         tile = options;
      } else {
         tile = new Tile(options);
      }
      this.tiles.push(tile);
      return tile;
   }

   removeTile(tile: Tile): Boolean {
      let index = this.tiles.indexOf(tile);
      if (index !== -1) {
         this.tiles.splice(index, 1);
         return true;
      }

      return false; // not found
   }

   json(): SpriteData {
      const rows = Math.ceil(Math.sqrt(this.tiles.length));

      const width = (this.tileWidth ?? 0);
      const height = (this.tileHeight ?? 0);

      const totalWidth = width * rows;
      const totalHeight = height * rows;

      const sprites: Record<string, SpriteCoordinates> = {};
      this.tiles.forEach((tile, i) => {

         if (!tile.isEnabled()) return;

         const id = tile.getId();
         if (sprites.hasOwnProperty(id)) {
            console.warn("Duplicate tile id. Skipping over it")
            return;
         }

         sprites[id] = {
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