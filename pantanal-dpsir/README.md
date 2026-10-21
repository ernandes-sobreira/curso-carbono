# Pantanal Vivo — Oficina colaborativa DPSIR e matriz fuzzy

**Aplicativo público:** https://ernandes-sobreira.github.io/curso-carbono/pantanal-dpsir/

Parte independente do repositório [curso-carbono](https://github.com/ernandes-sobreira/curso-carbono). A ferramenta depende de um **link de sala** gerado e entregue pelo facilitador, com parâmetros `room` e `key`. O link público sem parâmetros é apenas uma página de acolhimento. **Não publique chaves de salas ou o parâmetro `admin` no repositório.**

## Em sala de aula

1. Facilitador abre seu link exclusivo com `admin` na projeção. Clica em **Mostrar QR Code**.
2. Cada participante lê o QR pelo celular e entra na mesma sala. Não precisa criar conta.
3. Cada pessoa introduz conceitos do Pantanal, associados a D, P, S, I ou R. Todos podem editar.
4. Toque em **dois nós**, na ordem **causa → efeito**, ou escolha origem e destino nos menus. Defina sinal (+/−), intensidade **de 0 a 100** (régua ou valor digitado) e justificativa. **Clicar numa seta** carrega os valores para editar ou excluir a relação. **Selecionar um conceito** permite corrigir o nome, a categoria ou removê-lo.
5. Mostre a aba **Matriz fuzzy** para discutir a matriz de adjacência assinada e a aba **DPSIR** para discutir interpretações e feedbacks.
6. Exporte os arquivos CSV (nós, ligações e matriz), JSON ou a imagem PNG. O facilitador pode **pausar edições** e **reiniciar** após confirmar.

## Marco científico

D: forças motrizes (e.g., expansão de atividades econômicas);
P: pressões (e.g., supressão da vegetação);
S: estado do ambiente (e.g., nível d'água, estoque de carbono);
I: impactos (e.g., alterações em emissões ou serviços ecossistêmicos);
R: respostas (e.g., prevenção de incêndios e restauração).

O grafo é **direcionado**: uma aresta A → B indica que A influencia B. O sinal **positivo (+)** aumenta B quando A aumenta, e **negativo (−)** reduz B quando A aumenta. A força representa uma *hipótese subjetiva não calibrada*, exibida na escala **0–100**; **0** indica nenhuma influência e **100**, a intensidade máxima atribuída. O sinal é escolhido separadamente: **+** representa influência direta e **−**, influência inversa. A matriz CSV contém o produto **sinal × intensidade** na escala **−100 a +100**. Internamente, os pesos são divididos por 100 para permitir formulações de **mapas cognitivos fuzzy** em −1 a +1. Uma ligação de peso zero continua registrável, distinta da ausência de ligação; é representada como linha cinza tracejada. Não confundir com correlação estatística, regressão, efeito causal estimado ou balanço quantitativo de gases.

**Discussão orientadora:** quais relações são evidenciadas por literatura? Quais são controversas? Onde surgem retroalimentações? Quem sofre impactos e quem decide as respostas?

## Arquitetura e segurança

- Hospedagem: GitHub Pages estático, HTML/CSS/JavaScript;
- Interface: Cytoscape.js e QRCode.js, com CDN de versões fixas;
- Sincronização: Supabase Broadcast com leitura periódica a cada 7 s para recuperação;
- Persistência: tabelas isoladas `pantdpsir_rooms`, `pantdpsir_nodes`, `pantdpsir_edges`;
- Escrita/leitura: Supabase Edge Function `pantdpsir`, autenticação por convite aleatório de sala via SHA-256;
- Banco: RLS habilitada; as tabelas não são liberadas diretamente para usuários anônimos;
- Convidados com o link de sala podem adicionar, editar e excluir itens, como solicitado; o facilitador tem comandos extras para bloquear/resetar;
- Uso educacional público: não registrar dados pessoais sensíveis. Nome/apelido é opcional;
- A sessão pode ficar indisponível caso o projeto gratuito Supabase pause por inatividade; verificar e reativar antes de repetir a oficina.
