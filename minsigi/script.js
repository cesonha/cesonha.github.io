
function vaimlk() {

  try {
     var imagem = document.getElementById("foto");
    imagem.src = imagem.src.replace("pq.jpg", "vtnc.png");
    imagem.style.height = 100;
    imagem.style.width = 887;
    var audio = new Audio('tst.mp3');
    audio.play();
    }
    catch(err) {
    document.getElementById("nois").value = err.message;
    }

  }

