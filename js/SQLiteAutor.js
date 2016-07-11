
//var bd = openDatabase("cbtis15", "3.0", "BD cbtis11", 2000000); // abrir base de datos SQLite
var registrosAutores = "SELECT * FROM autores";
var seleccionarAutor = "SELECT * FROM autores WHERE idautor = ?";
var insertAutor = "INSERT INTO autores (idautor,nombre) VALUES (?,?)";
var eliminaAutor = "DELETE FROM autores WHERE idautor = ?";
var updateAutor = "UPDATE autores set nombre = ? where idautor = ?";
var obtenidos;

/*
function inicioBaseDatos() { //
  try {
    if (!window.openDatabase) { //.
      alert('Las bases de datos no son compatibles con este navegador.');
    } else {
      for (var i = 0; i < declaraciones.length; i++) {
        crearTablas(declaraciones[i]);
      }
    }
  } catch (e) {
    if (e === 2)
      console.log("Version invalida.");
    else
      console.log("Error desconocido " + e + ".");
    return;
  }
}

function crearTablas(cadena) {
  bd.transaction(function(tx) {
    tx.executeSql(cadena, [], null, errorPresentado);
  });
}


function errorPresentado(tx, error) {
  alert(error.message);
}

*/
function mostrarRegistrosAutores() {
  $("#registrosautores").html('');
  bd.transaction(function(tx) {
    tx.executeSql(registrosAutores, [], function(tx, result) {
      datos = result.rows;
      var lista = " <table border='1' id='tabla' class='table table-hover' style='text-align:center;caption-side: bottom' summary='Tabla con la carreras disponibles en la escuela'> ";
      lista += "<caption style='text-align: center' >Autores Registradas</caption>";
      lista += '<tr >';
      lista += '<th scope="col">Id </th>';
      lista += '<th scope="col">Autor </th>';
      lista += '<th COLSPAN="2" scope="col" ">Opciones </th>';
      lista += '</tr>';
      if (datos.length > 0) {
        for (var i = 0, item = null; i < datos.length; i++) {
          item = datos.item(i);
          lista += '<tr>';
          lista += '<td>' + item.idautor + '</td>';
          lista += '<td>' + item.nombre + '</td>';
          lista += '<td>' + '<a href="#" class="btn btn-primary" onclick="editarAutor(\'' + item.idautor + '\')">Editar</a>' + '</td>';
          lista += '<td>' + '<a href="#" class="btn btn-primary" onclick="eliminarAutor(\'' + item.idautor + '\')">Eliminar</a>' + '</td>';
          lista += '</tr>';


        }
      } else
        lista += "<tr><td>NO existen datos</td></tr>";

      lista += " </table> ";
      $("#registrosautores").html(lista);
    });
  });
}

function guardarDatosAutor() {
  var id = $('#idautor').val();
  var autor = $('#autor').val();
  bd.transaction(function(tx) {
    tx.executeSql(insertAutor, [id, autor], agregacionexitosa, errorPresentado);
  });
}

function editarAutor(idautor) {
  bd.transaction(function(tx) {
    tx.executeSql(seleccionarAutor, [idautor], function(tx, result) {
      obtenidos = result.rows;
      var item = obtenidos.item(0);
      //alert("editarAutor id: " + item.idautor);
      $("#idautor").val(item.idautor);
      $("#idautor").prop('disabled', true);
      //$("#idautor").attr('disabled', 'disabled');

      $('#autor').val(item.nombre);
      //alert("ya seberia estar todo en orden");

      $("#boton").attr("onclick", "modificarDatosAutor()");
    }, function(tx, error) {
      alert('se ha producido el siguiente error: \n' + error.message);
    });
  });
}

function modificarDatosAutor() {
  var id = $('#idautor').val();
  var autor = $('#autor').val();
  bd.transaction(function(tx) {
    tx.executeSql(updateAutor, [autor, id], modificacionexitosa, errorPresentado);

  });

}

function eliminarAutor(idautor) {

  swal({
    title: '¿Esta seguro?',
    text: "Esto no podra revertirse!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminalo!'
  }).then(function(isConfirm) {
    if (isConfirm) {
      bd.transaction(function(tx) {
        tx.executeSql(eliminaAutor, [idautor], mostrarRegistrosAutores, errorPresentado);
        swal(
          'Eliminado!',
          'Su registro fue eliminados.',
          'success'
        );
      });
    }
  });
}

/*
function resetFormCarrera() {
  $("#boton").attr("onclick", "guardarDatosAutor()");
  $('#idautor').val('');
  $("#idautor").prop('disabled', false);
  $('#autor').val('');
  swal(
  'Tarea realizada!',
  'Se ha modificado el registro!',
  'success'
  );
  mostrarRegistrosAutores();
}
*/

function modificacionexitosa() {
  $("#boton").attr("onclick", "guardarDatosAutor()");
  $("#idautor").prop('disabled', false);
  $('#idautor').val('');
  $('#autor').val('');
  swal(
    'Tarea realizada!',
    'Se ha modificado el registro!',
    'success'
  );
  mostrarRegistrosAutores();
}

function agregacionexitosa() {
  $('#idautor').val('');
  $('#autor').val('');
  swal(
    'Tarea realizada!',
    'Se ha añadido el registro!',
    'success'
  );
  mostrarRegistrosAutores();
}


$(document).ready(function() {
  inicioBaseDatos();
  mostrarRegistrosAutores();
});

function plantilla() {
  var getImport = document.querySelector('#plantilla');
  var getContent = getImport.import.querySelector('#header');
  document.body.appendChild(document.importNode(getContent, true));
}
