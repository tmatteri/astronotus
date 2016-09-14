

Numtab =0;

var $Tc=$('#0019')
console.log($Tc);
$Tc.bind('click',AgregarTabOut);





	function AgregarTabOut(){
	Numtab+=1;

		

			$('li').removeClass('active');
			$('.tab-pane').removeClass('in');
			$('.tab-pane').removeClass('active');
			$('#GeneralNavTabs').append('<li class="active"><a href="#tabN'+Numtab+'" data-toggle="tab">'+TGeneral(this.id)+'<i id="btnX'+Numtab+'"class="fa fa-times fa-fw"></i></a></li>');
			$('.tab-content').append('<div class="tab-pane fade in active" id="tabN'+Numtab+'" ng-app="myApp'+Numtab+'" ng-controller="myCtrl'+Numtab+'"></div>');

			FGeneral(this.id);
			



			$('#btnX'+Numtab).bind('click',CerrarTab);

		   		
		
	}

	function CerrarTab(argument) {
			console.log(this.id);
			var id=this.id.replace("btnX", "");
			$('#tabN'+id).remove();
			$('#'+this.id).parent().parent().remove();

	}

	
    
   


	







