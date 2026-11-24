
# Modelagem NoSQL com MongoDB – Catálogo de E-commerce

Entregável de Banco de Dados – Semanas 07 e 08.
Banco: `ecommerce_db` | Coleção principal: `produtos`

```bash
mongosh --file 01_insercao.js
mongosh --file 02_indices_consultas.js
mongosh --file 03_desafio.js
```

## Estrutura

| Arquivo | Conteúdo |
|---|---|
| `01_insercao.js` | Parte 1: criação do banco/coleção e `insertMany()` com 5 produtos |
| `02_indices_consultas.js` | Parte 2: índice simples (`preco`), índice de texto (`titulo` + `descricao`) e 3 consultas |
| `03_desafio.js` | Parte 3: `$elemMatch` e `explain("executionStats")` |

## Modelo do documento

Cada produto possui:
- **Arrays:** `tags` (lista de strings) e `variacoes` (lista de subdocumentos com tamanho, cor e estoque)
- **Subdocumento:** `fabricante: { nome, pais }`

```js
{
  titulo: "Camiseta Algodão Básica",
  preco: 59.9,
  tags: ["roupas", "algodão", "promoção"],
  fabricante: { nome: "Malharia Sol", pais: "Brasil" },
  variacoes: [{ tamanho: "M", cor: "Azul", estoque: 25 }, ...]
}
```

## Parte 2 – Índices e consultas

- **Índice simples:** `createIndex({ preco: 1 })`, pois o preço é muito usado em filtros e ordenações.
- **Índice de texto:** `createIndex({ titulo: "text", descricao: "text" })` com idioma português. O MongoDB permite apenas um índice de texto por coleção, por isso os dois campos ficam juntos.
- **Consultas:** (1) faixa de preço com `$gt`/`$lt`; (2) `find({ tags: "promoção" })` em array; (3) `$text` / `$search` usando o índice de texto.

## Parte 3 – Desafio

- **`$elemMatch`:** garante que `tamanho: "M"` e `cor: "Azul"` ocorram no **mesmo** subdocumento de `variacoes`. Sem ele, o MongoDB aceita as condições em subdocumentos diferentes e retorna resultados incorretos (o script mostra a comparação).
- **`explain("executionStats")`:** a consulta por faixa de preço usa o estágio `IXSCAN` com o índice `idx_preco`. A métrica `totalKeysExamined` maior que zero comprova a leitura do índice, e `totalDocsExamined` mostra que apenas os documentos necessários foram lidos.

## Parte 4 – Reflexão: Embedding vs Referencing

**Embedding (incorporar)** guarda os dados relacionados dentro do próprio documento, como o subdocumento `fabricante` ou o array `variacoes`. Uma única leitura traz tudo, sem `JOIN`, e as atualizações do documento são atômicas. Por outro lado, o dado pode ser duplicado e o documento pode crescer (limite de 16MB).

**Referencing (referenciar)** guarda apenas o `_id` de um documento de outra coleção, como `fabricante_id` apontando para a coleção `fabricantes`. Evita duplicação e mantém uma única fonte de verdade, mas exige consultas adicionais (`$lookup`) para reunir os dados.
