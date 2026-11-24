db = db.getSiblingDB("ecommerce_db");
db.produtos.drop();
db.produtos.insertMany([
  {
    titulo: "Notebook Ultrafino 14 polegadas",
    descricao: "Notebook leve com processador de última geração, 16GB de RAM e SSD de 512GB, ideal para estudo e trabalho.",
    preco: 3499.9,
    categoria: "informática",
    tags: ["eletrônicos", "notebook", "promoção"],
    fabricante: { nome: "TechNova", pais: "Brasil" },
    estoque: 25,
    variacoes: [
      { cor: "Cinza", armazenamento: "512GB", estoque: 15 },
      { cor: "Prata", armazenamento: "1TB", estoque: 10 }
    ]
  },
  {
    titulo: "Camiseta Algodão Básica",
    descricao: "Camiseta de algodão macia, confortável e durável para o dia a dia.",
    preco: 59.9,
    categoria: "moda",
    tags: ["roupas", "algodão", "promoção"],
    fabricante: { nome: "Malharia Sol", pais: "Brasil" },
    estoque: 120,
    variacoes: [
      { tamanho: "P", cor: "Azul", estoque: 30 },
      { tamanho: "M", cor: "Azul", estoque: 25 },
      { tamanho: "M", cor: "Preto", estoque: 40 },
      { tamanho: "G", cor: "Branco", estoque: 25 }
    ]
  },
  {
    titulo: "Fone de Ouvido Bluetooth",
    descricao: "Fone sem fio com cancelamento de ruído e bateria de até 30 horas.",
    preco: 299.0,
    categoria: "áudio",
    tags: ["eletrônicos", "bluetooth", "lançamento"],
    fabricante: { nome: "SoundWave", pais: "China" },
    estoque: 80,
    variacoes: [
      { cor: "Preto", estoque: 50 },
      { cor: "Branco", estoque: 30 }
    ]
  },
  {
    titulo: "Tênis de Corrida Leve",
    descricao: "Tênis esportivo com amortecimento responsivo para corridas de rua.",
    preco: 389.9,
    categoria: "esportes",
    tags: ["calçados", "corrida", "promoção"],
    fabricante: { nome: "RunFast", pais: "Vietnã" },
    estoque: 60,
    variacoes: [
      { tamanho: "40", cor: "Azul", estoque: 10 },
      { tamanho: "42", cor: "Preto", estoque: 20 },
      { tamanho: "M", cor: "Vermelho", estoque: 30 }
    ]
  },
  {
    titulo: "Cafeteira Elétrica Programável",
    descricao: "Cafeteira com timer programável e jarra térmica para até 15 xícaras.",
    preco: 189.5,
    categoria: "casa",
    tags: ["eletrodomésticos", "cozinha"],
    fabricante: { nome: "CasaViva", pais: "Brasil" },
    estoque: 40,
    variacoes: [
      { cor: "Preto", estoque: 40 }
    ]
  }
]);

print("Documentos inseridos: " + db.produtos.countDocuments());
