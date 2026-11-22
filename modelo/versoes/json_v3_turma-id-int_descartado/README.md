# Exemplos JSON — Sprint 1

Conjunto coerente de exemplos baseado no caso de negócio e no modelo `sigaa-2026-02.asta`.

## Cobertura

- Entidades: `Aluno`, `Unidade`, `Curso`, `EstruturaCurricular`, `Disciplina`, `Turma` e `Matricula`.
- Composições: `HistoricoAcademico`, `Matriculas`, `PropostaMatricula`, `SolicitacaoMatricula`, `ComprovanteMatricula` e `HistoricoProcessamento`.

`PeriodoLetivo`, `Professor`, `Horario`, `CargaHoraria` e `Prazos` aparecem como objetos internos porque não estão marcados como entidades ou composições no modelo.

## Decisões de representação

- `Turma.id` é uma chave substituta inteira, sem significado de negócio e gerada pelo sistema. O `codigo` (`A`, `B` etc.) continua sendo o identificador legível da seção; a combinação de disciplina, período letivo e código deve permanecer única.
- `Disciplina.cargaHorariaTotal` representa a carga total inteira; `Disciplina.cargaHoraria` contém a decomposição teórica, prática e extensionista. Isso evita duas chaves `cargaHoraria` no mesmo objeto.
- Em `EstruturaCurricular`, `prazos` e `cargaHoraria` são objetos. Os atributos escalares duplicados do diagrama foram omitidos porque JSON não aceita chaves repetidas de forma interoperável.
- Associações `0..*` são representadas por arrays, mantendo o nome do papel do modelo (`disciplina`, `professor`, `horario` e `matricula`).
- `motivoIndeferimento` é `null` quando o status não é `INDEFERIDA`.
- `PropostaMatricula` contém `matriculas` como objeto aninhado porque, no modelo atual, ela está associada a `Matriculas`; as demais especializações herdam a estrutura de `Matriculas`.
- Datas usam ISO 8601 com o fuso de Brasília (`-03:00`).

Os valores são ilustrativos e não devem ser interpretados como dados oficiais da UnB.
