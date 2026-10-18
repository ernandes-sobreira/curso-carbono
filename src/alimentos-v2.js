/* Experiência 10, gráfico acessível de pegadas alimentares sem Canvas comprimido. */
(function(){
"use strict";
const app=window.__carbono,slide=app&&app.slides.find(s=>s.id==="scen");
if(!slide)return;
const stage=document.getElementById("stage"),ctrl=document.getElementById("ctrl");
const source=window.__scen&&window.__scen.scen;
if(!source)return;
const factors=[
 ["Carne bovina (corte)",99.48,1451.2,"Carne bovina (rebanho de corte)"],
 ["Carne bovina (leiteiro)",33.3,2714.3,"Carne bovina (rebanho leiteiro)"],
 ["Carne suína",12.31,1795.8,"Carne suína"],
 ["Frango",9.87,660,"Frango"],
 ["Queijo",23.88,5605.2,"Queijo"],
 ["Leite",3.15,628.2,"Leite"],
 ["Arroz",4.45,2248.4,"Arroz"],
 ["Trigo",1.57,647.5,"Trigo"],
 ["Tofu",3.16,148.6,"Tofu"],
 ["Ovos",4.67,577.7,"Ovos"]
];
const choices=["Frango","Carne suína","Tofu","Ovos"];
const model=window.__scen.scen;
const local={metric:"carbon",all:false,kg:model.personal.beefKg,swap:model.personal.swap};
const f=(n,d=1)=>new Intl.NumberFormat('pt-BR',{maximumFractionDigits:d}).format(n);
const css=document.createElement("style");css.textContent=
"#stage.food2-on #c2d,#stage.food2-on #gl,#stage.food2-on #chart,#stage.food2-on #readout,#stage.food2-on #ctrl{display:none!important}"+
"#stage.food2-on .head{z-index:12;max-width:88%}#stage.food2-on .foot{z-index:12}"+
"#food2{position:absolute;inset:0 0 50px;background:#fff;overflow-y:auto;overscroll-behavior:contain;padding:116px 24px 24px;z-index:8;color:#12233a}"+
"#food2 h2{font:800 clamp(17px,2vw,24px) Sora,sans-serif;line-height:1.2;margin:0 0 6px}"+
"#food2 p{font-size:13px;line-height:1.5;color:#3f5970;margin:7px 0}"+
"#food2 .f2-heading{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;margin-bottom:10px}"+
"#food2 .f2-tabs{display:flex;flex-wrap:wrap;gap:7px}#food2 button{font:700 12px Inter,sans-serif;border:1px solid #c7d8e8;background:#fff;border-radius:999px;padding:9px 13px;color:#32516e;cursor:pointer}"+
"#food2 button[aria-pressed=true]{background:#2a78d6;border-color:#2a78d6;color:#fff}#food2 button:focus-visible{outline:3px solid #0a6b62;outline-offset:2px}"+
"#food2 .f2-grid{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(270px,1fr);gap:14px}"+
"#food2 .f2-panel{min-width:0;background:#fff;border:1px solid #d9e4f0;border-radius:15px;padding:14px}"+
"#food2 .f2-panel-side{background:#f6f9fd}"+
"#food2 .f2-row{display:grid;grid-template-columns:minmax(110px,1fr) minmax(120px,2fr) 95px;gap:10px;align-items:center;border-bottom:1px solid #edf2f7;padding:10px 0}"+
"#food2 .f2-row:last-child{border:0}#food2 .f2-label{font-weight:700;color:#23425d;font-size:12px;line-height:1.3}"+
"#food2 .f2-bar{height:13px;border-radius:10px;background:#e8f0f7;overflow:hidden}#food2 .f2-bar span{height:100%;display:block;min-width:2px;border-radius:10px;background:#2a78d6}"+
"#food2 .f2-bar.water span{background:#0a6b62}#food2 .f2-value{font-size:12px;font-weight:800;text-align:right;font-variant-numeric:tabular-nums}"+
"#food2 .f2-controls{display:grid;gap:9px;margin-top:12px}#food2 .f2-labelrow{display:flex;justify-content:space-between;gap:8px;font-weight:800;color:#244158;font-size:12px}"+
"#food2 input[type=range]{width:100%;accent-color:#2a78d6}#food2 .f2-choices{display:flex;flex-wrap:wrap;gap:7px}"+
"#food2 .f2-answer{font-family:Sora,sans-serif;font-size:clamp(19px,2.2vw,30px);font-weight:800;color:#0a6b62;margin:13px 0 3px;overflow-wrap:anywhere}"+
"#food2 .f2-warn{font-size:11px!important;color:#58718a!important}"+
"@media(max-width:900px){#food2{padding:110px 12px 65px;bottom:48px}#food2 .f2-grid{grid-template-columns:1fr;gap:9px}#food2 .f2-panel{padding:10px}#food2 .f2-row{grid-template-columns:minmax(85px,1fr) minmax(80px,1.3fr) 86px;gap:7px;padding:9px 0}#food2 .f2-label{font-size:11px}#food2 .f2-value{font-size:11px}#food2 h2{font-size:17px}#food2 .f2-heading{gap:7px}#food2 .f2-tabs{gap:5px}#food2 button{font-size:11px;padding:8px 10px}}";
document.head.appendChild(css);
const root=document.createElement("section");root.id="food2";root.hidden=true;
root.innerHTML=
'<div class="f2-heading"><div><h2>Meu prato e minha água</h2><p>Compare um indicador por vez. Valores médios publicados por kg de alimento.</p></div>'+
'<div class="f2-tabs"><button type="button" data-f2-nav="ssp">Cenários IPCC</button><button type="button" data-f2-nav="lev">Alavancas</button></div></div>'+
'<div class="f2-grid"><section class="f2-panel"><div class="f2-heading"><strong id="f2-metric-name"></strong>'+
'<div class="f2-tabs"><button type="button" data-f2-metric="carbon">Emissões</button><button type="button" data-f2-metric="water">Água</button></div></div>'+
'<div id="f2-bars" role="list"></div><button type="button" id="f2-all">Ver todos os alimentos</button>'+
'<p class="f2-warn">Fonte: Poore & Nemecek (2018), Science, via Our World in Data. Média global por kg de produto. Não representa todas as fazendas nem todos os sistemas brasileiros.</p></section>'+
'<aside class="f2-panel f2-panel-side"><h2>E se eu trocar a carne bovina?</h2><p>Comparação aritmética para a mesma massa anual de alimento, sem afirmar equivalência nutricional.</p>'+
'<div class="f2-controls"><div><div class="f2-labelrow"><label for="f2-kg">Quantidade anual</label><output id="f2-kg-label"></output></div>'+
'<input type="range" id="f2-kg" min="0" max="100" step="1" value="37"></div>'+
'<div><div class="f2-labelrow"><span>Trocar por</span></div><div class="f2-choices" id="f2-choices"></div></div></div>'+
'<div class="f2-answer" id="f2-answer"></div><p id="f2-explain"></p><p class="f2-warn">A redução de emissões depende da substituição assumida. Os fatores incluem emissões do ciclo de vida. Água e emissões são indicadores diferentes.</p></aside></div>';
stage.insertBefore(root,stage.querySelector(".hud"));
const byName=name=>factors.find(x=>x[3]===name)||factors.find(x=>x[0]===name);
function redraw(){
 const water=local.metric==="water";
 const metricIndex=water?2:1, unit=water?"L/kg":"kgCO₂e/kg";
 const list=factors.slice().sort((a,b)=>b[metricIndex]-a[metricIndex]).slice(0,local.all?10:5);
 const max=Math.max(...factors.map(x=>x[metricIndex]));
 root.querySelector("#f2-metric-name").textContent=water?"Água utilizada: litros por kg":"Emissões: kgCO₂e por kg";
 root.querySelector("#f2-bars").innerHTML=list.map(x=>
  '<div class="f2-row" role="listitem"><span class="f2-label">'+x[0]+'</span>'+
  '<div class="f2-bar'+(water?' water':'')+'" role="img" aria-label="'+f(x[metricIndex],water?0:2)+' '+unit+'"><span style="width:'+Math.max(1,100*x[metricIndex]/max).toFixed(2)+'%"></span></div>'+
  '<span class="f2-value">'+f(x[metricIndex],water?0:2)+' '+(water?'L':'kg')+'</span></div>'
 ).join("");
 root.querySelector("#f2-all").textContent=local.all?"Mostrar menos":"Ver os 10 alimentos";
 root.querySelectorAll("[data-f2-metric]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.f2Metric===local.metric)));
 root.querySelector("#f2-kg").value=local.kg;
 root.querySelector("#f2-kg-label").textContent=f(local.kg,0)+" kg/ano";
 root.querySelector("#f2-choices").innerHTML=choices.map(x=>
  '<button type="button" data-f2-choice="'+x+'" aria-pressed="'+String(local.swap===x)+'">'+(x==="Carne suína"?"Suíno":x)+'</button>').join("");
 const beef=factors[0],alt=byName(local.swap)||factors[3];
 const dco=local.kg*(beef[1]-alt[1]),dw=local.kg*(beef[2]-alt[2]);
 root.querySelector("#f2-answer").textContent=(dco>=0?"−":"+")+f(Math.abs(dco),0)+" kgCO₂e/ano";
 root.querySelector("#f2-explain").textContent=
  'Ao substituir '+f(local.kg,0)+' kg/ano de carne bovina de corte por '+local.swap.toLowerCase()+', o modelo calcula '+
  (dw>=0?f(dw,0)+' litros de água a menos':f(-dw,0)+' litros de água a mais')+' por ano. Média global, cálculo proporcional à massa.';
}
root.querySelectorAll("[data-f2-metric]").forEach(b=>b.addEventListener("click",()=>{local.metric=b.dataset.f2Metric;redraw()}));
root.querySelector("#f2-all").addEventListener("click",()=>{local.all=!local.all;redraw()});
root.querySelector("#f2-kg").addEventListener("input",e=>{local.kg=Number(e.target.value);model.personal.beefKg=local.kg;redraw()});
root.querySelector("#f2-choices").addEventListener("click",e=>{
 const b=e.target.closest("[data-f2-choice]");if(!b)return;
 local.swap=b.dataset.f2Choice;model.personal.swap=local.swap;redraw();
});
root.querySelectorAll("[data-f2-nav]").forEach(b=>b.addEventListener("click",()=>{
 model.view=b.dataset.f2Nav;
 stage.classList.remove("food2-on");root.hidden=true;
 ctrl.replaceChildren();slide.build();
 const canvas=document.getElementById("c2d");canvas.classList.add("active");canvas.style.display="block";
}));
function sync(){
 const active=model.view==="me";
 stage.classList.toggle("food2-on",active);
 root.hidden=!active;
 if(active){local.kg=model.personal.beefKg;local.swap=model.personal.swap;redraw();}
}
const previousBuild=slide.build,previousEnter=slide.enter,previousExit=slide.exit;
slide.build=function(){previousBuild();sync()};
slide.enter=function(){previousEnter();sync()};
slide.exit=function(){stage.classList.remove("food2-on");root.hidden=true;previousExit()};
ctrl.addEventListener("click",()=>queueMicrotask(sync));
window.__food2={factors,local,sync,redraw};
})();