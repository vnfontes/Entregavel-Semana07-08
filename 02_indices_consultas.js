db = db.getSiblingDB("ecommerce_db");

db.produtos.createIndex({ preco: 1 }, { name: "idx_preco" });

db.produtos.createIndex(
  { titulo: "text", descricao: "text" },
  { name: "idx_texto_titulo_descricao", default_language: "portuguese" }
);

print("\nÍndices da coleção:");
printjson(db.produtos.getIndexes().map(i => i.name));
print("\n[1] Produtos com preço entre R$ 100 e R$ 1000:");

db.produtos.find(
  { preco: { $gt: 100, $lt: 1000 } },
  { _id: 0, titulo: 1, preco: 1 }
).forEach(printjson);

print("\n[2] Produtos com a tag 'promoção':");

db.produtos.find(
  { tags: "promoção" },
  { _id: 0, titulo: 1, tags: 1 }
).forEach(printjson);

print("\n[3] Busca textual por 'notebook':");

db.produtos.find(
  { $text: { $search: "notebook" } },
  { _id: 0, titulo: 1, score: { $meta: "textScore" } }
).sort({ score: { $meta: "textScore" } }).forEach(printjson);
