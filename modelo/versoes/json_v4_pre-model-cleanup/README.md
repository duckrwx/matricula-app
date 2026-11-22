# Exemplos JSON — Sprint 1

Conjunto coerente de exemplos baseado no caso de negócio e no modelo `sigaa-2026-02.asta`.

## Cobertura

- Entidades: `Aluno`, `Unidade`, `Curso`, `EstruturaCurricular`, `Disciplina`, `Turma` e `Matricula`.
- Composições: `HistoricoAcademico`, `Matriculas`, `PropostaMatricula`, `SolicitacaoMatricula`, `ComprovanteMatricula` e `HistoricoProcessamento`.

`PeriodoLetivo`, `Professor`, `Horario`, `CargaHoraria` e `Prazos` aparecem como objetos internos porque não estão marcados como entidades ou composições no modelo.

## Decisões de representação

- `Turma.codigo` é o único identificador da turma. Ele junta o código da disciplina, o período letivo e a letra da turma, separados por hífen: `ENE0276-2026.2-A` é a turma A de ENE0276 em 2026.2 (decisão do Paulo, 27/10). O período entra porque a mesma letra se repete a cada semestre. O código deve bater com a `disciplina` e o `periodoLetivo` da turma. Não existe `Turma.id` nem atributo separado para a letra; a versão que criava `Turma.id` foi descartada (cópia em `../versoes/`).
- `Disciplina.cargaHorariaTotal` representa a carga total inteira; `Disciplina.cargaHoraria` contém a decomposição teórica, prática e extensionista. Isso evita duas chaves `cargaHoraria` no mesmo objeto.
- Em `EstruturaCurricular`, `prazos` e `cargaHoraria` são objetos. Os atributos escalares duplicados do diagrama foram omitidos porque JSON não aceita chaves repetidas de forma interoperável.
- Associações `0..*` são representadas por arrays, mantendo o nome do papel do modelo (`disciplina`, `professor`, `horario` e `matricula`).
- `motivoIndeferimento` é `null` quando o status não é `INDEFERIDA`.
- `PropostaMatricula` contém `matriculas` como objeto aninhado porque, no modelo atual, ela está associada a `Matriculas`; as demais especializações herdam a estrutura de `Matriculas`.
- Datas usam ISO 8601 com o fuso de Brasília (`-03:00`).

Os valores são ilustrativos e não devem ser interpretados como dados oficiais da UnB.
