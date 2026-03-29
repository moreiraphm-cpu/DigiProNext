const palavras = [
  'abacate', 'abelha', 'abraço', 'absurdo', 'academia', 'acidente', 'açougue', 'adolescente', 'advogado', 'aeroporto',
  'agenda', 'agulha', 'alegria', 'alfaiate', 'algodão', 'alimento', 'almofada', 'aluguel', 'amarelo', 'ambiente',
  'ambulância', 'amendoim', 'amizade', 'ampulheta', 'análise', 'abacaxi', 'andorinha', 'animal', 'aniversário', 'ansiedade',
  'anúncio', 'apagar', 'aparelho', 'apartamento', 'apêndice', 'aplauso', 'aposentado', 'aprender', 'aquário', 'aranha',
  'arbusto', 'arquivo', 'arquiteto', 'armadilha', 'armazém', 'armário', 'arquitetura', 'artesanato', 'artista', 'asfalto',
  'assassino', 'assento', 'assinar', 'assistência', 'assumir', 'asterisco', 'astronauta', 'astronomia', 'atadura', 'atenção',
  'atentado', 'atletismo', 'atmosfera', 'atração', 'atrasado', 'atualizar', 'aquarela', 'avental', 'aventura', 'azeitona',
  'bagagem', 'bailarina', 'balança', 'balanço', 'baleia', 'banana', 'bananal', 'bandeja', 'bandeira', 'banheira',
  'banquete', 'baralho', 'barbante', 'barbearia', 'barreira', 'barraca', 'barriga', 'barulho', 'basquete', 'batata',
  'bateria', 'batida', 'beleza', 'bengala', 'berinjela', 'beterraba', 'biblioteca', 'bicicleta', 'bilhete', 'biologia',
  'biscoito', 'bolacha', 'boliche', 'boneca', 'borracha', 'bosque', 'bracelete', 'bramido', 'branco', 'bravura',
  'brilhante', 'brinco', 'brinquedo', 'brócolis', 'bronze', 'buraco', 'buzina', 'cabana', 'cabelo', 'cabide',
  'cadeira', 'caderno', 'cachorro', 'caçador', 'caçamba', 'cadeado', 'cafeteria', 'caipira', 'caixote', 'cajado',
  'calcanhar', 'cálculo', 'caldeirão', 'calendário', 'calmaria', 'caloroso', 'calçada', 'camelo', 'caminhada', 'caminho',
  'caminhão', 'camiseta', 'camisola', 'campainha', 'campeão', 'campeonato', 'camponês', 'canário', 'canavial', 'cancela',
  'caneca', 'canguru', 'canivete', 'cansaço', 'cantiga', 'cantora', 'capanga', 'capital', 'capítulo', 'capivara',
  'caracol', 'caramelo', 'caranguejo', 'caravana', 'careca', 'carimbo', 'carinho', 'carpinteiro', 'carrapato', 'carrossel',
  'carteira', 'carvalho', 'casaco', 'cascalho', 'castelo', 'cataclismo', 'catálogo', 'damasco', 'danceteria', 'deboche',
  'década', 'decepção', 'decifrar', 'declínio', 'decolar', 'decoração', 'decreto', 'defeito', 'defesa', 'deficiência',
  'defunto', 'degelo', 'degrau', 'delegacia', 'delicado', 'delírio', 'demanda', 'demência', 'demitir', 'demolidor',
  'demônio', 'demora', 'dentista', 'dentro', 'departamento', 'depressão', 'deputado', 'derivado', 'derramar', 'derreter',
  'derrota', 'desafio', 'desastre', 'descer', 'descida', 'desculpa', 'desenhar', 'desenho', 'deserto', 'desespero',
  'desfile', 'desgraça', 'designer', 'desmaio', 'despensa', 'despesa', 'desprezo', 'destaque', 'destino', 'destruir',
  'detetive', 'detrito', 'devagar', 'devedor', 'diamante', 'dicionário', 'diferença', 'difícil', 'digerir', 'dignidade',
  'dilúvio', 'dimensão', 'dinheiro', 'dinossauro', 'diploma', 'direita', 'diretor', 'diretriz', 'discurso', 'discussão',
  'disfarce', 'disparo', 'display', 'disputa', 'distância', 'distinção', 'distrito', 'ditado', 'ditadura', 'divertido',
  'dívida', 'divisão', 'divórcio', 'dizimar', 'doador', 'dobrar', 'doceria', 'documento', 'doença', 'doente',
  'economia', 'edifício', 'educação', 'efeito', 'enfeitar', 'enfeite', 'eficácia', 'egocêntrico', 'egoísmo', 'elegante',
  'elefante', 'elemento', 'elevador', 'elogio', 'embalagem', 'embaixada', 'embate', 'embelezar', 'embora', 'embrulho',
  'emergência', 'emissora', 'emoção', 'empatia', 'empada', 'empadão', 'empilhar', 'empolgado', 'empregado', 'emprego'
];

export async function GET() {
  const aleatoria = palavras[Math.floor(Math.random() * palavras.length)]
  return Response.json({ palavra: aleatoria })
}