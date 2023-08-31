const fs = require("fs");

const file_path_from = "./original/diccionario.html";
const file_path_to = "./app/vistas/diccionario.html";

const start_process = async () => {
  const file = fs.readFileSync(file_path_from, { encoding: "utf-8" });

  const listaClaves = Array.from(Array(200).keys());
  let newFile = listaClaves.reduce((prev, clave) => {
    const regex = new RegExp(`<span class="c0">${clave}</span>`, "g");

    return prev !== ""
      ? prev
          .replace(
            regex,
            `<span class="c0"><a href='./idea_de_la_fenomenologia.html#IPC-${clave}'>${clave}</a></span>`
          )
          .replace(
            regex,
            `<span class="c4"><a href='./idea_de_la_fenomenologia.html#IPC-${clave}'>${clave}</a></span>`
          )
      : file
          .replace(
            regex,
            `<span class="c0"><a href='./idea_de_la_fenomenologia.html#IPC-${clave}'>${clave}</a></span>`
          )
          .replace(
            regex,
            `<span class="c4"><a href='./idea_de_la_fenomenologia.html#IPC-${clave}'>${clave}</a></span>`
          );
  }, "");

  let part = newFile;

  while (part.indexOf('<span class="c3">') > -1) {
    const startIndex = part.indexOf('<span class="c3">');
    const slice = part.slice(startIndex + 1);
    const expresion = slice.slice(slice.indexOf(">") + 1, slice.indexOf("<"));
    const fromReplace = `<span class="c3">${expresion}</span>`;
    const toReplace = `<span id="${expresion}" class="c3">${expresion}</span>`;
    const newPart = part.slice(part.indexOf(fromReplace) + fromReplace.length);

    part = newPart;

    newFile = newFile.replace(fromReplace, toReplace);
  }

  if (fs.existsSync(file_path_to)) {
    fs.rmSync(file_path_to);
  }

  fs.writeFileSync(file_path_to, newFile, { encoding: "utf-8" });

  console.log(`Se ha creado el archivo en la ruta ${file_path_to}`);
};

start_process();
