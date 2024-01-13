import { Tile } from "./tile";
import { SpriteClassOptions, SpriteCoordinates, SpriteData, TileOptions, Tile as TileTypes } from "../../types/sprite.types";

import sharp from "sharp";

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

   json(includeImages = false): SpriteData {
      const cols = Math.ceil(Math.sqrt(this.tiles.length));
      const rows = (cols * (cols - 1) >= this.tiles.length) ? (cols - 1) : cols;

      const width = (this.tileWidth ?? 0);
      const height = (this.tileHeight ?? 0);

      const totalWidth = width * cols;
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
            x: (i % cols) * width,
            y: Math.floor((i) / cols) * height
         };

         if (includeImages) {
            sprites[id].image = tile.getImage();
         }
      })

      return {
         tileWidth: this.tileWidth ?? 0,
         tileHeight: this.tileHeight ?? 0,
         totalWidth: totalWidth,
         totalHeight: totalHeight,
         sprites: sprites
      }
   }


   async generate() {
      const spriteConfig = this.json(true);

      const sprite = sharp({
         create: {
            width: spriteConfig.totalWidth,
            height: spriteConfig.totalHeight,
            channels: 4,
            background: {
               r: 255,
               g: 255,
               b: 255,
               alpha: 0
            }
         }
      })

      const sprites = Object.values(spriteConfig.sprites);

      let inputs = [];

      for (let i = 0; i < sprites.length; i++) {
         const tile = sprites[i];
         if (!tile.image) continue;

         inputs.push({
            input: await sharp(tile.image).resize({
               width: spriteConfig.tileWidth,
               height: spriteConfig.tileHeight,
               fit: sharp.fit.fill
            }).png().toBuffer(),
            left: tile.x,
            top: tile.y
         });
      }
      await sprite.composite(inputs)

      sprite.toFile("output.webp");
   }
}