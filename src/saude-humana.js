/* Novo slide científico entre ilha de calor e cenários.
   Executado dentro do bundle antes da construção dos botões de navegação.
   Preserva todos os demais slides e não inventa coeficientes epidemiológicos. */
const healthSlide={
 id:"health",
 eyebrow:"Experiência 9",
 title:"O que chega ao corpo humano?",
 lede:"PM2,5, calor e CO₂: três mecanismos, riscos diferentes.",
 ref:"OMS, Air Pollution e Heat and Health; IPCC AR6 WGII, Capítulo 7.",
 needsGL:false,
 build(){
   Ue.ctrl.replaceChildren();
   Ue.readout.replaceChildren();
   const host=document.getElementById("health");
   host.querySelectorAll("[data-hh]").forEach(button=>button.setAttribute("aria-pressed",String(button.dataset.hh==="pm")));
   host.querySelector("#hh-path-title").textContent="PM2,5: da respiração ao sistema cardiovascular";
   host.querySelector("#hh-path-copy").textContent="Partículas finas alcançam regiões profundas dos pulmões. A exposição está associada a doenças respiratórias e cardiovasculares.";
 },
 enter(){
   const stage=document.getElementById("stage");
   const host=document.getElementById("health");
   stage.classList.add("hh-on");
   host.style.display="block";
   document.getElementById("gl").style.display="none";
   const canvas=document.getElementById("c2d");
   canvas.style.display="none";canvas.classList.remove("active");
 },
 exit(){
   document.getElementById("stage").classList.remove("hh-on");
   document.getElementById("health").style.display="none";
   if(Vn)document.getElementById("gl").style.display="block";
 },
 more(){
  return '<h2>Três caminhos diferentes até a saúde humana</h2>'+
   '<h4>PM2,5: exposição por inalação</h4>'+
   '<p>PM2,5 é a fração de partículas em suspensão cujo diâmetro aerodinâmico é de até 2,5 µm. Uma parte pode alcançar os alvéolos pulmonares. A exposição causa respostas inflamatórias e está associada a agravamento de asma, DPOC, doenças cardiovasculares, acidente vascular cerebral e mortalidade prematura. As partículas variam de composição: sulfatos, nitratos, poeira, carbono negro, matéria orgânica e outros componentes. <b>PM2,5 não é CO₂.</b></p>'+
   '<h4>Calor extremo: estresse térmico</h4>'+
   '<p>Temperatura elevada, umidade, radiação e pouco vento podem dificultar a perda de calor do organismo. Os efeitos incluem desidratação, exaustão térmica, insolação, piora das doenças cardíacas e renais e prejuízos ao trabalho e ao sono. Insolação é emergência médica.</p>'+
   '<h4>CO₂ e mudança do clima: via indireta</h4>'+
   '<p>O CO₂ atmosférico, nas concentrações externas usuais, não é o principal tóxico inalatório. Sua contribuição dominante aqui é <b>radiativa e climática</b>: o aumento de sua concentração favorece o aquecimento global e eleva a exposição a extremos de calor. Queimadas e combustão podem emitir <b>simultaneamente</b> CO₂ e PM2,5, mas o CO₂ não se transforma diretamente em partículas. O risco de incêndios depende também do manejo da terra, ignição e condições meteorológicas.</p>'+
   '<h4>Quem fica mais exposto?</h4>'+
   '<p>Crianças, idosos, gestantes, pessoas com doenças cardiorrespiratórias ou renais, trabalhadores ao ar livre e populações com menor acesso a habitação adequada, sombra e serviços de saúde.</p>'+
   '<h4>Fontes verificáveis</h4>'+
   '<p><a target="_blank" rel="noopener noreferrer" href="https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health">OMS, Ambient (outdoor) air pollution</a>.'+
   ' <a target="_blank" rel="noopener noreferrer" href="https://www.who.int/news-room/fact-sheets/detail/climate-change-heat-and-health">OMS, Heat and health (2026)</a>.'+
   ' <a target="_blank" rel="noopener noreferrer" href="https://www.ipcc.ch/report/ar6/wg2/chapter/chapter-7/">IPCC AR6 WGII, capítulo 7</a>.</p>'+
   '<p><span class="tag">Esquema didático autoral</span> Sem atribuir frações de risco ou valores epidemiológicos não calculados.</p>';
 }
};
Bt.splice(8,0,healthSlide);
const hhHost=document.getElementById("health");
const hhContent={
 pm:["PM2,5: da respiração ao sistema cardiovascular","Partículas finas alcançam regiões profundas dos pulmões. A exposição está associada a doenças respiratórias e cardiovasculares."],
 heat:["Calor: quando o corpo não consegue dissipar energia","Calor e umidade podem dificultar o resfriamento do corpo, aumentando desidratação, exaustão térmica e sobrecarga do coração e dos rins."],
 climate:["CO₂: intensificação do risco climático","O CO₂ contribui para o aquecimento global. Fumaça e PM2,5 podem ser emitidos ao mesmo tempo que CO₂ por queimadas e combustão, mas são substâncias diferentes."]
};
hhHost.addEventListener("click",event=>{
 const card=event.target.closest("[data-hh]");
 if(!card||!hhHost.contains(card))return;
 const chosen=card.dataset.hh;
 hhHost.querySelectorAll("[data-hh]").forEach(b=>b.setAttribute("aria-pressed",String(b===card)));
 hhHost.querySelector("#hh-path-title").textContent=hhContent[chosen][0];
 hhHost.querySelector("#hh-path-copy").textContent=hhContent[chosen][1];
});
