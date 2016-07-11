function pdfAlumno() {
  bd.transaction(function(tx) {
    tx.executeSql(registros, [], function(tx, result) {
      datos = result.rows;
      var lista = "";
      var y = 40;
      var doc = new jsPDF("p", "mm", "letter");
      if (datos.length > 0) {

        doc.setFontSize(20);
        doc.text(90, 20, "Lista de alumnos");


        doc.setFontSize(12);
        //////////
        doc.text(20, 30, "Nc");
        doc.text(60, 30, "Nombre");
        doc.text(150, 30, "Direccion");
        ////
        for (var i = 0, item = null; i < datos.length; i++) {
          item = datos.item(i);
          /*
          doc.text(10, y, item["nc"]);
          doc.text(40, y, item["nombre"]);
          doc.text(100, y, item["direccion"]);
          */
          doc.text(10, y, item.nc);
          doc.text(40, y, item.nombre);
          doc.text(100, y, item.direccion);

          //doc.setDrawColor(255,0,0);
          doc.rect(5, y - 5, 190, 10, 'D');
          y += 10;
        }
      } else
        doc.text(20, y, "No extisten datos");
      doc.output('dataurlnewwindow');
    });
  });
}

function pdfAlumno2() {
  bd.transaction(function(tx) {
    tx.executeSql(registros, [], function(tx, result) {
      datos = result.rows;
      var y = 0;
      var doc, data = [];
      doc = new jsPDF("l", "pt", "letter");
      if (datos.length > 0) {
        doc.setFontSize(20);
        doc.text(90, 20, "Lista de alumnos");
        for (var i = 0, item = null; i < datos.length; i++) {
          item = datos.item(i);
          data.push({
            /*
            "Nc": item["nc"],
            "Nombre": item["nombre"],
            "Direccion": item["direccion"]
            */
            "Nc": item.nc,
            "Nombre": item.nombre,
            "Direccion": item.direccion
          });

        }
      } else
        doc.text(20, 100, "No extisten datos");
      doc.setFontSize(12);
      doc.setFont("arial", "bold");
      y = doc.drawTable(data, {
        xstart: 20,
        ystart: 20,
        tablestart: 60,
        marginright: 100,
        xOffset: 0,
        yOffset: 15,
        columnWidths: [100, 200, 400]

      });
      doc.text(20, y + 10, "Otro texto");
      //doc.output('dataurlnewwindow');
      doc.output("save", "reporte.pdf");
    });
  });
}
