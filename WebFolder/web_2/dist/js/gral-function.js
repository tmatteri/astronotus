
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
			F0019()
            ;
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
       
     //   var json =$.getJSON("/4DACTION/TEST_EXCHANGE",function(){return;});

        var app = angular.module('myApp', []);
        app.controller('myCtrl', function($scope, $http) {

                                  $http.get("/4DACTION/TEST_EXCHANGE")
                                  .then(function(response) {
                                                                 $scope.json = response.data;
                                                                 console.log(a);


                                                                var content=$.get("tableExchange.html",function(){return;});

                                                                content.done(function(){
                                                                   
                                                                                        
                                                                                           $('#tabN'+Numtab).html(content.responseText);                   
                                                                                           var table = $('#dataTables-Exchange').DataTable({ responsive: true});

                                                                                           $('#dataTables-Exchange tbody').on( 'click', 'tr', function () {
                                                                                                        if ( $(this).hasClass('active') ) {
                                                                                                            $(this).removeClass('active');
                                                                                                        }
                                                                                                        else {
                                                                                                            table.$('tr.active').removeClass('active');
                                                                                                            $(this).addClass('active');
                                                                                                        }
                                                                                             });
                                                                                         });
                                                            });

      

                  $scope.send = function(){

                    $http({
                        method: "GET",
                        url: "/4DACTION/TEST_SAVE",
                        params: $scope.json
                    })
                    .success(function (response) { 
                        console.log(response.data)
                    })
                    .error(function (response) { 
                        alert("ERROR");
                    });
                    }

         });   

}



// function F0019(){


                   
                              
//                               var json =$.getJSON("/4DACTION/TEST_EXCHANGE").done(function(json){
//                                 console.log(json);
//                                 var tipes = json.EXCHANGES;
                              
//                                content ='<div class="col-lg-12" >'
//                                      +'<div class="dataTable_wrapper">'
//                                      +'<table width="100%" class="table table-striped table-bordered table-hover" id="dataTables-'+Numtab+'">'
//                                      +'<thead>'
//                                      +'  <tr>'
//                                      +'    <th>Código</th>'
//                                      +'    <th>Moneda</th>'
//                                      +'    <th>Cambio a USD</th>'
//                                      +'    <th>Cambio a ARG</th>'
//                                      +'  </tr>'
//                                      +'</thead>'
//                                      +'<tbody>';    
                                     
//                              var length = tipes.length;
//                              console.log(length);
                              
//                              str =JSON.stringify(json.EXCHANGES);
//                              console.log(str);
//                              for (var i = 0; i <= length; i++) {
                                    
//                                  id = String(str[i].ID);
//                                  Currency_ID = String(str[i].Currency_ID);
//                                  Ex_MonPri = String(str[i].Ex_MonPri);
//                                  Ex_MonLeg = String(str[i].Ex_MonLeg);

//                                  content+='<tr class="odd grade'+i+'"><td>'+id+'</td>'
//                                  +'<td>'+Currency_ID+'</td>'
//                                  +'<td>'+Ex_MonPri+'</td>'
//                                  +'<td>'+Ex_MonLeg+'</td>   </tr>';
//                                         }

                       
//                                      content+='</tbody>'
//                                      +'</table>'
//                                      +'</div>'
//                                      +'</div>';

                          
//                                      $('#tabN'+Numtab).append(content);
                             
//                                 });

                
                      
                    

// }

