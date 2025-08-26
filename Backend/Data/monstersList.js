
const monstersList = [
  {
    name: "Vampiro",
    origin: "Folclore europeu (principalmente do Leste Europeu, como Romênia e Sérvia)",
    banner: "http://localhost:3001/imagens/vampires.jpg",

    description: ["Vampiros são predadores noturnos imortais, conhecidos por sua força sobre-humana, sentidos aguçados e sede insaciável por sangue.",
    "Vampiros não temem cruzes, alho ou água benta. Também não queimam sob o sol, embora prefiram evitá-lo por desconforto e discrição.",
    "Vampiros costumam viver em pequenos grupos chamados 'ninhos',",
    "liderados por um alfa ou um vampiro mais velho. São caçadores por natureza e poucos escolhem se alimentar de sangue animal.", 
    "A maioria considera os humanos simples presas — e muito raramente, aliados."],

    custom:["Vampiros geralmente mantêm aparência humana, mas possuem dentes afiados (presas) para perfurar a pele das vítimas.",
    "Podem apresentar palidez, olhos brilhantes e, em algumas versões, reflexo ausente em espelhos."],

    behavior:["São predadores noturnos que caçam suas vítimas para se alimentar.",
    "Muitas vezes são retratados como seres astutos, manipuladores e imortais."],  

    transformation:["A transformação ocorre quando um humano é mordido por um vampiro e ingere o sangue dele.",
    "Após isso, o corpo entra em mutação, os dentes se tornam serrilhados, e a sede por sangue se torna insuportável.", 
    "Nos primeiros dias, o novo vampiro sente uma dor física e psicológica intensa, sua humanidade começa a desaparecer"],
    
    cure:["Existe uma cura para vampiros recém-transformados, **desde que não tenham consumido sangue humano ainda**.", 
    "O processo envolve fazer a vítima ingerir uma dose do sangue do vampiro que a infectou. Isso reverte a mutação, devolvendo sua condição humana.",
    "O ritual é extremamente doloroso e só funciona em estágios iniciais da transformação."],
    
    weaknesses: ["Decapitação (única maneira de matá-los)",
    "Autocontrole frágil em recém-transformados",
    "Recém-transformados podem ser curados, a menos que ainda não tenham ingerido sangue",
    "Luz solar incomoda, mas não mata"],
    image: "http://localhost:3001/imagens/vampires.jpg",
  },
  {
    name: "Lobisomem",
    banner: "http://localhost:3001/imagens/lobi.jpg",
    origin: "Lendas e relatos de caçadores nos Estados Unidos, baseados em folclores europeus e americanos",
    
    description: ["Acreditava-se que o lobisomem era um humano que, por maldição ou pacto com forças sobrenaturais,",
    "se transformava em um lobo ou em uma criatura metade homem, metade lobo.",
    "Essa transformação acontecia geralmente nas noites de lua cheia.",
    "Geralmente, a maldição do lobisomem é transmitida por meio de mordida ou arranhão de outro lobisomem,",
    "tornando a vítima uma nova criatura."],

    custom:["Durante a transformação, o lobisomem apresenta força, agilidade e sentidos muito superiores aos humanos comuns.",
    "Sua pele é coberta por pelos e suas garras e dentes são afiados."],

    behavior:[" Lobisomens são conhecidos por serem agressivos, principalmente quando transformados.",
    "Em muitos mitos, eles perdem o controle e atacam qualquer um que estiver por perto."],

    transformation:["Geralmente, a maldição do lobisomem é transmitida por meio de mordida ou arranhão de outro lobisomem,",
    "tornando a vítima uma nova criatura."],

    cure:["Uma vez que um ser humano se transforma, não há volta"],

    weaknesses: ["Coisas de prata,",
      "Faca de prata no coração"],
    image: "http://localhost:3001/imagens/lobi.jpg",
  },
  {
    name: "Wendigo",
    banner: "http://localhost:3001/imagens/wendigo.jpg",
    origin: ["O Wendigo é uma criatura mítica originária das lendas dos povos indígenas do norte da América,",
    "especialmente das tribos algonquinas."],

    description: ["O Wendigo é geralmente descrito como o espírito do inverno, da fome e da ganância,",
    "que pode possuir humanos ou transformar pessoas em monstros famintos e insaciáveis.",
    "O Wendigo não envelhece, não dorme e é praticamente impossível de rastrear. Quando escolhe uma vítima,",
    "ela dificilmente escapa. Sua fome nunca passa — quanto mais carne humana consome, mais sente necessidade de continuar caçando."],

    custom:["Em muitas descrições, o Wendigo é uma criatura gigante, esquelética, com pele ressecada,",
    "olhos profundos e um odor fétido. Algumas versões o retratam com chifres ou características animais."],

    behavior:[" É conhecido pela fome insaciável por carne humana, caçando e devorando pessoas.",
    "O Wendigo representa a perda da humanidade pelo consumo voraz de carne humana e o desespero."],

    transformation:["Canibalismo em situações extremas de fome",
    " A transformação em Wendigo ocorre quando uma pessoa, isolada e desesperada, recorre ao canibalismo para sobreviver.",
    "Se o ato é cometido com ganância, ou sem arrependimento, a alma é corrompida e o espírito do Wendigo assume."],

    cure:["Não existe cura conhecida para o Wendigo. Uma vez transformado, só pode ser destruído com fogo."],

    weaknesses: ["Fogo (única forma confiável de matá-lo)",
    "Extrema vulnerabilidade a chamas intensas",
    "Pode ser enfraquecido com armadilhas e balas, mas não morto"],

    image: "http://localhost:3001/imagens/wendigo.jpg",
  },
  {
    name:"Demônio",
    banner:"http://localhost:3001/imagens/demon.jpg",

    origin:["Demônios são frequentemente descritos como espíritos caídos ou seres de outras dimensões,",
    "que buscam corromper, possuir ou destruir humanos."],
    
    description:[": `Demônios são almas humanas corrompidas após extensas torturas no Inferno.",
    "São entidades feitas de fumaça negra e podem possuir corpos humanos, ganhando acesso ao mundo dos vivos.",
    "Quando possuem um corpo, aparentam ser humanos comuns, mas revelam sua verdadeira natureza pelos olhos negros",
    "(ou de outras cores, dependendo do poder). São manipuladores, cruéis e extremamente perigosos."],
    
    custom:["Podem assumir diversas formas,",
    "desde figuras humanóides, humanas até criaturas monstruosas, muitas vezes deformadas ou assustadoras."],
    
    behavior:["Demônios costumam manipular, possuir ou influenciar pessoas para causar caos, sofrimento e destruição."],
    
    transformation:["`Quando uma alma humana morre e é enviada ao Inferno — geralmente por ter cometido pecados graves ou",
    "por fazer um pacto com um demônio — ela é torturada por anos. Com o tempo, se a alma cede e passa a torturar outras,",
    "ela perde sua humanidade e se transforma em um demônio."],

    cure:["Não há cura, dependendo da tradição, demônios podem ser banidos ou exorcizados por rituais religiosos,",
    "símbolos sagrados como um pentagrama, água benta ou oração. Não é uma cura, mas sim, uma forma de devolver a almda de volta ao inferno temporáriamente."],
   
    weaknesses:["Água benta queima, exorcismo, usar símbolos contenção -sigilos demoníacos- como forma de aprisionar-los,",
    "desenhar um pentagrama no chão pode ser útil se quiser mater um demônio preso enquanto faz o exorcismo.",
    "Pode também matar eles com a faca demoníaca -faca que mata somente demônios-, code -arma perdida feita por Sammuel Code com balas",
    "especiais que matam qualquer coisa-, faca dos anjos -mata anjos e demônios, lâmina forjada com metal celestial, um material que só existe no Céu.-"],
   
    image: "http://localhost:3001/imagens/demon.jpg",
  }
];

module.exports = monstersList;
