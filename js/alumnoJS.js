var insertAlumno = "INSERT INTO alumno (nc,nombre, direccion,telefono) VALUES (?,?,?,?)";
var listaAlumnos = "SELECT * FROM alumno";
var datos;


function insertarAlumno() {
  var nom = $('#nom').val();
  var dire = $('#dire').val();
  var tel = $('#tel').val();
  var nc = $('#nc').val();
  bd.transaction(function(tx) {
    tx.executeSql(insertAlumno, [nc, nom, dire, tel], reset_mostrar, errorPresentado);
  });
}

function resetFormulario() {
  $("#nom").val("");
  $("#nc").val("");
  $("#dire").val("");
  $("#tel").val("");
}

function reset_mostrar() {
  resetFormulario();
  mostrarRegistros();
}

function mostrarRegistros() {
  $("#resultado").html('');
  bd.transaction(function(tx) {
    tx.executeSql(listaAlumnos, [], function(tx, result) {
      datos = result.rows;
      var lista = "<ul>";
      for (var i = 0, item = null; i < datos.length; i++) {
        item = datos.item(i);
        //lista += '<li>' + item['nc'] + ' ,' + item['nombre'] + ' ,' + item['direccion'] + ' , ' + item['telefono'] + '</li>';
        lista += '<li>' + item.nc + ' ,' + item.nombre + ' ,' + item.direccion + ' , ' + item.telefono + '</li>';

      }
      lista += "</ul>";
      $("#resultado").html(lista);
    });
  });
}
