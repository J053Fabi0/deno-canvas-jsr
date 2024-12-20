import { decodeBase64 } from "./base64.ts";
import { init as canvasKitInit } from "./canvaskit.ts";
import type { CanvasKit, CanvasKitInitOptions, EmulatedCanvas2D, Image } from "./types.ts";

let canvas: CanvasKit;

export async function init(options?: CanvasKitInitOptions): Promise<CanvasKit> {
  if (canvas) return canvas;
  canvas = await canvasKitInit(options);
  return canvas;
}

export function dataURLtoFile(dataurl: string): Uint8Array {
  const arr: string[] = dataurl.split(",");
  return decodeBase64(arr[1]);
}

export async function loadImage(url: string | Uint8Array): Promise<Image> {
  let data;

  if (url instanceof Uint8Array) {
    data = url;
  } else if (url.startsWith("http")) {
    data = await fetch(url).then((e) => e.arrayBuffer()).then((e) =>
      new Uint8Array(e)
    );
  } else if (url.startsWith("data")) {
    data = dataURLtoFile(url);
  } else {
    data = await Deno.readFile(url);
  }

  const img = canvas.MakeImageFromEncoded(data);
  if (!img) throw new Error("Invalid image data");

  return img;
}

export const createCanvas = (width: number, height: number): EmulatedCanvas2D => {
  return canvas.MakeCanvas(width, height);
};

export * from "./types.ts";
export * from "./base64.ts";
