$(document).ready(function (){
   creaPagina(5);
   //alert("pasaste creaPagina");
});

function paginar(){
	var v = parseInt($("#numItem").val());
	if(v > 0)
		creaPagina(v);
	else{
		alert("El numero de items debe ser mayor a 0");
		$("#numItem").focus();
	}
  //alert("q onda");

}

function creaPagina(valor){
	$(".pager").remove();
  //alert("pasaste remove");
	$('table.paginar').each(function() {
        var currentPage = 0;
        var numPerPage = valor;
        var $table = $(this);

        //alert("pasaste table");

        $table.bind('repaginate', function() {
            $table.find('tbody tr').hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show();
        });
        $table.trigger('repaginate');
        var numRows = $table.find('tbody tr').length;
        var numPages = Math.ceil(numRows / numPerPage);
        var $pager = $('<div class="pager"><div class="form-inline" style="display: inline-block;"><input style="width:60px;padding:5px;" class="form-control"  type="number" id="numItem" />&nbsp;<button type="button" onclick="paginar()" class="btn btn-success">Paginar</button></div>&nbsp;</div>');
        for (var page = 0; page < numPages; page++) {
            $('<span class="page-number"></span>').text(page + 1).bind('click', {
                newPage: page
            }, function(event) {
                currentPage = event.data['newPage'];
                $table.trigger('repaginate');
                $(this).addClass('active').siblings().removeClass('active');
            }).appendTo($pager).addClass('clickable');
        }
        //alert("pasaste el for");
        $pager.insertBefore($table).find('span.page-number:first').addClass('active');
        //alert("pasaste insertBefore");
    });
	$("#numItem").val(valor);
}
