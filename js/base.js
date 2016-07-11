
var declaraciones = [];

//declaraciones[0] = "CREATE TABLE IF NOT EXISTS alumno (nc TEXT PRIMARY KEY,nombre TEXT,direccion TEXT,telefono TEXT); ";
declaraciones[0] = "CREATE TABLE IF NOT EXISTS autores (idautor INT NOT NULL,nombre VARCHAR(45) NULL,PRIMARY KEY (idautor));";
declaraciones[1] = "CREATE TABLE IF NOT EXISTS libros (idlibro INT NOT NULL ,titulo VARCHAR(45) NULL, editorial VARCHAR(45) NULL,stock VARCHAR(45) NULL,autores_idautor INT NOT NULL,PRIMARY KEY (idlibro),FOREIGN KEY (autores_idautor) REFERENCES autores (idautor));";
declaraciones[2] = "CREATE TABLE IF NOT EXISTS carreras (idcarrera INT NOT NULL ,nombre VARCHAR(45) NULL,PRIMARY KEY (idcarrera));";
declaraciones[3] = "CREATE TABLE IF NOT EXISTS estudiantes (ncontrol INT NOT NULL,nombre VARCHAR(45) NULL,apaterno VARCHAR(45) NULL,amaterno VARCHAR(45) NULL,contra VARCHAR(45) NULL,carrera_idcarrera INT NOT NULL,PRIMARY KEY (ncontrol),FOREIGN KEY (carrera_idcarrera) REFERENCES carreras (idcarrera));";
declaraciones[4] = "CREATE TABLE IF NOT EXISTS prestamos (idprestamos INT NOT NULL ,fechaprestamo VARCHAR(45) NULL,fechaentrega VARCHAR(45) NULL,estudiantes_ncontrol INT NOT NULL,libros_idlibro INT NOT NULL,PRIMARY KEY (idprestamos),FOREIGN KEY (estudiantes_ncontrol) REFERENCES estudiantes (ncontrol),FOREIGN KEY (libros_idlibro) REFERENCES libros (idlibro));";
declaraciones[5] = "CREATE TABLE IF NOT EXISTS usuarios (username VARCHAR(16) NOT NULL ,email VARCHAR(255) NULL,password VARCHAR(32) NOT NULL,creado VARCHAR(45) NULL,estudiantes_ncontrol INT NOT NULL,FOREIGN KEY (estudiantes_ncontrol) REFERENCES estudiantes (ncontrol));";
declaraciones[6] = "CREATE TABLE IF NOT EXISTS admins (idadmin INT NOT NULL,usuario VARCHAR(45) NULL,contra VARCHAR(45) NULL,correo VARCHAR(45) NULL,PRIMARY KEY (idadmin));";

var bd = openDatabase("cbtis21", "3.0", "BD cbtis21", 2000000); // abrir base de datos SQLite

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

function errorPresentado(tx, error) {
    alert(error.message);
}

function crearTablas(cadena) {
    bd.transaction(function(tx) {
        tx.executeSql(cadena, [], null, errorPresentado);
    });
}


var relleno = [];
relleno[0] = "INSERT INTO autores (idautor,nombre) VALUES (10001,'Paulo Cohelo')";
relleno[1] = "INSERT INTO autores (idautor,nombre) VALUES (10002,'William Shakespeare')";
relleno[2] = "INSERT INTO autores (idautor,nombre) VALUES (10003,'Mónica Carrillo')";
relleno[3] = "INSERT INTO autores (idautor,nombre) VALUES (10004,'Deitel')";
relleno[4] = "INSERT INTO autores (idautor,nombre) VALUES (10005,'Tomasi')";


relleno[5] = "INSERT INTO libros (idlibro, titulo, editorial, stock, autores_idautor) VALUES (20001, 'El Alquimista', 'Santillana', 12, 10001)";
relleno[6] = "INSERT INTO libros (idlibro, titulo, editorial, stock, autores_idautor) VALUES (20002, 'Brida', 'Santillana', 8, 10001)";
relleno[7] = "INSERT INTO libros (idlibro, titulo, editorial, stock, autores_idautor) VALUES (20003, 'A orillas del río Piedra me senté y lloré', 'Santillana', 7, 10001)";

relleno[8] = "INSERT INTO libros (idlibro, titulo, editorial, stock, autores_idautor) VALUES (20004, 'Romeo y Julieta', 'Santillana', 20, 10002)";
relleno[9] = "INSERT INTO libros (idlibro, titulo, editorial, stock, autores_idautor) VALUES (20005, 'Otelo', 'Santillana', 5, 10002)";
relleno[10] = "INSERT INTO libros (idlibro, titulo, editorial, stock, autores_idautor) VALUES (20006, 'El rey Lear', 'Santillana', 6, 10002)";

relleno[11] = "INSERT INTO libros (idlibro, titulo, editorial, stock, autores_idautor) VALUES (20007, 'El Luz de Candela', 'Santillana', 6, 10003)";
relleno[12] = "INSERT INTO libros (idlibro, titulo, editorial, stock, autores_idautor) VALUES (20008, 'Olvide Decirte Quiero', 'Santillana', 6, 10003)";

relleno[13] = "INSERT INTO libros (idlibro, titulo, editorial, stock, autores_idautor) VALUES (20009, 'Como Programar en Java', 'Santillana', 6, 10004)";
relleno[14] = "INSERT INTO libros (idlibro, titulo, editorial, stock, autores_idautor) VALUES (20010, 'C++ cómo programar', 'Santillana', 6, 10004)";

relleno[15] = "INSERT INTO libros (idlibro, titulo, editorial, stock, autores_idautor) VALUES (20010, 'Sistemas de Comunicaciones Electronicas', 'Santillana', 6, 10004)";


relleno[16]= "INSERT INTO carreras (idcarrera,nombre) VALUES (50001,'Ing.Mecanica')";
relleno[17]= "INSERT INTO carreras (idcarrera,nombre) VALUES (50002,'Ing.Industrial')";
relleno[18]= "INSERT INTO carreras (idcarrera,nombre) VALUES (50003,'Ing.Gestion Empresarial')";
relleno[19]= "INSERT INTO carreras (idcarrera,nombre) VALUES (50004,'Ing.TIC')";

relleno[20]= "INSERT INTO estudiantes (ncontrol, nombre, apaterno, amaterno, contra, carrera_idcarrera) VALUES ( 131020115, 'Jose Alexis', 'Cruz', 'Solar', '7542', 50001)";
relleno[21]= "INSERT INTO estudiantes (ncontrol, nombre, apaterno, amaterno, contra, carrera_idcarrera) VALUES ( 131020112, 'Benita', 'Villalobos', 'Perez', '5722', 50003)";
relleno[22]= "INSERT INTO estudiantes (ncontrol, nombre, apaterno, amaterno, contra, carrera_idcarrera) VALUES ( 131020113, 'Victor Miguel', 'Reyez', 'Martinez', '2684', 50002)";
relleno[23]= "INSERT INTO estudiantes (ncontrol, nombre, apaterno, amaterno, contra, carrera_idcarrera) VALUES ( 131020114, 'Joel Alexis', 'Martinez', 'Pineda', '4965', 50004)";
relleno[24]= "INSERT INTO estudiantes (ncontrol, nombre, apaterno, amaterno, contra, carrera_idcarrera) VALUES ( 131020107, 'Esmeralda', 'Iturrigaray', 'Cosijoeza', '9595', 50004)";

relleno[25]="INSERT INTO prestamos (idprestamos, fechaprestamo, fechaentrega, estudiantes_ncontrol, libros_idlibro) VALUES ( 80001, '2006-08-22', '2006-08-25', 131020107, 20004)";
relleno[26]="INSERT INTO prestamos (idprestamos, fechaprestamo, fechaentrega, estudiantes_ncontrol, libros_idlibro) VALUES ( 80002, '2006-09-08', '2006-09-11', 131020115, 20009)";
relleno[27]="INSERT INTO prestamos (idprestamos, fechaprestamo, fechaentrega, estudiantes_ncontrol, libros_idlibro) VALUES ( 80003, '2006-09-14', '2006-10-18', 131020114, 20010)";
relleno[28]="INSERT INTO prestamos (idprestamos, fechaprestamo, fechaentrega, estudiantes_ncontrol, libros_idlibro) VALUES ( 80004, '2006-10-16', '2006-10-20', 131020112, 20007)";
relleno[29]="INSERT INTO prestamos (idprestamos, fechaprestamo, fechaentrega, estudiantes_ncontrol, libros_idlibro) VALUES ( 80005, '2006-10-27', '2006-10-21', 131020113, 20008)";


