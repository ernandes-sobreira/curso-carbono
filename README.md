# Carbono | III Semana Brasileira de Física Ambiental

Apresentação interativa em português sobre carbono, do átomo ao clima, às cidades e aos cenários de mitigação. **Onze telas**, Three.js r169 já empacotado no arquivo original recebido, modo 2D de contingência e exploração de fontes em `Veja mais`.

**Curso publicado:** https://ernandes-sobreira.github.io/curso-carbono/

## Começo rápido

1. Abra `index.html` no navegador. Para modo 3D, prefira HTTPS GitHub Pages a arquivos recebidos por mensageiro (`content://`).
2. Use as setas do rodapé ou teclado; `Veja mais` abre explicações e imagens; `Desafio` abre uma pergunta conceitual independente em cada tela.
3. No cenário, selecione `Alavancas → Mato Grosso` para consultar o painel de emissões setoriais do SEEG 2024.
4. Se WebGL não estiver disponível, telas de átomo, ligações e vibrações usam **esquemas didáticos em 2D**, e a tela de energia usa o corte 2D.

## Organização

- `src/template.html`: HTML estrutural recuperado do arquivo entregue.
- `src/carbono-original.bundle.js`: **bundle minificado original**, preservado sem reconstrução de arquivos fonte inexistentes. Não é `src/main.js` humano-legível.
- `src/enhancements.js`, `src/overrides.css`: interações, imagens, acessibilidade e contingência.
- `build.mjs`: alterações reproduzíveis, estritas, pequenas e documentadas sobre o bundle. Gera `index.html` e `dist/index.html`.
- `FONTES.md`, `AUDITORIA.md`, `TESTES.md`, `IMAGENS.md`: o que foi verificado e o que ficou pendente.
- `CARBONO_SBFA_apoio.pdf` e `resources/pdf-captures/`: PDF de apoio visual (11 telas e página de fontes) e capturas usadas para reproduzi-lo.
- `data_raw/`: única transcrição de dados primários nova; arquivos CSV originais anteriores **não foram recebidos**.
- `.github/workflows/integridade.yml`: validação automática do HTML e da sintaxe a cada push. O GitHub Pages publica da branch `main`.

## Instalar e construir

```sh
npm ci
npm test
node build.mjs
```

Sem bibliotecas NPM em tempo de execução: o Three.js já está no bundle fornecido. A reconstrução atual **não** reempacota os antigos módulos ES6 originais, porque esses módulos não foram entregues.

## Publicação no GitHub (gratuito)

O GitHub Pages é grátis em **repositório público** no plano GitHub Free. O repositório **existente** é `ernandes-sobreira/curso-carbono`, branch `main`. O Pages usa a publicação de branch e seu link é https://ernandes-sobreira.github.io/curso-carbono/. A cada atualização, verifique a ação `Verificar integridade do Carbono`: ela checa a sintaxe do JavaScript e a correspondência entre `index.html` e o resultado do build. Não publique um HTML compilado incompleto.

### Windows (PowerShell com Git instalado)

```powershell
cd "$HOME\Downloads"
# Descompacte carbono-sbfa-projeto.zip e entre na pasta gerada:
cd carbono-sbfa
git init
git checkout -b main
git add .
git commit -m "Publicar Carbono SBFA com auditoria e Pages"
git remote add origin https://github.com/ernandes-sobreira/curso-carbono.git
git push -u origin main
```

O login do GitHub pode exigir autenticação no navegador ou token. Não inclua tokens no código.

### Android (Termux)

```sh
pkg update && pkg install git unzip nodejs -y
termux-setup-storage
cd ~/storage/downloads
unzip carbono-sbfa-projeto.zip
cd carbono-sbfa
git init
git checkout -b main
git add .
git commit -m "Publicar Carbono SBFA"
git remote add origin https://github.com/ernandes-sobreira/curso-carbono.git
git push -u origin main
```

Configure `git config --global user.name "Seu nome"` e `git config --global user.email "Seu email"` se forem solicitados. No app GitHub para Android, é possível criar o repositório via interface ou usar o site; o upload completo de diretórios pelo app pode ser limitado, por isso o Termux é mais confiável.

## Ciência, licença, privacidade e implantação

* As cifras acrescentadas são oficialmente verificáveis e estão documentadas em `FONTES.md`. Valores numéricos herdados do HTML original **não foram todos revalidados**.
* NASA e NOAA: imagens vinculadas remotamente com fonte/crédito; sua redistribuição requer respeitar políticas oficiais. A Figura 5.12 do IPCC está **apenas vinculada**, não copiada.
* Não colocar senhas do Firebase, chaves administrativas, tokens GitHub nem JSON de conta de serviço no repositório. Votação móvel com Firebase aguarda definição de autenticação e regras. Contagem manual do quiz continua funcional.
* Este pacote pode servir a aulas; não atribua números a artigos sem validar os dados e as metodologias originais.


## Atualização didática: experiência 4

A apresentação agora possui **Como funciona o efeito estufa?** como experiência 4. Em vez de um globo coberto por barras, há um esquema autoral com versões horizontal (projetor) e vertical (celular) e cinco etapas interativas: Sol, Reflexão, Calor, Gases e Mais CO₂. A comparação entre concentrações de 1750, 2019 e duplicação de CO₂ mantém o cálculo do bundle original. Os números de balanço energético do IPCC aparecem em seção expansível. Esta experiência 4 não exige WebGL; para a origem de cada valor, consulte FONTES.md.

Arquivos acrescentados: `src/greenhouse.js`, `src/greenhouse.css` e `test/greenhouse_check.py`. `build.mjs` concatena as melhorias depois do JavaScript original e incorpora o CSS diretamente no arquivo único `index.html`.

## Experiência 8 revisada: uma comparação científica, não um termômetro fictício

A tela **A mesma cidade. Dois microclimas.** contém título e controles dentro de um único painel rolável, sem sobreposição do cabeçalho e da navegação. Os arquivos mantidos são `src/ilha-calor-v4.js` e `src/ilha-calor-v4.css`. O desenho anterior `v3` permanece somente para rastreabilidade, com o v4 substituindo a implementação no build.

- **Porte da cidade:** altera apenas os edifícios desenhados, nas duas condições;
- **Cobertura das árvores:** altera número de copas, sombra e o halo gráfico de aquecimento;
- **Chuva média anual:** altera a representação qualitativa de disponibilidade hídrica e evapotranspiração, não a chuva do dia;
- **Próximo/anterior:** funciona fora do painel rolável, sem controles flutuantes sobre os botões.

A tela é didática e não faz estimativas numéricas de temperatura; detalhes científicos em `FONTES.md`. O workflow de teste visual tira capturas nos tamanhos 320 px, 393 px e desktop, e a verificação de integridade compara o HTML publicado com o resultado do build.
