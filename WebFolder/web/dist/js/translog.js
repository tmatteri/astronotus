

Validar_Token();


Numtab =0;

var $Tc=$('#0019')

$Tc.bind('click',AgregarTabOut);
$('#LogOut').bind('click',FLog_Out);
$('#GeneralNavTabs').hide();




	function AgregarTabOut(){
			Validar_Token();
		$('#GeneralNavTabs').show();
		$('#welcomePanel').hide();
		if($('#dataTables-Exchange').length==0){


			Numtab+=1;
			$('li').removeClass('active');
			$('.tab-pane').removeClass('in');
			$('.tab-pane').removeClass('active');
			$('#GeneralNavTabs').append('<li class="active"><a href="#tabN'+Numtab+'" data-toggle="tab">'+TGeneral(this.id)+'<i id="btnX'+Numtab+'"class="fa fa-times fa-fw"></i></a></li>');
			$('.tab-content').append('<div tabset class="tab-pane fade in active" id="tabN'+Numtab+'"></div>');
			FGeneral(this.id);
			$('#btnX'+Numtab).bind('click',CerrarTab);

	   		}
		
	}

	function CerrarTab(argument) {
			Validar_Token();
			var id=this.id.replace("btnX", "");
			$('#tabN'+id).remove();
			$('#'+this.id).parent().parent().remove();

			if($('.tab-pane').length==0){

				$('#GeneralNavTabs').hide();
				$('#welcomePanel').show();
			}




	}

	

   


	







