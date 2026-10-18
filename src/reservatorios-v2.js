(function(){
'use strict';
const api=window.__carbono;
if(!api) throw new Error('Interface Carbono nao encontrada');
const slide=api.slides.find(s=>s.id==='res');
if(!slide) throw new Error('Tela de reservatorios nao encontrada');
const scene=document.getElementById('res');
const ctrl=document.getElementById('ctrl');
const originalCard=document.getElementById('rescard');
const scale=document.getElementById('scale');
const items=[
 ['atm','Atmosfera','870 PgC','CO₂ e CH₄ no ar','O carbono gasoso participa do efeito estufa.','IPCC AR6 WGI, Fig. 5.12 e Tabela 5.1'],
 ['veg','Vegetação','450 PgC','Folhas, troncos e raízes','Plantas incorporam carbono pela fotossíntese.','IPCC AR6 WGI, Fig. 5.12'],
 ['soil','Solos','2.900 PgC','Matéria orgânica no solo','Raízes, restos vegetais e organismos armazenam carbono.','IPCC AR6 WGI, Fig. 5.12'],
 ['ocean','Oceanos','38.700 PgC','Carbono dissolvido na água','O CO₂ entra e sai do oceano. Grande parte fica dissolvida como bicarbonato e carbonato.','IPCC AR6 WGI, Fig. 5.12'],
 ['fossil','Combustíveis fósseis','930 PgC','Carvão, petróleo e gás','A combustão transfere carbono geológico para a atmosfera. Estoque aproximado de reservas recuperáveis.','IPCC AR6 WGI, Fig. 5.12; BGR 2020'],
 ['rock','Rochas','≈ 75 milhões PgC','Carbonatos e sedimentos','O carbono geológico circula muito lentamente. Valor apenas em ordem de grandeza.','Falkowski et al. 2000, DOI:10.1126/science.290.5490.291']
];
const art={
 atm:'<rect width="150" height="72" fill="#dceffc"/><path d="M12 45 Q12 31 29 31 Q41 12 58 27 Q77 16 86 38 Q106 34 110 48 L12 48Z" fill="white"/><text x="16" y="64" font-size="13" font-weight="700" fill="#2068b5">CO₂</text><text x="92" y="24" font-size="12" font-weight="700" fill="#2068b5">CH₄</text>',
 veg:'<rect width="150" height="72" fill="#eaf8e9"/><rect y="58" width="150" height="14" fill="#93cdac"/><path d="M42 27v35M108 32v30" stroke="#855e36" stroke-width="8"/><circle cx="42" cy="27" r="20" fill="#19806a"/><circle cx="26" cy="34" r="13" fill="#2c9970"/><circle cx="108" cy="30" r="20" fill="#36a277"/><circle cx="122" cy="36" r="13" fill="#18705b"/>',
 soil:'<rect width="150" height="72" fill="#eef9e6"/><rect y="18" width="150" height="54" fill="#99734f"/><path d="M0 41h150" stroke="#d6b78b" stroke-width="9"/><path d="M75 18v43m0-15l-19 16m19-21l21 12" stroke="#e8ceb0" stroke-width="3" fill="none"/><path d="M75 22q-23-24-32-10q9 15 32 10m0 0q23-24 34-9q-13 15-34 9" fill="#338a62"/>',
 ocean:'<rect width="150" height="72" fill="#ddf3ff"/><path d="M0 17 Q18 8 36 17 T72 17 T108 17 T150 17 V72H0Z" fill="#327eb6"/><path d="M0 36q19-8 37 0t37 0t38 0t38 0" fill="none" stroke="#a4d9f1" stroke-width="4"/><path d="M58 51q15-13 30 0q-15 12-30 0l-10 7V44z" fill="#d4eff9"/>',
 fossil:'<rect width="150" height="72" fill="#e1eaf0"/><rect y="19" width="150" height="53" fill="#71818b"/><path d="M0 39q38-16 75 0t75 0v25H0z" fill="#263645"/><path d="M0 57q28-7 57 0t56 0t37 0" fill="none" stroke="#d9a76d" stroke-width="4"/><path d="M79 6v38m-13-23h26" stroke="#337598" stroke-width="5" />',
 rock:'<rect width="150" height="72" fill="#edf4f9"/><path d="M0 60L32 28l23 16L84 10l30 31l21-13l15 19v25H0Z" fill="#8195a5"/><path d="M68 29L84 10l17 20l-17-6z" fill="#fff"/><path d="M0 65q40-14 80 0t70 0" stroke="#e1e9f0" stroke-width="6" fill="none"/>'
};
const root=document.createElement('section');
root.id='resv';root.setAttribute('aria-label','Principais reservatórios de carbono');
root.innerHTML='<p class="rv-intro">O carbono também está nas plantas, no solo, no oceano e nas rochas. <b>Toque em cada ambiente.</b></p>'+
'<p class="rv-unit"><b>PgC</b> significa petagrama de carbono: 1 PgC = 1 bilhão de toneladas de carbono.</p>'+
'<div class="rv-layout"><div class="rv-grid">'+items.map(a=>
'<button type="button" class="rv-card" data-rv="'+a[0]+'" aria-pressed="false">'+
'<span class="rv-icon"><svg viewBox="0 0 150 72" aria-hidden="true">'+art[a[0]]+'</svg></span>'+
'<span class="rv-title">'+a[1]+'</span><span class="rv-number">'+a[2]+'</span><span class="rv-label">'+a[3]+'</span></button>').join('')+
'</div><aside class="rv-detail" aria-live="polite"><span class="rv-tag">RESERVATÓRIO SELECIONADO</span>'+
'<h3 id="rv-name"></h3><strong class="rv-big" id="rv-amount"></strong><p id="rv-text"></p>'+
'<p class="rv-source" id="rv-source"></p><strong class="rv-tag">Como o carbono circula?</strong>'+
'<div class="rv-flows"><button data-flow="0" type="button">Ar → planta → solo</button>'+
'<button data-flow="1" type="button">Fósseis → atmosfera</button>'+
'<button data-flow="2" type="button">Atmosfera ↔ oceano</button></div>'+
'<p id="rv-flowtext" class="rv-flowtext">Selecione um percurso.</p></aside></div>'+
'<p class="rv-footer">Desenhos didáticos, não proporcionais. Estoque é quantidade armazenada; fluxo é transferência entre ambientes.</p>';
scene.appendChild(root);
const flows=[
 [['atm','veg','soil'],'A fotossíntese retira CO₂ do ar e forma tecidos vegetais. Parte chega ao solo quando raízes, folhas e organismos morrem.'],
 [['fossil','atm'],'A extração e a queima de carvão, petróleo e gás devolvem carbono geológico à atmosfera em pouco tempo.'],
 [['atm','ocean'],'O oceano absorve e também libera CO₂. Parte do carbono é armazenada na água por muito tempo.']
];
let selected='atm';
function choose(id,mark){
 const a=items.find(x=>x[0]===id);if(!a)return;
 selected=id;
 root.querySelectorAll('.rv-card').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.rv===id)));
 root.querySelector('#rv-name').textContent=a[1];root.querySelector('#rv-amount').textContent=a[2];
 root.querySelector('#rv-text').textContent=a[4];
 root.querySelector('#rv-source').textContent='Fonte: '+a[5];
 if(mark!==false){root.querySelectorAll('[data-flow]').forEach(b=>b.setAttribute('aria-pressed','false'));root.querySelector('#rv-flowtext').textContent='Selecione um percurso.';}
}
root.querySelectorAll('.rv-card').forEach(b=>b.addEventListener('click',()=>choose(b.dataset.rv)));
root.querySelectorAll('[data-flow]').forEach(b=>b.addEventListener('click',()=>{
 const f=flows[Number(b.dataset.flow)];
 root.querySelectorAll('[data-flow]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
 root.querySelectorAll('.rv-card').forEach(x=>x.setAttribute('aria-pressed',String(f[0].includes(x.dataset.rv))));
 root.querySelector('#rv-flowtext').textContent=f[1];
}));
slide.title='Onde está guardado o carbono?';
slide.lede='Compare seis reservatórios e descubra por onde o carbono passa.';
slide.build=function(){ctrl.replaceChildren();originalCard.style.display='none';originalCard.classList.remove('show');scale.style.display='none'};
slide.enter=function(){scene.style.display='block';const gl=document.getElementById('gl');if(gl)gl.style.display='none';choose(selected);};
slide.exit=function(){scene.style.display='none';originalCard.classList.remove('show');scale.style.display='none';const gl=document.getElementById('gl');if(gl&&api.hasGL)gl.style.display='block';};
window.__carbonoReservatorios={select:choose,items,flows};
})();