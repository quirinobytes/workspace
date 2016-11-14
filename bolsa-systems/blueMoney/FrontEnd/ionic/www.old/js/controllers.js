angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('LoginCtrl', function($scope,$state) {
  $scope.doLogin=function(){
      $state.go('app.advisor');
  };
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})


.controller('ConfiguracaoCtrl', function($scope) {
//    console.log("hii");
})

.controller('AdvisorCtrl', function($scope,$state, $http, WatsonService) {
    
    $scope.news1={};
    $scope.news2={};
    $scope.news3={};
    $scope.news4={};
          
          
          WatsonService.analise('http://www.telegraph.co.uk/business/2016/08/29/bhp-billiton-report-blames-construction-flaws-on-samarco-disaste/').then(function successCallback(response) {
	
	
        $scope.news1=response.data;
        console.log($scope.news1);
    
  }, function errorCallback(response) {
    console.log(response);
  });
  
   WatsonService.analise('http://www.digitaltrends.com/mobile/samsung-halts-galaxy-note-7-shipments-phones-catching-fire/').then(function successCallback(response) {
	
	
        $scope.news2=response.data;
        console.log($scope.news2);
    
  }, function errorCallback(response) {
    console.log(response);
  });
  
  WatsonService.analise('http://www.epmag.com/petrobras-new-libra-well-confirms-extension-oil-discovery-906716').then(function successCallback(response) {
	
	
        $scope.news3=response.data;
        console.log($scope.news3);
    
  }, function errorCallback(response) {
    console.log(response);
  });
  
  WatsonService.analise('http://www.wsj.com/articles/brazil-education-firms-kroton-estacio-agree-to-merge-1468234775').then(function successCallback(response) {
	
	
        $scope.news4=response.data;
        console.log($scope.news4);
    
  }, function errorCallback(response) {
    console.log(response);
  });
          /*
     $http({
  method: 'GET',
  url: 'https://alchemylanguage-nodejs-patyalves-2017.mybluemix.net/api/entities',
  params: {  'url': 'http://money.cnn.com/2016/07/25/investing/nintendo-shares-pokemon-go/',
      model: 'ac',
      sentiment: 1
      }
}).then(function successCallback(response) {
	
	console.log(response);
    // this callback will be called asynchronously
    // when the response is available
  }, function errorCallback(response) {
    console.log(response);
  });
  */
     
})

        .factory('WatsonService', function($http){
            
            var WatsonService  = {};
    
            WatsonService.analise = function (link) {
        return  $http({
  method: 'GET',
  url: 'https://alchemylanguage-nodejs-patyalves-2017.mybluemix.net/api/entities',
  params: {  'url': link,
      model: 'ac',
      sentiment: 1
      }
});
    };
    
    return WatsonService;
    
        })










.controller('exibir-cotacoes', function($scope, $http, $interval) {
	 load_cotacoes();
		$interval(function(){
			load_cotacoes();
		},100);
		
			function load_cotacoes(){
				$http.get('http://189.55.194.115:3000/listar').then(function(response){
					$scope.cotacoes_array = response.data;
			});
	   };
   })
   
   .controller('exibir-total', function($scope, $http,$interval) {
	    load_total();
		$interval(function(){
			load_total();
		},1000);
		
			function load_total(){
				$http.get('http://189.55.194.115:3000/total').then(function(response){
					$scope.total = response.data;
			});
	   };
   })
   
   .controller("exibir-titulo",function($scope,$http){
//		angular.module("ibSYM").run(function(editableOptions) {
//  editableOptions.theme = 'bs3';
//});	
			// TITULO E VERSAO DO PROGRAMA #############
			$scope.titulo = "ibSYM Cognitive Stock API ® v.1.3"
			$scope.saldo=10000;
			$scope.cotacoes_array = [];
	
			$scope.eEditable = -1;	


			$scope.carteira_array = [
					{nome: "VALE5", quantidade: "500", total: "10300", valor:"20.60", "montadora":{"nome":"VALE5","valor":"8.10"}},
					{nome: "PETR4", quantidade: "900", total: "15570", valor:"17.30", "montadora":{"nome":"PETR4","valor":"8.10"}},
					{nome: "CSNA3", quantidade: "3200", total: "32320", valor:"10.10", "montadora":{"nome":"CSNA3","valor":"8.10"}},
					{nome: "GOLL4", quantidade: "3400", total: "1530", valor:"8.00", "montadora":{"nome":"GOLL4","valor":"8.00"}},
			];

			$scope.montadoras= [
					{nome:"VALE5", pais: "ACOES", categoria:"investimentos", valor: "22.30" },
					{nome:"PETR4", pais: "ACOES", categoria:"investimentos"},
					{nome:"CSNA3", pais: "ACOES", categoria:"investimentos"},
					{nome:"GOAU4", pais: "ACOES", categoria:"investimentos"},
					{nome:"GGBR4", pais: "ACOES", categoria:"investimentos"},
					{nome:"GOLL4", pais: "ACOES", categoria:"investimentos"},
					{nome:"USIM5", pais: "ACOES", categoria:"investimentos"},
					{nome:"VALEW46", pais: "OPCOES", categoria:"investimentos"},
					{nome:"VALEW22", pais: "OPCOES", categoria:"investimentos"},
					{nome:"Tesouro Direto", pais: "DERIVATIVOS", categoria:"investimentos"},
					{nome:"Renda Fixa", pais: "DERIVATIVOS", categoria:"investimentos"},
					{nome:"", pais: "DERIVATIVOS", categoria:"investimentos"},
			];

			// ##### FUNCAO ORDEM DE COMPRA     (Chamada de dentro do ng-click do button CADASTRAR)
			$scope.ordemCompra = function(papel){
				//console.log($scope.quantidade+$scope.vencimento+$scope.valor);
				//fazendo a soma do total na chegada dos dados da view.
				papel.total = parseFloat(papel.valor) * parseInt(papel.quantidade);
			 	console.log("total="+ papel.total + " saldo="+$scope.saldo); 
				if (papel.total > $scope.saldo ) { 
					$scope.retornoOrdens = "Não executado: sem saldo!"
//					alert("Sem saldo"); 
					return ;
				}
				//papel.nome=papel.montadora.nome;				

				$http({
					    method: 'POST',
					    url: 'http://189.55.194.115:3000/comprar',
					    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
					    data: 'id_corretora=13&id_cliente=27&ativo=' + papel.montadora.nome + '&quantidade=' + papel.quantidade + '&valor=' + papel.valor + '&token=1234abcd'
				}).success(function (response) { 
						if (response.Compra){
							//aqui ja testou o retorno da ordem e deu susceso, reponse.Compra = true.
							//faz o push do papel no array da carteira.
							$scope.carteira_array.push(angular.copy(papel));
							//faz a magica de apagar os input box, pois mata o $scope.veiculo do object model que ta amarrado aos input box.
							delete $scope.papel;
							$scope.saldo = parseFloat($scope.saldo) - parseFloat(papel.valor)*parseInt(papel.quantidade) ;
							$scope.retornoOrdens ="Compra executada!"
						}
						else { 
							//Se o retorno da ordem for false, exiba a mensagem.
							$scope.retornoOrdens ="Compra não executada!"
						}
						console.log('POST Compra ...enviado');
						});
	
				};

			//  ################ ORDEM VENDER   ###################
			//funcao chamada dentro do ng-click do button 
			$scope.ordemVenda = function(veiculos){
				//console.log(veiculos);
				copia_array = $scope.carteira_array;
				$scope.carteira_array = veiculos.filter(function(papel){
					if (!papel.selecionado) return papel;
						//aqui foi realizada a venda.
						console.log(papel);
						 //
						 // aqui foi realizada a venda.
						 // FAZENDO O POST NO SERVIDOR ibSYM - ENVIANDO ORDEM DE VENDA
						 //
						 $http({
								 method: 'POST',
								 url: 'http://189.55.194.115:3000/vender',
								 headers: {'Content-Type': 'application/x-www-form-urlencoded'},
								 data: 'id_corretora=13&id_cliente=27&ativo=' + papel.montadora.nome + '&quantidade=' + papel.quantidade + '&valor=' + papel.valor + '&token=1234abcd'
						 }).success(function (response) { 
									console.log('POST venda ... enviado => ' + 'id_corretora=13&id_cliente=27&ativo=' + papel.montadora.nome + '&quantidade=' + papel.quantidade + '&valor=' + papel.valor + '&token=1234abcd'
);
						 		//	console.log(response);
									if (!response.Venda) {
										//aqui, caso o retorno do response seja Venda:false, é pq deu ruim, e volta a copia do array q foi apagado acima.
										$scope.carteira_array = copia_array;
										console.log('venda NAO executada!');
										$scope.retornoOrdens = 'Venda não executada: valor muito alto!';
									}
									else{
										console.log('venda executada!');
										$scope.retornoOrdens = 'Venda executada!' ;
										$scope.saldo = parseFloat($scope.saldo) + parseFloat(papel.valor)*parseInt(papel.quantidade) ;
									} 
							});
				});

			};
			$scope.classe = 'selecionado';
		})


;
