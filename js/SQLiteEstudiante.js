
//var bd = openDatabase("cbtis15", "3.0", "BD cbtis11", 2000000); // abrir base de datos SQLite
var registrosEstudiantes = "SELECT * FROM estudiantes";
var registrosCarreras = "SELECT * FROM carreras;";
var seleccionarEstudiante = "SELECT * FROM estudiantes WHERE ncontrol = ?";

var insertEstudiante = "INSERT INTO estudiantes (ncontrol, nombre, apaterno, amaterno, contra, carrera_idcarrera) VALUES ( ?, ?, ?, ?, ?, ?)";
var eliminaEstudiante = "DELETE FROM estudiantes WHERE ncontrol = ?";
var updateEstudiante = "UPDATE estudiantes set nombre = ? , apaterno = ? , amaterno = ? , contra = ? , carrera_idcarrera = ? WHERE ncontrol = ?";
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

function mostrarRegistrosEstudiantes() {
  $("#registrosestudiantes").html('');
  bd.transaction(function(tx) {
    tx.executeSql(registrosEstudiantes, [], function(tx, result) {
      datos = result.rows;
      var lista = " <table border='1' id='tabla' class='table table-hover paginar' style='text-align:center;caption-side: bottom' summary='Tabla con la carreras disponibles en la escuela'> ";
      lista += "<caption style='text-align: center' >Autores Registradas</caption>";
      lista += '<tr >';
      lista += '<th scope="col">Ncontrol </th>';
      lista += '<th scope="col">Nombre </th>';
      lista += '<th scope="col">Apaterno </th>';
      lista += '<th scope="col">Amaterno </th>';
      lista += '<th scope="col">contra </th>';
      lista += '<th scope="col">carrera </th>';
      lista += '<th COLSPAN="2" scope="col" ">Opciones </th>';
      lista += '</tr>';
      if (datos.length > 0) {
        for (var i = 0, item = null; i < datos.length; i++) {
          item = datos.item(i);
          lista += '<tr>';
          lista += '<td>' + item.ncontrol + '</td>';
          lista += '<td>' + item.nombre + '</td>';
          lista += '<td>' + item.apaterno + '</td>';
          lista += '<td>' + item.amaterno + '</td>';
          lista += '<td>' + item.contra + '</td>';
          lista += '<td>' + item.carrera_idcarrera + '</td>';
          lista += '<td>' + '<a href="#" class="btn btn-primary" onclick="editarEstudiante(\'' + item.ncontrol + '\')">Editar</a>' + '</td>';
          lista += '<td>' + '<a href="#" class="btn btn-primary" onclick="eliminarEstudiante(\'' + item.ncontrol + '\')">Eliminar</a>' + '</td>';
          lista += '</tr>';
        }
      } else
        lista += "<tr><td>NO existen datos</td></tr>";
      lista += " </table> ";
      $("#registrosestudiantes").html(lista);
    });
  });
}



function listaCarreras() {
  $("#carreras").html('');
  bd.transaction(function(tx) {
    tx.executeSql(registrosCarreras, [], function(tx, result) {
      datos = result.rows;

      /*
      var lista = " <table border='1' class='table table-hover paginar' style='text-align:center;caption-side: bottom' summary='Tabla con la carreras disponibles en la escuela'> ";
      lista += "<caption style='text-align: center' >Autores Registradas</caption>";
      lista += '<tr >';
      lista += '<th scope="col">Id </th>';
      lista += '<th scope="col">Autor </th>';
      lista += '<th COLSPAN="2" scope="col" ">Opciones </th>';
      lista += '</tr>';
      */
      var lista="";

      /*
      <option value="1">Paulo cohelo</option>
      <option value="2">Pablo neruda</option>
      */
      if (datos.length > 0) {
        for (var i = 0, item = null; i < datos.length; i++) {
          item = datos.item(i);
          lista += '<option value =\''+item.idcarrera+'\'>';
          lista += item.nombre;
          lista += '</option>';
        }
      } else
        lista += "<option value=\'0\'> no hay autores</optioon>";

      $("#carreras").html(lista);
    });
  });
}



function guardarDatosEstudiante() {
  var ncontrol = $('#ncontrol').val();
  var nombre = $('#nombre').val();
  var apaterno = $('#apaterno').val();
  var amaterno = $('#amaterno').val();
  var contra = $('#contra').val();
  var carrera_idcarrera = $('#carreras').val();
  bd.transaction(function(tx) {
    tx.executeSql(insertEstudiante, [ncontrol, nombre, apaterno, amaterno, contra,carrera_idcarrera], agregacionexitosa, errorPresentado);
  });
}

function editarEstudiante(idlibro) {
  bd.transaction(function(tx) {
    tx.executeSql(seleccionarEstudiante, [idlibro], function(tx, result) {
      obtenidos = result.rows;
      var item = obtenidos.item(0);
      $("#ncontrol").val(item.ncontrol);
      $("#ncontrol").prop('disabled', true);
      $('#nombre').val(item.nombre);
      $('#apaterno').val(item.apaterno);
      $('#amaterno').val(item.amaterno);
      $('#contra').val(item.contra);

      $("#boton").attr("onclick", "modificarDatosEstudiante()");
    }, function(tx, error) {
      alert('se ha producido el siguiente error: \n' + error.message);
    });
  });
}

function modificarDatosEstudiante() {
  var ncontrol = $('#ncontrol').val();
  var nombre = $('#nombre').val();
  var apaterno = $('#apaterno').val();
  var amaterno = $('#amaterno').val();
  var contra = $('#contra').val();
  var carrera_idcarrera = $('#carreras').val();
  alert("id: "+ncontrol);


  bd.transaction(function(tx) {
    tx.executeSql(updateEstudiante, [nombre,apaterno,amaterno,contra,carrera_idcarrera,ncontrol], modificacionexitosa, errorPresentado);

  });

}

function eliminarEstudiante(idcarrera) {

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
        tx.executeSql(eliminaEstudiante, [idcarrera], mostrarRegistrosEstudiantes, errorPresentado);
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
  $("#boton").attr("onclick", "guardarDatosEstudiante()");
  $("#idcarrera").prop('disabled', false);
  $('#idcarrera').val('');
  $('#carrera').val('');
  swal(
    'Tarea realizada!',
    'Se ha modificado el registro!',
    'success'
  );
  mostrarRegistrosEstudiantes();
}

function agregacionexitosa() {
  $('#idcarrera').val('');
  $('#carrera').val('');
  swal(
    'Tarea realizada!',
    'Se ha añadido el registro!',
    'success'
  );
  mostrarRegistrosEstudiantes();
}


$(document).ready(function() {
  inicioBaseDatos();
  mostrarRegistrosEstudiantes();
  listaCarreras();
});

function plantilla() {
  var getImport = document.querySelector('#plantilla');
  var getContent = getImport.import.querySelector('#header');
  document.body.appendChild(document.importNode(getContent, true));
}
