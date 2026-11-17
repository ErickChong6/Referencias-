type Frequency = { char: string; count: number };
type Hand =
  | "Quintilla (Q)"
  | "Póker (P)"
  | "Full (TP)"
  | "Tercia (T)"
  | "Dos pares (2P)"
  | "Un par (1P)"
  | "Todos diferentes (TD)";
type Probability = { hand: Hand; probability: number };
type HandCount = { category: Hand; frequency: number };

const ALL_HANDS: Hand[] = [
  "Todos diferentes (TD)",
  "Un par (1P)",
  "Dos pares (2P)",
  "Tercia (T)",
  "Full (TP)",
  "Póker (P)",
  "Quintilla (Q)",
];

function classifyHand(freqs: Frequency[]): Hand {
  const counts = freqs.map((f) => f.count).sort((a, b) => b - a);
  if (counts.length === 1 && counts[0] === 5) return "Quintilla (Q)";
  if (counts.length === 1 && counts[0] === 4) return "Póker (P)";
  if (counts.length === 2 && counts[0] === 3 && counts[1] === 2)
    return "Full (TP)";
  if (counts.length === 1 && counts[0] === 3) return "Tercia (T)";
  if (counts.length === 2 && counts[0] === 2 && counts[1] === 2)
    return "Dos pares (2P)";
  if (counts.length === 1 && counts[0] === 2) return "Un par (1P)";
  return "Todos diferentes (TD)";
}

function countRepeatingChars(str: string): Array<Frequency> {
  const counts = new Map<string, number>();
  for (const char of str) {
    counts.set(char, (counts.get(char) ?? 0) + 1);
  }
  return [...counts.entries()]
    .filter(([, count]) => count > 1)
    .map(([char, count]) => ({ char, count }));
}

function tallyHands(hands: Hand[]): HandCount[] {
  const counts = ALL_HANDS.reduce<Record<Hand, number>>(
    (acc, hand) => ((acc[hand] = 0), acc),
    {} as Record<Hand, number>,
  );
  for (const hand of hands) counts[hand]++;
  return ALL_HANDS.map((category) => ({
    category,
    frequency: counts[category],
  }));
}

export function poker(
  num_len = 5,
  nums = Array.from(
    { length: 10 },
    () =>
      Math.floor(Math.random() * Math.pow(10, num_len)) / Math.pow(10, num_len),
  ),
) {
  const probabilities: Probability[] = [
    { hand: "Todos diferentes (TD)", probability: 0.3024 },
    { hand: "Un par (1P)", probability: 0.504 },
    { hand: "Dos pares (2P)", probability: 0.108 },
    { hand: "Tercia (T)", probability: 0.072 },
    { hand: "Full (TP)", probability: 0.009 },
    { hand: "Póker (P)", probability: 0.0045 },
    { hand: "Quintilla (Q)", probability: 0.001 },
  ];
  const alfa = 0.05;
  const X = 3.84; // 0.05, 1
  const classifying: Hand[] = nums.map((num) => {
    const num_str = num.toFixed(num_len).slice(2);
    return classifyHand(countRepeatingChars(num_str));
  });
  const FEi = tallyHands(classifying);
  const probByHand = new Map(probabilities.map((p) => [p.hand, p.probability]));
  let FEi_lt5 = 0;
  let FEi_gt5 = 0;
  let FOi_lt5 = 0;
  let FOi_gt5 = 0;
  console.log(`category\tfrequency\tprobability`);
  FEi.forEach((r) => {
    const probability = probByHand.get(r.category) ?? 0;
    const FEi = probability * nums.length;
    if (FEi < 5 && r.frequency > 0) {
      FOi_lt5 += r.frequency;
      FEi_lt5 += probability * nums.length;
    } else if (r.frequency > 0) {
      FOi_gt5 += r.frequency;
      FEi_gt5 += probability * nums.length;
    }
    console.log(
      `${r.category}\t${r.frequency}\t${probability} * ${nums.length} = ${FEi}`,
    );
  });
  const xo =
    Math.pow(FOi_lt5 - FEi_lt5, 2) / FEi_lt5 +
    Math.pow(FOi_gt5 - FEi_gt5, 2) / FEi_gt5;
  console.log(xo);
  console.log(`
    {
        id: "p2n2", tipo: "poker",
        numeros: [${nums}],
        alfa: ${alfa},
              `);
  if (xo < X) {
    console.log(`
        conclusion: "Los números rectangulares son aceptados",
                `);
  } else {
    console.log(`
        conclusion: "Los números rectangulares se rechazan",
                `);
  }
  console.log(`
        tabla: [
              `);
  FEi.forEach((h) => {
    const probability = probByHand.get(h.category) ?? 0;
    const fe = probability * nums.length;
    console.log(`
            { categoria: "${h.category}", prob: "${probability}", fo: "${h.frequency}", fe: "${fe}" },
                `);
  });
  console.log(`
        ],
        campos: [
            { campo: "feiagrupada", etiqueta: "FEi agrupada de los valores menores a 5" },
            { campo: "foiagrupada", etiqueta: "FOi agrupada" },
            { campo: "xo2", etiqueta: "X₀²", tolerancia: 0.00001 },
        ],
        respuestas: { feiagrupada: "${FEi_lt5}", foiagrupada: "${FOi_lt5}", xo2: "${xo}" }
    },
              `);
}

poker();
