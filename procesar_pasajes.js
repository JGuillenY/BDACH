const fs = require("fs");

const file_path_from = "./original/heidesgd(nwd).txt";
const file_path_to = "./app/vistas/idea_de_la_fenomenologia.html";
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
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
      crossorigin="anonymous"
    />
    <link rel="stylesheet" href="../general.css" />
  </head>`;

  const header = `<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="../index.html"
        ><i class="fa-solid fa-house"></i
      ></a>
<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" href="./presentacion.html"
              >Presentación</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="./instrucciones_de_uso.html"
              >Instrucciones</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="./introduccion.html"
              >Introducción</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="./diccionario.html">Diccionario</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="./pasajes.html">Pasajes</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="./indice_esp_ale.html"
              >Índice ES-AL</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="./indice_ale_esp.html"
              >Índice AL-ES</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="./bibliografia.html"
              >Bibliografía</a
            >
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="./idea_de_la_fenomenologia.html"
              >Idea de la Fenomenología <span class="sr-only">(actual)</span></a
            >
          </li>
        </ul>
      </div>
    </nav>

    <div class="dropdown">
      <button
        class="btn btn-link"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i class="fa-sharp fa-solid fa-bars fa-xl"></i>
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="./presentacion.html"
          >Presentación</a
        >
        <a class="dropdown-item" href="./instrucciones_de_uso.html"
          >Instrucciones de uso</a
        >
        <a class="dropdown-item" href="./introduccion.html"
          >Introducción</a
        >
        <a class="dropdown-item" href="./diccionario.html"
          >Diccionario</a
        >
        <a class="dropdown-item" href="./pasajes.html">Pasajes</a>
        <a class="dropdown-item" href="./indice_esp_ale.html"
          >Índice Español-Alemán</a
        >
        <a class="dropdown-item" href="./indice_ale_esp.html"
          >Índice Alemán-Español</a
        >
        <a class="dropdown-item" href="./bibliografia.html"
          >Bibliografía</a
        >
        <hr />
        <a class="dropdown-item" href="./idea_de_la_fenomenologia.html"
          >Idea de la Fenomenología</a
        >
      </div>
    </div>
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
  </script>
  <script
      src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
      integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js"
      integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js"
      integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://kit.fontawesome.com/1e432d55f3.js"
      crossorigin="anonymous"
    ></script>
    </body></html>`;

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
