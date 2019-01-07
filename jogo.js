var rodada = 1;
var matriz_jogo = Array(3);

matriz_jogo['a'] = Array(3);
matriz_jogo['b'] = Array(3);
matriz_jogo['c'] = Array(3);

matriz_jogo['a'][1] = 0;
matriz_jogo['a'][2] = 0;
matriz_jogo['a'][3] = 0;

matriz_jogo['b'][1] = 0;
matriz_jogo['b'][2] = 0;
matriz_jogo['b'][3] = 0;

matriz_jogo['c'][1] = 0;
matriz_jogo['c'][2] = 0;
matriz_jogo['c'][3] = 0;

$(document).ready( function(){

	$('#btn-iniciar-jogo').click( function(){

		//Valida a digitacao dos apelidos 

		if ($('#entrada-apelido-jogador-1').val() == ""){
			alert('Apelido jogador 1 não preenchido');
			return false;
		}
		
		if ($('#entrada-apelido-jogador-2').val() == ""){
			alert('Apelido jogador 2 não preenchido');
			return false;
		}

		//Exibir apelidos

		$('#nome-jogador-1').html($('#entrada-apelido-jogador-1').val());
		$('#nome-jogador-2').html($('#entrada-apelido-jogador-2').val());

		//Controla visualização das divs

		$('#pagina-inicial').hide();
		$('#palco-jogo').show();
	});

	$('.jogada').click( function(){

		var id_campo_clicada = this.id;
		$('#'+id_campo_clicada).off();
		jogada(id_campo_clicada);

	});

	//Mostrar "x" ou "o"

	function jogada(id){
		var icone = '';
		var ponto = 0;

		if((rodada % 2) == 1){
			icone = 'url("imagens/marcacao_1.png")';
			ponto = -1;
		}else{
			icone = 'url("imagens/marcacao_2.png")';
			ponto = 1;
		}

		rodada++;

		$('#'+id).css('background-image', icone);
	
		var linha_coluna = id.split('-');

		matriz_jogo[linha_coluna[0]][linha_coluna[1]] = ponto;

		verifica_combinacao();
	}

	function verifica_combinacao(){

		//Verificar na horizontal
		var pontos = 0; 
		for (var i = 1; i <= 3; i++) {
			pontos = pontos + matriz_jogo['a'][i];
		}

		ganhador(pontos);

		pontos = 0;
		var pontos = 0; 
		for (var i = 1; i <= 3; i++) {
			pontos = pontos + matriz_jogo['b'][i];
		}

		ganhador(pontos);

		pontos = 0;
		var pontos = 0; 
		for (var i = 1; i <= 3; i++) {
			pontos = pontos + matriz_jogo['c'][i];
		}

		ganhador(pontos);

		//Verificar na vertical
		
		for(var r = 1; r <= 3; r++){
			pontos = 0;
			pontos += matriz_jogo['a'][r];
			pontos += matriz_jogo['b'][r];
			pontos += matriz_jogo['c'][r];

			ganhador(pontos);
		}

		//Verificar na diagonal
		pontos = 0;
		pontos = matriz_jogo['a'][1] + matriz_jogo['b'][2] + matriz_jogo['c'][3];
		ganhador(pontos);

		pontos = 0;
		pontos = matriz_jogo['a'][3] + matriz_jogo['b'][2] + matriz_jogo['c'][1];
		ganhador(pontos);

	}	

	function ganhador(pontos){
		if (pontos == -3) {
			var jogada_1 = $('#entrada-apelido-jogador-1').val();
			alert(jogada_1 + ' foi o vencedor');
			$('.jogada').off();
			//reinicia_pagina();
		} else if(pontos == 3){
			var jogada_2 = $('#entrada-apelido-jogador-2').val();
			alert(jogada_2 + ' foi o vencedor');
			$('.jogada').off();
			//reinicia_pagina();
		}
	}

	/*function reinicia_pagina(){
	location.reload(true);
}*/

	    $('#btn_reiniciar_jogo').click( function(){
            
            //zerar as variáveis de pontuação
            matriz_jogo['a'][1] = 0;
            matriz_jogo['a'][2] = 0;
            matriz_jogo['a'][3] = 0;
     
            matriz_jogo['b'][1] = 0;
            matriz_jogo['b'][2] = 0;
            matriz_jogo['b'][3] = 0;
     
            matriz_jogo['c'][1] = 0;
            matriz_jogo['c'][2] = 0;
            matriz_jogo['c'][3] = 0;
     
            //limpar todos os campos já marcados
            $('.jogada').css('background-image', '');
     
            //reaplica os eventos de jogada ao elementos com a class jogada
            //fundamental caso seja um restart ao término do jogo, uma vez que a função 
            //ganhador limpa a função jogada do elemento se houver um ganhador
            $('.jogada').off();
            $('.jogada').click( function(){

			var id_campo_clicada = this.id;
			$('#'+id_campo_clicada).off();
			jogada(id_campo_clicada);

		});
     
            //disparar o evento click do btn_iniciar_jogo através da função trigger
            $("#btn_iniciar_jogo").trigger('click');
            
        });

});