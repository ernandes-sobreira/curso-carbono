# Testes realizados e pendências

Execução: **18/10/2026**, ambiente local isolado de testes, Node.js **22.16.0**, Playwright Python, Chromium do sistema executado **headless**. Não foi possível abrir URLs locais com `page.goto()` neste ambiente (restrição de administrador), por isso foram carregados os mesmos bytes do `index.html` com `page.set_content()` sobre `about:blank`.

| Dispositivo | Navegador | Situação | Resultado ou limite |
|---|---|---|---|
| Máquina Linux em contêiner | Chromium headless, binário `/usr/bin/chromium` (versão 144.0.7559.96) | **Executado** | 11 slides navegados; `pageerror=0`; WebGL indisponível (`hasGL=false`); 2D foi acionado nas três primeiras telas. |
| Viewport emulado 390 × 844, toque no Playwright | Mesmo Chromium de desktop, não Chrome Android | **Executado parcialmente** | Capturas da navegação e painéis 2D/SSP feitas. Não é teste físico, não há FPS de telefone. Rodapé era cortado, recebeu patch posterior. |
| Chrome Android real pela URL HTTPS | Não testado | **Pendente** | Necessário registrar fabricante, modelo, RAM, Chrome/Android, WebGL renderer, FPS telas 1–4 e erros, especialmente a tela 4. |
| iPhone / Safari iOS pela URL HTTPS | Não testado | **Pendente** | Necessário registrar aparelho, iOS/Safari, FPS e perda/restauração de contexto. |
| GitHub Actions / GitHub Pages | Não testado | **Pendente** | Repositório de destino inexistente. Workflow disponível em `.github/workflows/pages.yml`. |

**Quadro de FPS:** nenhum valor foi medido em aparelho real. Não confundir `requestAnimationFrame` do navegador do contêiner com a taxa de quadros de GPU móvel. FPS por tela 1: **não medido**; 2: **não medido**; 3: **não medido**; 4: **não medido**; 5 a 11: **não medido**.

## Verificações locais e seus significados

- `node build.mjs`: gera `dist/index.html` e `index.html` na raiz, sem instalar dependências externas. Testado.
- `npm ci && npm test`: confirma estrutura e diferenças científicas esperadas em teste estático. Não substitui integração real de navegador ou validação científica.
- Navegação no Chromium headless sem WebGL: deu resultado **sem exceção** nos 11 slides na rodada inicial após o patch.
- Painel `window.__scen.leverResult()` com escopo MT: valor bruto `231.17459584` MtCO₂e e cinco setores nas bases novas, sem o fator 13%.
- Desafios interativos: incluídos. Teste automatizado da resposta está previsto em `test/browser_check.py` e requer Playwright e Chromium locais, fora do CI.

## Checklist obrigatório antes da aula

1. Criar repositório público `ernandes-sobreira/carbono-sbfa` e subir a árvore completa.
2. Ativar `Settings → Pages → Source: GitHub Actions` e confirmar deploy.
3. Abrir URL HTTPS diretamente no Chrome Android e Safari iOS, sem abrir arquivo pelo WhatsApp. Registrar versões, aparelho, memória, screenshots e console.
4. Verificar globo 3D ao entrar/sair da tela, após bloqueio/desbloqueio e após abrir `Veja mais`.
5. Cronometrar quadros do núcleo, nuvens de orbitais, ligações e globo por 30 s por tela em aparelhos de entrada e intermediários; repetir com conexão offline (fontes locais não incluídas e imagens externas não abrirão).
6. Na tela de alavancas, selecionar MT e confirmar a fonte 2024, GWP-AR5, com cinco setores. Não interpretar emissão evitada de CO₂e como temperatura evitada via TCRE.
7. Testar quiz manual e as novas interações, acessibilidade por teclado e contraste em dispositivo real.

**PDF:** `CARBONO_SBFA_apoio.pdf` foi montado com capturas reais do HTML no Chromium, 11 telas (modo 2D para os três primeiros slides), mais a página 12 com fontes e limites. Reproduzível com `python test/build_pdf_from_captures.py` enquanto os arquivos `resources/pdf-captures/` estiverem presentes.


## Testes adicionais da tela 4 redesenhada, 18/10/2026

- **Chromium headless, desktop 1280 × 720:** HTML carregado do próprio `index.html`, navegação para `go(3)`, diagrama didático visível e screenshot capturada em `_checks/greenhouse-desktop.png`. O resultado não é teste de Chrome Android.
- **Chromium headless com viewport móvel 390 × 844, toque emulado:** botão `5 · Mais CO₂` atualizou o título; seleção `2 × CO₂` mostrou 554,3 ppm; seletor `2019` retornou 409,9 ppm. `window.pageerror=[]`. Screenshot em `_checks/greenhouse-mobile.png`. O painel de explicação é rolável e não há garantias de desempenho em hardware real. Teste reproduzível em `python test/greenhouse_check.py`.
- **Navegação geral de 11 telas:** teste `python test/browser_check.py` passou novamente, 0 erros JS e cinco setores de MT com dados SEEG. `npm test` passou.
- **Ainda não testado:** Chrome real Android com GPU ativa, iOS Safari, FPS, WebGL da antiga cena. A nova experiência 4 não precisa de WebGL.
