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
CREATE POLICY "Permitir leitura pública de categorias"
    ON public.menu_categories FOR SELECT
    USING (true);

CREATE POLICY "Permitir leitura pública de pratos"
    ON public.menu_items FOR SELECT
    USING (true);

-- 5. Políticas para Inserção, Atualização e Deleção (Anon e Authenticated)
CREATE POLICY "Permitir gestão de categorias"
    ON public.menu_categories FOR ALL
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Permitir gestão de pratos"
    ON public.menu_items FOR ALL
    USING (true)
    WITH CHECK (true);

-- 6. Inserir Categorias Iniciais
INSERT INTO public.menu_categories (id, label, icon_name, description, order_index, is_active)
VALUES
    ('petiscos', 'Petiscos & Porções', 'Utensils', 'Para compartilhar no happy hour e celebrar com amigos', 1, true),
    ('pratos', 'Pratos Principais', 'Beef', 'Almoços e jantares fartos preparados com amor', 2, true),
    ('drinks', 'Drinks & Coquetéis', 'GlassWater', 'Coquetelaria autoral e clássicos atemporais', 3, true),
    ('cervejas', 'Chopps & Cervejas', 'Beer', 'Rótulos artesanais e chopp servido no copo trincando', 4, true),
    ('sobremesas', 'Sobremesas', 'CakeSlice', 'Finalize a sua experiência com doçura artesanal', 5, true)
ON CONFLICT (id) DO NOTHING;

-- 7. Inserir Pratos Iniciais
INSERT INTO public.menu_items (id, name, category, description, price, image, is_available, is_best_seller, is_chef_special, tags, serves, order_index)
VALUES
    ('p1', 'Bolinho de Costela com Provolone', 'petiscos', '6 unidades de bolinho crocante recheado com costela desfiada cozida por 12h e queijo provolone derretido. Acompanha maionese de alho negro.', 46.90, 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80', true, true, true, ARRAY['Artesanal', 'Mais Pedido'], '2 a 3 pessoas', 1),
    ('p2', 'Torresmo de Rolo Crocante do Elias', 'petiscos', 'Panceta enrolada e pururucada lentamente na brasa, servida em fatias crocantes com geleia de pimenta defumada e fatias de limão siciliano.', 52.00, 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=800&q=80', true, false, true, ARRAY['Especialidade', 'Crocante'], '2 a 3 pessoas', 2),
    ('p3', 'Dadinhos de Tapioca com Queijo Coalho', 'petiscos', 'Crocantes por fora, macios por dentro. Acompanhados de melaço de cana infusionado com gengibre e pimenta dedo-de-moça.', 38.50, 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80', true, true, false, ARRAY['Vegetariano', 'Sem Glúten'], '2 pessoas', 3),
    ('p4', 'Frango a Passarinho Crocante com Alho Frito', 'petiscos', 'Cortes selecionados de frango marinados em ervas e especiarias, empanados e cobertos com generosa camada de alho dourado e salsinha fresca.', 44.00, 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80', true, false, false, ARRAY['Clássico de Boteco'], '2 a 3 pessoas', 4),
    ('p5', 'Picanha na Chapa com Mandioca na Manteiga', 'petiscos', 'Tiras suculentas de picanha nobre grelhadas na chapa com cebola caramelizada, acompanhadas de mandioca frita na manteiga de garrafa e farofa crocante.', 89.90, 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80', true, true, false, ARRAY['Premium', 'Farto'], '3 a 4 pessoas', 5),
    ('p6', 'Pastéis Sortidos do Elias (8 un)', 'petiscos', 'Massa fininha e super crocante recheada com carne seca com catupiry, queijo meia cura com orégano e palmito cremoso.', 42.00, 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80', true, false, false, ARRAY['Tradicional'], '2 pessoas', 6),
    ('m1', 'Parmegiana da Casa com Arroz e Fritas', 'pratos', 'Filé mignon empanado artesanalmente, coberto com molho de tomate rústico da casa e queijo muçarela gratinado. Acompanha arroz branco e batatas fritas crocantes.', 78.90, 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80', true, true, false, ARRAY['Individual Generoso', 'Favorito'], '1 a 2 pessoas', 7),
    ('m2', 'Baião de Dois Sertanejo do Elias', 'pratos', 'Feijão fradinho, arroz, carne de sol desfiada, queijo coalho tostado, bacon crocante, linguiça artesanal e toque de coentro fresco.', 68.00, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80', true, false, true, ARRAY['Prato Típico', 'Sabor Raiz'], '2 pessoas', 8),
    ('m3', 'Risoto de Costela com Agrião e Parmesão', 'pratos', 'Arroz arbóreo cremoso enriquecido com redução de vinho tinto, costela bovina desfiada no ponto perfeito e folhas de agrião fresco.', 64.90, 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80', true, false, false, ARRAY['Gourmet'], '1 pessoa', 9),
    ('d1', 'Caipirinha Imperial do Elias', 'drinks', 'Cachaça artesanal envelhecida em barril de amburana, limão tahiti, limão siciliano, rapadura ralada e ramo de hortelã fresca.', 29.90, 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80', true, true, true, ARRAY['Autoral', 'Mais Pedido'], NULL, 10),
    ('d2', 'Gin Tônica Tropical Botanic', 'drinks', 'Gin premium infusionado com zimbro, água tônica artesanal, fatias de maracujá, alecrim fresco e toque cítrico de toranja.', 34.00, 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80', true, true, false, ARRAY['Refrescante', 'Instagramável'], NULL, 11),
    ('d3', 'Smoky Old Fashioned', 'drinks', 'Bourbon Whiskey americano, bitter aromático de laranja, xarope de açúcar demerara e finalização com defumação de canela em pau na mesa.', 38.00, 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80', true, false, true, ARRAY['Clássico Sofisticado'], NULL, 12),
    ('d4', 'Moscow Mule da Boemia', 'drinks', 'Vodka selecionada, suco de limão fresco, xarope artesanal de gengibre e espuma cremosa de gengibre com raspas de limão tahiti na caneca de cobre.', 32.00, 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80', true, true, false, ARRAY['Popular'], NULL, 13),
    ('c1', 'Chopp Pilsen Puro Malte (500ml)', 'cervejas', 'Chopp extremamente fresco, colarinho cremoso aveludado e temperatura de -2°C no copo previamente ultracongelado.', 11.90, 'https://images.unsplash.com/photo-1608270119864-1678121a8d05?auto=format&fit=crop&w=800&q=80', true, true, false, ARRAY['Super Gelado', 'Mais Vendido'], NULL, 14),
    ('c2', 'Chopp IPA Artesanal (500ml)', 'cervejas', 'Notas cítricas marcantes de lúpulos americanos, amargor equilibrado e corpo dourado aveludado.', 18.90, 'https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?auto=format&fit=crop&w=800&q=80', true, false, false, ARRAY['Artesanal', 'Amargor Intenso'], NULL, 15),
    ('c3', 'Cervejas Especiais Garrafa (600ml)', 'cervejas', 'Opções selecionadas: Heineken, Stella Artois, Original, Spaten e Corona.', 17.50, 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=800&q=80', true, false, false, ARRAY['Garrafa 600ml'], NULL, 16),
    ('s1', 'Pudim de Leite Condensado do Elias', 'sobremesas', 'Pudim lisinho e cremoso, sem furinhos, finalizado com calda aveludada de caramelo, café expresso e notas sutis de cachaça envelhecida.', 22.00, 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80', true, true, true, ARRAY['Autoral', 'Incrível'], NULL, 17),
    ('s2', 'Churros Artesanais com Doce de Leite Viçosa', 'sobremesas', 'Palitos crocantes de churros passados no açúcar com canela, acompanhados de generoso pote de doce de leite cremoso de Minas Gerais.', 24.50, 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=800&q=80', true, true, false, ARRAY['Sobremesa Quente'], NULL, 18)
ON CONFLICT (id) DO UPDATE SET
    price = EXCLUDED.price,
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    image = EXCLUDED.image,
    is_available = EXCLUDED.is_available,
    updated_at = now();
