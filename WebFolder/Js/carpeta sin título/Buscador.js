function Buscador(RowClass,InputClass){
	
	$(InputClass).keyup(function(e){
		
		
		 var mostrar;
		
		 var Row = $(RowClass);
		 var strq = $(this).attr('value').toLowerCase();
		 
		 if(strq == ""){
		 
			 Row.hide();
			 var i = 1;
		     var Npage = 1;
		     
			 Row.each(function(){
			  if(i == 18){Npage++; i= 1 ; }	
			  MyRow.attr('class', getClass($(this)) + ' page'+ Npage.toString() );
			  i++;
			 })//END ROW EACH
			 
			 var x = $('#salto').attr('value');
      		 var x2 = parseInt(x);
      		 var str2 = '.page' + x2;
      		 $("tr"+ str2).show();
      		 
      		 }
			 
		 else{
		
		 var i = 1;
		 var Npage = 1;
		 Row.hide();
	     Row.each(function(){
			 
			 mostrar = false;
			 
			 MyRow = $(this);
			 
			 $(this).find('input').each(function(){
				 
				 var str = $(this).attr('value').toLowerCase();
				 
				 if( str.indexOf(strq) != -1){
					 mostrar = true;
					 }
		
				 }); //END EACH INPUT
				 
				 if(mostrar ==true){
					// $(this).show();
					 
					 if(i == 18){
					 Npage++;
					 i= 1 ; }	
					 
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
		
		}); //END Row.each(function()
		
}// END Buscador 	
	