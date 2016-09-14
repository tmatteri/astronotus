/**************************************************************************************************************************************************/	
/*Los buques tiene otro tipo de ayuda entonces me vi obligado a crear funciones mas o menos parececidas pero mas especificas*/	
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
  
	
	 $("tr.SelecSub").toggle(function(){  //Click sobre Fila 
	 
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
	
	
} // END SelectRowSubVessels()
	
function CreateDilogVessels(Titulo,Str,Ancho){
	
	SelectAllRow = false	
	
	 $("#help").dialog({
	   autoOpen: false,	 
	   width: Ancho, 
	   title: Titulo,
	   resizable: false,
	   position: [ModCell.offset().left,1],
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
	   
	   CreateSubTableVessels(Str,'ini')
	
}//END CreateDilogVessels(Titulo,Str,Ancho)		
	
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
	
	CurrentRow.find('.depot').attr("value", nombre_t);
	CurrentRow.find('.depot_id').attr("value", id_t);
	
	name = CurrentRow.find('.depot_id').attr("name");
	
	name = name + 'mod'
	
	CurrentRow.find('.depot_id').attr("name", name);
	
}//END  ModVessel(id,nombre,id_c,nombre_c,id_o,nombre_o,id_t,nombre_t)
	
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