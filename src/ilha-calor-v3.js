/* Experiência 8, comparação entre mesma cidade com pouco e muito verde. */
(function(){
"use strict";
const app=window.__carbono, slide=app&&app.slides.find(s=>s.id==="uhi");
if(!slide)return;
const stage=document.getElementById("stage"), scene=document.getElementById("uhi"),ctrl=document.getElementById("ctrl");
const state={pop:650000,precip:1400,green:.35},oldExit=slide.exit;
const population=v=>v>=1e6?(v/1e6).toFixed(1).replace(".",",")+" milhão":Math.round(v/1000)+" mil";
const num=v=>new Intl.NumberFormat("pt-BR").format(v);
const style=document.createElement("style");
style.textContent="#stage.u3-on #c2d,#stage.u3-on #chart,#stage.u3-on #readout,#stage.u3-on #uhiCard,#stage.u3-on #city{display:none!important}"+
"#stage.u3-on #ctrl{max-width:none;width:calc(100% - 48px);left:24px;bottom:56px;z-index:6}"+
"#uhi{background:#fff;overflow:hidden}#uhi .u3-view{position:absolute;inset:0 0 52px;overflow:auto;padding:170px 24px 135px;color:#12233a}"+
"#uhi .u3-lead{font-size:13px;line-height:1.5;color:#36536b;max-width:870px;margin:0 0 13px}"+
"#uhi .u3-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}#uhi .u3-panel{border:1px solid #d9e4f0;border-radius:16px;padding:12px;min-width:0;background:#fff}"+
"#uhi .u3-panel h3{font:800 clamp(14px,1.6vw,22px) Sora,sans-serif;margin:0 0 5px}#uhi .u3-panel p{font-size:12px;line-height:1.5;color:#3b5771;margin:6px 0}"+
"#uhi .u3-panel svg{display:block;width:100%;height:auto;border-radius:10px;background:#f3f8fd}#uhi .u3-status{font-weight:800!important;font-size:13px!important}"+
"#uhi .u3-hot .u3-status{color:#a6402b!important}#uhi .u3-cool .u3-status{color:#08685c!important}"+
"#uhi .u3-explain{margin-top:10px;padding:12px 14px;background:#f5f8fc;border:1px solid #d9e4f0;border-radius:14px;font-size:13px;line-height:1.55;color:#314c63}"+
"#uhi .u3-source{font-size:10px;color:#58718a;margin:8px 0}"+
"#ctrl .u3-controls{background:#fff;border:1px solid #d7e4f2;border-radius:16px;display:flex;flex-wrap:wrap;gap:10px;padding:10px;box-shadow:0 4px 20px #12233a18}"+
"#ctrl .u3-line{flex:1;display:grid;grid-template-columns:67px 1fr 70px;gap:7px;align-items:center;min-width:180px}"+
"#ctrl .u3-line label,#ctrl .u3-line output{font-size:11px;font-weight:800}#ctrl .u3-line output{text-align:right}#ctrl .u3-line input{width:100%;accent-color:#0a6b62}"+
"#ctrl .u3-city{display:flex;gap:5px}#ctrl .u3-city button{background:#fff;border:1px solid #b4cbe0;padding:8px;border-radius:16px;font-size:11px;font-weight:800;cursor:pointer}"+
"@media(max-width:850px){#uhi .u3-view{padding:150px 12px 225px;bottom:50px}#uhi .u3-grid{grid-template-columns:1fr}#uhi .u3-panel{padding:9px}"+
"#uhi .u3-panel svg{max-height:200px}#stage.u3-on #ctrl{left:10px;right:10px;width:calc(100% - 20px);bottom:51px;max-height:185px;overflow:auto}"+
"#ctrl .u3-controls{gap:6px;padding:8px}#ctrl .u3-line{flex:1 1 100%;grid-template-columns:70px 1fr 75px}}";
document.head.appendChild(style);
const view=document.createElement("section");view.className="u3-view";
view.innerHTML='<p class="u3-lead"><b>Mesma cidade. Mesmo clima. Duas coberturas vegetais.</b> Compare uma área com pouco verde com a mesma cidade arborizada. Este desenho não prevê temperaturas.</p>'+
'<div class="u3-grid"><article class="u3-panel u3-hot"><h3>Pouco verde</h3><p>5% de cobertura arbórea</p><div data-u3-scene="a"></div><p class="u3-status">Mais concreto ao sol, maior aquecimento</p></article>'+
'<article class="u3-panel u3-cool"><h3>Mais verde</h3><p data-u3-caption></p><div data-u3-scene="b"></div><p class="u3-status">Mais sombra e evapotranspiração, menor aquecimento</p></article></div>'+
'<p class="u3-explain" aria-live="polite"></p><p class="u3-source">Esquema autoral sem temperaturas calculadas. Base conceitual: Manoli et al. (2019), Nature, DOI 10.1038/s41586-019-1512-9.</p>';
scene.appendChild(view);
function renderScene(g){
 const n=13,treesCount=Math.round(3+g*42);
 let buildings="",trees="";
 for(let i=0;i<n;i++){const x=20+i*39,h=60+i*29%93;
 buildings+='<rect x="'+x+'" y="'+(217-h)+'" width="'+(20+i*7%14)+'" height="'+h+'" rx="3" fill="'+(i%2?'#8da2b8':'#72899f')+'"/>';}
 for(let i=0;i<treesCount;i++){const x=19+i*59%505,y=217+i%3*2;
 trees+='<rect x="'+(x-2)+'" y="'+y+'" width="4" height="13" fill="#795637"/><circle cx="'+x+'" cy="'+(y-7)+'" r="'+(7+i%3*3)+'" fill="'+(i%2?'#0a6b62':'#289779')+'"/>';}
 const hot=g<.09, heat=hot?.27:.075;
 return '<svg viewBox="0 0 540 260" role="img" aria-label="'+(hot?'Cidade com poucas árvores':'Cidade com mais árvores')+'">'+
 '<rect width="540" height="260" fill="#f4f9fc"/><circle cx="468" cy="39" r="23" fill="#ffe3a2" stroke="#ebc16b" stroke-width="3"/>'+
 buildings+'<rect y="220" width="540" height="40" fill="#d9e1e9"/><rect x="0" y="220" width="540" height="12" fill="#71808f"/>'+
 '<rect x="0" y="220" width="'+Math.round(g*540)+'" height="12" fill="#b0d9b2"/>'+trees+
 '<ellipse cx="270" cy="206" rx="'+(hot?240:125)+'" ry="'+(hot?70:36)+'" fill="#d9553b" opacity="'+heat+'"/>'+
 '<g stroke="#d9553b" opacity="'+(hot?.7:.16)+'" fill="none" stroke-width="5" stroke-linecap="round">'+
 '<path d="M128 215q-13-18 4-33q12-14 0-24"/><path d="M272 215q-13-18 4-33q12-14 0-24"/><path d="M398 215q-13-18 4-33q12-14 0-24"/></g>'+
 '<text x="270" y="251" text-anchor="middle" font-size="12" font-family="Inter" fill="#405971">'+population(state.pop)+' habitantes, mesmo tecido urbano</text></svg>';
}
function redraw(){
 view.querySelector('[data-u3-scene="a"]').innerHTML=renderScene(.05);
 view.querySelector('[data-u3-scene="b"]').innerHTML=renderScene(state.green);
 view.querySelector('[data-u3-caption]').textContent=Math.round(state.green*100)+'% de cobertura arbórea (cenário didático)';
 view.querySelector('.u3-explain').innerHTML='<b>O verde ajuda, mesmo numa cidade grande.</b> Com mais árvores, cresce a área sombreada e pode aumentar a evapotranspiração. Isso reduz o aquecimento das superfícies e pode atenuar a ilha de calor. Nas duas imagens: '+population(state.pop)+' moradores e '+num(state.precip)+' mm/ano de chuva. Chuva anual é contexto climático, não chuva ocorrendo neste instante.';
 for(const k of ['pop','precip','green']){
 const inp=ctrl.querySelector('[data-u3="'+k+'"]');if(inp)inp.value=state[k];
 }
 for(const [k,v] of [['pop',population(state.pop)],['precip',num(state.precip)+' mm'],['green',Math.round(state.green*100)+'%']]){
 const out=ctrl.querySelector('[data-u3out="'+k+'"]');if(out)out.textContent=v;
 }
}
function build(){
 ctrl.innerHTML='<div class="u3-controls">'+
 '<div class="u3-line"><label for="u3-pop">População</label><input id="u3-pop" data-u3="pop" type="range" min="10000" max="20000000" step="10000"><output data-u3out="pop"></output></div>'+
 '<div class="u3-line"><label for="u3-rain">Chuva anual</label><input id="u3-rain" data-u3="precip" type="range" min="200" max="3000" step="50"><output data-u3out="precip"></output></div>'+
 '<div class="u3-line"><label for="u3-green">Verde</label><input id="u3-green" data-u3="green" type="range" min="0" max=".6" step=".01"><output data-u3out="green"></output></div>'+
 '<div class="u3-city"><button data-city="cac">Cáceres</button><button data-city="cba">Cuiabá</button><button data-city="sp">São Paulo</button></div></div>';
 ctrl.querySelectorAll('[data-u3]').forEach(input=>input.addEventListener('input',()=>{state[input.dataset.u3]=Number(input.value);redraw()}));
 const cities={cac:[95000,1300],cba:[650000,1400],sp:[12000000,1500]};
 ctrl.querySelectorAll('[data-city]').forEach(button=>button.addEventListener('click',()=>{const p=cities[button.dataset.city];state.pop=p[0];state.precip=p[1];redraw()}));
 redraw();
}
slide.title='Ilhas de calor: o efeito das árvores na cidade';
slide.lede='Compare a mesma cidade com pouco e muito verde.';
slide.build=build;
slide.enter=function(){stage.classList.add('u3-on');scene.style.display='block';if(!ctrl.querySelector('.u3-controls'))build();redraw()};
slide.exit=function(){stage.classList.remove('u3-on');scene.style.display='none';if(typeof oldExit==='function'){try{oldExit()}catch(e){}}};
slide.more=function(){return '<h2>Ilha de calor e cobertura verde</h2>'+
 '<p>Árvores produzem sombra e favorecem evapotranspiração. Isso tende a reduzir a temperatura das superfícies e atenuar a ilha de calor. A intensidade depende da disponibilidade de água, do padrão de arborização, do material das superfícies, das condições meteorológicas e da forma da cidade.</p>'+
 '<p><b>Não existe aqui cálculo de quantos graus seriam reduzidos por 60% de verde.</b> Sem medições locais e modelo calibrado, esse número seria invenção. População e chuva média anual são condições de contexto, não preditores suficientes de temperatura em um bairro específico.</p>'+
 '<p>Manoli et al. (2019), <em>Magnitude of urban heat islands largely explained by climate and population</em>, Nature 573, 55–60. <a href="https://doi.org/10.1038/s41586-019-1512-9" target="_blank" rel="noopener">DOI verificável</a>.</p>'};
window.__uhi3={state,redraw};
})();