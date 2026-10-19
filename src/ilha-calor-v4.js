/* Experiência 8 | visualização científica responsiva, revisão 4.
 * Estoques e fluxos visuais qualitativos; NÃO calcula °C.
 */
(function(){
"use strict";
const app=window.__carbono;
const slide=app&&app.slides.find(s=>s.id==="uhi");
if(!slide)return;
const stage=document.getElementById("stage");
const host=document.getElementById("uhi");
const controls=document.getElementById("ctrl");
const value={population:650000,green:45,rain:1400};
const presets={cac:[95000,1300],cba:[650000,1400],sp:[12000000,1500]};
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const money=n=>new Intl.NumberFormat("pt-BR",{maximumFractionDigits:0}).format(n);
const human=n=>n>=1000000?(n/1000000).toFixed(1).replace(".",",")+" mi":money(Math.round(n/1000))+" mil";
const expPos=p=>100*(Math.log(p)-Math.log(10000))/(Math.log(20000000)-Math.log(10000));
const fromPos=p=>Math.round(Math.exp(Math.log(10000)+p/100*(Math.log(20000000)-Math.log(10000)))/1000)*1000;
const moisture=()=>value.rain<800?0:value.rain<1600?1:2;
const moistName=()=>["seco","intermediário","úmido"][moisture()];
host.innerHTML='<div class="u4-scroll" id="uhi4" aria-label="Ilha de calor urbana, comparação interativa">'+
'<div class="u4-eyebrow">Experiência 8 · Física ambiental</div>'+
'<h2 class="u4-title">A mesma cidade. Dois microclimas.</h2>'+
'<p class="u4-deck">O que muda quando aumentamos a sombra e a vegetação? Compare duas versões da mesma paisagem urbana.</p>'+
'<div class="u4-message">Mais árvores favorecem sombra e, quando há água disponível, evapotranspiração. Menos solo exposto tende a reduzir o aquecimento local.</div>'+
'<div class="u4-controls">'+
'<div class="u4-field"><div class="u4-fieldhead"><label for="u4-pop">Porte da cidade</label><output id="u4-out-pop"></output></div>'+
'<input type="range" id="u4-pop" min="0" max="100" step="1"><span class="u4-helper">Muda o número de prédios nos dois cenários. Não prevê °C.</span></div>'+
'<div class="u4-field"><div class="u4-fieldhead"><label for="u4-green">Cobertura das árvores</label><output id="u4-out-green"></output></div>'+
'<input type="range" id="u4-green" min="5" max="80" step="5"><span class="u4-helper">Muda as copas, as sombras e a área exposta à radiação solar.</span></div>'+
'<div class="u4-field"><div class="u4-fieldhead"><label for="u4-rain">Chuva média anual</label><output id="u4-out-rain"></output></div>'+
'<input type="range" id="u4-rain" min="200" max="3000" step="100"><span class="u4-helper">Muda a condição climática de água, não a chuva de hoje.</span></div>'+
'</div>'+
'<div class="u4-actions"><span>Exemplos de porte e clima:</span>'+
'<button type="button" data-u4-city="cac">Cáceres</button>'+
'<button type="button" data-u4-city="cba">Cuiabá</button>'+
'<button type="button" data-u4-city="sp">São Paulo</button></div>'+
'<div class="u4-duo">'+
'<article class="u4-panel"><div class="u4-panelheader"><h3>Pouco verde</h3><span class="u4-chip">5% de copas</span></div>'+
'<div class="u4-visual" data-u4-scene="a"></div><p class="u4-paneldesc">Mais superfícies diretamente expostas ao Sol.</p></article>'+
'<article class="u4-panel"><div class="u4-panelheader"><h3>Mais verde</h3><span class="u4-chip" id="u4-green-chip"></span></div>'+
'<div class="u4-visual" data-u4-scene="b"></div><p class="u4-paneldesc" id="u4-cooling"></p></article>'+
'</div>'+
'<div class="u4-insight" aria-live="polite"><b>O que mudou?</b><p id="u4-summary"></p></div>'+
'<p class="u4-footnote">Esquema conceitual autoral, não proporcional, sem cálculo de graus Celsius. O verde tem efeitos reais, mas 60% de copas NÃO significa redução de 60% da temperatura. Fonte: Manoli et al. (2019), Nature 573, 55–60, DOI 10.1038/s41586-019-1512-9.</p>'+
'</div>';
const $=x=>host.querySelector(x);
const pop=$("#u4-pop"),green=$("#u4-green"),rain=$("#u4-rain");
function draw(cover){
 const wet=moisture();
 const urban=clamp((Math.log10(value.population)-4)/3.3,0,1);
 const count=Math.round(5+urban*17);
 const treeCount=Math.round(2+cover*.40);
 let buildings="",trees="",shadow="",vapour="";
 for(let i=0;i<count;i++){
  const x=15+i*555/count;
  const ht=Math.round(45+urban*40+(i*43)%99);
  buildings+='<rect x="'+x.toFixed(1)+'" y="'+(231-ht)+'" width="'+(24+i*11%12)+'" height="'+ht+'" rx="3" fill="'+(i%3==0?"#687e94":"#8c9fb4")+'"/>';
 }
 for(let i=0;i<treeCount;i++){
  const x=21+(i*83)%560;
  const col=wet===0?"#83987a":wet===1?"#378f75":"#0e826d";
  shadow+='<ellipse cx="'+x+'" cy="234" rx="20" ry="5" fill="#183f48" opacity="'+(.07+cover*.003).toFixed(2)+'"/>';
  trees+='<rect x="'+(x-2)+'" y="222" width="4" height="16" fill="#745338"/>'+
    '<circle cx="'+x+'" cy="215" r="'+(11+i%3*3)+'" fill="'+col+'"/>';
 }
 const eCount=wet===0?0:wet===1?Math.round(treeCount/7):Math.round(treeCount/4);
 for(let i=0;i<eCount;i++){
  const x=43+(i*99)%520;
  vapour+='<path d="M'+x+' 194q-5-11 0-20q5-12 0-21" stroke="#2a78d6" opacity=".68" stroke-width="3" fill="none" stroke-linecap="round"/>';
 }
 const surface=wet===0?"#bcad83":wet===1?"#92b19a":"#82b6bf";
 const halo=Math.max(.055,Math.min(.32,.09+.18*urban*(1-cover/100)+.13*(1-cover/100)));
 const heatSize=Math.round(42+urban*40+(1-cover/100)*20);
 return '<svg viewBox="0 0 600 268" role="img" aria-label="'+count+' edifícios e '+treeCount+' árvores ilustradas; umidade '+moistName()+'">'+
 '<rect width="600" height="268" fill="#f2f8fd"/><circle cx="536" cy="36" r="23" fill="#ffe2a0" stroke="#efc766" stroke-width="4"/>'+
 '<rect y="220" width="600" height="48" fill="'+surface+'" opacity=".34"/>'+
 buildings+'<rect x="0" y="232" width="600" height="14" fill="#778491"/>'+
 shadow+'<ellipse cx="300" cy="227" rx="'+(175+110*urban)+'" ry="'+heatSize+'" fill="#d9553b" opacity="'+halo.toFixed(3)+'"/>'+
 trees+vapour+'</svg>';
}
function render(){
 pop.value=String(expPos(value.population));
 green.value=String(value.green);
 rain.value=String(value.rain);
 $("#u4-out-pop").textContent=human(value.population)+" hab.";
 $("#u4-out-green").textContent=value.green+"%";
 $("#u4-out-rain").textContent=money(value.rain)+" mm";
 $('[data-u4-scene="a"]').innerHTML=draw(5);
 $('[data-u4-scene="b"]').innerHTML=draw(value.green);
 $("#u4-green-chip").textContent=value.green+"% de copas";
 $("#u4-cooling").textContent=moisture()===0?
 "Mais sombra. Com pouca água, a evapotranspiração pode ser limitada.":
 "Mais sombra e transpiração vegetal potencial, graças à água disponível.";
 $("#u4-summary").textContent="O porte urbano representa "+human(value.population)+
 " habitantes e modifica os edifícios nos dois desenhos. A cobertura arbórea passa de 5% para "+
 value.green+"%. Chuva anual: "+money(value.rain)+" mm (clima "+moistName()+
 "). As linhas azuis indicam evapotranspiração potencial, não chuva instantânea. A mancha avermelhada é simbólica, não um mapa de temperatura.";
 $("#uhi4").dataset.buildings=String(Math.round(5+clamp((Math.log10(value.population)-4)/3.3,0,1)*17));
 $("#uhi4").dataset.green=String(value.green);
 $("#uhi4").dataset.moisture=String(moisture());
 host.querySelectorAll("[data-u4-city]").forEach(b=>{
  const v=presets[b.dataset.u4City];
  b.setAttribute("aria-pressed",String(v[0]===value.population&&v[1]===value.rain));
 });
}
pop.addEventListener("input",()=>{value.population=fromPos(+pop.value);render()});
green.addEventListener("input",()=>{value.green=+green.value;render()});
rain.addEventListener("input",()=>{value.rain=+rain.value;render()});
host.querySelectorAll("[data-u4-city]").forEach(b=>b.addEventListener("click",()=>{
 const v=presets[b.dataset.u4City];
 value.population=v[0];value.rain=v[1];render();
}));
slide.title="Ilhas de calor e cobertura verde";
slide.lede="A mesma cidade, duas paisagens.";
slide.build=()=>{controls.replaceChildren();render()};
slide.enter=()=>{
 stage.classList.remove("u3-on");
 stage.classList.add("uhi4-on");
 host.style.display="block";
 controls.replaceChildren();
 render();
};
slide.exit=()=>{stage.classList.remove("uhi4-on");host.style.display="none";};
slide.more=()=>'<h2>O que esta experiência mostra</h2>'+
 '<p>Ilha de calor é a diferença térmica entre áreas urbanas e seu entorno. A comparação não representa o efeito estufa atmosférico nem permite prever a temperatura em uma cidade.</p>'+
 '<p>Árvores interceptam radiação solar, criam sombra e, quando há água, favorecem evapotranspiração. A disponibilidade hídrica, os materiais urbanos, o vento e a geometria da cidade influenciam o resfriamento. O mesmo percentual verde pode resultar em padrões distintos de temperatura conforme a distribuição espacial das árvores.</p>'+
 '<p><b>Controles:</b> a população representa hipoteticamente o porte edificado das duas paisagens, sem ser um estimador de °C. A chuva é uma categoria climática indicativa, não precipitação no instante da ilustração. Não se aplica coeficiente inventado de resfriamento.</p>'+
 '<p>Referência: Manoli et al. (2019), <em>Magnitude of urban heat islands largely explained by climate and population</em>, Nature 573, 55–60, <a href="https://doi.org/10.1038/s41586-019-1512-9" rel="noopener" target="_blank">DOI 10.1038/s41586-019-1512-9</a>.</p>';
render();
window.__uhi4={state:value,render,fromPos};
})();