/* Substituição definitiva do slide 8. 
 * O overlay independente cobre cabeçalho e réguas legados, inclusive sob hash/deep link.
 */
(function(){
'use strict';
const api=window.__carbono;
const slide=api?.slides?.find(s=>s.id==='uhi');
if(!slide)return;
const stage=document.getElementById('stage');
const oldHost=document.getElementById('uhi');
// A paisagem antiga, suas réguas e cartões não fazem mais parte desta experiência.
oldHost.replaceChildren();
const ctrl=document.getElementById('ctrl');
const oldExit=slide.exit;
const slideIdx=api.slides.indexOf(slide);
const cover=document.createElement('section');
cover.id='heat-slide-cover';
cover.setAttribute('aria-label','Experiência 8: árvores e ilhas de calor');
cover.innerHTML='<div class="heat-main">'+
 '<span class="heat-kicker">Experiência 8 · Física ambiental</span>'+
 '<h2 class="heat-title">Mais árvores, menor ilha de calor</h2>'+
 '<img class="heat-graphic" id="heat-graphic" src="assets/ilha-calor-arvores.png" alt="Comparação ilustrada. Pouco verde e mais concreto deixam a cidade mais quente. Árvores aumentam a sombra, favorecem a evapotranspiração e reduzem a ilha de calor." decoding="async">'+
 '</div>'+
 '<footer class="heat-footer"><span class="heat-footnote">Esquema didático, sem valores de temperatura. A eficácia da arborização depende também da água disponível.</span>'+
 '<nav class="heat-nav" aria-label="Navegação da apresentação">'+
 '<button type="button" data-heat-action="prev" aria-label="Slide anterior">‹</button>'+
 '<button type="button" data-heat-action="zoom" class="heat-primary">Ampliar imagem</button>'+
 '<button type="button" data-heat-action="more">Veja mais</button>'+
 '<button type="button" data-heat-action="next" aria-label="Próximo slide">›</button>'+
 '</nav></footer>'+
 '<div class="heat-zoom" id="heat-zoom" aria-hidden="true">'+
 '<button type="button" class="heat-zoom-close" data-heat-action="close">Fechar imagem ampliada</button>'+
 '<img src="assets/ilha-calor-arvores.png" alt="Ilustração ampliada de uma cidade com pouco verde versus a mesma cidade com muitas árvores.">'+
 '</div>';
stage.appendChild(cover);
const zoom=cover.querySelector('#heat-zoom');
const title=document.getElementById('title');
const drawer=document.getElementById('drawer');
let current=false;
function closeZoom(){
 zoom.classList.remove('open');
 zoom.setAttribute('aria-hidden','true');
}
function show(){
 if(current)return;
 current=true;
 cover.classList.add('active');
 ctrl.replaceChildren();
 closeZoom();
}
function hide(){
 if(!current)return;
 current=false;
 cover.classList.remove('active');
 closeZoom();
}
function sync(){
 const visible=window.getComputedStyle(oldHost).display!=='none';
 if(visible)show(); else hide();
}
function jump(offset){
 closeZoom();
 hide();
 api.go(slideIdx+offset);
}
cover.addEventListener('click',ev=>{
 const b=ev.target.closest('[data-heat-action]');
 if(!b){
  if(ev.target.id==='heat-graphic') zoom.classList.add('open'),zoom.setAttribute('aria-hidden','false');
  return;
 }
 const action=b.dataset.heatAction;
 if(action==='zoom'){zoom.classList.add('open');zoom.setAttribute('aria-hidden','false')}
 if(action==='close')closeZoom();
 if(action==='prev')jump(-1);
 if(action==='next')jump(1);
 if(action==='more'){
  const more=document.getElementById('more');
  const body=document.getElementById('drawerBody');
  if(body)body.innerHTML=slide.more();
  if(drawer){drawer.style.zIndex='11000';drawer.classList.add('open')}
  if(more)more.setAttribute('aria-expanded','true');
 }
});
window.addEventListener('keydown',e=>{if(e.key==='Escape'&&zoom.classList.contains('open')){closeZoom();e.stopImmediatePropagation()}},true);
slide.title='Árvores e ilha de calor';
slide.lede='Mais sombra e evapotranspiração, menor aquecimento urbano.';
slide.build=()=>{ctrl.replaceChildren()};
slide.enter=()=>{oldHost.style.display='block';show()};
slide.exit=()=>{hide();oldHost.style.display='none'};
slide.more=()=>'<h2>Por que as árvores reduzem o aquecimento urbano?</h2>'+
'<p>Copas interceptam a luz solar, reduzem a energia absorvida pela superfície e, quando há água disponível, favorecem a evapotranspiração. O resultado depende também de ventilação, materiais e distribuição da cobertura verde.</p>'+
'<p>Ilha de calor não é sinônimo de efeito estufa: aqui comparamos microclimas urbanos. Esta ilustração não é um mapa de temperatura nem uma previsão em graus Celsius.</p>'+
'<p>Referência: <a target="_blank" rel="noopener noreferrer" href="https://doi.org/10.1038/s41586-019-1512-9">Manoli et al. (2019), Nature 573, 55–60</a>. Ilustração didática autoral gerada com IA, sem dados espaciais medidos.</p>';
const observer=new MutationObserver(sync);
observer.observe(oldHost,{attributes:true,attributeFilter:['style','class']});
const marker=document.getElementById('eyebrow');
if(marker)observer.observe(marker,{childList:true,subtree:true});
sync();
window.__heatSlide={show,hide,sync,cover};
})();