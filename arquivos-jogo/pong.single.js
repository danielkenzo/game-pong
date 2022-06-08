function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

//Variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio=diametro/2;

//Variáveis de ambas raquetes
let raqueteComprimento = 10;
let raqueteAltura = 90;

//Variáveis da minha raquete
let xMinhaRaquete = 5;
let yMinhaRaquete = 150;

//Variáveis da raquete do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let chanceDeErrar = 0;

//Variáveis da velocidade da bolinha
let velocidadeXBolinha=6;
let velocidadeYBolinha=6;

//Placar jogo
let pontosMeus = 0;
let pontosOponente=0;

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
  criaRaquete(xMinhaRaquete,yMinhaRaquete);
  criaRaquete(xRaqueteOponente,yRaqueteOponente);
  
  //Movimentação
  movimentaBolinha();
  movimentaMinhaRaquete();
  movimentaRaqueteOponente();
  
  //Colisão
  verificaColisaoBorda();
  //colisaoMinhaRaquete();
  colisaoRaqueteBiblioteca(xMinhaRaquete,yMinhaRaquete);
  colisaoRaqueteBiblioteca(xRaqueteOponente,yRaqueteOponente);
  
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
function movimentaMinhaRaquete()
{
  if(keyIsDown(UP_ARROW))
  {
    yMinhaRaquete-=10;
  }

  if(keyIsDown(DOWN_ARROW))
  {
    yMinhaRaquete+=10;
  }
}
///////////////////////////////////////////////////////////////////////////
function movimentaRaqueteOponente()
{
  velocidadeYOponente=yBolinha-yRaqueteOponente-raqueteComprimento/2-30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar();
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
  if(xBolinha-raio<xMinhaRaquete+raqueteComprimento && yBolinha+raio>yMinhaRaquete && yBolinha-raio<yMinhaRaquete+raqueteAltura)
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
  text(pontosMeus,170,27);
  fill(color(255,140,0));
  rect(450,10,40,20)
  fill(255);
  text(pontosOponente,470,27);
}
///////////////////////////////////////////////////////////////////////////
function marcaPonto()
{
  if(xBolinha>590)
  {
    pontosMeus+=1;
    ponto.play();
    bolinhaNaoFicaPresa();
  }
  
  if(xBolinha<10)
  {
    pontosOponente+=1;
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
///////////////////////////////////////////////////////////////////////////
function calculaChanceDeErrar()
{
  if (pontosOponente >= pontosMeus)
  {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39)
    {
      chanceDeErrar = 40
    }
  }
    
  else
  {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35)
    {
      chanceDeErrar = 35
    }
  }
}
///////////////////////////////////////////////////////////////////////////
function bolinhaNaoFicaPresa(){
  if (xBolinha - raio < 0)
  {
    xBolinha = 23
  }
  
  if (xBolinha+raio >width)
  {
    xBolinha = 577
  }
}
