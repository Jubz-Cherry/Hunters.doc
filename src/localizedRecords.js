// English copy for the fixed bestiary and arsenal entries. User-written text is kept as entered.
const monsters = {
  Vampiro: {
    displayName: 'Vampire',
    origin: 'European folklore, especially Eastern Europe.',
    description: [
      'Vampires are immortal nocturnal predators with superhuman strength, keen senses, and a thirst for blood.',
      'Crosses, garlic, holy water, and sunlight do not kill them, although they prefer to avoid the sun.',
      'They live in small groups called nests, led by an alpha or an older vampire. Most see humans as prey.'
    ],
    custom: ['They look human, but have sharp fangs. Some appear pale or have shining eyes.'],
    behavior: ['They hunt at night and are often cunning and manipulative.'],
    transformation: ['A person becomes a vampire after a bite followed by drinking vampire blood. Their teeth change and their hunger becomes overwhelming.'],
    cure: ['A newly turned vampire can be cured before drinking human blood by consuming the blood of the vampire who turned them.'],
    weaknesses: ['Decapitation', 'Poor self-control soon after turning', 'Sunlight causes discomfort but is not fatal']
  },
  Lobisomem: {
    displayName: 'Werewolf',
    origin: 'European and American folklore, as recorded by hunters in the United States.',
    description: ['A werewolf is a human cursed to transform into a wolf-like creature, usually during a full moon.', 'The curse is commonly passed through a bite or scratch.'],
    custom: ['In wolf form, they have great strength, agility, sharp senses, claws, and teeth.'],
    behavior: ['They become aggressive and may lose control when transformed.'],
    transformation: ['A bite or scratch from another werewolf passes on the curse.'],
    cure: ['There is no known way back after transformation.'],
    weaknesses: ['Silver', 'A silver knife through the heart']
  },
  Wendigo: {
    displayName: 'Wendigo',
    origin: 'Indigenous North American legends, particularly Algonquian traditions.',
    description: ['A spirit of winter, hunger, and greed that can turn people into insatiable monsters.', 'It does not age or sleep and is extremely difficult to track. Its hunger only grows as it eats human flesh.'],
    custom: ['Often depicted as a huge skeletal creature with dry skin, sunken eyes, and a foul smell.'],
    behavior: ['It hunts and devours people, driven by endless hunger.'],
    transformation: ['Extreme hunger and cannibalism can corrupt a person and allow the Wendigo spirit to take hold.'],
    cure: ['There is no known cure. Fire can destroy it.'],
    weaknesses: ['Fire', 'Traps and bullets may slow it down but will not kill it']
  },
  'Demônio': {
    displayName: 'Demon',
    origin: ['Corrupted human souls from Hell that seek to possess or harm the living.'],
    description: ['Demons are human souls twisted by torture in Hell.', 'They are made of black smoke and can possess human bodies. Their eyes reveal their true nature.'],
    custom: ['They may appear human through a host, or take on frightening forms.'],
    behavior: ['They manipulate and possess people to cause suffering and destruction.'],
    transformation: ['A soul tortured in Hell can lose its humanity and become a demon.'],
    cure: ['There is no cure, but exorcism and sacred rituals can send a demon back to Hell.'],
    weaknesses: ['Holy water', 'Exorcism', 'Demon traps and binding sigils', 'Demon knives, angel blades, and the Colt']
  },
  Anjo: {
    displayName: 'Angel',
    origin: ['Celestial beings created by God as messengers, warriors, and guardians of Heaven.'],
    description: ['Angels are powerful beings of celestial grace.', 'They use consenting human vessels to act in the physical world. Their eyes shine when they reveal their power.'],
    custom: ['They look human in a vessel. Their true forms are radiant and may be impossible for humans to behold safely.'],
    behavior: ['Most obey Heaven’s hierarchy, while some question their orders or develop empathy for humans.'],
    transformation: ['Humans do not become angels. Angels are created by God and may inhabit willing vessels.'],
    cure: ['Wounded angels may recover over time or by absorbing more grace. Fallen angels may seek redemption.'],
    weaknesses: ['Angel banishing sigils', 'Angel blades and celestial weapons', 'Enochian containment circles']
  },
  Fantasma: {
    displayName: 'Ghost',
    origin: ['The spirit of a dead person held in the living world by trauma, vengeance, or unfinished business.'],
    description: ['Ghosts can become hostile or deadly.', 'They may move objects, chill a room, disrupt electronics, and harm the living. Some are aware; others repeat moments from their past.'],
    custom: ['They can appear translucent, shadowy, or as full apparitions, sometimes accompanied by voices or footsteps.'],
    behavior: ['Some are only echoes, while others attack people connected to their past or the place where they died.'],
    transformation: ['A spirit may remain after death because of pain, anger, attachment, a curse, or necromancy.'],
    cure: ['Burning the remains usually releases the spirit. Destroying an emotional anchor can also help.'],
    weaknesses: ['Salt barriers', 'Iron', 'Burning their bones', 'Banishing rituals']
  },
  Metamorfo: {
    displayName: 'Shapeshifter',
    origin: ['Descendants of the Alpha Shapeshifter, a descendant of Eve.'],
    description: ['Mutant humans able to copy another person’s physical appearance perfectly.'],
    behavior: ['Often solitary, they steal identities to gain money, property, or access to other lives.'],
    transformation: ['An inherited ability. They shed old skin and teeth to reveal a new form.'],
    cure: ['No cure applies to this inherited condition.'],
    weaknesses: ['Pure silver through the heart']
  },
  'Ghoul (Carniçal)': {
    displayName: 'Ghoul',
    origin: ['Ancient Middle Eastern mythology, associated with Eve.'],
    description: ['Scavenging monsters that raid graves and feed on the recently dead.'],
    behavior: ['They hide among humans, sometimes working near morgues or cemeteries, and defend their nests fiercely.'],
    transformation: ['They are a distinct biological species. Humans do not turn into ghouls.'],
    cure: ['There is no known cure.'],
    weaknesses: ['Complete decapitation or destruction of the brain']
  },
  Rugaru: {
    displayName: 'Rugaru',
    origin: ['French-American Cajun legends.'],
    description: ['A human carrying a dormant genetic mutation that appears later in life.'],
    behavior: ['An insatiable hunger develops into a craving for human flesh. Eating it for the first time ends their self-control.'],
    transformation: ['The mutation is inherited and fully activates when the carrier eats human flesh.'],
    cure: ['There is no known cure once the mutation activates.'],
    weaknesses: ['Fire and complete incineration']
  },
  'Naves Estelares Jefferson': {
    displayName: 'Jefferson Starships',
    origin: ['Created directly by Eve during season six.'],
    description: ['Genetically altered hybrids designed to be ultimate predators of humans and hunters.'],
    appearance: ['They look human but can reveal retractable vampire fangs and werewolf claws at the same time.'],
    behavior: ['They act as coordinated soldiers under Eve’s direct psychic command and are relentless in combat.'],
    transformation: ['Multiple bites infect humans and alter their DNA within minutes.'],
    cure: ['There is no known cure.'],
    weaknesses: ['Unknown.']
  },
  'Leviatã': {
    displayName: 'Leviathan',
    origin: ['Created by God before humans and angels, then imprisoned in Purgatory.'],
    description: ['Ancient monsters with endless hunger that can consume living beings and mimic molecular structures.'],
    appearance: ['Their true form is a black, viscous mass. In human form, their heads split open to reveal enormous jaws and sharp teeth.'],
    behavior: ['Highly intelligent and calculating, they use chemicals in food to turn humanity into a managed food supply.'],
    transformation: ['They do not turn humans into leviathans. By touch, they absorb a person’s DNA and make a perfect copy.'],
    cure: ['Not applicable.'],
    weaknesses: ['Borax-based chemicals burn them, while decapitation slows regeneration.', 'A righteous mortal’s bone bathed in the blood of three fallen beings can kill them permanently.']
  }
};

const guns = {
  Lamina: {
    displayName: 'Angel Blade',
    origin: ['Forged in Heaven from celestial metal and carried by angels.'],
    description: ['The angel blade is a standard angelic weapon.', 'Its silver shine conceals the power to kill demons and other angels with a direct strike.'],
    custom: ['An elongated dagger with inscriptions. An angel killed by it glows and burns from within.'],
    usage: ['Used against angels, demons, and powerful supernatural beings, especially in close combat.'],
    weaknesses: ['It does not work against ordinary humans or unrelated creatures.', 'An opponent can take it and use it against its owner.']
  },
  Faca: {
    displayName: 'Demon Knife',
    origin: ['Brought by Ruby, a demon. Its exact origin is unknown and it may be enchanted with infernal magic.'],
    description: ['A curved knife that can kill most demons instantly by destroying the possessing spirit.', 'It can also wound other supernatural creatures.'],
    custom: ['An old, worn curved blade covered in demonic inscriptions.'],
    usage: ['Effective in direct combat against most lower- and middle-ranking demons.'],
    weaknesses: ['It does not affect ordinary humans or angels.', 'It is less effective against exceptionally powerful demons and can be turned against its wielder.']
  },
  Colt: {
    displayName: 'The Colt',
    origin: ['Created by hunter and gunsmith Samuel Colt in 1835 with mystical markings and special bullets.'],
    description: ['A legendary revolver that can kill almost any supernatural creature with one shot.', 'Its enchanted ammunition is very difficult to reproduce.'],
    custom: ['An Old West revolver with unique arcane inscriptions on its cylinder.'],
    usage: ['Useful at a distance against demons, vampires, ghosts, shapeshifters, and some lesser gods.'],
    weaknesses: ['It cannot kill some higher beings.', 'Without special bullets it is an ordinary gun, and the ammunition is hard to make.']
  },
  Cajado: {
    displayName: 'Mark of Cain Weapon',
    origin: ['Linked to the Mark of Cain and the dark power passed from Lucifer to Cain.'],
    description: ['A legendary weapon that grants supernatural strength and can kill Knights of Hell.', 'Its use corrupts the wielder and awakens bloodlust.'],
    custom: ['Its appearance varies, often resembling a rustic weapon channeled through the bearer of the Mark.'],
    usage: ['Can kill nearly immortal beings and channel the power of the Mark in close combat.'],
    weaknesses: ['Prolonged use corrupts the wielder.', 'The Mark is difficult to remove, making the weapon dangerous to its owner.']
  },
  Foice: {
    displayName: 'Death’s Scythe',
    origin: ['Belongs to Death, one of the Four Horsemen of the Apocalypse.'],
    description: ['One of the most powerful weapons in Supernatural, capable of killing mortal, immortal, and cosmic beings.', 'Only certain wielders can use its full power.'],
    custom: ['A long-handled scythe with a large curved blade and an ominous presence.'],
    usage: ['Used to reap souls and destroy beings thought invincible.'],
    weaknesses: ['Extremely rare and dangerous in the wrong hands.', 'Its power depends on its connection to Death.']
  },
  Lanca: {
    displayName: 'Michael’s Spear',
    origin: ['Forged in Heaven by the archangel Michael from celestial power.'],
    description: ['An angelic weapon capable of destroying exceptionally powerful beings, including archangels and high-ranking demons.'],
    custom: ['A long, radiant spear with golden details and Enochian inscriptions.'],
    usage: ['Used in direct confrontations against angels and other powerful creatures.'],
    weaknesses: ['Only powerful beings can wield it properly.', 'Greater divine power may disable or destroy it.']
  }
};

const marks = {
  'A Marca de Caim': {
    displayName: 'The Mark of Cain',
    origin: 'Created by God to lock away the Darkness. It passed from Lucifer to Cain and then to Dean Winchester.',
    appearance: 'A raised reddish scar shaped like a stylized hook or letter.',
    description: 'One of the oldest and most dangerous curses, tied to the original darkness.',
    powers_offered: 'Immortality, great strength, resistance to demonic powers, and the ability to wield the First Blade.',
    effects_on_person: 'Uncontrollable bloodlust, rage, violent nightmares, and corruption of the bearer.',
    weakness: 'A spell from the Book of the Damned can remove it, but removing it without passing it on releases the Darkness.'
  },
  'Tatuagem Antipossessão (Anti-Possession Tattoo)': {
    displayName: 'Anti-Possession Tattoo',
    origin: 'An old hunter symbol passed down for generations and tattooed by Sam and Dean.',
    appearance: 'A pentagram inside a circle, surrounded by outward-pointing flames or sun rays.',
    description: 'A permanent spiritual shield marked on the skin.',
    powers_offered: 'Prevents demonic possession.',
    effects_on_person: 'No harmful mental or physical effect; it serves as a passive barrier.',
    weakness: 'Damaging the tattooed skin breaks the symbol and removes its protection.'
  },
  'Símbolo de Banimento de Anjos (Angel Banishing Sigil)': {
    displayName: 'Angel Banishing Sigil',
    origin: 'An ancient angelic symbol remembered by Anna Milton and often used by Castiel.',
    appearance: 'A geometric design resembling an open hand with wing-like lines.',
    description: 'A defensive sigil drawn on a flat surface to drive angels away.',
    powers_offered: 'Teleports nearby angels to a distant random location on Earth.',
    effects_on_person: 'It must be drawn in human blood and activated by striking its center with an open hand.',
    weakness: 'Its effect is temporary. The banished angels can return.'
  },
  'Hexagrama Unicursal (Estrela dos Homens de Letras)': {
    displayName: 'Unicursal Hexagram',
    origin: 'The emblem of the Men of Letters, a secret society devoted to studying the supernatural.',
    appearance: 'A six-pointed star drawn with one continuous line.',
    description: 'A symbol of balance and the union of mystical and scientific knowledge.',
    powers_offered: 'Can open hidden bunkers, filter magic, and identify members of the order.',
    effects_on_person: 'Does not change the body; it acts as a mark of mystical authority.',
    weakness: 'Without additional spells, it offers no direct physical protection.'
  },
  'Símbolos Enoquianos nas Costelas (Enochian Rib Carvings)': {
    displayName: 'Enochian Rib Carvings',
    origin: 'Carved into Sam and Dean’s ribs by Castiel.',
    appearance: 'Enochian runes engraved directly on the rib bones.',
    description: 'A powerful concealment spell built into the bearer’s skeleton.',
    powers_offered: 'Hides the bearer from angels, archangels, and powerful demons, preventing magical tracking.',
    effects_on_person: 'The carving causes extreme pain but does not alter the mind.',
    weakness: 'It does not hide anyone from humans, ordinary monsters, cameras, or physical tracks.'
  },
  "Armadilha de Demônios (Devil's Trap)": {
    displayName: "Devil's Trap",
    origin: 'Based on the Key of Solomon and widely used by hunters.',
    appearance: 'A pentagram or hexagram inside a circle marked with ancient symbols.',
    description: 'A magic circle placed on a floor, ceiling, or rug to capture demons.',
    powers_offered: 'Traps a demon inside its boundary and blocks powers such as teleportation and telekinesis.',
    effects_on_person: 'It does not affect ordinary humans; trapped demons suffer and can be interrogated or exorcised.',
    weakness: 'Any break in the circle immediately releases the demon.'
  },
  'Símbolo de Aprisionamento de Anjos (Angel Trap)': {
    displayName: 'Angel Trap',
    origin: 'Ancient Enochian magic used to contain celestial beings.',
    appearance: 'A complete circle of purified holy oil drawn on the ground.',
    description: 'The celestial counterpart of a devil’s trap.',
    powers_offered: 'When lit, the holy oil forms flames that block an angel’s powers and prevent escape.',
    effects_on_person: 'Humans are unaffected; touching the holy flames can destroy an angel and its vessel.',
    weakness: 'Breaking the oil circle extinguishes the fire and lets the angel escape.'
  },
  "A Queimadura de Castiel (Cas's Handprint)": {
    displayName: "Castiel's Handprint",
    origin: 'Left when Castiel rescued Dean Winchester from Hell.',
    appearance: 'A deep, dark hand-shaped scar on Dean’s left shoulder.',
    description: 'A lasting mystical burn left by celestial energy touching a human soul.',
    powers_offered: 'It grants no practical power, but shows that Dean was rescued by Heaven.',
    effects_on_person: 'It was part of the restoration of Dean’s body after his death.',
    weakness: 'It is a residual scar and provides no active magical protection.'
  },
  'O Símbolo Ceifador (Reaper Trap)': {
    displayName: 'Reaper Trap',
    origin: 'Made by ancient sorcerers and necromancers to restrain reapers.',
    appearance: 'A complex diagram with a stylized scythe, angular lines, and rare runes.',
    description: 'A specialized magic trap for beings that guide souls into the afterlife.',
    powers_offered: 'Allows a human to trap a reaper, compel obedience, or drain mystical energy.',
    effects_on_person: 'The caster risks drawing the wrath of Death if the ritual fails.',
    weakness: 'It requires human blood and fails if the design is smudged or torn.'
  },
  'A Marca de Alastair (Símbolo de Tortura Infernal)': {
    displayName: "Alastair's Mark",
    origin: 'Developed by Alastair, Hell’s chief torturer.',
    appearance: 'Angular lines and sharp points resembling crossed meat hooks.',
    description: 'Sigils carved or painted in Hell’s torture chambers.',
    powers_offered: 'Binds a soul or angel to a torture device and blocks healing or telepathic calls for help.',
    effects_on_person: 'Causes severe spiritual pain and weakens the prisoner’s will.',
    weakness: 'It must be sustained by painful rituals; interruption may let the prisoner resist.'
  },
  'Selo dos Quatro Cavaleiros (The Four Horsemen Rings/Sigils)': {
    displayName: 'Four Horsemen Seal',
    origin: 'Runes and symbols tied to the magical rings of War, Famine, Pestilence, and Death.',
    appearance: 'Four gemmed rings that form a three-dimensional geometric lock when joined.',
    description: 'A mystical mechanism for opening and closing Lucifer’s Cage.',
    powers_offered: 'Controls the portal leading directly to Lucifer’s Cage in Hell.',
    effects_on_person: 'Allows the wielder to manipulate the portal and the passage between worlds.',
    weakness: 'Damage to one of the colored stones can cause the seal to fail.'
  }
};

export function localizeRecord(record, language, kind) {
  if (language !== 'en') return record;
  const translations = kind === 'monster' ? monsters : kind === 'gun' ? guns : marks;
  return { ...record, ...translations[record.name] };
}
