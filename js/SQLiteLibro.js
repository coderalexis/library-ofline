
//var bd = openDatabase("cbtis16", "3.0", "BD cbtis11", 2000000); // abrir base de datos SQLite
var registrosLibros = "SELECT lib.*, auto.nombre FROM libros lib, autores auto where lib.autores_idautor = auto.idautor ";
var registrosAutores = "SELECT * FROM autores";
var seleccionarLibro = "SELECT * FROM libros WHERE idlibro = ?";

var insertLibro = "INSERT INTO libros (idlibro, titulo, editorial, stock, autores_idautor) VALUES ( ?, ?, ?, ?, ?)";
var eliminaLibro = "DELETE FROM libros WHERE idlibro = ?";
var updateLibro = "UPDATE libros set titulo = ? , editorial = ? , stock = ? , autores_idautor = ? WHERE idlibro = ?";
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

function mostrarRegistrosLibros() {
  $("#registroslibros").html('');
  bd.transaction(function(tx) {
    tx.executeSql(registrosLibros, [], function(tx, result) {
      datos = result.rows;
      var lista = " <table border='1' id='tabla' class='table table-hover paginar' style='text-align:center;caption-side: bottom' summary='Tabla con la carreras disponibles en la escuela'> ";
      lista += "<caption style='text-align: center' >Autores Registradas</caption>";
      lista += '<tr >';
      lista += '<th scope="col">Id </th>';
      lista += '<th scope="col">Libro </th>';
      lista += '<th scope="col">Editorial </th>';
      lista += '<th scope="col">Stock </th>';
      lista += '<th scope="col">Autor </th>';
      lista += '<th COLSPAN="2" scope="col" ">Opciones </th>';
      lista += '</tr>';
      if (datos.length > 0) {
        for (var i = 0, item = null; i < datos.length; i++) {
          item = datos.item(i);
          lista += '<tr>';
          lista += '<td>' + item.idlibro + '</td>';
          lista += '<td>' + item.titulo + '</td>';
          lista += '<td>' + item.editorial + '</td>';
          lista += '<td>' + item.stock + '</td>';
          lista += '<td>' + item.nombre + '</td>';
          lista += '<td>' + '<a href="#" class="btn btn-primary" onclick="editarLibro(\'' + item.idlibro + '\')">Editar</a>' + '</td>';
          lista += '<td>' + '<a href="#" class="btn btn-primary" onclick="eliminarLibro(\'' + item.idlibro + '\')">Eliminar</a>' + '</td>';
          lista += '</tr>';
        }
      } else
        lista += "<tr><td>NO existen datos</td></tr>";
      lista += " </table> ";
      $("#registroslibros").html(lista);
    });
  });
}



function listaAutores() {
  $("#autores").html('');
  bd.transaction(function(tx) {
    tx.executeSql(registrosAutores, [], function(tx, result) {
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
          lista += '<option value =\''+item.idautor+'\'>';
          lista += item.nombre;
          lista += '</option>';
        }
      } else
        lista += "<option value=\'0\'> no hay autores</optioon>";

      $("#autores").html(lista);
    });
  });
}



function guardarDatosLibro() {
  var id = $('#idlibro').val();
  var titulo = $('#titulo').val();
  var editorial = $('#editorial').val();
  var stock = $('#stock').val();
  var autor = $('#autores').val();
  alert("valor de idlibro "+id + "\n editorial:"+editorial + "\n stock: "+stock +"\n autor: "+autor);
  bd.transaction(function(tx) {
    tx.executeSql(insertLibro, [id, titulo, editorial, stock, autor], agregacionexitosa, errorPresentado);
  });
}

function editarLibro(idlibro) {
  bd.transaction(function(tx) {
    alert(seleccionarLibro);
    tx.executeSql(seleccionarLibro, [idlibro], function(tx, result) {
      obtenidos = result.rows;
      var item = obtenidos.item(0);
      $("#idlibro").val(item.idlibro);
      $("#idlibro").prop('disabled', true);
      $('#titulo').val(item.titulo);
      $('#editorial').val(item.editorial);
      $('#stock').val(item.stock);
      $("#boton").attr("onclick", "modificarDatosLibro()");
    }, function(tx, error) {
      alert('se ha producido el siguiente error: \n' + error.message);
    });
  });
}

function modificarDatosLibro() {
  var id = $('#idlibro').val();
  var titulo = $('#titulo').val();
  var editorial = $('#editorial').val();
  var stock = $('#stock').val();
  var autor = $('#autores').val();
  alert("id: "+id);
  alert("\ntitulo: "+titulo);
  alert("\neditorial: "+editorial);
  alert("\nstock: "+stock);
  alert("\nautor: "+autor);


  bd.transaction(function(tx) {
    tx.executeSql(updateLibro, [titulo, editorial, stock, autor, id], modificacionexitosa, errorPresentado);

  });

}

function eliminarLibro(idcarrera) {

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
        tx.executeSql(eliminaLibro, [idcarrera], mostrarRegistrosLibros, errorPresentado);
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
  $("#boton").attr("onclick", "guardarDatosLibro()");
  $("#idlibro").prop('disabled', false);
  $('#idlibro').val('');
  $('#titulo').val('');
  $('#editorial').val('');
  $('#stock').val('');
  swal(
    'Tarea realizada!',
    'Se ha modificado el registro!',
    'success'
  );
  mostrarRegistrosLibros();
}

function agregacionexitosa() {
  $('#idcarrera').val('');
  $('#carrera').val('');
  swal(
    'Tarea realizada!',
    'Se ha añadido el registro!',
    'success'
  );
  mostrarRegistrosLibros();
}


$(document).ready(function() {
  inicioBaseDatos();
  mostrarRegistrosLibros();
  listaAutores();
});

function plantilla() {
  var getImport = document.querySelector('#plantilla');
  var getContent = getImport.import.querySelector('#header');
  document.body.appendChild(document.importNode(getContent, true));
}
