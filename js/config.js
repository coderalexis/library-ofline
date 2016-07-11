//var crearDeclaracion = "CREATE TABLE IF NOT EXISTS configuracion (id TEXT PRIMARY KEY,fondo TEXT,header TEXT,cuerpo TEXT, footer TEXT); ";


var crearDeclaracion = "INSERT INTO configuracion VALUES ('1','','','','');";
var bd = openDatabase("conf", "3.0", "BD conf", 2000000); // abrir base de datos SQLitefunction inicioBaseDatos(){  //
function inicioBaseDatos() { //
  try {
    if (!window.openDatabase) //
      alert('Las bases de datos no son compatibles con este navegador.');
    else
      crearTablas();
  } catch (e) {
    if (e == 2)
      console.log("Version invalida.");
    else
      console.log("Error desconocido " + e + ".");
    return;
  }
}

function crearTablas() {
  bd.transaction(function(tx) {
    tx.executeSql(crearDeclaracion, [], null, errorPresentado);
  });
}

function errorPresentado(tx, error) {
  alert(error.message);
}
$(document).ready(function() {
  inicioBaseDatos();
});

function getConfiguracion() {
  bd.transaction(function(tx) {
    tx.executeSql(sqlConf, [], function(tx, result) {
      datos = result.rows;
    });
  });
}

function loadEstilos() {
  getConfiguracion();
  if (datos.length > 0){
      var item = datos.item(0);
      if (item["fondo"] !== "") {
        $("body").css("background")
      }
  }
}
