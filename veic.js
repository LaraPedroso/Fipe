$(document).ready(function(){
    $("#table").hide();
    $('#marca').select2();
    $('#modelo').select2();
    $('#ano').select2();

    $("#marca").append("<option value= >Selecione uma marca..</option>");
    $("#modelo").append("<option value= >Selecione o modelo..</option>");
    $("#ano").append("<option value= >Selecione o ano..</option>");

    $("button[name='inputPesquisar']").val('');

    $.ajax({url: "https://parallelum.com.br/fipe/api/v1/carros/marcas", success: function(result){
        $.each(result,function(index,value){  
            $("#marca").append("<option value=" + value['codigo'] + ">" + value['nome'] + "</option>");
        })
    }});

    $("#marca").change(function(){
        $("#modelo").html("");
        $("#ano").html("");
        $("#modelo").append("<option value= >Selecione o modelo..</option>");
        $("#ano").append("<option value= >Selecione o ano..</option>");
        var idmarca = $(this).val();

        $.ajax({url: "https://parallelum.com.br/fipe/api/v1/carros/marcas/"+ idmarca +"/modelos", success: function(result){
            $.each(result['modelos'],function(index,value){
                $("#modelo").append("<option value="+ value['codigo']+ ">" + value['nome']+"</option>");
            });

            $.each(result['anos'],function(index,value){ // Loop de ano
                $("#ano").append("<option value="+ value['codigo']+ ">" + value['nome']+"</option>");
            });
        }});
    });

    $("#modelo").change(function(){
        $("#ano").html("");
        $("#ano").append("<option value= >Selecione o ano..</option>");
        var idmodelo = $(this).val();
        var idmarca = $('#marca').val();

        $.ajax({url: "https://parallelum.com.br/fipe/api/v1/carros/marcas/"+ idmarca +"/modelos/" + idmodelo + "/anos", success: function(result){
            $.each(result,function(index,value){ // Loop de ano
                $("#ano").append("<option value="+ value['codigo']+ ">" + value['nome']+"</option>");
            });
        }});
    });

    $("#pesquisa").click(function(){

        var id_marca = $('#marca').val();
        var id_modelo = $('#modelo').val();
        var id_ano = $('#ano').val();
        
        if(!id_marca && !id_modelo || !id_ano ){
            Swal.fire({
                icon: 'warning',
                title: 'Opa',
                text: 'Todos os campos obrigatorios!!!'
            })
        }

        if(id_marca && id_modelo && id_ano ){
            $("#table").fadeIn();
        }

        $.ajax({url: "https://parallelum.com.br/fipe/api/v1/carros/marcas/" + id_marca + "/modelos/" + id_modelo + "/anos/" + id_ano , success: function(result){
            $("#res_marca").html(result['Marca']);
            $("#res_modelo").html(result['Modelo']);
            $("#res_ano").html(result['AnoModelo']);
            $('#res_valor').html(result['Valor']);
            $('#res_mes').html(result['MesReferencia']);
            $('#res_cod').html(result['CodigoFipe']);
            $('#res_tipo').html(result['TipoVeiculo']);
            $('#res_cod').html(result['CodigoFipe']);
            $('#res_sigla').html(result['SiglaCombustivel']);
        }});
    });
});
