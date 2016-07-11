/**
 * Created by dexter on 12/06/16.
 */
function crearpdf (titulo) {
    var doc = new jsPDF('p', 'pt');
    doc.text(titulo, 40, 50);
    var res = doc.autoTableHtmlToJson(document.getElementById("tabla"));
    doc.autoTable(res.columns, res.data,{startY: 60});
    //doc.save("table.pdf");
    doc.output("dataurlnewwindow");
};

