import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request) {
  const data = await request.formData();
  const file = data.get("file");
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filepath = path.join(process.cwd(), "public/assets", file.name);
  console.log("el archivo ", file.name, " se a guardado con exito");
  writeFile(filepath, buffer);

  return new Response(
    JSON.stringify({
      messaje: "archivo subido",
    })
  );
}
