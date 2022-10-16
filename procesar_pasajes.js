const fs = require("fs");

const file_path_from = "./original/heidesgd(nwd).txt";
const file_path_to = "./app/vistas/heide.html";
const titulo_archivo = "CURSO DE IDEAS DE LAS LECCIONES";

const extract_pasajes = (file) => {
  const pasajes_raw = file.split("</pj>");

  const pasajes = pasajes_raw.map((fragmento) => {
    let pasaje_fragmento = fragmento.split("<pj>");

    pasaje_fragmento =
      pasaje_fragmento.length > 1 ? pasaje_fragmento[1] : pasaje_fragmento[0];

    return {
      id: pasaje_fragmento.split("<C1>")[1]?.split("</C1>")[0],
      titulo: pasaje_fragmento
        .split("<rp>")[1]
        ?.split("</rp>")[0]
        ?.split("</C1>")[1],
      contenido: pasaje_fragmento.split("<tp>")[1]?.split("</tp>")[0],
    };
  });

  return pasajes;
};

const extract_relleno = (file) => {
  const relleno_raw = file.split("<pj>");

  const relleno = relleno_raw.map((fragmento) => {
    let relleno_fragmento = fragmento.slice(fragmento.indexOf("</pj>"));
    return relleno_fragmento;
  });

  relleno.shift();

  return relleno;
};

const create_file = (title, pasajes, relleno) => {
  const head = `<html><head>
    <meta content="text/html; charset=latin1" http-equiv="content-type" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="../general.css" />
  </head>`;

  const header = `<body>
    <content>
    <h1>${title}</h1>
    <p id='pasajes-main'>
  `;

  const body = pasajes
    .map(
      (pasaje, index) =>
        `<span id="${pasaje.id}">${pasaje.contenido}</span>${
          relleno[index] ? relleno[index] : ""
        }`
    )
    .join("");

  const foot = `</p></content><script>
  window.addEventListener("load", (event) => {
    const path = window.location.hash.replace("#", "");
  
    console.log(path);
  
    const selectedElements = document.getElementsByClassName("seleccionado");
  
    if (selectedElements.length > 0)
      selectedElements[0].classList.remove("seleccionado");
  
    if (path !== "") {
      console.log(document.getElementById(path));
      document.getElementById(path).classList.add("seleccionado");
    }
  });  
  </script></body></html>`;

  return `${head}${header}${body}${foot}`.replace(
    '<span id="undefined">undefined</span>',
    ""
  );
};

const start_process = async () => {
  const file = fs
    .readFileSync(file_path_from, { encoding: "latin1" })
    .replace(/[@#]/g, "")
    .replace(/Þ/g, " ")
    .replace(/<[pP]>\d+<\/[pP]>/g, "")
    .replace(/\n/g, "<br/>");

  if (fs.existsSync(file_path_to)) {
    fs.rmSync(file_path_to);
  }

  const pasajes = extract_pasajes(file);
  const relleno = extract_relleno(file);
  const newFile = create_file(titulo_archivo, pasajes, relleno);

  fs.writeFileSync(file_path_to, newFile, { encoding: "latin1" });

  console.log(`Se ha creado el archivo en la ruta ${file_path_to}`);
};

start_process();
