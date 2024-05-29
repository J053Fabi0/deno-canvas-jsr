import { encodeBase64 } from "@std/encoding";

Deno.writeTextFileSync(
  Deno.args[0] ?? "./src/wasm.js",
  `import { decodeBase64 } from "./base64.ts";\n` +
    `export const WASM_BUFFER = decodeBase64("${encodeBase64(
      Deno.readFileSync(Deno.args[1] ?? "./src/canvaskit-opt.wasm")
    )}");`
);
