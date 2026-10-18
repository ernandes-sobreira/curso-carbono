/* Carbono SBFA | melhorias complementares. Não altera os dados científicos anteriores. */
(() => {
  'use strict';
  const app = window.__carbono;
  if (!app || !app.slides) return;
  const $ = id => document.getElementById(id);
  const html = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const media = {
    budget: {
      src:'https://svs.gsfc.nasa.gov/vis/a000000/a004500/a004519/ocogeoscomp.01560_print.jpg',
      alt:'Visualização global da concentração atmosférica de CO₂ gerada pela NASA a partir de OCO-2 e modelo GEOS.',
      caption:'Distribuição atmosférica de CO₂, visualização NASA/GSFC (OCO-2 e GEOS). Dados e representação referem-se a 2014.',
      source:'https://svs.gsfc.nasa.gov/4519/'
    },
    keeling: {
      src:'https://www.noaa.gov/sites/default/files/styles/landscape_width_1275/public/2022-04/2000600p587EDNmain10490mlo_600.png',
      alt:'Foto da estação de monitoramento atmosférico de Mauna Loa no Havaí, com edifícios e domo científico.',
      caption:'Observatório de Mauna Loa. Fotografia NOAA. O cenário ilustra o trabalho de monitoramento; não é um gráfico de medições.',
      source:'https://www.noaa.gov/news/having-dodged-lava-flows-noaas-mauna-loa-research-facility-to-get-upgrades'
    },
    uhi: {
      src:'https://assets.science.nasa.gov/content/dam/science/esd/eo/images/imagerecords/90000/90687/rio_tir_2016239.png/jcr%3Acontent/renditions/cq5dam.web.1280.1280.png',
      alt:'Mapa orbital de temperatura da superfície do Rio de Janeiro obtido por Landsat 8, com áreas quentes claras e áreas frias roxas.',
      caption:'Temperatura da superfície do Rio de Janeiro, 26/08/2016, NASA Earth Observatory/Landsat 8. Temperatura de superfície NÃO é temperatura do ar.',
      source:'https://science.nasa.gov/earth/earth-observatory/climate-proofing-rio-de-janeiro-90687/'
    }
  };
  for (const slide of app.slides) {
    const m=media[slide.id];
    if (m && typeof slide.more==='function') {
      const previous=slide.more.bind(slide);
      slide.more=() => previous() + `<figure class="photo-in-more"><img src="${m.src}" loading="lazy" alt="${html(m.alt)}" referrerpolicy="no-referrer"><figcaption>${html(m.caption)}<br><a href="${m.source}" target="_blank" rel="noopener noreferrer">Fonte e atribuição</a></figcaption></figure>`;
    }
  }
  // Não apresentar o número estadual derivado da participação nacional.
  const scenarios=app.slides.find(s=>s.id==='scen');
  if (scenarios && typeof scenarios.more==='function') {
    const previous=scenarios.more.bind(scenarios);
    scenarios.more=()=>previous()+`<h4>Mato Grosso, atualização verificada</h4><p>O painel de alavancas usa agora os cinco totais setoriais da plataforma SEEG, coleção 13.0, ano 2024, GWP100 AR5. Emissões brutas: 231.174.595,84 tCO₂e. Inclui 125.813.449,47 tCO₂e de mudança de uso da terra e florestas. Remoções: 59.261.547,00 tCO₂e. Para orçamentos de carbono e TCRE, CO₂e de diferentes gases não deve ser tratado como CO₂ acumulado.</p><p><a href="https://plataforma.seeg.eco.br/territorio/mato-grosso" rel="noopener noreferrer" target="_blank">Consulta dos dados estaduais no SEEG</a>. Dados municipais de Cáceres e Cuiabá ainda não estão integrados.</p>`;
  }
  // Navegação acessível: impede que atalhos globais roubem teclas de controles ativos.
  window.addEventListener('keydown', e => {
    const active=document.activeElement;
    const interactive=active && (active.matches('button,input,textarea,select,summary,[contenteditable="true"]') || active.closest('[role="dialog"]'));
    if (interactive && ['ArrowRight','ArrowLeft','PageDown','PageUp',' '].includes(e.key)) e.stopImmediatePropagation();
    if (e.key==='Escape') { $('drawer').classList.remove('open'); }
  },true);
  $('more').setAttribute('aria-controls','drawer');
  $('more').setAttribute('aria-expanded','false');
  $('drawer').setAttribute('role','complementary');
  $('drawer').setAttribute('aria-label','Saiba mais sobre esta tela');
  $('drawerX').setAttribute('aria-label','Fechar explicação');
  const watchDrawer=new MutationObserver(()=>$('more').setAttribute('aria-expanded',$('drawer').classList.contains('open')?'true':'false'));
  watchDrawer.observe($('drawer'),{attributes:true,attributeFilter:['class']});
  // Cada ponto de navegação é apenas decoração; o número da tela é anunciado.
  $('dots').setAttribute('aria-hidden','true');
  $('prev').title='Tela anterior'; $('next').title='Próxima tela';
  $('full').title='Entrar ou sair da tela cheia';
  const fallback=$('nowebgl');
  const fallbackSlide={
    atom: {
      concepts:[['Camadas','<svg viewBox="0 0 580 340" role="img" aria-label="Esquema das camadas K e L do carbono neutro: dois elétrons na primeira e quatro na segunda."><circle cx="290" cy="170" r="66" class="shell"/><circle cx="290" cy="170" r="135" class="shell"/><circle cx="290" cy="170" r="32" fill="#D9553B" opacity=".18" stroke="#D9553B" stroke-width="3"/><text x="290" y="164" text-anchor="middle" font-weight="800">6p⁺</text><text x="290" y="184" text-anchor="middle" font-size="13">6n</text><g fill="#2A78D6"><circle cx="224" cy="170" r="9"/><circle cx="356" cy="170" r="9"/><circle cx="155" cy="170" r="9"/><circle cx="425" cy="170" r="9"/><circle cx="290" cy="35" r="9"/><circle cx="290" cy="305" r="9"/></g><text x="365" y="115">K: 2e⁻</text><text x="435" y="165">L: 4e⁻</text></svg>'],['Configuração','<div class="fallback-equation">1s² 2s² 2p²</div><p>O carbono neutro tem seis prótons e seis elétrons. Quatro elétrons ocupam a camada de valência.</p>']],
      notice:'Esquema didático: círculos não representam órbitas eletrônicas reais. A distribuição quântica exige orbitais e probabilidades.'
    },
    bonds: {
      concepts:[['CO₂','<div class="fallback-equation">O ═ C ═ O</div><p>Molécula linear. Os dois dipolos C=O se cancelam na geometria de equilíbrio.</p>'],['CH₄','<div class="fallback-equation">CH₄</div><p>Quatro ligações C–H. Arranjo tetraédrico tridimensional, não plano.</p>'],['HCN','<div class="fallback-equation">H–C≡N</div><p>Molécula linear, com dipolo elétrico permanente.</p>'],['C₂H₄','<div class="fallback-equation">H₂C═CH₂</div><p>Há uma ligação dupla C=C. Os carbonos têm geometria aproximadamente trigonal plana.</p>']],
      notice:'Representação 2D de conectividade química. Comprimentos, ângulos e densidades eletrônicas não estão em escala.'
    },
    vib: {
      concepts:[['CO₂: flexão','<div class="fallback-equation">↗ O – C – O ↖</div><p>A flexão molecular altera o momento de dipolo. É ativa no infravermelho.</p>'],['CO₂: estiramento simétrico','<div class="fallback-equation">← O ═ C ═ O →</div><p>Para a molécula isolada, o estiramento simétrico é inativo no infravermelho.</p>'],['CH₄','<div class="fallback-equation">CH₄ + IR</div><p>Nem todos os modos vibracionais do metano são ativos no infravermelho. A simetria determina a seleção.</p>']],
      notice:'Ilustração qualitativa. Para frequências espectrais quantitativas, consulte as posições de bandas NIST no painel original.'
    }
  };
  function activeSlide(){return app.slides.find(s=>s.title === $('title').textContent) || app.slides[0];}
  function renderFallback(choice=0) {
    const slide=activeSlide();
    const d=fallbackSlide[slide.id];
    if (!d || app.hasGL) return;
    const chosen=Math.max(0,Math.min(choice,d.concepts.length-1));
    const choices=d.concepts.map(([name],i)=>`<button type="button" class="${i===chosen?'on':''}" data-fallback-choice="${i}" aria-pressed="${i===chosen}">${html(name)}</button>`).join('');
    const content=d.concepts[chosen][1];
    fallback.innerHTML=`<section class="fallback-scene"><div class="fallback-topline"><span class="tag">Versão 2D acessível</span><span>Sem WebGL</span></div><div class="fallback-visual">${content}</div><div class="fallback-buttons" aria-label="Explorar conceitos">${choices}</div><p class="fallback-notice">${html(d.notice)}</p></section>`;
    fallback.querySelectorAll('[data-fallback-choice]').forEach(b=>b.addEventListener('click',()=>renderFallback(Number(b.dataset.fallbackChoice))));
  }
  let oldTitle='';
  const titleWatch=new MutationObserver(()=>{
    const t=$('title').textContent;
    if(t!==oldTitle){oldTitle=t;renderFallback();}
  });
  titleWatch.observe($('title'),{subtree:true,childList:true,characterData:true});
  renderFallback();
  // Uma interação adicional e optativa por tela. Não produz resultados numéricos simulados.
  const challenges={
    atom:['Átomo neutro: o que determina o elemento químico?','O número de prótons.','A quantidade de nêutrons.','A primeira alternativa. Isótopos podem variar no número de nêutrons sem mudar o elemento.'],
    bonds:['Qual propriedade importa para a geometria de CO₂?','A disposição espacial das ligações.','A massa dos átomos isolados.','A primeira alternativa. A molécula é linear no estado fundamental.'],
    vib:['Qual vibração do CO₂ pode absorver infravermelho?','Uma vibração que altera o dipolo.','Qualquer vibração por ter energia.','A primeira alternativa. A atividade no infravermelho exige variação do momento de dipolo.'],
    budget:['O vapor de água, no esquema climático, funciona principalmente como:','Feedback da temperatura.','Emissão industrial primária dominante.','A primeira alternativa. Seu efeito é tratado como feedback, embora existam complexidades locais.'],
    res:['Qual troca pode elevar o CO₂ atmosférico em poucas décadas?','Mobilizar carbono fóssil para a atmosfera.','Apenas comparar o tamanho das rochas.','A primeira alternativa. Fluxos e escalas temporais importam.'],
    keeling:['Por que vemos uma oscilação anual sobre a tendência?','Pela sazonalidade do ciclo terrestre de carbono.','Por uma alternância anual da constante física do CO₂.','A primeira alternativa. A biosfera terrestre, sobretudo do Hemisfério Norte, modula o sinal.'],
    human:['O aquecimento responde mais diretamente a:','Emissões acumuladas de CO₂.','Somente às emissões do último mês.','A primeira alternativa. A aproximação TCRE relaciona aquecimento ao CO₂ acumulado.'],
    uhi:['Uma imagem orbital de temperatura de superfície mede diretamente:','A temperatura radiativa da superfície.','A temperatura do ar a dois metros.','A primeira alternativa. Superfície e ar têm medidas e interpretações diferentes.'],
    scen:['O que separa um cenário SSP de uma previsão meteorológica?','É uma trajetória condicionada a hipóteses.','É o resultado inevitável para uma data.','A primeira alternativa. Cenários exploram futuros condicionais.'],
    quiz:['Como interpretar a contagem de mãos da turma?','Como respostas desta turma.','Como estimativa representativa de toda a população.','A primeira alternativa. A votação da sala não é amostra probabilística.'],
    final:['Que pergunta abre a investigação sobre Mato Grosso?','Onde estão os estoques e como mudam os fluxos?','Qual desenho parece mais chamativo?','A primeira alternativa. Fontes, estoques e fluxos precisam de observação e evidências.']
  };
  const promptButton=document.createElement('button');
  promptButton.id='challenge';promptButton.textContent='Desafio';promptButton.title='Pergunta rápida para esta tela';
  promptButton.setAttribute('aria-label','Abrir desafio desta tela');promptButton.className='more';
  $('more').before(promptButton);
  promptButton.addEventListener('click',()=>{
    const slide=activeSlide(),q=challenges[slide.id];if(!q)return;
    $('drawerBody').innerHTML=`<h2>Uma pergunta para a turma</h2><p><strong>${html(q[0])}</strong></p><div class="challenge-options"><button data-challenge="0">${html(q[1])}</button><button data-challenge="1">${html(q[2])}</button></div><div class="challenge-feedback" aria-live="polite"></div><p class="challenge-label">Interação conceitual autoral. Sem atribuição de valores medidos.</p>`;
    $('drawer').classList.add('open');
    $('drawerBody').querySelectorAll('[data-challenge]').forEach(b=>b.addEventListener('click',()=>{
      $('drawerBody').querySelector('.challenge-feedback').textContent=(b.dataset.challenge==='0'?'Correto. ':'Reveja. ')+q[3];
      $('drawerBody').querySelectorAll('[data-challenge]').forEach(x=>x.disabled=true);
    }));
  });
  // Ajuda de apresentação: pequena legenda de proveniência, sem alterar cálculos numéricos.
  const legend=document.createElement('div'); legend.id='data-legend'; legend.textContent='Visualizações científicas e esquemas didáticos. Detalhes em Veja mais.';
  $('stage').appendChild(legend);
  window.__carbonoEnhanced = { version:'2026-10-18',fallback:renderFallback,media };
})();
