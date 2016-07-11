

//var crearDeclaracion = "CREATE TABLE IF NOT EXISTS alumno (nc TEXT PRIMARY KEY,nombre TEXT,direccion TEXT,telefono TEXT); ";
/*
var crearDeclaracion = "CREATE TABLE IF NOT EXISTS autores (idautor INT NOT NULL,nombre VARCHAR(45) NULL,PRIMARY KEY (idautor));";
*/
//var crearDeclaracion = "CREATE TABLE IF NOT EXISTS libros (idlibro INT NOT NULL ,editorial VARCHAR(45) NULL,stock VARCHAR(45) NULL,autores_idautor INT NOT NULL,PRIMARY KEY (idlibro),FOREIGN KEY (autores_idautor) REFERENCES autores (idautor));";
//var crearDeclaracion = "CREATE TABLE IF NOT EXISTS carreras (idcarrera INT NOT NULL ,nombre VARCHAR(45) NULL,PRIMARY KEY (idcarrera));";
//var crearDeclaracion = "CREATE TABLE IF NOT EXISTS estudiantes (ncontrol INT NOT NULL,nombre VARCHAR(45) NULL,apaterno VARCHAR(45) NULL,amaterno VARCHAR(45) NULL,contra VARCHAR(45) NULL,carrera_idcarrera INT NOT NULL,PRIMARY KEY (ncontrol),FOREIGN KEY (carrera_idcarrera) REFERENCES carreras (idcarrera));";
//var crearDeclaracion = "CREATE TABLE IF NOT EXISTS prestamos (idprestamos INT NOT NULL ,fechaprestamo VARCHAR(45) NULL,fechaentrega VARCHAR(45) NULL,estudiantes_ncontrol INT NOT NULL,libros_idlibro INT NOT NULL,PRIMARY KEY (idprestamos),FOREIGN KEY (estudiantes_ncontrol) REFERENCES estudiantes (ncontrol),FOREIGN KEY (libros_idlibro) REFERENCES libros (idlibro));";
//var crearDeclaracion = "CREATE TABLE IF NOT EXISTS usuarios (username VARCHAR(16) NOT NULL ,email VARCHAR(255) NULL,password VARCHAR(32) NOT NULL,creado VARCHAR(45) NULL,estudiantes_ncontrol INT NOT NULL,FOREIGN KEY (estudiantes_ncontrol) REFERENCES estudiantes (ncontrol));";
//var crearDeclaracion = "CREATE TABLE IF NOT EXISTS admins (idadmin INT NOT NULL,usuario VARCHAR(45) NULL,contra VARCHAR(45) NULL,correo VARCHAR(45) NULL,PRIMARY KEY (idadmin));";


//var crearDeclaracion = "CREATE TABLE IF NOT EXISTS alumno (nc TEXT PRIMARY KEY,nombre TEXT,direccion TEXT,telefono TEXT); ";

var bd = openDatabase("cbtis15", "3.0", "BD cbtis2", 2000000);  // abrir base de datos SQLite
var registros = "SELECT * FROM alumno";
var editar = "UPDATE alumno SET nombre = ?,direccion=?,telefono=? WHERE nc = ?";
var seleccionar = "SELECT * FROM alumno WHERE nc = ? ";
var insertAlumno = "INSERT INTO alumno (nc,nombre, direccion,telefono) VALUES (?,?,?,?)";
var eliminar = "DELETE FROM alumno WHERE nc = ?";
var obtenidos;
function inicioBaseDatos(){  //
    try {
        if (!window.openDatabase){  //
			alert('Las bases de datos no son compatibles con este navegador.');
        }else{
            for(var i=0;i<declaraciones.length;i++){
            crearTablas(declaraciones[i]);
            }
        }
	}catch(e){
		if (e === 2)
			console.log("Version invalida.");
		else
			console.log("Error desconocido " + e + ".");
		return;
	}
}
function crearTablas(cadena){
	bd.transaction(function(tx){
		tx.executeSql(cadena,[], null, errorPresentado);
	});
}


function errorPresentado(tx, error){
    alert(error.message);
}

function  mostrarRegistros(){
    $("#resultado").html('');
    bd.transaction(function (tx) {
        tx.executeSql(registros, [], function (tx, result) {
			datos = result.rows;
			var lista = "<ul>";
			if(datos.length > 0){
				for (var i = 0, item = null; i < datos.length; i++) {
					item = datos.item(i);
					lista += '<li>' + item['nc'] + ' ,' + item['nombre'] + ' ,' + item['direccion'] + ' , ' + item['telefono'] + ' | <a href="#" onclick="editarAlumno(\''+item['nc']+'\')">Editar</a>| <a href="#" onclick="eliminarAlumno(\''+item['nc']+'\')">Eliminar</a></li>';

				}
			}else
				lista += "<li>No extisten datos</li>";

			lista += "</ul>";
			$("#resultado").html(lista);
        });
    });
}

function guardarDatos(){
	var nom = $('#nom').val();
    var dire = $('#dire').val();
	var tel = $('#tel').val();
	var nc = $('#nc').val();
    bd.transaction(function(tx){
		tx.executeSql(insertAlumno, [nc,nom,dire,tel],resetFormAlumno, errorPresentado);
	});
}


function editarAlumno(nc){
	//var al = getAlumno(nc);
        //alert("elementos recibidos: "+al.length);

    bd.transaction(function (tx) {
        tx.executeSql(seleccionar, [nc], function (tx, result) {
            obtenidos = result.rows;

            var item = obtenidos.item(0);
                alert("editaralumno nc: "+item.nc);
		$("#nc").val(item.nc);
		$('#nom').val(item.nombre);
		$('#dire').val(item.direccion);
		$('#tel').val(item.telefono);
		$("#boton").attr("onclick","modificarDatos()");

	},function(tx,error){
            alert('se ha producido el siguiente error: \n' + error.message);
          });
    });

        /*
	if(al.length > 0){
		var item = al.item(0);
                alert("editaralumno nc: "+item.nc);
		$("#nc").val(item["nc"]);
		$('#nom').val(item["nombre"]);
		$('#dire').val(item["direccion"]);
		$('#tel').val(item["telefono"]);
		$("#boton").attr("onclick","modificarDatos()");
	}
        */
}
function modificarDatos(){
	alert("Ejecutando");
}
function eliminarAlumno(nc){
	var respuesta = confirm("¿Eliminar el registro S/N?");
	if(respuesta === true){
		bd.transaction(function(tx){
			tx.executeSql(eliminar,[nc],mostrarRegistros,errorPresentado);
		});
	}
}

var regresa;
function getAlumno(nc){
    var consultita = "select * from alumno where alumno.nc = ";
    var consultita2= consultita+"'"+nc+"'";
    var nc2= "'"+nc+"'";
    alert("getaluumno recibe nc: "+nc);
    alert("consulta de getalumno:"+consultita2);
	bd.transaction(function (tx) {
        tx.executeSql(seleccionar, [nc2], function (tx, result) {
            regresa = result.rows;

		},function(tx,error){
                    alert('se ha producido el siguiente error: \n' + error.message);
                });
    });
        alert("datos tamano "+regresa);
	return regresa;

}

function resetFormAlumno(){
	$('#nom').val('');
    $('#dire').val('');
	$('#tel').val('');
	$('#nc').val('');
	mostrarRegistros();
}


$(document).ready(function (){
    inicioBaseDatos();
	//mostrarRegistros();
});

function plantilla(){
	var getImport = document.querySelector('#plantilla');
	var getContent = getImport.import.querySelector('#header');
	document.body.appendChild(document.importNode(getContent, true));
}
