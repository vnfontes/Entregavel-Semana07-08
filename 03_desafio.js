// =====================================================
// Parte 3 - Desafio: $elemMatch e explain("executionStats")
// Executar: mongosh --file 03_desafio.js
// =====================================================
db = db.getSiblingDB("ecommerce_db");

// --- $elemMatch: tamanho "M" E cor "Azul" no MESMO subdocumento ---
print("\n[$elemMatch] Produtos com variação tamanho M e cor Azul:");
db.produtos.find(
  { variacoes: { $elemMatch: { tamanho: "M", cor: "Azul" } } },
  { _id: 0, titulo: 1, variacoes: 1 }
).forEach(printjson);

// Sem $elemMatch, a condição abaixo também traria o Tênis, pois ele tem
// tamanho "M" (cor Vermelho) em uma variação e cor "Azul" (tamanho 40) em outra:
print("\n[Comparação] Sem $elemMatch (condições em subdocumentos diferentes):");
db.produtos.find(
  { "variacoes.tamanho": "M", "variacoes.cor": "Azul" },
  { _id: 0, titulo: 1 }
).forEach(printjson);

// --- Bônus: explain("executionStats") comprovando uso do índice ---
const exp = db.produtos
  .find({ preco: { $gt: 100, $lt: 1000 } })
  .explain("executionStats");

// Percorre o plano de execução procurando um estágio pelo nome.
// (O formato do plano varia entre versões do MongoDB, por isso a busca recursiva.)
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
