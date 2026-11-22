# Exemplos JSON — Sprint 1

Conjunto coerente de exemplos baseado no caso de negócio e no modelo `sigaa-2026-02.asta`.

## Cobertura

- Entidades: `Aluno`, `Unidade`, `Curso`, `EstruturaCurricular`, `Disciplina`, `Turma` e `Matricula`.
- Composições: `HistoricoAcademico`, `Matriculas`, `PropostaMatricula`, `SolicitacaoMatricula`, `ComprovanteMatricula` e `HistoricoProcessamento`.

`PeriodoLetivo`, `Professor`, `Horario`, `CargaHoraria` e `Prazos` aparecem como objetos internos porque não estão marcados como entidades ou composições no modelo.

## Decisões de representação

- `Turma.codigo` é o único identificador da turma. Ele junta o código da disciplina, o período letivo e a letra da turma, separados por hífen: `ENE0276-2026.2-A` é a turma A de ENE0276 em 2026.2 (decisão do Paulo, 27/10). O período entra porque a mesma letra se repete a cada semestre. O código deve bater com a `disciplina` e o `periodoLetivo` da turma. Não existe `Turma.id` nem atributo separado para a letra; a versão que criava `Turma.id` foi descartada (cópia em `../versoes/`).
- `Disciplina.cargaHorariaTotal` é a carga horária total (inteiro); `Disciplina.cargaHoraria` é a composição `CargaHoraria`, com a divisão teórica, prática e extensionista. Os dois nomes vêm do modelo: o atributo inteiro foi renomeado para `cargaHorariaTotal` no Astah (27/10) para não colidir com a composição.
- O limite de créditos do caso de negócio é operacionalizado pela soma de `cargaHorariaTotal` das disciplinas das turmas solicitadas. Se o limite em horas for excedido, a matrícula recebe `status: "INDEFERIDA"` e `motivoIndeferimento: "CREDITOS_EXCEDIDOS"`; não existe um atributo `creditos` separado no modelo.
- Em `EstruturaCurricular`, `prazos` e `cargaHoraria` são as composições `Prazos` e `CargaHoraria`. Os atributos inteiros de mesmo nome foram removidos do modelo (27/10).
- `Aluno.curriculo` é a associação Aluno → EstruturaCurricular (papel `curriculo`, multiplicidade 1), que passou a aparecer no diagrama em 27/10.
- Todos os exemplos usam o mesmo aluno fictício: FULANO DE TAL, matrícula `23000034`, ingresso em 2023.1 (o aluno do exemplo original de `Aluno.json`).
- Os exemplos contam uma sequência única: ENE0276-2026.2-A é proposta na pré-matrícula e efetivada; ENE0056-2026.2-B é solicitada posteriormente e indeferida por falta de vagas. Por isso, o comprovante contém apenas ENE0276-2026.2-A.
- Associações com multiplicidade máxima `*` (`0..*` e `1..*`) são representadas por arrays, mantendo o nome do papel do modelo (`disciplina`, `professor`, `horario`, `matricula` e `unidade` em `Curso`).
- `motivoIndeferimento` é `null` quando o status não é `INDEFERIDA`.
- `PropostaMatricula` contém `matriculas` como objeto aninhado porque, no modelo atual, ela está associada a `Matriculas`; as demais especializações herdam a estrutura de `Matriculas`.
- Datas usam ISO 8601 com o fuso de Brasília (`-03:00`).

Os valores são ilustrativos e não devem ser interpretados como dados oficiais da UnB.
