function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

//Variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let velocidadeXBolinha=6;
let velocidadeYBolinha=6;
let diametro = 15;
let raio=diametro/2;

//Variáveis de ambas raquetes
let raqueteComprimento = 10;
let raqueteAltura = 90;

//Variáveis da raquete da esquerda
let xRaqueteEsquerda = 5;
let yRaqueteEsqueda = 150;

//Variáveis da raquete do oponente
let xRaqueteDireita = 585;
let yRaqueteDireita = 150;

//Placar jogo
let pontosDireita=0
let pontosEsquerda=0;

//Variáveis colisão
let colisao = false;

//Sons do jogo
let raquetada;
let ponto;
let trilha;

function draw() {
  background(0);
  
  //Criação
  criaBolinha();
  criaRaquete(xRaqueteEsquerda,yRaqueteEsqueda);
  criaRaquete(xRaqueteDireita,yRaqueteDireita);
  
  //Movimentação
  movimentaBolinha();
  movimentaRaqueteEsquerda();
  movimentaRaqueteDireita();
  
  //Colisão
  verificaColisaoBorda();
  //colisaoMinhaRaquete();
  colisaoRaqueteBiblioteca(xRaqueteEsquerda,yRaqueteEsqueda);
  colisaoRaqueteBiblioteca(xRaqueteDireita,yRaqueteDireita);
  
  //Placar
  incluiPlacar();
  marcaPonto();
}


///////////////////////////////////////////////////////////////////////////
function criaBolinha()
{
  circle(xBolinha, yBolinha, diametro);
}
///////////////////////////////////////////////////////////////////////////
function criaRaquete(posX,posY)
{
  rect(posX,posY,raqueteComprimento,raqueteAltura);
}
///////////////////////////////////////////////////////////////////////////
function movimentaBolinha()
{
  xBolinha+=velocidadeXBolinha;
  yBolinha+=velocidadeYBolinha;
}
///////////////////////////////////////////////////////////////////////////
function movimentaRaqueteEsquerda()
{
  if (keyIsDown(87))
  {
    yRaqueteEsqueda-=10;
  }
  
  if (keyIsDown(83))
   {
     yRaqueteEsqueda+=10;
   }
}
///////////////////////////////////////////////////////////////////////////
function movimentaRaqueteDireita()
{
  if(keyIsDown(UP_ARROW))
  {
    yRaqueteDireita -= 10;
  }

  if(keyIsDown(DOWN_ARROW))
  {
    yRaqueteDireita += 10;
  }
}
///////////////////////////////////////////////////////////////////////////
function verificaColisaoBorda()
{
  if(xBolinha+raio > width || xBolinha-raio<0)
  {
    velocidadeXBolinha*=-1;    
  }
  
  if(yBolinha+raio > height || yBolinha-raio <0)
  {
    velocidadeYBolinha*=-1;    
  }
}
///////////////////////////////////////////////////////////////////////////
function colisaoMinhaRaquete()
{
  if(xBolinha-raio<xRaqueteEsquerda+raqueteComprimento && yBolinha+raio>yRaqueteEsqueda && yBolinha-raio<yRaqueteEsqueda+raqueteAltura)
    {
      velocidadeXBolinha*=-1;
      raquetada.play();
    }
}
///////////////////////////////////////////////////////////////////////////
function colisaoRaqueteBiblioteca(xRaquete,yRaquete)
{
  colidiu=collideRectCircle(xRaquete,yRaquete, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  
  if(colidiu==true)
  {
    velocidadeXBolinha*=-1;
    raquetada.play();
  }
}
///////////////////////////////////////////////////////////////////////////
function incluiPlacar()
{
  stroke(255);
  textAlign(CENTER)
  textSize(20)
  
  fill(color(255,140,0));
  rect(150,10,40,20)
  fill(255);
  text(pontosDireita,170,27);
  fill(color(255,140,0));
  rect(450,10,40,20)
  fill(255);
  text(pontosEsquerda,470,27);
}
///////////////////////////////////////////////////////////////////////////
function marcaPonto()
{
  if(xBolinha>590)
  {
    pontosDireita+=1;
    ponto.play();
    bolinhaNaoFicaPresa();
  }
  
  if(xBolinha<10)
  {
    pontosEsquerda+=1;
    ponto.play();
    bolinhaNaoFicaPresa();
  }
}
///////////////////////////////////////////////////////////////////////////
function preload()
{
  trilha=loadSound("trilha.mp3");
  ponto=loadSound("ponto.mp3");
  raquetada=loadSound("raquetada.mp3");
}
////////////////////////////////////////////////////////////////////////////
function bolinhaNaoFicaPresa(){
  if (xBolinha - raio <0)
  {
    xBolinha = 23
  }
  
  if (xBolinha+raio >width)
  {
    xBolinha = 577
  }
}
