


var $4D = (function(){
			
			function _query(table, stament, paginator) { //Tiene por prototipo a/hereda de : Object
				self = this

				this.Table = table;
				this.Stament = stament;
				this.Paginator = new _paginator(0,0,paginator);
				this.Execute = function(run){

					//ACA VA LA LLAMADA AJAX AL SERVIDOR
					$.ajax({
               			 url : "/4DACTION/JSON_QUERY",
                		 type : "GET",
               			 data : JSON.stringify(self),
                		 success : function(response){
                		 	run(JSON.parse(response));
                		 	p = JSON.parse(response).Paginator;
                		 	self.Paginator = new _paginator(p.currentPage,p.totalPage,p.regPerPage);
                		 }
            		});					

				}//END Execute
			}//END FUNCTION

			function _stament(field, param , condition){

				this.Field = field;
				this.Param = param;
				this.Condition= condition;

			}

			function _paginator(currentPage,totalPage,regPerPage){

				this.currentPage = currentPage;
				this.totalPage = totalPage;
				this.regPerPage = regPerPage;

			}

			function _table(data){


					var table = "<TABLE>"

					data.forEach(function(row){

						table = table + "<TR>"
						for (propiedad in row){
							//código a repetir por el bucle.
							//dentro de este código la variable "propiedad" contiene la propiedad actual
							//actual en cada uno de los pasos de la iteración.
							table = table + "<TD>" + row[propiedad] + "</TD>"
							
						}
						table = table + "</TR>"

					});

					table = table + "</TABLE>"

					return tabla;

			}

			return { Query : _query, Stament : _stament, Paginator : _paginator,Table : _table }
})();