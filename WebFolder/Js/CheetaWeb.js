/*ALGUNAS VARIABLE DE USO GOLBAL POR EL MOMENTO */
var ModCell;    //LA CELDA ACTUALMENTE QUE PSOE EL FOCO 
var ModCell_ID; //LA CELDA CONTIGUA A LA SELECCIONADA SI LA SELECCIONADA ES UN CAMPO COM AYUDA LA DE AL LADO ES EL ID
var ModCell_Extra // LA CELDA QUE GUARDA UN CAMPO INDICADO 
var ModValue; // El VALOR ORIGINAL DEL CAMPO QUE SE QUIERE MODIFICAR
var CurrentCell;  //EL INPUT QUE TIENE EL FOCO
var CurrentValue; // El VALOR ORIGINAL DEL CAMPO AL QUE SE LE PUSO EL FOCO
var CurrentRow;  // LA FILA ACTUALMENTE SELECCIONADA EN LA TABAL PRINCIPAL
var color;       // VARIABLE AUXILIAR QUE GUARDA COLOR
//VARIABLES QUE GUARDAN IDS Y NAMES
var id = null;
var Nombre = null;
var Extra = null;
var id_c = null;	
var Nombre_c = null;
var id_t = null;
var Nombre_t = null;
var id_o = null;		
var Nombre_o = null;
var open_dialog = true; //Variable que se modifica desde 4d pasa saber si hay que abrir o no el cuadro de dialogo
var SelectAllRow = false; 


//*******EXTORDOR A EXCEL
var tableToExcel = (function() {
  var uri = 'data:application/vnd.ms-excel;base64,'
    , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
    , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
    , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
  return function(table, name) {
    if (!table.nodeType) table = document.getElementById(table)
    var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
    window.location.href = uri + base64(format(template, ctx))
  }
})();

//************************************************************************************************//
//***********FILTROS WEBBOOKING*******************************************************************//

function MyFilter() {

	$("#filtro").button(); 
	
	$("#filtro").live("click", function(event){  
 
 	var ObjPos= $(this)
  
 	$("#FiltrosH").dialog({	
	   				  title: 'Filtros',
	   				  resizable: false,
	   				  width : 230,
	   				  modal: true ,
	   				  position: [ObjPos.offset().left,ObjPos.offset().top +60],
	   				  close: function() { 
	   				  
	   				  		$('.ClassBox').each(function(){	   				  
							
							if(	$(this).attr('checked')!="checked"){
							
							var OpcionC = "input." + $(this).attr('value'); 
						  
						    $(OpcionC).parent().parent().hide();
						    
						    $(OpcionC).parent().parent().attr('class','');
						    
						    $(OpcionC).parent().parent().addClass('Noselec');
						    
						    }//END IF

							}); //END EACH
							
							$('.ClassBox').each(function(){	   				  
							
							if(	$(this).attr('checked')=="checked"){
							
							var OpcionC = "input." + $(this).attr('value'); 
						
						    $(OpcionC).parent().parent().show();
						    
						    $(OpcionC).parent().parent().removeClass('Noselec');
						    
						    $(OpcionC).parent().parent().addClass('selec');
						    
						    } //END IF
						    
						    }); //END EACH		
							
							var i = 1;
							var CantidadDeItems = 0;
		     				var Npage = 1;
		     				$('.selec').hide();
							$('.selec').each(function(){
			 				if(i == CantRegXHoja){Npage++; i= 1 ; }	
			  				$(this).attr('class', getClass($(this)) + ' page'+ Npage.toString() );
			  				i++;
			  				CantidadDeItems++;
			 				})//END ROW EACH
			 				$(".page1").show();
			 				
			 				var ResDiv = CantidadDeItems / CantRegXHoja
			 				
			 				if(ResDiv < 1) {
			 				
			 				var paginas = 1
			 				
			 				}//END IF
			 				else{
			 				
			 				var paginas = Math.round(ResDiv - 0.5);
			 				
			 				if ( CantidadDeItems % CantRegXHoja != 0 ){
			 				paginas++;
			 				}//END IF
			 				
			 				}//END ELSE
			 				 
			 				
			 				$('#cantPag').html(paginas.toString());
			 				
			 				$('#cantRegs').html('Cantidad de registros : '+CantidadDeItems.toString());
			 				
							
	   				  }//END CLOSE
	   				  
	   				  });//END DIALOG
 
 	});


}//END MyFilter


//************************************************************************************************//
//***********HELP ATA  ***********************************************************************//
function HelpATALive() {

	  $('input.ata_name').live('change', function(event) {
    
      Query=$(this).attr("value");//ancho alto
	  ModCell = $(this)
	  ModCell_ID= CurrentRow.find('.ata_id')
	  if(Query!=""){
	  CreateDilog('Vendedor','/4DACTION/WEB_Excel_Help_ATA',410,"");}
	  else{
	  ModCell_ID.attr('value','');
	  ModCell_ID.attr('name', ModCell_ID.attr('name')+'mod');}
    
    });
    
}
//************************************************************************************************//
//***********HELP SELLER2  ***********************************************************************//
//*****SE TENDRIAN QUE PASAR TODOS LOS HELPS A FUCNIONES TRABAJO PARA UN DIA QUE NO ALLA SISTEMA 
function HelpSeller2Live() {

	  $('input.seller2').live('change', function(event) {
    
      Query=$(this).attr("value");//ancho alto
	  ModCell = $(this)
	  ModCell_ID= CurrentRow.find('.seller2_id')
	  if(Query!=""){
	  CreateDilog('Vendedor','/4DACTION/WEB_Excel_Help_Sellers',240,"");}
	  else{
	  ModCell_ID.attr('value','');
	  ModCell_ID.attr('name', ModCell_ID.attr('name')+'mod');}
    
    });
    
}
//************************************************************************************************//
//***********ASIGNA_ATA_***************************************************************************//
function asignarAta(ocean_id) {

	var Ata_Name = CurrentRow.find('.ata_name') 
	
	var Ata_Id = CurrentRow.find('.ata_id')
	
	var Ata_Cuit = CurrentRow.find('.ata_cuit') 
	
	var Ata_Reg = CurrentRow.find('.ata_reg')
	
	$.ajax({
	
     				url : '/4DACTION/Web_Excel_Asignar_ATA/='+ ocean_id +'*/',
	  
      				type : 'GET',
	  
	  				dataType: 'html',
					
					cache: false,
	  
      				success : function(html) {
												$("#Asignar").html(html);
												Ata_Name.attr("value",$('#return_ata_name').attr('value'));
												Ata_Id.attr("value",$('#return_ata_id').attr('value'));
												Ata_Cuit.attr("value",$('#return_ata_cuit').attr('value'));
												Ata_Reg.attr("value",$('#return_ata_reg').attr('value'));
												

												var name = Ata_Cuit.attr("name");
												name = name + 'mod';
												Ata_Cuit.attr("name", name);
												
												var name = Ata_Id.attr("name");
												name = name + 'mod';
												Ata_Id.attr("name", name);
												
												var name = Ata_Reg.attr("name");
												name = name + 'mod';
												Ata_Reg.attr("name", name);
												
												$("#Asignar").html("");
      										 }
     }); // END AJAX  
     
     
}//END asignarVendedores
//************************************************************************************************//
//***********ASIGNA_ATA_CUIT_REG***************************************************************************//
function asignarAta_Cuit_Reg(ata_id) {
	
	var Ata_Cuit = CurrentRow.find('.ata_cuit') 
	
	var Ata_Reg = CurrentRow.find('.ata_reg')
	
	$.ajax({
	
     				url : '/4DACTION/Web_Excel_Asignar_ATA_Cuit_Reg/='+ ata_id +'*/',
	  
      				type : 'GET',
	  
	  				dataType: 'html',
					
					cache: false,
	  
      				success : function(html) {
												$("#Asignar").html(html);
												Ata_Cuit.attr("value",  $('#return_ata_cuit').attr('value'));
												Ata_Reg.attr("value",  $('#return_ata_reg').attr('value'));

												var name = Ata_Cuit.attr("name");
												name = name + 'mod';
												Ata_Cuit.attr("name", name);
												
												var name = Ata_Reg.attr("name");
												name = name + 'mod';
												Ata_Reg.attr("name", name);
												
												$("#Asignar").html("");
      										 }
     }); // END AJAX  
	
}//END asignarVendedores
//************************************************************************************************//
//***********Asigna los vendedores   *************************************************************//
function asignarVendedores(client_id) {
	
	var Seller_Name = CurrentRow.find('.seller') 
	
	var Seller_ID = CurrentRow.find('.seller_id')
	
	var Seller2_Name = CurrentRow.find('.seller2') 
	
	var Seller2_ID = CurrentRow.find('.seller2_id')
	
	$.ajax({
	
     				url : '/4DACTION/Web_Excel_Asignar_Sellers/='+ Ope_Type +'*/='+ client_id +'*/',
	  
      				type : 'GET',
	  
	  				dataType: 'html',
					
					cache: false,
	  
      				success : function(html) {
												$("#Asignar").html(html);
												Seller_Name.attr("value",  $('#return_seller_name').attr('value'));
												Seller_ID.attr("value",  $('#return_seller_id').attr('value')  );
												
												Seller2_Name.attr("value",  $('#return_seller2_name').attr('value') );
												Seller2_ID.attr("value",  $('#return_seller2_id').attr('value')  );

												var name = Seller_ID.attr("name");
												name = name + 'mod'
												Seller_ID.attr("name", name);
												
												var name2 = Seller2_ID.attr("name");
												name2 = name2 + 'mod'
												Seller2_ID.attr("name", name2);
												
												
												$("#Asignar").html("");
      										 }
     }); // END AJAX  
	
}//END asignarVendedores
//************************************************************************************************//
//***********Saca la cualquier condicion de color de un objeto************************************//
function removeColorCondition( Obj ) {
		$(Obj).removeClass('turquesa'); 
	 	$(Obj).removeClass('orange'); 
	 	$(Obj).removeClass('fuxia');
	 	$(Obj).removeClass('newope'); 	
}//END removeColorCondition( Obj )
//************************************************************************************************//
//***************************CONFIRMA LAS FECHAS DE ETD Y ETA*************************************//
function ConfirmETAETD(isMaster) {
	
	  	$('#ETAConfirm').live('click',function(event){
	  	
	  	ModCell = $(this);
	  	
	  	CurrentRow = $(this).parent().parent();
	  	
	  	var CellDate = CurrentRow.find('.ETAconfirm_input');
	  	
	  	var MyETA = CurrentRow.find('.ETAdate');
	  	
	  	var ETAdate = MyETA.attr('value');
	  	
	  	var Master_id_date = CurrentRow.find('.master_id').attr('value');
	  	
	  	if(ETAdate!="00/00/0000"){
	  	
	  	if ((Master_id_date == "") | (isMaster == true)) {
	  	
	  	var html = "Desea confirmar la fecha de ETA " + ETAdate
	  	
		$('#help').html(html);
			
	  	$('#help').dialog({
			title: 'Alert',
			resizable: false,
			modal: true,
	  		position: [ModCell.offset().left,ModCell.offset().top],
			buttons: {
	   			"SI": function() {   
	   			
	   			var name = CellDate.attr("name");
	     		name = name + 'mod';
	     		CellDate.attr("name", name);
	   			
	   			removeColorCondition(MyETA);
	   			MyETA.addClass('orange');
	   			
	   			$(this).dialog( "close" );
	  			$(this).dialog( "destroy" );
	   			$(this).html( "" );
	   			//generateHouse(url,master_id);

	  			}, //END BUTTON "SI",
	  			"NO": function() {   
	   			$(this).dialog( "close" );
	  			$(this).dialog( "destroy" );
	   			$(this).html( "" );
	  			} //END BUTTON "NO"
	  			
	  			} //END BUTTONS
			}); //END dialog
			
			}//FIN IF
			
			else{
			
			var html = "La fecha debe ser confirmada desde la master "+  Master_id_date;
	  	
			$('#help').html(html);
			
	  		$('#help').dialog({
			title: 'Alert',
			resizable: false,
			modal: true,
	  		position: [ModCell.offset().left,ModCell.offset().top],
			buttons: {
	   			"OK": function() {   
	   			$(this).dialog( "close" );
	  			$(this).dialog( "destroy" );
	   			$(this).html( "" );
	  			}, //END BUTTON "SI"
	  			
	  			}
			}); 

			}//END ELSE
			
			}//END IF if(ETAdate!="00/00/0000")
			
	  	})//FIN LIVE ETA
	  	
	  	$('#ETDConfirm').live('click',function(event){
	  	
	  	ModCell = $(this);
	  	
	  	CurrentRow = $(this).parent().parent();
	  	
	  	var CellDate = CurrentRow.find('.ETDConfirm_input');
	  	
	  	var MyETD = CurrentRow.find('.ETDdate');
	  	
	  	var ETDdate = MyETD.attr('value');
	  	
	  	var Master_id_date = CurrentRow.find('.master_id').attr('value');
	  	
	  	if(ETDdate!="00/00/0000"){
	  	
	  	if ((Master_id_date == "") | (isMaster == true)) {
	  	
	  	var html = "Desea confirmar la fecha de ETD " + ETDdate
	  	
		$('#help').html(html);
			
	  	$('#help').dialog({
			title: 'Alert',
			resizable: false,
			modal: true,
	  		position: [ModCell.offset().left,ModCell.offset().top],
			buttons: {
	   			"SI": function() {   
	   			$(this).dialog( "close" );
	  			$(this).dialog( "destroy" );
	   			$(this).html( "" );
	   			
	   			removeColorCondition(MyETD);
	   			MyETD.addClass('turquesa');
	   			
	   			var name = CellDate.attr("name");
	     		name = name + 'mod'
	     		CellDate.attr("name", name);
	   			
	   			//generateHouse(url,master_id);
	  			}, //END BUTTON "SI",
	  			"NO": function() {   
	   			$(this).dialog( "close" );
	  			$(this).dialog( "destroy" );
	   			$(this).html( "" );
	  			} //END BUTTON "NO",
	  			
	  			}//END BUTTON
			});
			
			}//FIN IF
			
			else{
			
			var html = "La fecha debe ser confirmada desde la master "+  Master_id_date
	  	
			$('#help').html(html);
			
	  		$('#help').dialog({
			title: 'Alert',
			resizable: false,
			modal: true,
	  		position: [ModCell.offset().left,ModCell.offset().top],
			buttons: {
	   			"OK": function() {   
	   			$(this).dialog( "close" );
	  			$(this).dialog( "destroy" );
	   			$(this).html( "" );
	  			}, //END BUTTON "SI"
	  			
	  			}//END BUTTON 
			}); 

			}//END ELSE		
			
			}//END if(ETDdate!="00/00/0000"){

	  	})//FIN LIVE ETD
	  	
	  	
	  	
	  $('#ATRConfirm').live('click',function(event){
	  	
	  	ModCell = $(this);
	  	
	  	CurrentRow = $(this).parent().parent();
	  	
	  	var CellDate = CurrentRow.find('.ATRConfirm_input');
	  	
	  	var MyATR = CurrentRow.find('.ATRdate');
	  	
	  	var MyATR_Val = CellDate.attr('value');
	  	
	  	var ATRdate = MyATR.attr('value');
	  	if(MyATR_Val=='False'){ //CONFIRMA ATR
	  	
	  	if(ATRdate!="00/00/0000"){
	  	
	  	var html = "Desea confirmar la fecha de ETA POL " + ATRdate
	  	
		$('#help').html(html);
			
	  	$('#help').dialog({
			title: 'Alert',
			resizable: false,
			modal: true,
	  		position: [ModCell.offset().left,ModCell.offset().top],
			buttons: {
	   			"SI": function() {   
	   			
	   			var name = CellDate.attr("name");
	     		name = name + 'mod';
	     		CellDate.attr("name", name);
	   			CellDate.attr('value', 'True');
	   			
	   			removeColorCondition(MyATR);
	   			MyATR.addClass('turquesa');
	   			
	   			$(this).dialog( "close" );
	  			$(this).dialog( "destroy" );
	   			$(this).html( "" );

	  			}, //END BUTTON "SI",
	  			"NO": function() {   
	   			$(this).dialog( "close" );
	  			$(this).dialog( "destroy" );
	   			$(this).html( "" );
	  			} //END BUTTON "NO"
	  			
	  			} //END BUTTONS
			}); //END dialog
			
			}//END IF if(ATRdate!="00/00/0000")
	  	
	  	}//FIN CONFIRMA ATR
	  	else{ //DESONFIRMA ATR
	  	
	  	
	  	var html = "Desea Desconfirmar la fecha de ETA POL " + ATRdate
	  	
		$('#help').html(html);
			
	  	$('#help').dialog({
			title: 'Alert',
			resizable: false,
			modal: true,
	  		position: [ModCell.offset().left,ModCell.offset().top],
			buttons: {
	   			"SI": function() {   
	   			
	   			var name = CellDate.attr("name");
	     		name = name + 'mod';
	     		CellDate.attr("name", name);
	            CellDate.attr('value', 'False');
	            removeColorCondition(MyATR);
	            MyATR.removeAttr("readonly");
	            
	            var name = MyATR.attr("name");
	     		name = name + 'mod';
	     		MyATR.attr("name", name);
	            MyATR.attr('value',"00/00/0000");
	            
	            
	            $(this).dialog( "close" );
	  			$(this).dialog( "destroy" );
	   			$(this).html( "" );

	  			}, //END BUTTON "SI",
	  			"NO": function() {   
	   			$(this).dialog( "close" );
	  			$(this).dialog( "destroy" );
	   			$(this).html( "" );
	  			} //END BUTTON "NO"
	  			
	  			} //END BUTTONS
			}); //END dialog
	  	
	  	}//FIN DESONFIRMA ATR

	  	});//FIN LIVE ATR
	  	
//////////TRANSFER DATE	  	
	  $('#Transfer_DateConfirm').live('click',function(event){
	  	
	  	ModCell = $(this);
	  	
	  	CurrentRow = $(this).parent().parent();
	  	
	  	var CellDate = CurrentRow.find('.Transfer_DateConfirm_input');
	  	
	  	var MyTransfer = CurrentRow.find('.TrsDate');
	  	
	  	var TransferDate = MyTransfer.attr('value');
	  	
	  	if(TransferDate!="00/00/0000"){
	  	
	  	var html = "Desea confirmar la fecha de Traslado " + TransferDate
	  	
		$('#help').html(html);
			
	  	$('#help').dialog({
			title: 'Alert',
			resizable: false,
			modal: true,
	  		position: [ModCell.offset().left,ModCell.offset().top],
			buttons: {
	   			"SI": function() {   
	   			$(this).dialog( "close" );
	  			$(this).dialog( "destroy" );
	   			$(this).html( "" );
	   			
	   			removeColorCondition(MyTransfer);
	   			MyTransfer.addClass('orange');
	   			
	   			var name = CellDate.attr("name");
	     		name = name + 'mod'
	     		CellDate.attr("name", name);
	   			
	   			//generateHouse(url,master_id);
	  			}, //END BUTTON "SI",
	  			"NO": function() {   
	   			$(this).dialog( "close" );
	  			$(this).dialog( "destroy" );
	   			$(this).html( "" );
	  			} //END BUTTON "NO",
	  			
	  			}//END BUTTON
			});	
			
			}//END if(ETDdate!="00/00/0000")

	  	})//FIN LIVE ETD
	  	
	  	

}//END ConfirmETAETD(isMaster)
//************************************************************************************************//
//***************************CREA UNA HOUSE DESDE UNA MASTER**************************************//
function createHouse(TypeOpe,Obj) {

 CurrentRow = $(Obj).parent().parent();
 ModCell = $(Obj)
 
 	switch(TypeOpe)
	{
  		case "MCME":
 	 	var url = "/4DACTION/Web_Excel_Master_CME_createHous" ;
 	 	var master_id  =  CurrentRow.find('.cme_id').attr('value');
  		break;
		case "MCMI":
  		var url = "/4DACTION/Web_Excel_Master_CMI_CreateHous" ;
  		var master_id =  CurrentRow.find('.cmi_id').attr('value');
  		break;
	}

		    var html = "Desea crear una nueva operacion vinculada a la master " + master_id
			$('#help').html(html);
			open_dialog=true;
		    $('#help').dialog('destroy');
			$('#help').dialog({
			title: 'Alert',
			resizable: false,
			modal: true,
	  		position: [ModCell.offset().left,ModCell.offset().top],
			buttons: {
	   			"SI": function() {   
	   			$(this).dialog( "close" );
	  			$(this).dialog( "destroy" );
	   			$(this).html( "" );
	   			generateHouse(url,master_id);
	  			}, //END BUTTON "SI",
	  			"NO": function() {   
	   			$(this).dialog( "close" );
	  			$(this).dialog( "destroy" );
	   			$(this).html( "" );
	  			} //END BUTTON "NO",
	  			
	  			}
			});
 	
 };
 
 
 function generateHouse(url,master_id) {

  			$.ajax({
	
     				url : url +"/="+sessvars.User.name+"*/="+master_id+"*/",
	  
      				type : 'GET',
	  
	  				dataType: 'html',
					
					cache: false,
	  
      				success : function(html) {
												$("#viewHouses").html(html);
												if(open_dialog==true){ 
												GenericAlert(html)
												$("#viewHouses").html("");
												} 
												else{
												MyExcelLogin();
												}//END IF OPEN_DIALOG
												
												
      										 }
     		 }); // END AJAX  
};//END generateHouse
//************************************************************************************************//
//***************************CONSOLIDA HOUSE DESDE LAS MASTER*************************************//
function addHouse(TypeOpe,master_id,cme_id) {
	switch(TypeOpe)
	{
  		case "MCME":
 	 	url = "/4DACTION/Web_Excel_Master_CME_AddHouses/="+master_id+"*/="+cme_id+"*/"
  		break;
		case "MCMI":
  		url = "/4DACTION/Web_Excel_Master_CMI_AddHouses/="+master_id+"*/="+cme_id+"*/"
  		break;
	}

			$.ajax({
	
     				url : url,
	  
      				type : 'GET',
	  
	  				dataType: 'html',
					
					cache: false,
					
					success : function(html) {
					
					GenericAlert(html);
					
					}
					
     		 }); // END AJAX  


}//END addHouse
//************************************************************************************************//
//***************************ADD OPERACIONES *****************************************************//
//AGREGA UNA FILA CON UNA HOUSE NUEVA DICHA HOUSE NO SE CREA REALMENTE HASTA SALVAR
function addOperation(TypeOpe) {

	var classParam;
	
	switch(TypeOpe)
	{
		case "CAE":
 	 	url = '/4DACTION/WEB_Excel_CAE_AddRecord/='+sessvars.User.id+'*/'
 	 	classParam = '.new_cae'
  		break;
		case "CAI":
  		url = '/4DACTION/WEB_Excel_CAI_AddRecord/='+sessvars.User.id+'*/'
  		classParam = '.new_cai'
  		break;
  		case "CME":
 	 	url = '/4DACTION/WEB_Excel_CME_AddRecord/='+sessvars.User.id+'*/'
 	 	classParam = '.new_cme'
  		break;
		case "CMI":
  		url = '/4DACTION/WEB_Excel_CMI_AddRecord/='+sessvars.User.id+'*/'
  		classParam = '.new_cmi'
  		break;
  		case "MCME":
 	 	url = '/4DACTION/WEB_Excel_Master_CME_AddRecord/='+sessvars.User.id+'*/'
 	 	classParam = '.new_cme'
  		break;
		case "MCMI":
  		url = '/4DACTION/WEB_Excel_Master_CMI_AddRecord/='+sessvars.User.id+'*/'
  		classParam = '.new_cmi'
  		break;
	}
	
		 $.ajax({
	
     				url : url,
	  
      				type : 'GET',
	  
	  				dataType: 'html',
					
					cache: false,
	  
      				success : function(html) {
      											addFila(html,classParam);
      											TiposDeGuia();
      										 }
	  
     		 }); // END AJAX  
	
}//END addOperation(TypeOpe)
//************************************************************************************************//
//***************************ANULAR OPERACIONES **************************************************//
function anularOperacion(Obj,TypeOpe){
 
 var Ope_id =  CurrentRow.find(TypeOpe).attr('value')
 
 ModCell = Obj
 
            var html = "Desea anular la operacion " + Ope_id
			$('#help').html(html);
			open_dialog=true;
		    $('#help').dialog('destroy');
			$('#help').dialog({
			title: 'Alert',
			resizable: false,
			modal: true,
			position: [ModCell.offset().left,ModCell.offset().top],
			buttons: {
	   			"SI": function() {   
	   			$(this).dialog( "close" );
	  			$(this).dialog( "destroy" );
	   			$(this).html( "" );
	   			anularOperacionOK(ModCell,Ope_id);
	  			}, //END BUTTON "SI",
	  			"NO": function() {   
	   			$(this).dialog( "close" );
	  			$(this).dialog( "destroy" );
	   			$(this).html( "" );
	  			} //END BUTTON "NO",
	  			
	  			}
			});
	   
} //END anularOperacion
 
function anularOperacionOK(ModCell,Ope_id) {
 
	$.ajax({
	
     				url : "/4DACTION/Web_Excel_Ope_Anular/="+ sessvars.User.id +"*/="+ Ope_id +"*/",
	  
      				type : 'GET',
	  
	  				dataType: 'html',
					
					cache: false,
	  
      				success : function(html) {
      											GenericAlert(html);
      										 }
	  
     	}); // END AJAX  
 }//END anularOperacionOK(ModCell,Ope_id)
//************************************************************************************************//
//**********************METODO QUE SALVA UNA REGISTRO ENTERO CON AJAX*****************************//
function saveInLive(row, TypeOpe) {

   // GenericAlertMid("Al consolidar se guardara la operación") 
    
    switch(TypeOpe)
	{
		case "CME":
 	 	saveOpeID = row.find('.cme_id').attr('value')
  		break;
		case "CMI":
  		saveOpeID = row.find('.cmi_id').attr('value')
  		break;
	}

    SelecInputs = row.find('input[name$="mod"]')
    
    LastInput = SelecInputs.filter(":last").attr('name')
    
    SelecInputs.each(function(){
    
    if($(this).attr('name')==LastInput){ 
    SaveCampo(saveOpeID,$(this).attr('name'),$(this).attr('value'), true ,TypeOpe)
    }else{
    SaveCampo(saveOpeID,$(this).attr('name'),$(this).attr('value'), false,TypeOpe)}
    
    })

}//**END saveInLive
//************************************************************************************************//
//*********************************SALVA UN CAMPO ************************************************//
function SaveCampo(id,name,value, asigMaster, TypeOpe) {

switch(TypeOpe)
	{
		case "CME":
 	 	var url = "/4DACTION/Web_Excel_CME_Save_InLive/=";
  		break;
		case "CMI":
  		var url = "/4DACTION/Web_Excel_CMI_Save_InLive/=";
  		break;
	}
  	      $.ajax({
	
     				url : url+id+"*/="+name+"*/="+value+"*/",
	  
      				type : 'GET',
	  
	  			    dataType: 'text',
					
				   cache: false,
				   
				   success : function(html) {
				   if(asigMaster){AsignoMadre(CurrentRow,TypeOpe);}				 
				   }			 			
				   
     		 }); // END AJAX  

}//END SaveCampo
//************************************************************************************************//
//*************************ASIGNO UNA MADRE A UNA HOUSE DESDE UNA HOUSE***************************//
function AsignoMadre(Row, TypeOpe) {

var saveMasterID = Row.find('.master_id').attr('value')

switch(TypeOpe)
{
case "CME":
  var url = "/4DACTION/Web_Excel_CME_AsignoMadre/="
  var saveOpeID = Row.find('.cme_id').attr('value')
  break;
case "CMI":
  var url = "/4DACTION/Web_Excel_CMI_AsignoMadre/="
  var saveOpeID = Row.find('.cmi_id').attr('value')
  break;
}

//saveInLive(Row);
	
	 	 $.ajax({
	
     				url : url + saveMasterID+"*/="+saveOpeID+"*/",
	  
      				type : 'POST',
	  
	  				dataType: 'text',
					
					cache: false,
	               
	               success : function(html) {
	               
	               $(Row).html(html);
	               
	               }//END SUCCESS
      										 				 
     		 }); // END AJAX  
     		 
}//END AsignoMadre
//************************************************************************************************//
//******************VERIFICA QUE LA VARIABLE DE SESSION ESTE DEFINIDA Y NO ESTE VASIA*************//
//******************PARA Q NO SE PUEDAN VER LAS PAGINAS SI NO SE ESTA LOGEADO*********************//
function CheckSession() {
	
	if(sessvars.User){
    if(sessvars.User.name==""){
    document.location.href="/in.shtml";}
    }
    else{
    document.location.href="/in.shtml";}
	
}//END CheckSession()
//************************************************************************************************//
//**************************ORDENA LA TABLA POR ETA O ETD*****************************************//
function OrderBY() {

var OrderETA = false;
var OrderETD = false;

$('#thETA').live('click',function () {
	
	var str ;
	
	if(OrderETA == false){
	str = "ETA>";
	OrderETA = true;
	}else{
	str = "ETA<";
	OrderETA = false;	
	}
	
	ReOrderQUERY(str);
	
});

$('#thETD').live('click',function () {
	
	var str ;
	
	if(OrderETD == false){
	str = "ETD>";
	OrderETD = true; 
	}else{
	str = "ETD<";
	OrderETD = false;
	}
	
	ReOrderQUERY(str);
	
});

function ReOrderQUERY(str) {

	  LastOrderParam = str;
 
      ReQUERY();
}

}//END OrderBY
//************************************************************************************************//

//**********FUNCION ENCARGADA DE SABER SI ESTA AUTENTIFICADO EL USUARIO ANTES DE SALVAR***********//
function beforeSave(){

 $('#save').live('click',function() {
 	
 	var ObjPos = $(this)
 	
 	var Formulario = $("#Form")
 	
 	 $.ajax({
	
     				url : "/4DACTION/Web_Excel_Authentication/="+sessvars.User.name+"*/",
	  
      				type : 'GET',
	  
	  				dataType: 'html',
					
					cache: false,
	               
	               success : function(html) {
 												if(html.indexOf('Enter') == -1){
 												 $("#help2").html(html)
 												 CheckCookiesLogin();
 												 $("#help2").dialog({	
	   												title: 'Login',
	   												resizable: false,
	   												modal: true ,
	   												position: [ObjPos.offset().left,ObjPos.offset().top],
	   												});//END DIALOG
 												 login();
      										 	}//end if		
      										 	else{
      										 	$(".date").removeAttr("disabled"); //SE QUITA ESTOS ATRIBUTOS DE LAS FECHAS PARA PODER SER GUARDADAS EN CASO DE QUE ESTEN RELACIONADAS A UN MASTER
      										 	$(".hour").removeAttr("disabled"); 
      										 	$(".travelnum1").removeAttr("disabled"); 
      										 	$("#Form").submit(); //envia el formulario
      										 	}
      										 	
      										 }//END SUCCESS
      										 
      										 
     		 }); // END AJAX  
 	
 	
 });//END LIVE
 
} //END beforeSave()
//************************************************************************************************//

//*****************************onDATACHANGE DEL SELECT TyPECARGA *********************************//
function ComboBoxChange() {
	
	$('.SelectType').live('change',function () {
	
	CurrentRow = $(this).parent().parent();
	
	CurrentValue = CurrentRow.find('.TypeCarga').attr('value');
	
	CurrentCell = CurrentRow.find('.TypeCarga');
	
	var selecIndex =  $(this).val();

	CurrentCell.attr('value', selecIndex);
	
	if (selecIndex == 1 ){
	CurrentValue = CurrentRow.find('.wm').attr("disabled", true); 
	}	
	else{
	CurrentValue = CurrentRow.find('.wm').removeAttr("disabled");
	}

	ModifyCell();
		
	})//END LIVE
	
}// FIN ComboBoxChange()
//*************************************************************************************************//

//*************************************CLICK SOBRE IMPRESION DE BLS********************************//
function blsPrinted(){

 $('#printed').live('click', function(){
 
 CurrentRow = $(this).parent().parent();
 
 CurrentValue = CurrentRow.find('#printedhidden').attr('value');
    
 CurrentCell = CurrentRow.find('#printedhidden');
 
 if($(this).attr('value')=='Origen'){
 
 $(this).attr('value','Destino');
 
 CurrentCell.attr('value','Destino');
 
 ModifyCell();
 
 }else{
 
 $(this).attr('value','Origen');
 
 CurrentCell.attr('value','Origen');
 
 ModifyCell();
 
 }//FIN IF
 
 })//END LIVE click

} //END blsPrinted
//*************************************************************************************************//

//************************ CALCULA EL WIDTH DE LA COLUMNA OBSERVACIONES****************************//
//***********************  PARA QE TODAS LAS TABLAS TENGAN EL MISMO ANCHO *************************//
function RezideObs(tabla) {
 
 var ActWidth = parseInt($(tabla).css('width'));
 
 var WidthObs = 5650 - ActWidth + parseInt($('#Obs').css('width'))	;
 
 //$('#Obs').attr('width', WidthObs);
 
 $('.observations').each(function (){
 
 $(this).parent().css('width', WidthObs);
 $(this).css('width', WidthObs);
 
 });
 
 ResizableTDS('#RezC20','.observations', WidthObs);

}//END RezideObs(tabla)
//************************************************************************************************//

//************************************DOBLE CLICK SOBRE UNA FILA**********************************//
function RowDoubleClick(){

$('tr.selec > td > input').live("dblclick", function(event){
SelectAllRow = true;
CurrentRow.find('input').each(function(){MouseEnter($(this));})//END EACH
});//END LIVE

}//END ROW DOUBLECLICK
//************************************************************************************************//

//*********************************CLICK SOBRE NA BOTON DE COLOR**********************************//
function SelectColor() {
 
 $('.color').live('click', function(){
 
 color  = $(this).attr('name');
 
 if(SelectAllRow == true){
 CurrentRow.find('input').each(function(){
                                          $(this).attr('class', getClass($(this)));
	 									  $(this).addClass(color); 
 										  })
 										  
 SelectAllRow = false;										
 }//FIN IF 
 else{
 CurrentCell.attr('class', getClass($(CurrentCell)));
 CurrentCell.addClass(color);
 }//END ELSE

 })//end live

}//END SelectColor()
//************************************************************************************************//

//************************GUARDO EL INPUT ACTUAL QUE POSEE EL FOCO********************************//
function InputFocus( Obj ) {
	CurrentCell=$(Obj);
	CurrentRow = $(Obj).parent().parent();
	$('tr.selec > td > .marker').each(function(){
		$(this).attr('value','')
	})
	CurrentRow.find('.marker').attr('value','>');
	
	CurrentValue = $(Obj).attr('value');
	
}//END InputFocus( Obj )
//************************************************************************************************//

//******INDICO QUE A SIDO MODIFICADO UN CAMPO Y GUARDO EL VALOR ANTERIOR *************************//
//******A EL INTENTO DE MODIFICACION ADEMAS CAMBIO DE COLOR LSO BOTONES DE SAVAL Y CANCELAR*******//
function ModifyCell() {

    ModValue = CurrentValue ;
    
    var name = CurrentCell.attr("name");
    
	name = name + 'mod'
	
	CurrentCell.attr("name", name);
	
	$("#save").removeClass('ui-state-default')
    $("#save").addClass('greenBorder')
    
    $("#cancel").removeClass('ui-state-default')
    $("#cancel").addClass('redBorder')
    
    $("#saved").attr("value",'false');
    
}//END ModifyCell()
//************************************************************************************************//

//*************************************ALERTA GENERICO********************************************//
function GenericAlert(Text) {

            var html = "<table width='250px' ><tr><td><img src='../img/alert.png'></td><td><span class='text_generic'>"+Text+"</span></td><tr></table>"
			$('#help').html(html);
			open_dialog=true;
		    $('#help').dialog('destroy');
		    
			$('#help').dialog({
			title: 'Alert',
			resizable: false,
			modal: true,
			position: [ModCell.offset().left,ModCell.offset().top],
			close: function() { ModCell.attr('value',ModValue)}
			});

}//END GenericAlert(Text)
//************************************************************************************************//

//************************ALERTA GENERICO EN EL MEDIO DE LA PANTALLA******************************//
function GenericAlertMid(Text) {

            var html = "<table width='250px' ><tr><td><img src='../img/alert.png'></td><td><span class='text_generic'>"+Text+"</span></td><tr></table>"
			$('#help').html(html);
			open_dialog=true;
		    $('#help').dialog('destroy');
			$('#help').dialog({
			title: 'Alert',
			resizable: false,
			modal: true,
			position: [$(window).width()/2-200,$(window).height()/2]
			});

}//END GenericAlertMid(Text)
//************************************************************************************************//

//**************************************ALERTA GENERICO CON XY************************************//
function GenericAlertXY(Text,X,Y) {

            var html = "<table width='250px' ><tr><td><img src='../img/alert.png'></td><td><span class='text_generic'>"+Text+"</span></td><tr></table>"
			$('#help').html(html);
			open_dialog=true;
		    $('#help').dialog('destroy');
			$('#help').dialog({
			title: 'Alert',
			resizable: false,
			modal: true,
			position: [X,Y]
			});

}//END GenericAlertXY(Text,X,Y)
//************************************************************************************************//

//************************************ALERTA DE LOGIN*********************************************//
function MyExcelLoginAlert(){

	$("#login_users_botton").click(function () {
	
	var user = $("#user_nick").attr('value')
	
	var pass = $("#user_pass").attr('value')
	
	 $.ajax({
	
     				url : "/4DACTION/WEB_Excel_User_Connect/="+user +"*/="+ pass+"*/",
	  
      				type : 'POST',
	  
	  				dataType: 'html',
					
					cache: false,
	  
      				success : function(html) {
      											 $("#alert").html(html)
 												 if(enter == true){
 												 $("#help2").dialog('close');
												 $("#help2").dialog('destroy');
 												 }
 												 else{
 												  $("#alert").dialog({	
	   												title: 'Alert',
	   												resizable: false,
	   												modal: true,
	   												position: [ModCell.offset().left,ModCell.offset().top],
	   												buttons: {
	   												
	   												"ok": function() { 
	 												$(this).dialog( "close" );
	  												$(this).dialog( "destroy" );
	  												$(this).html( "" );}//end OK

	   													}//end BOTTON
		   
 												 	});//END DIALOG
 												 
      										 	}//end else	
      										 	
      										 	
      										 	
      										 	
      										 	
      										 }//END SUCCESS
	  
     		 }); // END AJAX  
	  
	})//fin click

}//END MyExcelLoginAlert()
//************************************************************************************************//

//************************LOGIN CUANDO SE PASA EL TIME OUT****************************************//
function MyExcelLogin(){

	 $.ajax({
	
     				url : "/4DACTION/Web_Excel_Authentication/="+sessvars.User.name+"*/",
	  
      				type : 'GET',
	  
	  				dataType: 'html',
					
					cache: false,
	               
	               success : function(html) {
 												if(html.indexOf('Enter') == -1){
 												 $("#help2").html(html)
 												 CheckCookiesLogin();
 												 sessvars.User.name = ""
 												 $("#help2").dialog({	
	   												title: 'Login',
	   												resizable: false,
	   												modal: true ,
	   												position: [ModCell.offset().left,ModCell.offset().top],
	   												close: function() { 
	   												ModCell.attr('value',ModValue)},
	   												
 												 	});//END DIALOG
 												 	
 												 login();
 												 
      										 	}//END IF
      										 	
      										 }//END SUCCESS
      										 
     		 }); // END AJAX  

}//END MyExcelLogin()
//************************************************************************************************//

//************************************BUSCA LOS COOKIES*******************************************//
function CheckCookiesLogin(){

	$("#user_nick").attr('value', $.cookie("user"));
	
	if( $.cookie("check") == "checked"){
	
	$("#user_pass").attr('value', $.cookie("pass"));
	
	$("#check2").attr('checked',"checked");
	
	}//END IF
	
}//END CheckCookiesLogin()
//************************************************************************************************//

//***************************TRAE EL LOGO DE LA EMPRES********************************************//
function Logo(){

 $.ajax({
	
     				url : "/4DACTION/Web_Excel_LogoEmpresa",
	  
      				type : 'GET',
	  
	  				dataType: 'html',
					
					cache: false,
	  
      				success : function(html) {
      											 $("#LogoEmpresa").html(html)
 								}
	  
     		 }); // END AJAX  


}//END LOGO()
//************************************************************************************************//

//**************************************MOUSE ENTER***********************************************//
function MouseEnter(obj){

$(obj).addClass('my-ui-state-hover');

}//END MouseEnter(obj)
//************************************************************************************************//

//*************************************MOUSE LEAVE************************************************//
function MouseLeave(obj){

 if(SelectAllRow == true){ //SI ESTA SELECCIONADA TODO UNA FILA DEL LA TABLA PRINCIPAL
 
  CurrentRow.find('input').each(function(){$(this).removeClass('my-ui-state-hover');});	
  
 }else{
 
 $(obj).removeClass('my-ui-state-hover');
 
 }//END IF

}//END MouseLeave(obj)
//************************************************************************************************//

//********************************RETORNA LA PRIMERA CLASS DEL OBJETO ****************************//
function getClass(Obj){
	
	var ss = Obj.attr('class');
    var result = ss.split(" ");
	
	return result[0];
	
	}
//************************************************************************************************//

//******************GUARDA EL NOMBRE DE LA CELDA ACTUAL*******************************************//
function SelectCellTablaHouse() {
	$("tr.selec").find("Input").focus(function(){
				CurrentCell=$(this);
				CurrentRow = $(this).parent().parent();
				});
}//END SelectCellTablaHouse()
//************************************************************************************************//

//*********************EVENTO DE CLICK PARA HELPS*************************************************//
function SelectRowSub(){

var bSelect=false

 $("tr.SelecSub").mouseenter(function(event){
    
    $(this).find('input').each(function(){
    if(bSelect==false){
    MouseEnter(this);}
    
    })
    
 }); //FIN LIVE

 
 $("tr.SelecSub").mouseleave(function(event){
 
 	$(this).find('input').each(function(){
 	 if(bSelect==false){
    MouseLeave(this);}
    })
 	
 }) //FIN LIVE
  
	
$("tr.SelecSub").toggle(
	 
	 function(){  //Click sobre Fila 
	 
	 if(bSelect==false){
	 bSelect=true;	 

	 $(this).find('input').each(function(){
	 
	 $(this).removeClass('ui-state-active'); 
	 
	 ;})
	 
	 $(this).find('input').each(function(){
	 
	 $(this).addClass('ui-state-active'); 
	 
	 })
	
	 ID= $(this).find("td").find("input.ID").val();
	 Nombre = $(this).find("td").find("input.Nombre").val();
	 Extra = $(this).find("td").find("input.extra").val();
	 
	 }//FIN IF
	 },
	 
	 function(){  //CLICK SOBRE LA MISMA FILA
	 
	 AuxID = $(this).find("td").find("input.ID").val();
	 
	  if((bSelect==true) && (ID == AuxID)) {
	 bSelect=false;
	 
	 $(this).find('input').each(function(){
	
	 $(this).removeClass('ui-state-active');
	 
	 });
	 
	 ID= null;
	 Nombre = null;}//FIN IF
	 Extra = null;
	 });
		
	}//END SelectRowSub()
//************************************************************************************************//
	
//************************************FOCUS DATES*************************************************//	
function focusDate(obj){

 if($(obj).attr('readonly')!='readonly'){
 
 var DateOrginal=$(obj).attr('value')
   
 $(obj).datepicker({ 
 dateFormat: 'dd/mm/yy',
 onSelect: function(){
			isSelec = true;
			var name = CurrentCell.attr("name");
	     	name = name + 'mod';
	     	CurrentCell.attr("name", name);
			},
  onClose: function() {
   			
   			if (($(obj).hasClass('ETA_POL')) && ($(obj).attr('value')!='00/00/0000') && ($(obj).attr('value')!=DateOrginal)) {
   			var currentTime = new Date();
  			var hours = currentTime.getHours();
 		    var minutes = currentTime.getMinutes();
            time =  hours+":"+minutes+":00" ;

			var currentTime = new Date();
			var month = currentTime.getMonth() + 1;
			var day = currentTime.getDate();
			var year = currentTime.getFullYear();
			date = day + "/" + month + "/" + year;

   			var mod_date_atr = CurrentCell.parent().find(".date_atr");
   			var mod_time_atr = CurrentCell.parent().find(".time_atr");
   			mod_time_atr.attr('value',time);
   			
   			var name = mod_time_atr.attr("name");
	
			name = name + 'mod';
	
			mod_time_atr.attr("name", name);
	
   			mod_date_atr.attr('value',date);
   			
   			var name = mod_date_atr.attr("name");
	
			name = name + 'mod';
	
			mod_date_atr.attr("name", name);
   			
   			$(obj).addClass('redFont');
   			} //FIN DEL IF
   			
   			$("#save").removeClass('ui-state-default');
   			$("#save").addClass('greenBorder');
    
    		$("#cancel").removeClass('ui-state-default');
    		$("#cancel").addClass('redBorder');
    
    		$("#saved").attr("value",'false');
	
  			} //FIN DEL onClose
 });
 
 }

}//END FOCUSDATE
//************************************************************************************************//

//****************************FOCUS HOUR**********************************************************//
function focusHour(obj) {

if($(obj).attr('readonly')!='readonly'){
	
	$(obj).timepicker({
		showPeriodLabels: false,
		onClose: function(){
			if(isSelec == true){
			CurrentCell.parent().next('td').children('input').focus();}
			isSelec = false;
			},
		onSelect: function(){
			isSelec = true;
			var name = CurrentCell.attr("name");
	     	name = name + 'mod'
	     	CurrentCell.attr("name", name);
			}
	});
	
	 $(obj).change(function(){
		var str = $(this).val()
		if(str.length==5)
		$(this).attr("value", $(this).val() + ":00");});
		
	}

}//END focusHour(obj)
//************************************************************************************************//

//********************************************MOD**************************************************//
function Mod(id, nombre){
	
	if(nombre==""){
	nombre=id
	}
	ModCell.attr("value", nombre);
	ModCell_ID.attr("value", id);
	
	var name = ModCell_ID.attr("name");
	
	name = name + 'mod'
	
	ModCell_ID.attr("name", name);

}//END Mod(id, nombre)
//************************************************************************************************//

//*******************************************MOD2*************************************************//	
function Mod2(id, nombre, StrExtra){ 
	
	if(nombre==""){
	nombre=id
	}
	ModCell.attr("value", nombre);
	ModCell_ID.attr("value", id);
	ModCell_Extra.attr("value", StrExtra)
	
	var name = ModCell_ID.attr("name");
	
	name = name + 'mod'
	
	ModCell_ID.attr("name", name);

}//END Mod2(id, nombre, StrExtra)
//************************************************************************************************//

//************************FUNCION QUE LLAMA A LOS METODOS DE 4D***********************************//
//******************************CREA LAS TABLAS DE AYUDA******************************************//
function CreateSubTable(Str,funcion,param){
	
	var StrF= null;
	
	switch (funcion){
		case 'ant':
		funcion='/=ant*';
		break;
		case 'sig':
		funcion='/=sig*';
		break;
		case 'ini':
		funcion='/=ini*';
		break;
		default:
		StrF=Str + funcion;
		}
	
		 $.ajax({
	
     				url : Str +'/='+ sessvars.User.name +'*'+ funcion +'/='+ Query +'*/' + param ,
	  
      				type : 'GET',
	  
	  				dataType: 'html',
					
					cache: false,
					
					beforeSend: function(){
											//$("#help").html("<img src='img/EsperaG.gif'> ");
   					 },
	  
      				success : function(html) {
         				 						$("#help").html(html);
												
												if(open_dialog==true){
													$("#help").dialog( "open" );
												
														$( "#ante_sub" ).button({
														text: false,
														icons: {
														primary: "ui-icon-seek-prev"
														}
														}).click(function(){
														CreateSubTable(Str,'ant',param);
														}); 
	
														$( "#sig_sub" ).button({
														text: false,
														icons: {
														primary: "ui-icon-seek-next"
														}
														}).click(function(){
														CreateSubTable(Str,'sig',param);
														}); 
														
													SelectRowSub();
													$("#salto_sub").change(function(){
													
													CreateSubTable(Str,'/=sal*/='+ $('#salto_sub').attr("value")+'*',param);
													
													});
													}
												
      										 }
      										 
     		 }); // END AJAX
				
	}//END CreateSubTable(Str,funcion,param)
//************************************************************************************************//

//******************************************SAVE SHADOW CONTAINER*********************************//
function saveShadowContainer(Obj){

var row = Obj.parent().parent();

var valor = Obj.attr('value')

var shadow_id = row.find(".id_shadow").attr('value')

$.ajax({
	
     				url : "/4DACTION/Web_Excel_CME_Save_Shadow/="+shadow_id+"*/="+getClass(Obj)+"*/="+valor+"*/",
	  
      				type : 'GET',
	  
	  				dataType: 'html',
					
					cache: false,
					
					success : function(html) {
         				 						
         				 					var c20 = parseInt(CurrentRow.find(".teu20").attr('value'))
         				 					var c40 = parseInt(CurrentRow.find(".feu40").attr('value'))
         				 					
         				 					var x = parseInt(html)
         				 	                switch (x) { //CONTADORES DE TIPO DE CONTENEDOR
         				 	                	case 40:
         				 	                		c40++
         				 	                		c20--
         				 	                	break;
         				 	                	
         				 	                	case 20:
         				 	                		c40--
         				 	                		c20++
         				 	                		break;
         				 	                		
         				 	                	case 201:
         				 	                		c20++
         				 	                		break;
         				 	                		
         				 	                	case 401:
         				 	                		c40++
         				 	                		break;
         				 	                	
         				 	                }	
         				 					
         				 					CurrentRow.find(".teu20").attr('value',c20)
         				 					CurrentRow.find(".feu40").attr('value',c40) 
         				 					
         				 					
      										 }

	  
     		 }); // END AJAX  

}//END saveShadowContainer(Obj)
//************************************************************************************************//

//*********************************CREATE LOS DIALOGOS DE AYUDA***********************************//	
function CreateDilog(Titulo,Str,Ancho,param){ //EL PARAM CONTEMPLA UNA POSIBLE BUSQUEDA PREVIA
	
	var myClose = true	
	SelectAllRow = false	
	
	//PINTURA DE SELECCIONADO
	
	SelectAllRow = true
	MouseLeave(ModCell)
	SelectAllRow = false	
	
	 $("#help").dialog({
	   autoOpen: false,	 
	   width : Ancho,
	   title: Titulo,
	   resizable: false,
	   position: [ModCell.offset().left+100,100],
	   modal: true,
	   close: function() { 
	   if(myClose == true){
	   ModCell.attr('value',ModValue)
	   }},//END CLOSE
	   buttons: {
	   
	   "ok": function() { 
       myClose = false;
       if(Str =='/4DACTION/WEB_Excel_Help_Ports'){
       Mod2(ID,Nombre,Extra);
       } 
	   else{ 
	   Mod(ID,Nombre);
	   }
 
	    switch (Str){
		case '/4DACTION/WEB_Excel_Help_Containers':
		saveShadowContainer(ModCell);
		break;
		case '/4DACTION/Web_Excel_Help_Master_CMI':
		CurrentRow = ModCell.parent().parent();
	    saveInLive(CurrentRow, 'CMI');
		break;
		case '/4DACTION/Web_Excel_Help_Master_CME':
		CurrentRow = ModCell.parent().parent();
	    saveInLive(CurrentRow, 'CME');
		break;
		case '/4DACTION/WEB_Excel_Help_Clients':
		asignarVendedores(ID); 
		break;
		case '/4DACTION/WEB_Excel_Help_ATA':
		asignarAta_Cuit_Reg(ID); 
		break;
		case '/4DACTION/WEB_Excel_Help_OceanLines':
		asignarAta(ID); 
		break;
		}//END SWITCH
		
	 	ModCell.parent().next('td').children('input').focus(); 
	 	$(this).dialog( "close" );
	    $(this).dialog( "destroy" );
        $(this).html( "" );
        
        }//END OK
	  
	   }//END BUTTONS
	   
	   });//END DIALOG
	   
	   if(param!=""){
	   CreateSubTable(Str,'ini',param);
	   }else{
	   CreateSubTable(Str,'ini',"");}
 
	}//END CreateDilog(Titulo,Str,Ancho,param)	
//************************************************************************************************//		

//********AGREGA UN A FILA Y CORRE TODO PARA QUE SIEMPRE SE MUESTREN 17 POR PAGINA****************//		
function addFila(str,fila){

 var cantPag = parseInt($("#cantPag").html())
 
 	$("#save").removeClass('ui-state-default')
    $("#save").addClass('greenBorder')
    
    $("#cancel").removeClass('ui-state-default')
    $("#cancel").addClass('redBorder')
	
	$(fila).replaceWith(str);
   
    TiposDeGuia();
    
   for (i=1;i<=cantPag;i++){
   
   var numPag =  i.toString()
   var Next = i + 1 
   var nextPag = Next.toString()
  
   
   if( $(".page"+numPag ).length == 18 ){
   
    $(".page" + numPag + ":last").attr('class', getClass($(".page"+ numPag +":last")) + ' page'+ nextPag ).hide();
    
    if(parseInt(nextPag) > cantPag){
    
    $("#cantPag").html(nextPag)
    
    }//End if (nextPag > cantPag)
   
   }//END IF
   
   }//END FOR

}//END addFila(str,fila)	
//************************************************************************************************//
	
//*********************ULTRA BUSCADOR EN TODOS LOS CAMPOS DE LA TABLA*****************************//
function Buscador(RowClass,InputClass){
	
	$(InputClass).keyup(function(e){
		
		
		 var mostrar
		
		 var Row = $(RowClass)
		 var strq = $(this).attr('value').toLowerCase()
		 
		 if(strq == ""){
			 Row.hide();
			 var i = 1;
		     var Npage = 1;
		     
			 Row.each(function(){
			  if(i == CantRegXHoja){Npage++; i= 1 ; }	
			  MyRow.attr('class', getClass($(this)) + ' page'+ Npage.toString() );
			  i++;
			 })//END ROW EACH
			 
			 var x = $('#salto').attr('value')
      		 var x2 = parseInt(x)
      		 var str2 = '.page' + x2
      		 $("tr"+ str2).show();
      		 
			 }
		 else{
		
		 var i = 1;
		 var Npage = 1;
		 Row.hide();
	     Row.each(function(){
			 
			 mostrar = false
			 
			 MyRow = $(this)
			 
			 $(this).find('input').each(function(){
				 
				 var str = $(this).attr('value').toLowerCase()
				 
				 if( str.indexOf(strq) != -1){
					 mostrar = true;
					 }
		
				 }); //END EACH INPUT
				 
				 if(mostrar ==true){
					// $(this).show();
					 
					 if(i == CantRegXHoja){
					 Npage++;
					 i= 1 ;
					 }	
					  MyRow.attr('class', getClass($(this)) + ' page'+ Npage.toString() );
					  i++;
					 }
				 else{
					// $(this).hide();
					  MyRow.attr('class', getClass($(this)));
					 }
			
				
			 }); //END EACH ROW
			 
			  $(".page1").show();
 
		 } //END ELSE
		
		});
	}//END 	 Buscador(RowClass,InputClass)
//************************************************************************************************//	

//*************************************BUSCADOR POR CAMPOS INDIVIDUALES***************************//	

function BuscadorIndividual(RowClass , ColumClass , ButtonID){

// RowClass Sobre que filas se realiza la busqueda
// ColumClass sobre que columna se realiza la busqueda
// ButtonID el boton que tiene el evento
    var clicked = true	

    $(ButtonID).live('click',function(event){
    
    if( clicked == true){
    
    var leftP = $(this).offset().left
    
    var topP = $(this).offset().top/2  - 15 
    
    $("#input_buscador_individual").attr('value', '');
    
    //pone visible todas las filas otra ves
  			 var Row = $('.selec');
			 Row.hide();
			 var i = 1;
		     var Npage = 1;
		     
			 Row.each(function(){
			  if(i == CantRegXHoja){Npage++; i= 1 ; }	
			  
			  $(this).attr('class', '' );
			  $(this).addClass('selec');
			  $(this).addClass('selecActual');
			  $(this).addClass('page'+ Npage.toString());
			  
			  i++;
			 })//END ROW EACH
			 
			 var x = $('#salto').attr('value')
      		 var x2 = parseInt(x)
      		 var str2 = '.page' + x2
      		 $("tr"+ str2).show();
    
    $("#input_buscador_individual").css('left', leftP);
    
    $("#input_buscador_individual").css('top', topP);
    
    $("#input_buscador_individual").show();
    
    $("#input_buscador_individual").focus();
    
    clicked = false	
    
    Searched(RowClass , ColumClass);
    
    }else{
    
    $("#input_buscador_individual").hide();
    
    $("#input_buscador_individual").die('keyup');
    
    clicked = true
    
        //pone visible todas las filas otra ves
  			 var Row = $('.selec');
			 Row.hide();
			 var i = 1;
		     var Npage = 1;
		     
			 Row.each(function(){
			  if(i == CantRegXHoja){Npage++; i= 1 ; }	
			  
			  $(this).attr('class', '' );
			  $(this).addClass('selec');
			  $(this).addClass('selecActual');
			  $(this).addClass('page'+ Npage.toString());
			  
			  i++;
			 })//END ROW EACH
			 
			 var x = $('#salto').attr('value')
      		 var x2 = parseInt(x)
      		 var str2 = '.page' + x2
      		 $("tr"+ str2).show();
    
    }
    
    });//END LIVE
    
    }//END BuscadorIndividual


//************************************************************************************************//	

function Searched(RowClass , ColumClass) {
	
	$("#input_buscador_individual").live('keyup',function(event){
		 var mostrar
		
		 var Row = $('.selec');
		 var strq = $(this).attr('value').toLowerCase()
		 
		 if(strq == ""){
			 Row.hide();
			 var i = 1;
		     var Npage = 1;
		     
			 Row.each(function(){
			  if(i == CantRegXHoja){Npage++; i= 1 ; }	
			  
			  $(this).attr('class', '' );
			  $(this).addClass('selec');
			  $(this).addClass('selecActual');
			  $(this).addClass('page'+ Npage.toString());
			  
			  i++;
			 })//END ROW EACH
			 
			 var x = $('#salto').attr('value')
      		 var x2 = parseInt(x)
      		 var str2 = '.page' + x2
      		 $("tr"+ str2).show();
      		 
			 }
		 else{
		
		 var i = 1;
		 var Npage = 1;
		 Row.hide();
		 Row.removeClass('selecActual');
	     Row.each(function(){
			 
			 mostrar = false
			 
			 MyRow = $(this)
			 
			 $(this).find(ColumClass).each(function(){
				 
				 var str = $(this).attr('value').toLowerCase()
				 
				 if( str.indexOf(strq) != -1){
					 mostrar = true;
					 }
		
				 }); //END EACH INPUT
				 
				 if(mostrar ==true){
					// $(this).show();
					 
					 if(i == CantRegXHoja){
					 Npage++;
					 i= 1 ; }	
					 
					 // MyRow.attr('class', getClass($(this)) + ' page'+ Npage.toString() );
					  $(this).attr('class', '' );
			  		  $(this).addClass('selec');
			          $(this).addClass('selecActual');
			          $(this).addClass('page'+ Npage.toString());
					 
					  i++;
					 
					 }
				 else{
					// $(this).hide();
					  MyRow.attr('class', getClass($(this)));
					 }
			
				
			 }); //END EACH ROW
			 
			  $(".page1").show();
 
		 } //END ELSE
		 
		 });//END LIVE
		
	}//END Searched(RowClass,InputClass)


//***************************************METODOS DE LAS AWB Y BLS*********************************//
function GuideClick(Obj) {

  CurrentRow = $(Obj).parent().parent();
 
  var Actual = $(Obj).attr('value')
  
  if(Actual=="Directa"){ //PASA A CONSOLIDADA
  
  $(Obj).attr('value',"Consolidada")
 		CurrentRow.find('.master_id').removeAttr("disabled"); 
  		CurrentRow.find('.house_bl').removeAttr("disabled"); 
  		CurrentRow.find('.direct_bl').attr("disabled", true);
  		CurrentRow.find('.direct_bl').attr("value", "");
  		
  		CurrentValue = CurrentRow.find('.direct_bl').attr("value")
	    CurrentCell = CurrentRow.find('.direct_bl')
  		ModifyCell();
  }
  //ES CONSOLIDADA Y PASA A DIRECTA
  else{
        $(Obj).attr('value',"Directa")
        CurrentRow.find('.master_id').attr("disabled", true); 
        CurrentRow.find('.master_id').attr("value",""); 
        CurrentRow.find('.master_bl').attr("value",""); 
  		CurrentRow.find('.house_bl').attr("disabled", true); 
  		CurrentRow.find('.house_bl').attr("value",""); 
  		CurrentRow.find('.direct_bl').removeAttr("disabled"); 
  		
  		CurrentValue = CurrentRow.find('.direct_bl').attr("value")
	    CurrentCell = CurrentRow.find('.direct_bl')
  		ModifyCell();
  		
  		//SE DEBE QUITAR LOS DISABLED Y LA CLASS blueFont DE LOS CAMPOS NO MODIFICABLE POR ESTAR VINVULADOS A LA MASTER
  		
  		RemoveAttrClass('.vessel');
		RemoveAttrClass('.travelnum1');
		RemoveAttrClass('.flag');
		RemoveAttrClass('.terminal');
		RemoveAttrClass('.date');
		RemoveAttrClass('.hour');
		CurrentRow.find('.port_trans_country_id').removeClass("blueFont");
  		RemoveAttrClass('.port_trans');
  		RemoveAttrClass('.vessels_trans');
  		CurrentRow.find('.origin_country_id').removeClass("blueFont");
  		RemoveAttrClass('.origin');
  		CurrentRow.find('.destination_country_id').removeClass("blueFont");
  		RemoveAttrClass('.destination');
  		RemoveAttrClass('.agent');
  		RemoveAttrClass('.oceanline');
  		
  }

}//END GuideClick(Obj)
//************************************************************************************************//

//************************************QUITA EL ESTADO DE DISABLE**********************************//
function RemoveAttrClass( str ) {
	CurrentRow.find(str).removeAttr("disabled"); 
  	CurrentRow.find(str).removeClass("blueFont");
}
//************************************************************************************************//

//*****************************MUESTRA Y OCULTA EL TIPO DE GUIA QUE CORRESPONDE CUANDO************//
//*****************************SE GENERA LA TABLA O SE AGREGA UNA FILA****************************//
function TiposDeGuia() { // 
	 $(".guide_type").each(function(){
		CurrentRow = $(this).parent().parent();
	    var Actual = $(this).attr('value')
  		if(Actual=="Directa"){ 
  		CurrentRow.find('.master_id').attr("readonly", true); 
  		CurrentRow.find('.house_bl').attr("readonly", true); 
  		CurrentRow.find('.direct_bl').removeAttr("readonly"); 
		}
 		else{
 		CurrentRow.find('.master_id').removeAttr("readonly"); 
  		CurrentRow.find('.house_bl').removeAttr("readonly"); 
  		CurrentRow.find('.direct_bl').attr("readonly", true);
  		}
	 })
	 
}//END TiposDeGuia()
//************************************************************************************************//

//**********************************CAMBIO DE TAMANIO PARA LAS COLUMNA****************************//
function ResizableTDS(head_id,input_class, min_ancho) { //SE PASA LA ID DE LA CABEZERA , LA CLASE DEL INPUT DE ABAJO y EL ANCHO MINIMO

	$(head_id).resizable({ 
	minWidth: min_ancho,
	maxHeight: 14,
	minHeight: 14,
	alsoResize: input_class ,
	resize: function() { 
	$(input_class).each(function(){$(this).css('height',14)})
	
	}//fin resize
	
	}); //END resizable

}//END ResizableTDS(head_id,input_class, min_ancho)
//************************************************************************************************//

/**************************************************************************************************************************************************/	
/*Los buques tiene otro tipo de ayuda entonces me vi obligado a crear funciones mas o menos parececidas pero mas especificas*/	
//ESTO SE PODRIA CAMBIAR POR LA TECNICA UTILIZADA EN CLIENTES PARA ATRAER VENDEDORES
/**************************************************************************************************************************************************/	
function SelectRowSubVessels(){

 	var bSelect=false

 	$("tr.SelecSub").mouseenter(function(event){
    
    $(this).find('input').each(function(){
    if(bSelect==false){
    MouseEnter(this);}
    
    })
    
 	}); //FIN LIVE

 
 	$("tr.SelecSub").mouseleave(function(event){
 
 	$(this).find('input').each(function(){
 	 if(bSelect==false){
    MouseLeave(this);}
    })
 	
 	}) //FIN LIVE
  
	
	 $("tr.SelecSub").toggle(
	 function(){  //Click sobre Fila 
	 
	  if(bSelect==false){
	 bSelect=true;	 

	 $(this).find('input').each(function(){
	 
	 $(this).attr('class', getClass($(this)))
	 
	 ;})
	 
	 $(this).find('input').each(function(){
	 
	 $(this).attr('class', getClass($(this)) + ' ui-state-active'); 
	 
	 })
	 
	 ID= $(this).find("td").find("input.id").val();
	 Nombre = $(this).find("td").find("input.nombre").val();
	 
	 ID_c= $(this).find("td").find("input.id_c").val();
	 Nombre_c = $(this).find("td").find("input.nombre_c").val();
	 
	 ID_o= $(this).find("td").find("input.id_o").val();
	 Nombre_o = $(this).find("td").find("input.nombre_o").val();
	 
	 ID_t= $(this).find("td").find("input.id_t").val();
	 Nombre_t = $(this).find("td").find("input.nombre_t").val();
	 }//fin if
	 
	 },
	 
	 function(){  //CLICK SOBRE LA MISMA FILA
	  AuxID = $(this).find("td").find("input.ID").val();
	 
	  if((bSelect==true) && (ID == AuxID)) {
	  
	 bSelect=false;
	 
	 $(this).find('input').each(function(){
	
	 $(this).attr('class', getClass($(this)));
	 
	 });
	 
	 ID= null;
	 Nombre = null;
	 ID_c= null;
	 Nombre_c = null;
	 ID_o= null;
	 Nombre_o = null;
	 ID_t= null;
	 Nombre_t = null;}//fin if
	 
	 
	 });
	
	
	}//END SelectRowSubVessels()
//************************************************************************************************//

//************************************************************************************************//	
function CreateDilogVessels(Titulo,Str,Ancho){
	
	SelectAllRow = false	
	
	 $("#help").dialog({
	   autoOpen: false,	 
	   width: Ancho, 
	   title: Titulo,
	   resizable: false,
	   position: [ModCell.offset().left+100,100],
	   modal: true,
	   buttons: {
	  
      "ok": function() { 
	  ModVessel(ID,Nombre,ID_c,Nombre_c,ID_o,Nombre_o,ID_t,Nombre_t);
	  $(this).dialog( "close" );
	  $(this).dialog( "destroy" );
	  $(this).html( "" );
	  ModCell.parent().next('td').children('input').focus();
	  },
	  
	   },
	   
	   });
	   
	   CreateSubTableVessels(Str,'ini');

	}//END CreateDilogVessels(Titulo,Str,Ancho)
//************************************************************************************************//
	
//************************************************************************************************//
function ModVessel(id,nombre,id_c,nombre_c,id_o,nombre_o,id_t,nombre_t){
	
	CurrentRow.find('.vessel').attr("value", nombre);
	CurrentRow.find('.vessel_id').attr("value", id);
	
	name = CurrentRow.find('.vessel_id').attr("name");
	
	name = name + 'mod'
	
	CurrentRow.find('.vessel_id').attr("name", name);
	
	
	CurrentRow.find('.flag').attr("value", nombre_c);
	CurrentRow.find('.flag_id').attr("value", id_c);
	
	name = CurrentRow.find('.flag_id').attr("name");
	
	name = name + 'mod'
	
	CurrentRow.find('.flag_id').attr("name", name);
	
	CurrentRow.find('.owner').attr("value", nombre_o);
	CurrentRow.find('.owner_id').attr("value", id_o);
	
	name = CurrentRow.find('.owner_id').attr("name");
	
	name = name + 'mod'
	
	CurrentRow.find('.owner_id').attr("name", name);
	
	CurrentRow.find('.terminal').attr("value", nombre_t);
	CurrentRow.find('.terminal_id').attr("value", id_t);
	
	name = CurrentRow.find('.terminal_id').attr("name");
	
	name = name + 'mod'
	
	CurrentRow.find('.terminal_id').attr("name", name);
	
	}//END ModVessel(id,nombre,id_c,nombre_c,id_o,nombre_o,id_t,nombre_t)
//************************************************************************************************//

//************************************************************************************************//
function CreateSubTableVessels(Str,funcion){
	
	var StrF= null
	
	
	switch (funcion){
		case 'ant':
		funcion='/=ant*'
		break;
		case 'sig':
		funcion='/=sig*'
		break;
		case 'ini':
		funcion='/=ini*'
		break;
		default:
		StrF=Str + funcion
		
		}
		
		 $.ajax({
	
     				url : Str +'/='+ sessvars.User.name +'*'+ funcion +'/='+ Query +'*/',
	  
      				type : 'GET',
	  
	  				dataType: 'html',
					
					cache: false,
					
					beforeSend: function(){
											//$("#help").html("<img src='img/EsperaG.gif'> ");
   					 },
	  
      				success : function(html) {
         				 						$("#help").html(html);
												
												if(open_dialog==true){
													$("#help").dialog( "open" );
													SelectRowSubVessels();
													
														$( "#ante_sub" ).button({
														text: false,
														icons: {
														primary: "ui-icon-seek-prev"
														}
														}).click(function(){
														CreateSubTableVessels(Str,'ant')
														}); 
	
														$( "#sig_sub" ).button({
														text: false,
														icons: {
														primary: "ui-icon-seek-next"
														}
														}).click(function(){
														CreateSubTableVessels(Str,'sig')
														}); 
														
													$("#salto_sub").change(function(){
													
													CreateSubTableVessels(Str,'/=sal*/='+ $('#salto_sub').attr("value")+"*");
													
													});
													}
												
      										 },
	  
      				error : function(xhr, status) {
          				alert('Disculpe, existió un problema' + xhr + status) ;
	  											  },
     		 }); // END AJAX
					
	
	}//END CreateSubTableVessels(Str,funcion)
//************************************************************************************************//