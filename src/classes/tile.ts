import { TileOptions } from "../../types/sprite.types";
import crypto, { BinaryLike } from "crypto";

export class Tile {
  id?: string;
  image?: Buffer;
  enabled = true;

  constructor(options: TileOptions) {
    this.id = options.id;
    this.image = options.image;
    this.enabled = options.enabled ?? this.enabled;
  }

  getId(): string {
    if (!this.id && !this.image) {
      throw new Error("Tile needs image");
    }

    return (
      this.id ??
      crypto
        .createHash("md5")
        .update(this.image as BinaryLike)
        .digest("hex")
    );
  }

  isEnabled(): Boolean {
    return this.enabled;
  }

  getImage(): Buffer {
    if (!this.image) {
      throw new Error("Tile needs image");
    }

    return this.image;
  }
}
