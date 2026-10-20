import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const source=fs.readFileSync('index.html','utf8');
const js=source.split('<script>')[1]?.split('</script>')[0];
assert.ok(js,'Script principal presente');
new vm.Script(js,{filename:'carbono-index.js'});
for (const id of ['atom','bonds','vib','budget','res','keeling','human','uhi','health','scen','quiz','final']) {
 assert.ok(js.includes(`id:"${id}"`),`Tela ${id} preservada`);
}
assert.ok(js.includes('231.17459584'),'Total Mato Grosso extraído do SEEG 2024');
assert.ok(js.includes('125.81344947'),'Mudança de uso da terra contemplada');
assert.ok(!js.includes('shareBruto:.13'),'Fator estadual derivado não pode permanecer');
assert.ok(!js.includes('Aquecimento evitado via TCRE'),'TCRE não pode ser apresentado para CO₂e multigás');
assert.ok(js.includes('__carbonoEnhanced'),'Scripts de acessibilidade e contingência incluídos');
assert.ok(source.includes('aria-label'),'Acessibilidade declarada');
assert.ok(js.includes('__carbonoGreenhouse'),'Esquema do efeito estufa carregado');
assert.ok(source.includes('IR PARA BAIXO'),'Radiação atmosférica descendente explicitada');
assert.ok(!source.includes('https://doi.org/10.1029/2020GL091585'),'Referência indevida de Kramer removida');
assert.ok(js.includes('Bt.splice(8,0,healthSlide)'), 'Saúde inserida no núcleo de navegação após a ilha de calor');
assert.ok(source.includes('id="health"'), 'Painel de saúde disponível no HTML');
console.log('OK: sintaxe JS, 12 telas, saúde, SEEG MT, correção TCRE e contingência.');
