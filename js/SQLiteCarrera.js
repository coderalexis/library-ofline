
//var bd = openDatabase("cbtis15", "3.0", "BD cbtis11", 2000000); // abrir base de datos SQLite
var registrosCarreras = "SELECT * FROM carreras";
var seleccionarCarrera = "SELECT * FROM carreras WHERE idcarrera = ?";
var insertCarrera = "INSERT INTO carreras (idcarrera,nombre) VALUES (?,?)";
var eliminaCarrera = "DELETE FROM carreras WHERE idcarrera = ?";
var updateCarrera = "UPDATE carreras set nombre = ? where idcarrera = ?";
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
*/

function errorPresentado(tx, error) {
  alert(error.message);
}

function mostrarRegistrosCarreras() {
  $("#registroscarreras").html('');
  bd.transaction(function(tx) {
    tx.executeSql(registrosCarreras, [], function(tx, result) {
      datos = result.rows;
      var lista = " <table border='1' id='tabla' class='table table-hover paginar' style='text-align:center;caption-side: bottom' summary='Tabla con la carreras disponibles en la escuela'> ";
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
          lista += '<td>' + item.idcarrera + '</td>';
          lista += '<td>' + item.nombre + '</td>';
          lista += '<td>' + '<a href="#" class="btn btn-primary" onclick="editarCarrera(\'' + item.idcarrera + '\')">Editar</a>' + '</td>';
          lista += '<td>' + '<a href="#" class="btn btn-primary" onclick="eliminarCarrera(\'' + item.idcarrera + '\')">Eliminar</a>' + '</td>';
          lista += '</tr>';
        }
      } else
        lista += "<tr><td>NO existen datos</td></tr>";

      lista += " </table> ";
      $("#registroscarreras").html(lista);
    });
  });
}

function guardarDatosCarrera() {
  var id = $('#idcarrera').val();
  var carrera = $('#carrera').val();
  bd.transaction(function(tx) {
    tx.executeSql(insertCarrera, [id, carrera], agregacionexitosa, errorPresentado);
  });
}

function editarCarrera(idcarrera) {
  bd.transaction(function(tx) {
    tx.executeSql(seleccionarCarrera, [idcarrera], function(tx, result) {
      obtenidos = result.rows;
      var item = obtenidos.item(0);

      $("#idcarrera").val(item.idcarrera);
      $("#idcarrera").prop('disabled', true);


      $('#carrera').val(item.nombre);


      $("#boton").attr("onclick", "modificarDatosCarrera()");
    }, function(tx, error) {
      alert('se ha producido el siguiente error: \n' + error.message);
    });
  });
}

function modificarDatosCarrera() {
  var id = $('#idcarrera').val();
  var carrera = $('#carrera').val();
  bd.transaction(function(tx) {
    tx.executeSql(updateCarrera, [carrera, id], modificacionexitosa, errorPresentado);

  });

}

function eliminarCarrera(idcarrera) {

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
        tx.executeSql(eliminaCarrera, [idcarrera], mostrarRegistrosCarreras, errorPresentado);
        swal(
          'Eliminado!',
          'Su registro fue eliminado.',
          'success'
        );
      });
    }
  });
}

function modificacionexitosa() {
  $("#boton").attr("onclick", "guardarDatosCarrera()");
  $("#idcarrera").prop('disabled', false);
  $('#idcarrera').val('');
  $('#carrera').val('');
  swal(
    'Tarea realizada!',
    'Se ha modificado el registro!',
    'success'
  );
  mostrarRegistrosCarreras();
}

function agregacionexitosa() {
  $('#idcarrera').val('');
  $('#carrera').val('');
  swal(
    'Tarea realizada!',
    'Se ha añadido el registro!',
    'success'
  );
  mostrarRegistrosCarreras();
}


$(document).ready(function() {
  inicioBaseDatos();
  mostrarRegistrosCarreras();
});

function plantilla() {
  var getImport = document.querySelector('#plantilla');
  var getContent = getImport.import.querySelector('#header');
  document.body.appendChild(document.importNode(getContent, true));
}
