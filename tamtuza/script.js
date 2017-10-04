var cells = [];

var activeCell = 0;
var attempts = 0;
var cell0 = {text: "Tamillys Pantuza acabou de acordar, depois de uma linda (não tão comum quanto deveria) noite de sono.", firstText: "LEVANTAR", firstIndex: 1, secondText: "DORMIR MAIS", secondIndex: 2};
var cell1 = {text: "Com essa forcinha extra, Tamillys se levantou e foi trabalhar. No escritório, um pouco antes do almoço, Priscyla aparece e pergunta se ela quer ir comer fondue.", firstText: "BORA", firstIndex: 3, secondText: "HOJE NÃO", secondIndex: 4};
var cell2 = {text: "Infelizmente, ter escolhido ficar um pouco mais na cama naquela manhã foi algo que ela nunca deveria ter feito. Por conta de obras no prédio, a última lembrança que Tamillys teria era da lâmpada do quarto estourando e caindo bem no seu pescoço, fazendo com que sangue jorrasse até o momento do seu fim.", firstText: "GAME OVER", firstIndex: -1, secondText: "TRY AGAIN", secondIndex: 0};
var cell3 = {text: "Felizes, foram as duas. O garçom foi servir o fondue já quente na mesa, quando tropeçou e todo o queijo derretido caiu na cara de Tamillys, derretendo seus olhos de dentro de suas órbitas e a transformando num mórbido parmegiana.", firstText: "GAME OVER", firstIndex: -1, secondText: "TRY AGAIN", secondIndex: 0};
var cell4 = {text: "Decidiram almoçar algo mais saudável, sem deixar de mandar uma porçãozinha de batata frita. Na volta para o trabalho, as duas veem um cachorro bem grande na mesma calçada que estão seguindo.", firstText: "ATRAVESSAR", firstIndex: 5, secondText: "CONTINUAR", secondIndex: 6};
var cell5 = {text: "\"Picyla, bora atravessai\" disse Tamillys enquanto as duas aceleravam o passo em direção a outra calçada. Chegaram, aliviadas, só para testemunharem um caminhão do gás desenfreado bater no poste próximo a elas, explodindo e fazendo voar pedaço das duas por toda parte.", firstText: "GAME OVER", firstIndex: -1, secondText: "TRY AGAIN", secondIndex: 0};
var cell6 = {text: "Viram que o cachorro só estava animado querendo brincar, passaram um tempinho com ele e voltaram para o trabalho. No fim do expediente, Tamillys tinha que decidir se naquele dia, iria treinar ou não.", firstText: "HOJE NÃO", firstIndex: 7, secondText: "BORA", secondIndex: 8};
var cell7 = {text: "Tamillys decidiu voltar mais cedo para casa, afinal estava cansada. Naquele horário estava chovendo muito forte, com raios e trovões. Na rua de casa, chegando muito perto do prédio, Tamillys sofre o inesperado: escorrega numa calçada molhada e cai de cabeça no chão. Segundos depois, um raio cai sobre ela, dando o golpe final.", firstText: "GAME OVER", firstIndex: -1, secondText: "TRY AGAIN", secondIndex: 0};
var cell8 = {text: "O treino foi ótimo, cansada, ela só pensa em chegar em casa e dormir, talvez nem cheirar o kimono hoje...", firstText: "CHEIRAR", firstIndex: 9, secondText: "DORMIR", secondIndex: 10};
var cell9 = {text: "Após uma merecida cheirada no kimono e um banho, Tamillys retorna a sua cama e, cansada pelo dia aparentemente comum mas de muita sorte, dorme que nem um anjinho.", firstText: "PARABÉNS <3", firstIndex: -1, secondText: "PLAY AGAIN", secondIndex: 0};
var cell10 = {text: "Decide então por o kimono para lavar e entra no banho. De alguma forma, o kimono, revoltado, consegue quebrar a máquina de lavar. De dentro do banheiro, ouvindo o barulho todo, Tamillys sai correndo para ver o que aconteceu. Quando olha para a máquina de lavar, o kimono, flutuando no ar, salta sobre ela e a enforca com sua faixa sem misericórdia.", firstText: "GAME OVER", firstIndex: -1, secondText: "TRY AGAIN", secondIndex: 0};

cells[0] = cell0;
cells[1] = cell1;
cells[2] = cell2;
cells[3] = cell3;
cells[4] = cell4;
cells[5] = cell5;
cells[6] = cell6;
cells[7] = cell7;
cells[8] = cell8;
cells[9] = cell9;
cells[10] = cell10;

var cellText = document.getElementById("mapCellText");
var first = document.getElementById("first");
var second = document.getElementById("second");
var attemptsText = document.getElementById("attempts");
cellText.innerHTML = cells[activeCell].text;
first.innerHTML = cells[activeCell].firstText;
second.innerHTML = cells[activeCell].secondText;

function firstOption() {
    var newIndex = cells[activeCell].firstIndex;
    if (newIndex < 0) return;
    activeCell = newIndex;
    console.log(activeCell);
    cellText.innerHTML = cells[activeCell].text;
    first.innerHTML = cells[activeCell].firstText;
    second.innerHTML = cells[activeCell].secondText;
    if (cells[activeCell].firstText == "GAME OVER") {
      attempts++;
      attemptsText.innerHTML = "Tentativas: " + attempts;
    }
}

function secondOption() {
    var newIndex = cells[activeCell].secondIndex;
    if (newIndex < 0) return;
    activeCell = newIndex;
    console.log(activeCell);
    cellText.innerHTML = cells[activeCell].text;
    first.innerHTML = cells[activeCell].firstText;
    second.innerHTML = cells[activeCell].secondText;
    if (cells[activeCell].firstText == "GAME OVER") {
      attempts++;
      attemptsText.innerHTML = "Tentativas: " + attempts;
    }
}
