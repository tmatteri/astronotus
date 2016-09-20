
//
// EN ESTE JS VAN LAS MAQUETAS DE HTML A INSERTAR
//
//
// (function (){
// var content=$.get("generalPage.html",function(){return;});

// content.done(function(){
//     $('body').html(content.responseText);
// });

// })();







function FGeneral(code){
		//verifico el permiso y de que funcion se trata
		switch(code){

			case '0019':
			F0019();
          //   $('#tabchild'+Numtab).child.html('<span tab-content ng-controller="TabCtrl" ng-include="tableExchange.html"></span>');

      
			break;
		}

}



function TGeneral(code){
		//le da nombre a la pestaña
		switch(code){

			case '0019':
	        	return 'Tipos de cambio';
			break;
		}


}


function F0019(){
       
        var json =$.getJSON("/4DACTION/TEST_EXCHANGE",function(){return;});
        json.done(function(){

            var content=$.get("tableExchange.html",function(){return;});

                content.done(function(){
                                                                   
                                                                    


                   $('#tabN'+Numtab).html(content.responseText);                   

                  var vjson = JSON.parse(json.responseText);
                  var table = $('#dataTables-Exchange').DataTable({ 
                                                                        data: vjson.data,
                                                                        columns: [
                                                                                    { data: 'ID' },
                                                                                    { data: 'Currency' },
                                                                                    { data: 'Ex_Monpri' },
                                                                                     { data: 'Ex_Monleg' }
                                                                                    
                                                                                 ],
                                                                        responsive: true,
                                                                        bPaginate: false,
                                                                        compact: true,
                                                                        bFilter: false,
                                                                        binfo: false

                                                                    });


                  $('#dataTables-Exchange tbody').on( 'click', 'tr', function () {
                                              if ( $(this).hasClass('active') ) {
                                              $(this).removeClass('active');
                                              }
                                              else {
                                                table.$('tr.active').removeClass('active');
                                               $(this).addClass('active');
                                                   }
                                                  });

                  $('#dataTables-Exchange tbody').on('dblclick','tr',function(){
                                                console.log($(this));
                                                alert($(this.children)[0].textContent);
                                                console.log($(this.children)[0].textContent);


                                                });








                                             });

        });
         }
