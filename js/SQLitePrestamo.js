/**
 * Created by CCOMPUTO33 on 11/06/2016.
 */

//var bd = openDatabase("cbtis16", "3.0", "BD cbtis11", 2000000); // abrir base de datos SQLite
var registrosPrestamos = "SELECT * FROM prestamos";
var registrosLibros = "SELECT * FROM libros";
var registrosEstudiantes = "SELECT * FROM estudiantes";
var seleccionarPrestamo = "SELECT * FROM libros WHERE idlibro = ?";

var insertPrestamo = "INSERT INTO prestamos (idprestamos, fechaprestamo, fechaentrega, estudiantes_ncontrol, libros_idlibro) VALUES ( ?, ?, ?, ?, ?)";
var eliminaPrestamo = "DELETE FROM libros WHERE idlibro = ?";
var updatePrestamo = "UPDATE libros set titulo = ? , editorial = ? , stock = ? , autores_idautor = ? WHERE idlibro = ?";
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

function mostrarRegistrosPrestamos() {
    $("#registroslibros").html('');
    bd.transaction(function(tx) {
        tx.executeSql(registrosPrestamos, [], function(tx, result) {
            datos = result.rows;
            var lista = " <table border='1' id='tabla' class='table table-hover paginar' style='text-align:center;caption-side: bottom' summary='Tabla con la carreras disponibles en la escuela'> ";
            lista += "<caption style='text-align: center' >Prestamos Registradas</caption>";
            lista += '<tr >';
            lista += '<th scope="col">idprestamos </th>';
            lista += '<th scope="col">F.Prestamo </th>';
            lista += '<th scope="col">F.Entrega </th>';
            lista += '<th scope="col">Ncontrol </th>';
            lista += '<th scope="col">idLibro </th>';
            lista += '<th COLSPAN="2" scope="col" ">Opciones </th>';
            lista += '</tr>';
            if (datos.length > 0) {
                for (var i = 0, item = null; i < datos.length; i++) {
                    item = datos.item(i);
                    lista += '<tr>';
                    lista += '<td>' + item.idprestamos + '</td>';
                    lista += '<td>' + item.fechaprestamo + '</td>';
                    lista += '<td>' + item.fechaentrega + '</td>';
                    lista += '<td>' + item.estudiantes_ncontrol + '</td>';
                    lista += '<td>' + item.libros_idlibro + '</td>';
                    lista += '<td>' + '<a href="#" class="btn btn-primary" onclick="editarPrestamo(\'' + item.idlibro + '\')">Editar</a>' + '</td>';
                    lista += '<td>' + '<a href="#" class="btn btn-primary" onclick="eliminarPrestamo(\'' + item.idlibro + '\')">Eliminar</a>' + '</td>';
                    lista += '</tr>';
                }
            } else
                lista += "<tr><td>NO existen datos</td></tr>";
            lista += " </table> ";
            $("#registroslibros").html(lista);
        });
    });
}



function listaEstudiantes() {
    $("#estudiantes").html('');
    bd.transaction(function(tx) {
        tx.executeSql(registrosEstudiantes, [], function(tx, result) {
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
                    lista += '<option value =\''+item.ncontrol+'\'>';
                    lista += item.nombre;
                    lista += '</option>';
                }
            } else
                lista += "<option value=\'0\'> no hay autores</optioon>";

            $("#estudiantes").html(lista);
        });
    });
}

function listaLibros() {
    $("#libros").html('');
    bd.transaction(function(tx) {
        tx.executeSql(registrosLibros, [], function(tx, result) {
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
                    lista += '<option value =\''+item.idlibro+'\'>';
                    lista += item.titulo;
                    lista += '</option>';
                }
            } else
                lista += "<option value=\'0\'> no hay autores</optioon>";

            $("#libros").html(lista);
        });
    });
}



function guardarDatosPrestamo() {
    var idprestamo = $('#idprestamo').val();
    var fechaprestamo = $('#fechaprestamo').val();
    var fechaentrega = $('#fechaentrega').val();
    var ncontrol = $('#estudiantes').val();
    var idlibro = $('#libros').val();

    alert("idprestamo: "+idprestamo+"\n " +
          "fechaprestamo: "+fechaprestamo+"\n " +
          "fechaentrega: "+fechaentrega+"\n " +
        "ncontrol: "+ncontrol+"\n " +
        "idlibro: "+idlibro);

    bd.transaction(function(tx) {
        tx.executeSql(insertPrestamo, [idprestamo, fechaprestamo, fechaentrega, ncontrol, idlibro], agregacionexitosa, errorPresentado);
    });
}

function editarPrestamo(idlibro) {
    bd.transaction(function(tx) {
        alert(seleccionarPrestamo);
        tx.executeSql(seleccionarPrestamo, [idlibro], function(tx, result) {
            obtenidos = result.rows;
            var item = obtenidos.item(0);
            $("#idlibro").val(item.idlibro);
            $("#idlibro").prop('disabled', true);
            $('#titulo').val(item.titulo);
            $('#editorial').val(item.editorial);
            $('#stock').val(item.stock);
            $("#boton").attr("onclick", "modificarDatosPrestamo()");
        }, function(tx, error) {
            alert('se ha producido el siguiente error: \n' + error.message);
        });
    });
}

function modificarDatosPrestamo() {
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
        tx.executeSql(updatePrestamo, [id, titulo, editorial, stock, autor], modificacionexitosa, errorPresentado);

    });

}

function eliminarPrestamo(idcarrera) {

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
                tx.executeSql(eliminaPrestamo, [idcarrera], mostrarRegistrosPrestamos, errorPresentado);
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
    $("#boton").attr("onclick", "guardarDatosPrestamo()");
    $("#idcarrera").prop('disabled', false);
    $('#idcarrera').val('');
    $('#carrera').val('');
    swal(
        'Tarea realizada!',
        'Se ha modificado el registro!',
        'success'
    );
    mostrarRegistrosPrestamos();
}

function agregacionexitosa() {
    $('#idcarrera').val('');
    $('#carrera').val('');
    swal(
        'Tarea realizada!',
        'Se ha añadido el registro!',
        'success'
    );
    mostrarRegistrosPrestamos();
}


$(document).ready(function() {
    inicioBaseDatos();
    mostrarRegistrosPrestamos();
    listaEstudiantes();
    listaLibros();
});

function plantilla() {
    var getImport = document.querySelector('#plantilla');
    var getContent = getImport.import.querySelector('#header');
    document.body.appendChild(document.importNode(getContent, true));
}
