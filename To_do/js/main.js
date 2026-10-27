$(function(){
    M.FormSelect.init($("#campoPrioridade")[0]);
    $("#botao").click(inserirTarefa);
    $(".campoTitulo").focus();
    atualizaContador();
});

function inserirTarefa(){
    var tabela = $(".tarefas").find("tbody");
    var campoTitulo = $(".campoTitulo").val();
    var campoObs = $(".campoObs").val();
    var campoPrioridade = $("#campoPrioridade").val();

    if (campoTitulo.trim() === "" || campoObs.trim() === "" || !campoPrioridade) {
        M.toast({html: "Preencha o título, a observação e a prioridade antes de cadastrar a tarefa."});
        return;
    }

    var linha = funLinha(campoTitulo, campoObs, campoPrioridade);
    linha.find(".botaoDeletar").click(deletaLinha);
    linha.find(".botaoConcluir").click(concluiTarefa);
    tabela.append(linha);

    $(".campoTitulo").val("");
    $(".campoObs").val("");
    $("#campoPrioridade").val("");
    M.FormSelect.init($("#campoPrioridade")[0]);
    M.updateTextFields();
    $(".campoTitulo").focus();

    M.toast({html: "Tarefa cadastrada com sucesso!"});
    atualizaContador();
}

function funLinha(campoTitulo, campoObs, prioridade){
    var linha = $("<tr>");
    var colunaTarefa = $("<td>").text(campoTitulo);
    var colunaObs = $("<td>").text(campoObs);

    var cor = "green";
    if (prioridade === "Média") { cor = "orange"; }
    if (prioridade === "Alta") { cor = "red"; }

    var colunaPrioridade = $("<td>").append(
        $("<span>").addClass("new badge " + cor).attr("data-badge-caption", prioridade)
    );

    var colunaConcluir = $("<td>");
    var bConcluir = $("<a>").addClass("botaoConcluir").attr("href", "#");
    bConcluir.append($("<i>").addClass("material-icons green-text").text("check_circle"));
    colunaConcluir.append(bConcluir);

    var colunaDelete = $("<td>");
    var bDeletar = $("<a>").addClass("botaoDeletar").attr("href", "#");
    bDeletar.append($("<i>").addClass("material-icons").text("delete"));
    colunaDelete.append(bDeletar);

    linha.append(colunaTarefa);
    linha.append(colunaObs);
    linha.append(colunaPrioridade);
    linha.append(colunaConcluir);
    linha.append(colunaDelete);

    return linha;
}

function concluiTarefa(e){
    e.preventDefault();
    var linha = $(this).closest("tr");
    linha.toggleClass("concluida");

    if (linha.hasClass("concluida")) {
        M.toast({html: "Tarefa concluída!"});
    } else {
        M.toast({html: "Tarefa reaberta."});
    }
    atualizaContador();
}

function deletaLinha(e){
    e.preventDefault();
    $(this).closest("tr").remove();
    M.toast({html: "Tarefa apagada."});
    atualizaContador();
}

function atualizaContador(){
    var pendentes = $(".tarefas tbody tr").not(".concluida").length;
    $("#contador").text("Tarefas pendentes: " + pendentes);
}