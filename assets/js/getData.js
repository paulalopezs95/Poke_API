// 1. URL DE LA API

const API = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=00";

// Obtener resultado de API
const getData = (api) => {
    return fetch(api)
        .then((response) => response.json())
        .then((json) => {
            llenarDatos(json), paginacion(json);
        })
        .catch((error) => {
            console.log("Error :", error);
        });
};

// 2. Llenar Datos
const llenarDatos = (data) => {
    let html = "";
    document.getElementById("datosPersonajes").innerHTML = "";
    data.results.forEach((pj) => {
        const pokeURL = pj.url;
        return fetch(pokeURL)
            .then((response) => response.json())
            .then((json) => {
                pokeAPI(json, html);
            })
            .catch((error) => {
                console.log("Error :", error);
            });
    });
};

// 3. Obtener datos de las tarjetas

const pokeAPI = (data, html) => {
    html += '<div class="card ml-3 mb-3" style="width: 450px;">';
    html += '<div class="row">';
    html += '<div class="col-md-4 p-3">';
    html += `<img src="${data.sprites.other.dream_world.front_default}" class="card-img-top" alt="pokemones">`;
    html += "</div>";
    html += '<div class="col-md-8">';
    html += '<div class="card-body bg-warning">';
    html += `<h5 class = "card-title" >${data.name}</h5>`;
    html += `<p class="card-text">Altura :${data.height}</p>`;
    html += `<p class="card-text">Peso :${data.weight}</p>`;
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    document.getElementById("datosPersonajes").innerHTML += html;
}

// Paginacion
const paginacion = (info) => {
    let prevDisabled = (info.previous == null) ? "disabled" : "";
    let nextDisabled = (info.next == null) ? "disabled" : "";

    let html = "";
    html += `<li class="page-item ${prevDisabled}"><a class="page-link" onclick="getData('${info.previous}')">Previous</a></li>`;
    html += `<li class="page-item ${nextDisabled}"><a class="page-link" onclick="getData('${info.next}')">Next</a></li>`;
    document.getElementById("paginacion").innerHTML = html;
};

//EjecutargetData
getData(API);