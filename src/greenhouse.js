/* Carbono SBFA: experiência 4 redesenhada. Esquema didático autoral, não modelo de transferência radiativa. */
(() => {
 'use strict';
 const app = window.__carbono;
 if (!app || !Array.isArray(app.slides)) return;
 const budgetSlide=app.slides.find(s=>s.id==='budget');
 if (!budgetSlide) return;
 const $=id=>document.getElementById(id);
 const stage=$('stage');
 const E=document.createElement('section');
 E.id='greenhouse-lesson';
 E.hidden=true;
 E.setAttribute('aria-label','Explicação interativa do efeito estufa');
 E.innerHTML=`
  <div class="gh-shell">
   <div class="gh-graphic">
    <svg viewBox="0 0 960 475" role="img" aria-labelledby="gh-svg-title gh-svg-desc" preserveAspectRatio="xMidYMid meet">
     <title id="gh-svg-title">O caminho da luz do Sol e do infravermelho no efeito estufa</title>
     <desc id="gh-svg-desc">A radiação solar entra, uma parte é refletida ao espaço, a superfície emite infravermelho, gases e nuvens absorvem parte dele e a atmosfera emite infravermelho para cima e para baixo. A figura é conceitual e as larguras das setas não codificam fluxos.</desc>
     <defs>
      <linearGradient id="gh-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".53" stop-color="#e3f6ff"/><stop offset="1" stop-color="#d3edf5"/></linearGradient>
      <linearGradient id="gh-ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#167d73"/><stop offset="1" stop-color="#134960"/></linearGradient>
      <filter id="gh-soft"><feGaussianBlur stdDeviation="14"/></filter>
      <marker id="gh-head-solar" markerWidth="8" markerHeight="8" refX="6" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 Z" fill="#C1880D"/></marker>
      <marker id="gh-head-reflect" markerWidth="8" markerHeight="8" refX="6" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 Z" fill="#367DC6"/></marker>
      <marker id="gh-head-ir" markerWidth="8" markerHeight="8" refX="6" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 Z" fill="#D6533B"/></marker>
     </defs>
     <rect x="0" y="0" width="960" height="475" fill="white"/>
     <path d="M0 124 H960 V357 Q480 309 0 357Z" fill="url(#gh-sky)"/>
     <path d="M0 121 H960" stroke="#a5ddf2" stroke-width="2" stroke-dasharray="5 7"/>
     <text x="932" y="105" text-anchor="end" class="gh-svg-caption">ESPAÇO</text>
     <text x="930" y="146" text-anchor="end" class="gh-svg-caption">ATMOSFERA</text>
     <g class="gh-part" data-gh-part="solar">
      <circle cx="116" cy="100" r="49" fill="#F3B83E" opacity=".14" filter="url(#gh-soft)"/>
      <circle cx="116" cy="100" r="36" fill="#F8C34F"/>
      <circle cx="116" cy="100" r="26" fill="#FFE5A3"/>
      <g stroke="#E6A92E" stroke-width="3" stroke-linecap="round" opacity=".9">
       <path d="M116 51V38M116 149v13M67 100H54M165 100h13M81 65l-9-9M151 135l10 10M151 65l10-9M81 135l-9 10"/>
      </g>
      <path class="gh-ray gh-ray-solar" d="M168 128 L322 347" stroke="#C1880D" stroke-width="7" marker-end="url(#gh-head-solar)"/>
      <text x="188" y="91" class="gh-raylabel">LUZ DO SOL</text>
      <text x="188" y="112" class="gh-rayhelp">radiação de onda curta</text>
     </g>
     <g class="gh-part" data-gh-part="reflection">
      <path class="gh-ray gh-ray-reflect" d="M340 339 Q401 227 472 78" stroke="#367DC6" stroke-width="6" marker-end="url(#gh-head-reflect)"/>
      <text x="412" y="69" class="gh-raylabel" fill="#286DAE">REFLEXÃO</text>
      <text x="402" y="92" class="gh-rayhelp">parte volta ao espaço</text>
      <path d="M283 231q15-20 32-2q16-12 30 8q20-7 32 9q-8 15-35 14h-49q-21-10-10-29" fill="#fff" stroke="#b0d9ec" stroke-width="2" opacity=".9"/>
     </g>
     <g class="gh-part" data-gh-part="surface">
      <path d="M506 348 Q510 308 531 288T538 231T554 172" class="gh-ray gh-ray-ir" stroke="#D6533B" stroke-width="7" fill="none" marker-end="url(#gh-head-ir)"/>
      <text x="478" y="172" class="gh-raylabel" fill="#ad3c2d">INFRAVERMELHO</text>
      <text x="480" y="192" class="gh-rayhelp">emitido pela superfície</text>
     </g>
     <g class="gh-part" data-gh-part="gases">
      <circle cx="575" cy="216" r="80" fill="#F5A185" opacity=".10"/>
      <g class="gh-mol" transform="translate(575 214)" aria-hidden="true">
       <circle cx="0" cy="0" r="12" fill="#454F64"/><circle cx="-28" cy="0" r="11" fill="#DD5B43"/><circle cx="28" cy="0" r="11" fill="#DD5B43"/>
       <path d="M-17 -5h-4M17 -5h4M-17 5h-4M17 5h4" stroke="#454F64" stroke-width="3"/>
      </g>
      <text x="575" y="260" text-anchor="middle" class="gh-rayhelp">CO₂ + H₂O + CH₄ + nuvens</text>
      <path d="M594 198 Q660 144 700 70" class="gh-ray gh-ray-ir" stroke="#D6533B" stroke-width="5" marker-end="url(#gh-head-ir)"/>
      <path d="M613 227 Q700 294 727 352" class="gh-ray gh-ray-ir gh-down" stroke="#D6533B" stroke-width="6" marker-end="url(#gh-head-ir)"/>
      <text x="709" y="160" class="gh-raylabel" fill="#ad3c2d">IR PARA O ESPAÇO</text>
      <text x="730" y="307" class="gh-raylabel" fill="#ad3c2d">IR PARA BAIXO</text>
      <text x="738" y="328" class="gh-rayhelp">emissão atmosférica</text>
     </g>
     <g class="gh-part" data-gh-part="co2">
      <g class="gh-extra-mol" opacity="0"><circle cx="634" cy="194" r="5" fill="#D6533B"/><circle cx="661" cy="238" r="6" fill="#D6533B"/><circle cx="704" cy="204" r="5" fill="#D6533B"/><circle cx="754" cy="243" r="5" fill="#D6533B"/></g>
     </g>
     <g class="gh-ground">
      <path d="M0 351 Q184 330 340 358 T640 356 T960 339 V475 H0Z" fill="url(#gh-ground)"/>
      <path d="M0 357 Q181 340 340 364 T640 364 T960 345" fill="none" stroke="#b9dfc4" stroke-width="4"/>
      <path d="M0 400 Q160 395 255 427 T548 404 T960 407 V475 H0Z" fill="#1a6680" opacity=".35"/>
      <g fill="#b2ded1" opacity=".45"><path d="M37 352q15-37 32 1ZM84 353q19-59 38 4ZM858 350q18-54 40 1ZM904 344q18-41 36 0Z"/></g>
      <text x="480" y="400" text-anchor="middle" fill="#fff" class="gh-surface-title">SUPERFÍCIE DA TERRA</text>
      <text x="480" y="426" text-anchor="middle" fill="#d2eee9" class="gh-surface-note">absorve luz e emite calor na forma de radiação infravermelha</text>
     </g>
     <g class="gh-legend-svg" aria-hidden="true"><circle cx="28" cy="451" r="5" fill="#C1880D"/><text x="41" y="456">SOLAR</text><circle cx="139" cy="451" r="5" fill="#367DC6"/><text x="152" y="456">REFLETIDA</text><circle cx="280" cy="451" r="5" fill="#D6533B"/><text x="293" y="456">INFRAVERMELHO</text></g>
    </svg>
    <div class="gh-diagram-note">Esquema conceitual, sem proporção entre os fluxos ou cálculo de trajetória dos fótons.</div>
   </div>
   <div class="gh-panel">
    <p class="gh-overline">O MECANISMO EM 5 ETAPAS</p>
    <h2 id="gh-step-title">A atmosfera também emite infravermelho</h2>
    <p id="gh-step-desc">Os gases de efeito estufa absorvem parte do infravermelho e emitem radiação em todas as direções. Parte retorna à superfície, que fica mais quente do que ficaria sem esse efeito.</p>
    <div class="gh-stagebuttons" role="group" aria-label="Etapas do efeito estufa">
     <button type="button" data-gh-step="0">1 · Sol</button>
     <button type="button" data-gh-step="1">2 · Reflexão</button>
     <button type="button" data-gh-step="2">3 · Calor</button>
     <button type="button" data-gh-step="3">4 · Gases</button>
     <button type="button" data-gh-step="4">5 · Mais CO₂</button>
    </div>
    <div class="gh-compare">
     <div class="gh-small-label">Compare a concentração dos gases</div>
     <div class="gh-presets" role="group" aria-label="Concentração para comparar">
      <button data-gh-preset="1750">1750</button><button data-gh-preset="2019">2019</button><button data-gh-preset="2x">2 × CO₂</button>
     </div>
     <div class="gh-kpi"><strong id="gh-co2-value">410 ppm de CO₂</strong><span id="gh-forcing">Forçamento calculado em relação a 1750</span></div>
    </div>
    <details class="gh-numbers">
     <summary>O que significam os números do IPCC?</summary>
     <p><strong>340 W/m²</strong> é a radiação solar média que chega ao topo da atmosfera; aproximadamente <strong>100 W/m²</strong> são refletidos. Aproximadamente <strong>240 W/m²</strong> são absorvidos pelo sistema terrestre.</p>
     <p><strong>398 W/m²</strong> é a emissão térmica da superfície e <strong>342 W/m²</strong> a radiação térmica descendente da atmosfera. Não são números que se subtraem isoladamente para obter o aquecimento.</p>
     <p>Fluxos médios globais de início do século XXI, adaptados do IPCC AR6, Figura 7.2. O forçamento adicional da comparação acima é outra grandeza, não o fluxo solar total.</p>
    </details>
   </div>
  </div>`;
 stage.appendChild(E);
 const mini=document.createElement('div');
 mini.className='gh-mobile-visual';
 mini.innerHTML=`<svg viewBox="0 0 390 320" role="img" aria-labelledby="ghm-title ghm-desc">
  <title id="ghm-title">Efeito estufa, esquema para celular</title>
  <desc id="ghm-desc">Raios amarelos representam energia solar entrando, azul a parte refletida; infravermelho vermelho sai da superfície. A atmosfera absorve parte e emite infravermelho tanto para cima quanto para baixo.</desc>
  <defs>
   <linearGradient id="ghm-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#dff4ff"/></linearGradient>
   <linearGradient id="ghm-ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#148276"/><stop offset="1" stop-color="#174960"/></linearGradient>
   <marker id="ghm-yellow" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6Z" fill="#B5810B"/></marker>
   <marker id="ghm-blue" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6Z" fill="#307AC0"/></marker>
   <marker id="ghm-orange" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6Z" fill="#CF553D"/></marker>
  </defs>
  <rect width="390" height="320" fill="#fff"/>
  <path d="M0 79H390V272Q195 253 0 272Z" fill="url(#ghm-sky)"/>
  <path d="M0 81H390" fill="none" stroke="#9fdaf3" stroke-width="2" stroke-dasharray="6 6"/>
  <text x="376" y="98" class="ghm-lightlabel" text-anchor="end">ATMOSFERA</text>
  <g class="gh-part" data-gh-part="solar">
   <circle cx="53" cy="54" r="27" fill="#FFE4A4" stroke="#EFC25B" stroke-width="2"/>
   <path d="M53 18v-9M53 90v8M17 54H9M88 54h9M27 28l-6-6M79 79l6 6M79 28l7-7M26 79l-7 7" stroke="#DAA938" stroke-width="2.5" stroke-linecap="round"/>
   <text x="95" y="41" class="ghm-label">SOL</text>
   <text x="95" y="57" class="ghm-small">luz visível</text>
   <path d="M77 86L137 265" class="gh-ray" stroke="#B5810B" stroke-width="6" marker-end="url(#ghm-yellow)"/>
  </g>
  <g class="gh-part" data-gh-part="reflection">
   <path d="M142 263Q167 162 184 45" class="gh-ray" stroke="#307AC0" stroke-width="5" marker-end="url(#ghm-blue)"/>
   <text x="194" y="26" class="ghm-label" text-anchor="middle">REFLETIDA</text>
   <text x="198" y="41" class="ghm-small" text-anchor="middle">volta ao espaço</text>
  </g>
  <g class="gh-part" data-gh-part="surface">
   <path d="M219 272Q202 249 221 224T222 174" class="gh-ray" stroke="#CF553D" stroke-width="6" marker-end="url(#ghm-orange)"/>
   <text x="174" y="183" class="ghm-label ghm-red" text-anchor="end">IR DA</text>
   <text x="174" y="198" class="ghm-label ghm-red" text-anchor="end">TERRA</text>
  </g>
  <g class="gh-part" data-gh-part="gases">
   <circle cx="246" cy="166" r="33" fill="#e9dff7" opacity=".55"/>
   <circle cx="246" cy="166" r="9" fill="#566578"/>
   <circle cx="225" cy="166" r="8" fill="#D6533B"/>
   <circle cx="267" cy="166" r="8" fill="#D6533B"/>
   <path d="M235 162h-4M256 162h4M235 171h-4M256 171h4" stroke="#566578" stroke-width="2"/>
   <text x="246" y="212" text-anchor="middle" class="ghm-label">CO₂, H₂O, CH₄</text>
   <path d="M266 146Q293 112 312 53" class="gh-ray" stroke="#CF553D" stroke-width="5" marker-end="url(#ghm-orange)"/>
   <text x="310" y="23" class="ghm-label ghm-red" text-anchor="middle">IR SAI</text>
   <path d="M277 172Q341 192 351 266" class="gh-ray" stroke="#CF553D" stroke-width="6" marker-end="url(#ghm-orange)"/>
   <text x="340" y="232" class="ghm-label ghm-red" text-anchor="end">IR DESCE</text>
  </g>
  <g data-gh-part="co2" class="gh-part gh-extra-mol" opacity="0"><circle cx="288" cy="173" r="4" fill="#d6533b"/><circle cx="301" cy="185" r="4" fill="#d6533b"/><circle cx="317" cy="170" r="4" fill="#d6533b"/></g>
  <path d="M0 270Q195 255 390 270V320H0Z" fill="url(#ghm-ground)"/>
  <path d="M0 270Q195 255 390 270" stroke="#92cfbc" stroke-width="3" fill="none"/>
  <text x="195" y="294" class="ghm-earth-title" fill="white" text-anchor="middle">SUPERFÍCIE DA TERRA</text>
  <text x="195" y="309" class="ghm-earth-note" text-anchor="middle">recebe luz · emite infravermelho</text>
 </svg>`;
 E.querySelector('.gh-graphic svg').after(mini);
 const legend=document.createElement('div');
 legend.className='gh-color-legend';
 legend.innerHTML='<span><i class="gh-solar-dot"></i>Luz solar</span><span><i class="gh-reflect-dot"></i>Luz refletida</span><span><i class="gh-ir-dot"></i>Infravermelho</span>';
 mini.after(legend);

 const steps=[
  ['A luz do Sol chega à Terra','Grande parte da radiação solar atravessa a atmosfera e aquece o solo e os oceanos. Luz solar é majoritariamente radiação de onda curta.',['solar']],
  ['Nem toda a luz é absorvida','Nuvens, aerossóis e superfícies claras refletem parte da radiação solar de volta ao espaço. Reflexão da luz solar não é efeito estufa.',['solar','reflection']],
  ['A superfície emite infravermelho','A Terra aquecida emite radiação térmica, principalmente infravermelho. Não são barras de calor sólido: são fluxos de energia por radiação.',['surface']],
  ['A atmosfera absorve e emite radiação','CO₂, vapor de água, CH₄ e nuvens absorvem radiação infravermelha em determinadas bandas e emitem infravermelho em várias direções. A emissão para baixo contribui para aquecer a superfície.',['surface','gases']],
  ['Mais CO₂ altera o balanço radiativo','Com mais CO₂, mudam a absorção e a emissão no infravermelho. Inicialmente diminui a energia que escapa para o espaço, para a mesma temperatura. O sistema aquece até ajustar seu balanço.',['surface','gases','co2']]
 ];
 const examples={
  '1750':{co2:277.15,ch4:731.41,n2o:273.87,caption:'Concentrações de referência pré-industriais'},
  '2019':{co2:409.85,ch4:1866.3,n2o:332.1,caption:'Concentrações de 2019, usadas no AR6'},
  '2x':{co2:554.3,ch4:731.41,n2o:273.87,caption:'Experimento: CO₂ duplicado, demais gases em 1750'}
 };
 let currentStep=3, currentPreset='2019';
 function setStep(n){
  currentStep=n;
  $('gh-step-title').textContent=steps[n][0];
  $('gh-step-desc').textContent=steps[n][1];
  E.dataset.step=String(n);
  E.querySelectorAll('[data-gh-step]').forEach(b=>{let active=Number(b.dataset.ghStep)===n;b.classList.toggle('is-active',active);b.setAttribute('aria-pressed',String(active))});
  E.querySelectorAll('[data-gh-part]').forEach(g=>{const key=g.dataset.ghPart;g.classList.toggle('gh-muted',!steps[n][2].includes(key))});
  E.querySelectorAll('.gh-extra-mol').forEach(m=>m.style.opacity=n===4?'1':'0');
 }
 function setPreset(id){
  currentPreset=id;
  const v=examples[id];
  app.budget.conc={co2:v.co2,ch4:v.ch4,n2o:v.n2o};
  // Calcular com os coeficientes já presentes no app original, sem criar números novos.
  const f=app.forcing(app.budget.conc,true);
  app.budget.f=f;
  $('gh-co2-value').textContent=`${v.co2.toLocaleString('pt-BR',{maximumFractionDigits:1})} ppm de CO₂`;
  $('gh-forcing').textContent=`ΔF = ${f.total>=0?'+':''}${f.total.toFixed(2).replace('.',',')} W/m² vs. 1750 · CO₂, CH₄ e N₂O`;
  $('gh-forcing').title='Forçamento radiativo efetivo aproximado dos três gases, calculado pelo modelo anterior. Não equivale à temperatura observada.';
  E.querySelectorAll('[data-gh-preset]').forEach(b=>{const on=b.dataset.ghPreset===id;b.classList.toggle('is-active',on);b.setAttribute('aria-pressed',String(on))});
 }
 E.querySelectorAll('[data-gh-step]').forEach(b=>b.addEventListener('click',()=>setStep(Number(b.dataset.ghStep))));
 E.querySelectorAll('[data-gh-preset]').forEach(b=>b.addEventListener('click',()=>setPreset(b.dataset.ghPreset)));
 budgetSlide.title='Como funciona o efeito estufa?';
 budgetSlide.lede='Acompanhe o caminho da luz do Sol e do infravermelho. Toque nas etapas.';
 budgetSlide.ref='Esquema didático autoral · NASA Earth Observatory · IPCC AR6 WGI Fig. 7.2';
 budgetSlide.build=function(){
  // A cena didática usa SVG; não inicializa uma GPU extra ou o antigo globo nessa tela.
  const ctrl=$('ctrl');ctrl.innerHTML='';
  $('readout').innerHTML='';
  setStep(3);setPreset('2019');
 };
 budgetSlide.enter=function(){
  stage.classList.add('budget-redesign');
  E.hidden=false;
  app.budget.view='cut';
 };
 budgetSlide.exit=function(){
  stage.classList.remove('budget-redesign');
  E.hidden=true;
 };
 budgetSlide.more=function(){
  const f=app.forcing(app.budget.conc,true);
  return `<h2>Como o efeito estufa funciona?</h2>
  <p>A luz solar chega à superfície. Uma parte é refletida ao espaço por nuvens e pelo planeta. A superfície aquecida emite infravermelho. CO₂, vapor de água, metano e nuvens absorvem radiação em partes do espectro infravermelho. A atmosfera também emite infravermelho para cima e para baixo. Essa emissão descendente integra o balanço de energia que mantém a superfície mais aquecida.</p>
  <h4>O que as setas representam</h4><p><strong>Amarela:</strong> radiação solar de onda curta. <strong>Azul:</strong> radiação solar refletida. <strong>Vermelho:</strong> emissão de radiação térmica infravermelha. As setas não indicam velocidade, número de fótons nem intensidade; são um esquema didático, não a simulação de trajetórias individuais.</p>
  <h4>Números, sem misturar grandezas</h4><p>A Figura 7.2 do IPCC AR6 descreve fluxos médios globais do início do século XXI. A radiação solar incidente no topo da atmosfera é de aproximadamente 340 W m⁻² e a refletida de 100 W m⁻². A superfície emite cerca de 398 W m⁻² e recebe aproximadamente 342 W m⁻² de radiação térmica descendente. O balanço completo também inclui absorção de luz na atmosfera, evaporação, calor sensível e outros fluxos.</p>
  <p>O valor calculado no controle <strong>ΔF = ${f.total>=0?'+':''}${f.total.toFixed(2)} W m⁻²</strong> compara as concentrações selecionadas com a referência pré-industrial de 1750 para CO₂, CH₄ e N₂O. Isso é um <em>forçamento radiativo adicional aproximado</em>, não a potência da luz solar, o calor armazenado ou a elevação observada de temperatura.</p>
  <h4>Uma distinção fundamental</h4><p>Os gases não atuam como um espelho que rebate todo o calor. A física envolve absorção e emissão espectral de infravermelho, colisões, perfis verticais de temperatura e transferência radiativa. O efeito estufa natural é essencial. O aumento antropogênico da concentração de gases intensifica o efeito e perturba o balanço radiativo.</p>
  <h4>Fontes</h4><p><a href="https://science.nasa.gov/earth/earth-observatory/climate-and-earths-energy-budget/" target="_blank" rel="noopener noreferrer">NASA Earth Observatory, Earth's Energy Budget</a>.<br><a href="https://www.ipcc.ch/report/ar6/wg1/figures/chapter-7/figure-7-2/" target="_blank" rel="noopener noreferrer">IPCC AR6 WGI, Figura 7.2</a>.<br><a href="https://doi.org/10.5194/gmd-13-3571-2020" target="_blank" rel="noopener noreferrer">Meinshausen et al., cálculos de forçamento radiativo</a>. As concentrações dos exemplos foram preservadas do HTML original.</p>`;
 };
 window.__carbonoGreenhouse={setStep,setPreset,steps,examples};
})();
