

function FLog_In_Click(){

        //aca va a ir la verificacion de si esta logeado o no  
        var name =  $('[name="User"]').val();
         var pass =  $('[name="password"]').val();
         var text = '{"NickWeb":"'+name+'","Pass":"'+pass+'"}';
         
  
        var json =$.getJSON("/4DACTION/LOG_IN_WEB",text,function(){return;});

        json.done(function(){
        	
        	var vjson = JSON.parse(json.responseText);
        	//console.log(vjson.data);
        	//aca recibimos el json ok
				    	
	         if (vjson.data=='noresponse'){

	         	console.log('datos invalidos');
	         }else{
	         	if(vjson.data.Token!=''){
	         		localStorage.setItem('UserID',vjson.data.ID);
	         		localStorage.setItem('Token',vjson.data.Token);
	        	 window.location.href = 'principal.html';   
			        } else{

			       		console.log('datos invalidos'); 
			        }
 


	         }
	                });
       

}
function FLog_Out(){
	var UserID = localStorage.getItem('UserID');
	var Token = localStorage.getItem('Token');		
	var text = '{"UserID":"'+UserID+'"}';
	if(Token==null){
		
		window.location.href = 'index.html';
					}else{
							//valido el token y 
							 var json =$.getJSON("/4DACTION/LOG_OUT",text,function(){return;});

					        json.done(function(){
					        								
					        									console.log(json);						        	
										        		localStorage.removeItem('UserID');
										        		localStorage.removeItem('Token');
										        		window.location.href = 'index.html';

										        				        

					      						  });


							}


}

$('#LogInBtn').bind('click',FLog_In_Click);


function Validar_Token(){
	var UserID = localStorage.getItem('UserID');
	var Token = localStorage.getItem('Token');
		var text = '{"UserID":"'+UserID+'"}';
	if(Token==null){
		
		window.location.href = 'index.html';
					}else{
							//valido el token y 
							 var json =$.getJSON("/4DACTION/LOG_IN_TOKEN",text,function(){return;});

					        json.done(function(){
					        					var vjson = JSON.parse(json.responseText);
										        	if(vjson.TOKEN!=Token){
										        		localStorage.removeItem('UserID');
										        		localStorage.removeItem('Token');
										        		window.location.href = 'index.html';

										        	}					        

					      						  });


							}
}
function Validar_Token_LogIn(){
	var UserID = localStorage.getItem('UserID');
	var Token = localStorage.getItem('Token');
		var text = '{"UserID":"'+UserID+'"}';
	if(Token!=null){
							//valido el token y 
							 var json =$.getJSON("/4DACTION/LOG_IN_TOKEN",text,function(){return;});

					        json.done(function(){
					        					var vjson = JSON.parse(json.responseText);
										        	if(vjson.TOKEN!=Token){
										        		localStorage.removeItem('UserID');
										        		localStorage.removeItem('Token');
										        		

										        	}else
										        	{
										        		window.location.href = 'principal.html';

										        	}					        

					      						  });


							}
}



