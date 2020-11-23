import Canvas, { CanvasRenderingContext2D } from '../mod.ts'
import { serve } from "https://deno.land/std@0.78.0/http/server.ts";
import { dataURLtoFile } from "../utils.ts";

const canvas = Canvas.MakeCanvas(200, 200);
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

ctx.fillStyle = 'red';
ctx.fillRect(10, 10, 200 - 20, 200 - 20);

const data = dataURLtoFile(canvas.toDataURL());

const server = serve({ hostname: "0.0.0.0", port: 8080 });
console.log(`HTTP webserver running. Access it at: http://localhost:8080/`);

for await (const request of server) {
  request.respond({ status: 200, body: data });
}