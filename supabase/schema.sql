-- ==============================================================================
-- SCHEMA DO CARDÁPIO: BAR DO ELIAS (SUPABASE POSTGRESQL)
-- Execute este script no SQL Editor do seu projeto Supabase:
-- https://supabase.com/dashboard/project/xkogafnfnybmuivqxtpf/sql/new
-- ==============================================================================

-- 1. Criar Tabela de Categorias
CREATE TABLE IF NOT EXISTS public.menu_categories (
    id TEXT PRIMARY KEY,
    label TEXT NOT NULL,
    icon_name TEXT NOT NULL DEFAULT 'Flame',
    description TEXT,
    order_index INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Criar Tabela de Itens do Cardápio
CREATE TABLE IF NOT EXISTS public.menu_items (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    category TEXT NOT NULL REFERENCES public.menu_categories(id) ON UPDATE CASCADE ON DELETE CASCADE,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    promotional_price NUMERIC(10, 2),
    image TEXT NOT NULL DEFAULT '/images/real/bar-iluminacao-noturna.jpg',
    is_available BOOLEAN NOT NULL DEFAULT true,
    is_best_seller BOOLEAN NOT NULL DEFAULT false,
    is_chef_special BOOLEAN NOT NULL DEFAULT false,
    tags TEXT[] DEFAULT '{}',
    serves TEXT,
    order_index INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Habilitar Row Level Security (RLS)
ALTER TABLE public.menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

-- 4. Políticas de Segurança (Leitura pública para o cardápio no site)
DROP POLICY IF EXISTS "Permitir leitura pública de categorias" ON public.menu_categories;
CREATE POLICY "Permitir leitura pública de categorias"
    ON public.menu_categories FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Permitir leitura pública de pratos" ON public.menu_items;
CREATE POLICY "Permitir leitura pública de pratos"
    ON public.menu_items FOR SELECT
    USING (true);

-- 5. Políticas para Inserção, Atualização e Deleção
DROP POLICY IF EXISTS "Permitir gestão de categorias" ON public.menu_categories;
CREATE POLICY "Permitir gestão de categorias"
    ON public.menu_categories FOR ALL
    USING (true)
    WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir gestão de pratos" ON public.menu_items;
CREATE POLICY "Permitir gestão de pratos"
    ON public.menu_items FOR ALL
    USING (true)
    WITH CHECK (true);

-- 6. Inserir Categorias Oficiais
INSERT INTO public.menu_categories (id, label, icon_name, description, order_index, is_active)
VALUES
    ('porcoes', 'Porções & Petiscos', 'Utensils', 'Porções generosas para compartilhar com os amigos', 1, true),
    ('pratos', 'Pratos, Risotos & Massas', 'Beef', 'Refeições saborosas preparadas na hora com carinho', 2, true),
    ('destilados', 'Whiskies, Gins & Drinks', 'GlassWater', 'Copões de whisky premium, taças de gin e caipirinhas', 3, true),
    ('cervejas', 'Cervejas & Vinhos', 'Beer', 'Cervejas trincando, long necks e garrafas de vinho', 4, true),
    ('bebidas', 'Não Alcoólicos', 'CakeSlice', 'Refrigerantes, sucos naturais e água mineral', 5, true)
ON CONFLICT (id) DO UPDATE SET
    label = EXCLUDED.label,
    description = EXCLUDED.description,
    order_index = EXCLUDED.order_index;

-- 7. Inserir Itens do Cardápio Real do Bar do Elias
INSERT INTO public.menu_items (id, name, category, description, price, image, is_available, is_best_seller, is_chef_special, tags, serves, order_index)
VALUES
    -- PORÇÕES
    ('porcao-peixe', 'Porção de Peixe Empanado', 'porcoes', 'Tiras crocantes e sequinhas de peixe empanado na farinha especial, servidas com fatias de limão e molho tártaro da casa.', 60.00, 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80', true, true, false, ARRAY['Mais Pedido', 'Crocante'], '2 a 3 pessoas', 1),
    ('porcao-carne-fritas', 'Porção de Carne com Fritas', 'porcoes', 'Iscas suculentas de carne acebolada na chapa bem quente, acompanhadas de uma generosa porção de batatas fritas douradas.', 50.00, 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80', true, true, false, ARRAY['Clássico', 'Farto'], '2 a 3 pessoas', 2),
    ('file-fritas', 'Filé com Fritas', 'porcoes', 'Tiras de filé grelhadas no ponto perfeito com cebola dourada e batatas fritas super crocantes.', 35.00, 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80', true, false, false, ARRAY['Individual / Dupla'], '1 a 2 pessoas', 3),
    ('porcao-salgados', 'Porção de Salgados Sortidos', 'porcoes', 'Mix de mini salgadinhos fritos na hora (coxinhas, kibe e bolinhas de queijo) crocantes e quentinhos.', 25.00, 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80', true, false, false, ARRAY['Happy Hour'], '2 pessoas', 4),
    ('porcao-batata', 'Porção de Batata Frita', 'porcoes', 'Batatas palito crocantes por fora, macias por dentro, temperadas com sal fino da casa.', 25.00, 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80', true, false, false, ARRAY['Tradicional'], '2 a 3 pessoas', 5),

    -- PRATOS, RISOTOS & MASSAS
    ('risoto-salmao-camarao', 'Risoto de Salmão com Camarão', 'pratos', 'Arroz arbóreo cremoso com lascas de salmão fresco, camarões selecionados salteados na manteiga e finalizado com ervas finas e queijo parmesão.', 45.00, 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80', true, true, true, ARRAY['Especialidade', 'Gourmet'], '1 a 2 pessoas', 6),
    ('risoto-carne-seca-coalho', 'Risoto de Carne Seca com Queijo Coalho', 'pratos', 'Cremoso risoto brasileiro preparado com carne seca desfiada e dessalgada artesanalmente, cubos de queijo coalho dourados e toque de manteiga de garrafa.', 40.00, 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80', true, false, true, ARRAY['Sabor Raiz', 'Chef Elias'], '1 a 2 pessoas', 7),
    ('massa-camarao-bacon', 'Massa com Camarão e Bacon', 'pratos', 'Massa al dente envolvida em molho cremoso artesanal, camarões salteados e pedaços crocantes de bacon defumado.', 40.00, 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=800&q=80', true, false, false, ARRAY['Massa Artesanal'], '1 pessoa', 8),
    ('beef-bourguignon', 'Beef Bourguignon (Picadinho Especial)', 'pratos', 'Cortes nobres de carne bovina cozidos lentamente em molho encorpado com vinho tinto, cenoura e especiarias aromáticas.', 40.00, 'https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&w=800&q=80', true, false, true, ARRAY['Clássico Francês'], '1 pessoa', 9),
    ('parmegiana', 'Parmegiana da Casa', 'pratos', 'Filé empanado crocante, coberto com molho de tomate rústico artesanal e queijo muçarela gratinado.', 40.00, 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80', true, true, false, ARRAY['Favorito'], '1 a 2 pessoas', 10),
    ('panqueca', 'Panqueca Artesanal', 'pratos', 'Massa fininha e leve recheada com recheio farto e coberta com molho quente da casa e parmesão ralado.', 20.00, 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80', true, false, false, ARRAY['Tradicional'], '1 pessoa', 11),

    -- DESTILADOS, WHISKIES & DRINKS
    ('dose-copao-buchanans', 'Dose Copão Buchanan''s', 'destilados', 'Dose generosa de whisky Buchanan''s 12 anos no copão com gelo de coco ou gelo saborizado e energético à sua escolha.', 60.00, 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=800&q=80', true, true, false, ARRAY['Whisky 12 Anos', 'Mais Pedido'], NULL, 12),
    ('dose-copao-black', 'Dose Copão Johnnie Walker Black Label', 'destilados', 'Whisky escocês Johnnie Walker Black Label 12 anos servido no copão com gelo e energético.', 60.00, 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80', true, false, false, ARRAY['Black Label 12 Anos'], NULL, 13),
    ('dose-copao-jack', 'Dose Copão Jack Daniel''s', 'destilados', 'Autêntico Tennessee Whiskey Jack Daniel''s No. 7 servido no copão com gelo e energético.', 50.00, 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=800&q=80', true, true, false, ARRAY['Jack Daniel''s'], NULL, 14),
    ('dose-chivas', 'Dose Chivas Regal 12 Anos', 'destilados', 'Dose de whisky Chivas Regal 12 anos, suave e aveludado no copo com pedras de gelo cristalino.', 50.00, 'https://images.unsplash.com/photo-1582819509237-d5b75f20ff7a?auto=format&fit=crop&w=800&q=80', true, false, false, ARRAY['Whisky Escocês'], NULL, 15),
    ('dose-cavalo', 'Dose Cavalo Branco (White Horse)', 'destilados', 'Dose clássica de whisky White Horse com gelo.', 45.00, 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=800&q=80', true, false, false, ARRAY['White Horse'], NULL, 16),
    ('taca-gin-tanqueray', 'Taça Gin Tanqueray', 'destilados', 'Gin importado Tanqueray servido em taça balloon com água tônica, especiarias e frutas cítricas.', 45.00, 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80', true, true, false, ARRAY['Tanqueray', 'Premium'], NULL, 17),
    ('taca-gin-beefeater', 'Taça Gin Beefeater', 'destilados', 'Gin londrino clássico Beefeater com tônica, zimbro e fatia de limão siciliano na taça de cristal.', 40.00, 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80', true, false, false, ARRAY['Beefeater'], NULL, 18),
    ('caipirinha-vodka-smirnoff', 'Caipirinha de Vodka Smirnoff (Caipiroska)', 'destilados', 'Vodka Smirnoff triplamente destilada com limão fresco macerado e açúcar na medida certa.', 25.00, 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80', true, true, false, ARRAY['Smirnoff', 'Refrescante'], NULL, 19),
    ('caipirinha-cachaca-velho', 'Caipirinha Tradicional de Cachaça (Velho Barreiro / 51)', 'destilados', 'A autêntica caipirinha brasileira feita com cachaça selecionada, muito limão e gelo triturado.', 20.00, 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80', true, false, false, ARRAY['Clássica'], NULL, 20),

    -- CERVEJAS & VINHOS
    ('heineken', 'Heineken Long Neck', 'cervejas', 'Cerveja puro malte holandesa servida extremamente gelada na garrafa long neck (330ml).', 12.00, 'https://images.unsplash.com/photo-1608270119864-1678121a8d05?auto=format&fit=crop&w=800&q=80', true, true, false, ARRAY['Puro Malte', 'Super Gelada'], NULL, 21),
    ('heineken-zero', 'Heineken 0.0% Álcool', 'cervejas', 'O sabor autêntico de Heineken com zero álcool na garrafa long neck.', 12.00, 'https://images.unsplash.com/photo-1608270119864-1678121a8d05?auto=format&fit=crop&w=800&q=80', true, false, false, ARRAY['Zero Álcool'], NULL, 22),
    ('corona', 'Corona Extra', 'cervejas', 'Cerveja mexicana leve e refrescante, servida com uma rodela de limão no gargalo.', 12.00, 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=800&q=80', true, false, false, ARRAY['Long Neck'], NULL, 23),
    ('skol-beats', 'Skol Beats', 'cervejas', 'Bebida mista alcoólica pronta para beber, moderna e refrescante (long neck / lata).', 12.00, 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80', true, false, false, ARRAY['Beats'], NULL, 24),
    ('smirnoff-ice', 'Smirnoff Ice', 'cervejas', 'Bebida sabor limão à base de vodka Smirnoff, doce e super refrescante.', 15.00, 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80', true, false, false, ARRAY['Ice'], NULL, 25),
    ('cerveja-original', 'Cerveja Original', 'cervejas', 'Cerveja pilsen tradicional brasileira, servida trincando de gelada.', 8.00, 'https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?auto=format&fit=crop&w=800&q=80', true, false, false, ARRAY['Trincando'], NULL, 26),
    ('vinho-tinto-seco', 'Garrafa de Vinho Tinto Seco', 'cervejas', 'Garrafa de vinho tinto seco selecionado, corpo equilibrado e aroma marcante.', 60.00, 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80', true, false, false, ARRAY['Vinho Tinto', 'Garrafa'], NULL, 27),
    ('vinho-tinto-suave', 'Garrafa de Vinho Tinto Suave', 'cervejas', 'Garrafa de vinho tinto de mesa suave, aveludado e adocicado no paladar.', 45.00, 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80', true, false, false, ARRAY['Vinho Suave', 'Garrafa'], NULL, 28),

    -- NÃO ALCOÓLICOS
    ('coca-cola-lata', 'Coca-Cola (Lata 350ml)', 'bebidas', 'Coca-Cola geladinha servida no copo com gelo e fatia de limão.', 8.00, 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80', true, false, false, ARRAY['Lata 350ml'], NULL, 29),
    ('guarana-lata', 'Guaraná Antarctica (Lata 350ml)', 'bebidas', 'Refrigerante de guaraná servido no copo com pedras de gelo.', 8.00, 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80', true, false, false, ARRAY['Lata 350ml'], NULL, 30),
    ('suco-laranja', 'Suco Natural de Laranja (Copo 300ml)', 'bebidas', 'Suco 100% natural de laranja espremido na hora, fresco e saboroso.', 8.00, 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80', true, false, false, ARRAY['Natural', '300ml'], NULL, 31),
    ('agua-mineral', 'Água Mineral (500ml)', 'bebidas', 'Garrafinha de água mineral sem gás / com gás.', 5.00, 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80', true, false, false, ARRAY['Sem Gás / Com Gás'], NULL, 32)
ON CONFLICT (id) DO UPDATE SET
    price = EXCLUDED.price,
    name = EXCLUDED.name,
    category = EXCLUDED.category,
    description = EXCLUDED.description,
    image = EXCLUDED.image,
    is_available = EXCLUDED.is_available,
    updated_at = now();
