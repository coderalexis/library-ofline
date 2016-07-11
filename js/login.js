var sqlSesion = "SELECT * FROM sesion";
var rr = [];
var sqlSeleciona = "SELECT * FROM usuario WHERE clave = ? AND pass = ?;";
var sqlInserta = "INSERT INTO sesion VALUES (?);";

function validarSesion() {
  var r = 0;
  bd.transaction(function(tx) {
    tx.executeSql(sqlSesion, [], function(tx, result) {
      r = result.rows;
      if (r.length === 0) {
        document.location.href = "login.html";
        alert("Favor de iniciar sesion");
      }
    });
  });

}

function eliminaSesion() {
  var sql = "DELETE FROM sesion;";
  bd.transaction(function(tx) {
    tx.executeSql(sql, [], null, errorPresentado);
  });
}

function creaSesion(us) {
  bd.transaction(function(tx) {
    tx.executeSql(sqlInserta, [us], null, errorPresentado);
  });
}

function buscarUsuario() {
  var pass, us;
  us = $("#us").val();
  pass = $("#pass").val();
  bd.transaction(function(tx) {
    tx.executeSql(sqlSeleciona, [us, pass], function(tx, result) {
      rr = result.rows;
      if (rr.length > 0) {
        alert("Bienvenido");
        creaSesion(us);
        document.location.href = "ejemplo.html";
      } else {
        alert("No se encontro el usuario");
      }

    });
  });
}

function salir() {
  var r = confirm("¿Salir de la aplicación?");
  if (r === true) {
    eliminaSesion();
    document.location.href = "login.html";
  }
}
