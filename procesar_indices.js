const fs = require("fs");

const file_path_from_a = "./original/indice_ale_esp.html";
const file_path_to_a = "./app/vistas/indice_ale_esp.html";

const file_path_from_b = "./original/indice_esp_ale.html";
const file_path_to_b = "./app/vistas/indice_esp_ale.html";

// const process_file = (file) => {
//   return file
//     .replace(
//       /&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/g,
//       '</span><span class="space"></span><span class="c1">'
//     )
//     .replace(
//       /&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/g,
//       '</span><span class="space"></span><span class="c1">'
//     )
//     .replace(/<span class=\"c1\"><\/span>/g, "")
//     .replace(/<span class=\"c2\">\d<\/span>/g, "");
// };

const process_file = (file) => {
  return file
    .replace(
      /&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/g,
      '</span><span class="c1">'
    )
    .replace(
      /&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/g,
      '</span><span class="c1">'
    )
    .replace(/<span class=\"c1\"><\/span>/g, "")
    .replace(/<span class=\"c2\">\d<\/span>/g, "")
    .replace("c12", "c0");
};

const start_process = async () => {
  const file_a = fs.readFileSync(file_path_from_a, { encoding: "utf-8" });
  const file_b = fs.readFileSync(file_path_from_b, { encoding: "utf-8" });

  if (fs.existsSync(file_path_to_a)) {
    fs.rmSync(file_path_to_a);
  }

  if (fs.existsSync(file_path_to_b)) {
    fs.rmSync(file_path_to_b);
  }

  fs.writeFileSync(file_path_to_a, process_file(file_a), { encoding: "utf-8" });

  fs.writeFileSync(file_path_to_b, process_file(file_b), { encoding: "utf-8" });

  console.log(
    `Se han creado los archivos en la ruta ${file_path_to_a} y ${file_path_to_b}`
  );
};

start_process();
