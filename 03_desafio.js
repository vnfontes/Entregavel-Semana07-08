db = db.getSiblingDB("ecommerce_db");
print("\n[$elemMatch] Produtos com variação tamanho M e cor Azul:");

db.produtos.find(
  { variacoes: { $elemMatch: { tamanho: "M", cor: "Azul" } } },
  { _id: 0, titulo: 1, variacoes: 1 }
).forEach(printjson);
print("\n[Comparação] Sem $elemMatch (condições em subdocumentos diferentes):");

db.produtos.find(
  { "variacoes.tamanho": "M", "variacoes.cor": "Azul" },
  { _id: 0, titulo: 1 }
).forEach(printjson);

const exp = db.produtos
  .find({ preco: { $gt: 100, $lt: 1000 } })
  .explain("executionStats");

function acharEstagio(no, nome) {
  if (!no || typeof no !== "object") return null;
  if (no.stage === nome) return no;
  for (const chave of Object.keys(no)) {
    const achado = acharEstagio(no[chave], nome);
    if (achado) return achado;
  }
  return null;
}

const stats = exp.executionStats;
const plano = exp.queryPlanner.winningPlan;
const ixscan = acharEstagio(plano, "IXSCAN");
const colscan = acharEstagio(plano, "COLLSCAN");

print("\n[Explain] Consulta por faixa de preço:");
print("Estágio usado      : " + (ixscan ? "IXSCAN (usou índice)" : colscan ? "COLLSCAN (varredura completa)" : "desconhecido"));
print("Índice utilizado   : " + (ixscan ? ixscan.indexName : "nenhum (rode 02_indices_consultas.js antes)"));
print("totalKeysExamined  : " + stats.totalKeysExamined);
print("totalDocsExamined  : " + stats.totalDocsExamined);
print("nReturned          : " + stats.nReturned);
