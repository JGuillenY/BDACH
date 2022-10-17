const fs = require("fs");

const file_path_from = "./original/diccionario.html";
const file_path_to = "./app/vistas/diccionario.html";

const start_process = async () => {
  const file = fs.readFileSync(file_path_from, { encoding: "utf-8" });

  const listaClaves = Array.from(Array(10).keys());

  if (fs.existsSync(file_path_to)) {
    fs.rmSync(file_path_to);
  }

  fs.writeFileSync(file_path_to, newFile, { encoding: "latin1" });

  console.log(`Se ha creado el archivo en la ruta ${file_path_to}`);
};

start_process();
