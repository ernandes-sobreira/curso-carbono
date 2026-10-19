/* Slide 8: a arte aprovada substitui integralmente a antiga simulação. */
(function () {
  'use strict';
  const api=window.__carbono;
  const slide=api&&api.slides.find(s=>s.id==='uhi');
  if(!slide) return;
  const stage=document.getElementById('stage');
  const host=document.getElementById('uhi');
  const ctrl=document.getElementById('ctrl');
  host.replaceChildren();
  const section=document.createElement('section');
  section.className='uhi-image-only';
  section.setAttribute('aria-label','Ilha de calor: pouco verde e muitas árvores');
  section.innerHTML='<figure class="uhi-figure"><img id="uhi-approved-image" src="assets/ilha-calor-arvores.png" alt="Comparação de uma mesma cidade. Com pouco verde, muito concreto exposto e maior ilha de calor. Com mais árvores, mais sombra e evapotranspiração e uma ilha de calor menor."><figcaption>Árvores reduzem o aquecimento urbano por sombra e evapotranspiração. Esquema ilustrativo, sem valores de temperatura.</figcaption></figure><button type="button" id="uhi-zoom" aria-pressed="false" aria-label="Ampliar ou reduzir imagem">Ampliar imagem</button>';
  host.append(section);
  const zoom=section.querySelector('#uhi-zoom');
  const image=section.querySelector('#uhi-approved-image');
  zoom.addEventListener('click',()=>{
    const on=section.classList.toggle('uhi-zoomed');
    zoom.textContent=on?'Mostrar imagem inteira':'Ampliar imagem';
    zoom.setAttribute('aria-pressed',String(on));
    section.scrollTo({top:0,left:0});
  });
  slide.title='Árvores e ilha de calor';
  slide.lede='Mais sombra, menor aquecimento urbano.';
  slide.build=()=>{ctrl.replaceChildren();};
  slide.enter=()=>{
    stage.classList.remove('u3-on','uhi4-on');
    stage.classList.add('uhi-image-slide');
    ctrl.replaceChildren();
    host.style.display='block';
    section.classList.remove('uhi-zoomed');
    zoom.textContent='Ampliar imagem';
    zoom.setAttribute('aria-pressed','false');
  };
  slide.exit=()=>{
    stage.classList.remove('uhi-image-slide');
    host.style.display='none';
  };
  slide.more=()=>'<h2>Como as árvores reduzem a ilha de calor urbana</h2><p>Em áreas urbanizadas, as superfícies expostas absorvem energia solar, armazenam calor e podem manter temperaturas mais altas que o entorno. A arborização cria sombra e, havendo água disponível, favorece evapotranspiração.</p><p>A imagem compara esquematicamente uma cidade com pouco verde e a mesma cidade com mais arborização. Não é um mapa de temperatura nem uma previsão numérica. A forma urbana, a ventilação, o regime hídrico e a distribuição das árvores influenciam o resultado.</p><p><strong>Referência:</strong> Manoli et al. (2019), <em>Magnitude of urban heat islands largely explained by climate and population</em>, Nature 573, 55–60. <a href="https://doi.org/10.1038/s41586-019-1512-9" target="_blank" rel="noopener noreferrer">DOI 10.1038/s41586-019-1512-9</a>.</p><p>Arte didática autoral produzida com IA para esta apresentação. Não representa observação de uma cidade específica.</p>';
  window.__carbonoHeatImage={section,image};
})();