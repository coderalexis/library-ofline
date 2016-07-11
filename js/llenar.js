/**
 * Created by dexter on 12/06/16.
 */
function rellenando() { //
    try {
        if (!window.openDatabase) { //.
            alert('Las bases de datos no son compatibles con este navegador.');
        } else {
            alert("inicia rellenado");
            for (var i = 0; i < relleno.length; i++) {
                creatablas(relleno[i]);
            }
            alert("termina rellenado");

        }
    } catch (e) {
        if (e === 2)
            console.log("Version invalida.");
        else
            console.log("Error desconocido " + e + ".");
        return;
    }
}

function creatablas(cadena) {
    bd.transaction(function(tx) {
        tx.executeSql(cadena, [], null, errorPresentado);
    });
}

$(document).ready(function() {
    inicioBaseDatos();
});