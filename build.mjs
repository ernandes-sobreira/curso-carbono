import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
let html=read('src/template.html');
let app=read('src/carbono-original.bundle.js');
const replaceStrict=(before,after,label)=>{const count=app.split(before).length-1;if(count!==1)throw new Error(`Alteração ${label}: esperado 1 trecho, encontrado ${count}`);app=app.replace(before,after)};
// Evita que telas WebGL que nunca foram inicializadas executem .exit() em objetos nulos.
replaceStrict('tn>=0&&Bt[tn].exit(),tn=i;', 'tn>=0&&(!Bt[tn].needsGL||Vn)&&Bt[tn].exit(),tn=i;', 'saída WebGL nula');
// Limita a GPU no celular sem modificar pontos de dados científicos.
replaceStrict('antialias:!0,alpha:!0,powerPreference:"high-performance"', 'antialias:!matchMedia("(max-width:760px)").matches,alpha:!0,powerPreference:"high-performance"', 'antialias móvel');
replaceStrict('e.setPixelRatio(Math.min(window.devicePixelRatio||1,2))','e.setPixelRatio(Math.min(window.devicePixelRatio||1,matchMedia("(max-width:760px)").matches?1.25:2))','DPR móvel');
// Substituição verificável dos números estaduais derivados por SEEG, coleção 13.0, 2024.
replaceStrict('mt:{shareBruto:.13,rank:2,agro:92.4,pecuaria:68.8,agricultura:23.7,perCapita:78,rebanho:34}',
  'mt:{total:231.17459584,mut:125.81344947,agro:88.86638938,energia:14.04155438,residuos:1.90786020,piup:.54534241,remocoes:59.26154700}', 'SEEG MT');
replaceStrict('let n=yc.mt;t=[{id:"beef",name:"Pecu\\xE1ria",base:n.pecuaria,unit:"MtCO\\u2082e",src:"SEEG 12, 2023"},{id:"transport",name:"Agricultura",base:n.agricultura,unit:"MtCO\\u2082e",src:"SEEG 12, 2023"}];let s=yc.brasil.total*n.shareBruto;return{rows:t,total:s,totalLabel:`~${s.toFixed(0)} MtCO\\u2082e brutos (13,0% do Brasil, SEEG 2023; valor derivado da fra\\xE7\\xE3o)`,unitBig:"MtCO\\u2082e"}',
  'let n=yc.mt;t=[{id:"land",name:"Uso da terra",base:n.mut,unit:"MtCO\\u2082e",src:"SEEG 13, 2024"},{id:"agro",name:"Agropecu\\xE1ria",base:n.agro,unit:"MtCO\\u2082e",src:"SEEG 13, 2024"},{id:"energy",name:"Energia",base:n.energia,unit:"MtCO\\u2082e",src:"SEEG 13, 2024"},{id:"waste",name:"Res\\xEDduos",base:n.residuos,unit:"MtCO\\u2082e",src:"SEEG 13, 2024"},{id:"industry",name:"Processos industriais",base:n.piup,unit:"MtCO\\u2082e",src:"SEEG 13, 2024"}];let s=n.total;return{rows:t,total:s,totalLabel:`${s.toFixed(2)} MtCO\\u2082e brutos (SEEG 13, 2024, GWP AR5; inclui mudan\\xE7a de uso da terra)`,unitBig:"MtCO\\u2082e"}', 'alavancas MT');
// Correção de texto antigo que contradizia o novo dado estadual e a descrição do feedback combinado.
replaceStrict('Mato Grosso: pecu\\xE1ria 68,8 e agricultura 23,7 MtCO\\u2082e (SEEG 12, 2023); o total do estado \\xE9 derivado da fra\\xE7\\xE3o de 13,0% das emiss\\xF5es brutas nacionais informada pelo SEEG, porque o relat\\xF3rio n\\xE3o publica o valor absoluto; a mudan\\xE7a de uso da terra em MT n\\xE3o est\\xE1 no relat\\xF3rio anal\\xEDtico e precisa ser lida na plataforma SEEG (seeg.eco.br) antes de usar em artigo.',
 'Mato Grosso: 231,17 MtCO\\u2082e brutos em 2024, dos quais 125,81 MtCO\\u2082e de mudan\\xE7a de uso da terra (SEEG cole\\xE7\\xE3o 13.0, GWP100 AR5; https://plataforma.seeg.eco.br/territorio/mato-grosso).', 'texto SEEG antigo');
replaceStrict('Dados brutos e scripts de extra\\xE7\\xE3o est\\xE3o em data_raw/ e src/scenarios.js do pacote de c\\xF3digo.',
 'O HTML original chegou sem os CSVs brutos e sem o arquivo src/scenarios.js. Veja data_raw/README.md para documentar a lacuna.', 'referência a arquivos ausentes');
replaceStrict('Feedback do vapor d\\u2019\\xE1gua: ligado', 'Feedback WV + gradiente t\\xE9rmico: ligado', 'feedback conjunto');
replaceStrict('Desligar o feedback do vapor d\\u2019\\xE1gua muda', 'Desligar, neste esquema, o feedback combinado de vapor d\\u2019\\xE1gua + gradiente t\\xE9rmico muda', 'explicação feedback conjunto');
// Aritmética de CO2e permanece disponível, mas impede equivalência falsa com o orçamento de CO2 ou TCRE.
const start=app.indexOf('$t(i,`Mantida de 2025 a 2050:');
const end=app.indexOf('function m2()',start);
if(start<0||end<0)throw new Error('Não localizou saída TCRE');
const chunk=app.slice(start,end);
const revised=chunk.replace(/\$t\(i,`Mantida de 2025 a 2050:[\s\S]*?`,s,c\+36,"#0A6B62","left",12,700\)/,
 '$t(i,`Exercício linear 2025 a 2050: ${n.cum.toFixed(3)} GtCO\\u2082e evitados. Não é orçamento de carbono (CO\\u2082).`,s,c+36,"#0A6B62","left",12,700)')
.replace(/\$t\(i,`Aquecimento evitado via TCRE[\s\S]*?`,s,c\+54,"#57708a","left",11,500\)/,
 '$t(i,`TCRE não é aplicável diretamente a misturas em CO\\u2082e; sem estimativa numérica de temperatura.`,s,c+54,"#465F79","left",11,500)');
if(revised===chunk || revised.includes('Aquecimento evitado via TCRE')||revised.includes('Mantida de 2025 a 2050:'))throw new Error('Falha na correção de interpretação TCRE');
app=app.slice(0,start)+revised+app.slice(end);
html=html.replace('/*__APP_JS__*/', () => app+'\n'+read('src/enhancements.js')+'\n'+read('src/greenhouse.js')+'\n'+read('src/reservatorios-v2.js')+'\n'+read('src/ilha-calor-v3.js')+'\n'+read('src/alimentos-v2.js')+'\n'+read('src/ilha-calor-v4.js')+'\n'+read('src/ilha-calor-slide.js'));
html=html.replace('</style>',read('src/overrides.css')+'\n'+read('src/greenhouse.css')+'\n'+read('src/reservatorios-v2.css')+'\n'+read('src/ilha-calor-v4.css')+'\n'+read('src/ilha-calor-slide.css')+'\n</style>');
fs.mkdirSync(path.join(root,'dist'),{recursive:true});
fs.writeFileSync(path.join(root,'dist/index.html'),html);
fs.writeFileSync(path.join(root,'index.html'),html);
console.log(`Carbono SBFA: ${Buffer.byteLength(html)} bytes, index.html produzido.`);
