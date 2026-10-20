# Carbono SBFA: proveniência dos valores e alterações (18/10/2026)

## Limitação da fonte entregue

Recebido apenas `Carbono_SBFA_index.html`, código já empacotado (Three.js r169 incluído). `FONTES.md` e arquivos `src/` originais mencionados no pedido não foram entregues. Portanto, a auditoria de **todos os números, célula a célula, não foi possível**. O JavaScript original foi preservado em `src/carbono-original.bundle.js` e as substituições implementadas com verificações rígidas de trechos em `build.mjs`.

## Mudanças numéricas efetivadas

1. **Mato Grosso, emissões brutas.** Removido o total derivado (`13% × 2.296 MtCO₂e`), substituído por **231.174.595,84 tCO₂e**, ou **231,17459584 MtCO₂e** no código. Fonte primária: SEEG, plataforma território Mato Grosso, **coleção 13.0, 2024, GWP-AR5**, https://plataforma.seeg.eco.br/territorio/mato-grosso . Motivo: total absoluto disponível, diferente de usar participação de MT no total nacional de outro ano.
2. **Setores de Mato Grosso, mesma base temporal e métrica**, incluindo mudança de uso da terra e florestas: `125.813.449,47 tCO₂e`; agropecuária `88.866.389,38`; energia `14.041.554,38`; resíduos `1.907.860,20`; processos industriais `545.342,41`. Todos 2024, GWP-AR5, mesma fonte. Remoções separadas `59.261.547,00 tCO₂e`; emissões líquidas `171.913.048,84 tCO₂e`. A plataforma publica os valores com essa precisão; não interpolados. Transcrição documentada em `data_raw`.
3. **Alavancas e orçamento de carbono.** Preservado cálculo pedagógico das emissões evitadas em CO₂e; retirada a apresentação do percentual de orçamento de CO₂ e do aquecimento por TCRE sobre CO₂e multigás. Não há novo número de temperatura. Motivo: TCRE refere-se ao **CO₂ acumulado**, não a uma mistura de gases em CO₂e; a equivalência requer tratamento de métricas de emissões e dinâmica climática. Referência de princípio: IPCC AR6 WG1, capítulo 5, https://www.ipcc.ch/report/ar6/wg1/chapter/chapter-5/ .
4. **Feedback de vapor d'água e gradiente térmico.** Alterado rótulo de controle e explicação para deixar explícito que **+1,30 W m⁻² °C⁻¹ é o feedback combinado WV+LR**, não o de vapor d'água isoladamente. O valor numérico do modelo original **não foi alterado**, pois corresponde ao AR6 WG1 cap. 7, Tab. 7.10, https://www.ipcc.ch/report/ar6/wg1/chapter/chapter-7/ .

## Referências externas verificadas

- **IPCC AR6 WG1, Figura 5.12** https://www.ipcc.ch/report/ar6/wg1/figures/chapter-5/figure-5-12/ . Compara estoques e fluxos pré-industriais e alterações antropogênicas; o capítulo 5 contém balanços. **Números transcritos do arquivo HTML ainda requerem checagem pontual contra figura legível**.
- **IPCC AR6 WG1, capítulo 7, Figura 7.2 / Tabela 7.10** https://www.ipcc.ch/report/ar6/wg1/chapter/chapter-7/ . Verificada a referência do feedback combinado WV+LR +1,30 (não valor isolado).
- **Oke, T. R. (1973)**, *City size and the urban heat island*, Atmospheric Environment 7:769–779, DOI: https://doi.org/10.1016/0004-6981(73)90140-6 . As expressões **2,96 log₁₀(P) − 6,41 (América do Norte)** e **2,01 log₁₀(P) − 4,06 (Europa)** aparecem reproduzidas em literatura posterior, como Torok et al. (2001), https://www.regionalclimateperspectives.com/uploads/4/4/2/5/44250401/post6australiauhiscaling.pdf . **Não houve inspeção direta da tabela/regressão do manuscrito original**; não se inseriram coeficientes como se tivessem sido reextraídos do original.
- **Villela et al. (2026)**, *Soil carbon debt from land use change in Brazil*, Nature Communications 17:1626, https://doi.org/10.1038/s41467-026-68340-4 . Publicado e pertinente às consequências de mudança de uso da terra nos estoques de carbono do solo brasileiro. Recomendado para etapa de solos e Pantanal, não para reparametrizar balanço radiativo global.
- **Huang et al. (2024)**, *Land Use Change Alters Soil Organic Carbon: Constrained Global Patterns and Predictors*, Earth's Future 12:e2023EF004254, https://doi.org/10.1029/2023EF004254 . Publicado e pertinente à resposta de carbono do solo à conversão de cobertura em diferentes biomas. Não transcrever os resultados quantitativos sem especificar profundidade, grupo e incerteza.

## Mantidos do arquivo original, ainda não revalidados número por número

- Posições de bandas moleculares atribuídas ao NIST, modelos de orbitais e Z efetivo.
- Estimativas e faixas de stocks e fluxos preindustriais/IPCC, balanço de energia, forçamento radiativo e temperatura de equilíbrio, Planck.
- Séries Keeling/NOAA e GISTEMP/NASA, curvas acumuladas GCP, SSP, emissões e consumo de países, multiplicadores alimentares globais e parâmetros da figura de ilha de calor.

Até recuperar `FONTES.md` original e os CSVs, esses itens são **citações herdadas do HTML**, não certificações desta revisão.


## Tela 4, revisão do efeito estufa (18/10/2026)

**Distinção de processos**: NASA Earth Observatory, *Climate and Earth’s Energy Budget*, https://science.nasa.gov/earth/earth-observatory/climate-and-earths-energy-budget/. Radiação solar de onda curta chega à superfície; uma parte é refletida; a superfície aquecida emite infravermelho; moléculas de gases de efeito estufa absorvem e emitem infravermelho em várias direções, incluindo emissão descendente. O diagrama é **esquema didático autoral** sem significado quantitativo para comprimento, largura, quantidade ou frequência das setas.

**Fluxos numéricos exibidos sob expansão**: 340 W m⁻² solar incidente no topo da atmosfera, aproximadamente 100 W m⁻² refletido; superfície emitindo 398 W m⁻² de infravermelho e recebendo 342 W m⁻² de radiação térmica descendente. IPCC AR6 WGI, capítulo 7, Figura 7.2: https://www.ipcc.ch/report/ar6/wg1/figures/chapter-7/figure-7-2/. Valores do início do século XXI; não são a perturbação radiativa relativa a 1750.

**Concentrações para interação**: valores preservados do HTML original: 1750 CO₂ 277,15 ppm, CH₄ 731,41 ppb, N₂O 273,87 ppb; 2019 CO₂ 409,85 ppm, CH₄ 1866,3 ppb, N₂O 332,1 ppb; duplicação de CO₂: 554,3 ppm, com demais gases fixos na referência de 1750. Não são medições de 2026. O cálculo ΔF reutiliza as funções compiladas no aplicativo original, baseadas nas expressões do IPCC AR6 WGI, Tabela 7.SM.1. Artigo correspondente: Meinshausen et al. (2020), *The shared socio-economic pathway (SSP) greenhouse gas concentrations and their extensions to 2500*, GMD 13, 3571–3605, https://doi.org/10.5194/gmd-13-3571-2020.

**Correção de DOI**: `10.1029/2020GL091585` pertence a Kramer et al. (2021), *Observational Evidence of Increasing Global Radiative Forcing*, GRL, não a Meinshausen. Não citar como Meinshausen.

## Nota científica, Experiência 8, revisão de 18/10/2026

A Experiência 8 atual é um **esquema qualitativo**, não um modelo preditivo de temperatura. A relação tamanho urbano/clima do artigo de **Manoli et al. (2019)**, *Magnitude of urban heat islands largely explained by climate and population*, Nature 573:55–60, DOI: https://doi.org/10.1038/s41586-019-1512-9, não fornece coeficiente universal de resfriamento por uma percentagem arbitrária de árvores. Os multiplicadores e descontos de aquecimento derivados anteriormente para 60% de verde não são apresentados na interface. A cena explica sombreamento e evapotranspiração potencial (se houver água), sem atribuir °C ou apresentar a chuva anual como chuva instantânea.

O controle de população usa uma transformação logarítmica **somente para distribuir os valores da régua** e para variar o desenho dos edifícios, não para estimar calor urbano. Os botões Cáceres/Cuiabá/São Paulo apenas preenchem valores aproximados de população e precipitação já existentes no código original. Eles **não** representam mapas urbanos, inventários de arborização ou observações climáticas atuais dessas cidades.

A cobertura arbórea na ilustração (5% de referência versus valor escolhido) não é um levantamento empírico. Os círculos das copas, sombras, traços azuis de evapotranspiração e halo avermelhado são representações esquemáticas sem escala de energia, taxa de evaporação ou temperatura. **60% de cobertura de árvores não implica 60% de redução térmica.**


## Experiência 9, saúde humana (19/10/2026)

**PM2,5, mecanismo direto de exposição:** partículas com diâmetro aerodinâmico de até 2,5 µm podem atingir regiões profundas dos pulmões; a exposição é associada a doenças respiratórias e cardiovasculares, AVC e mortalidade prematura. Mistura de partículas (pode incluir carbono negro), **não confundir com o gás CO₂**. Fonte: OMS, *Ambient (outdoor) air pollution*, https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health (24/10/2024).

**Calor extremo, estresse térmico:** sobrecarga da regulação térmica, com risco de exaustão, insolação, efeitos renais, cardiovasculares e exacerbação de doenças crônicas. Fonte: OMS, *Heat and health*, https://www.who.int/news-room/fact-sheets/detail/climate-change-heat-and-health (31/07/2026).

**CO₂, mecanismo climático indireto:** elevação da concentração de CO₂ intensifica o forçamento radiativo, favorecendo o aquecimento global e exposição a calor extremo. Fontes emissoras, especialmente queimadas e combustão, podem liberar CO₂ **e** PM2,5 simultaneamente; isso não significa transformação direta de CO₂ em partículas. Referência: IPCC AR6, WGII, capítulo 7, *Health, Wellbeing and the Changing Structure of Communities*, https://www.ipcc.ch/report/ar6/wg2/chapter/chapter-7/. Atribuição de incêndios depende de fatores adicionais, como ocupação da terra, manejo e ignição.

**Natureza da visualização:** infográfico SVG vetorial autoral, sem valores numéricos de risco, dose-resposta ou taxas municipais não verificadas.
