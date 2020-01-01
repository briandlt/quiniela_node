console.log("Estamos listos!!!");

let selectJornadas = document.getElementById("jornadas");
selectJornadas.addEventListener("change", function(){
    var jornada = selectJornadas.value;
    console.log(jornada);
});

