const problem_num = 1;

export function ks(
  nums = Array.from(
    { length: 10 },
    () => Math.floor(Math.random() * 100000) / 100000,
  ),
  alfa = 0.05,
) {
  const D_alfa_N = 0.409; // 0.05, 10
  const ordered_nums = nums.toSorted();
  let Dn = [];
  let biggest = 0;
  for (let i = 0; i < nums.length; i++) {
    Dn.push(Math.abs((i + 1) / nums.length - ordered_nums[i]!));
    // console.log(`${i}\t${ordered_nums[i]}\t${(i+1)/nums.length}\t${Dn[i]}`);
    if (biggest < Dn[i]!) {
      biggest = Dn[i]!;
    }
  }
  // console.log(biggest);
  ks_config(nums, ordered_nums, Dn, biggest, alfa, D_alfa_N);
}

function ks_config(
  nums: number[],
  ordered_nums: number[],
  Dn: number[],
  biggest: number,
  alfa: number,
  D_alfa_N: number,
) {
  console.log(`    {
        id: "p${problem_num}n2", tipo: "ks",
        numeros: [${nums}],
        alfa: ${alfa},
    `);
  if (biggest < D_alfa_N) {
    console.log(
      `        conclusion: "Los números rectangulares son aceptados",`,
    );
  } else {
    console.log(
      `        conclusion: "Los números rectangulares son rechazados",`,
    );
  }
  console.log(`        tabla: [`);
  for (let i = 0; i < nums.length; i++) {
    console.log(
      `            { i: "${i + 1}", xi: "${ordered_nums[i]}", f_xi: "${(i + 1) / nums.length}", Dn: "${Dn[i]}"`,
    );
  }
  console.log(`        ],
        campos: [
            { campo: "Dnmayor", etiqueta: "Valor estadístico mayor" },
            { campo: "dtablas", etiqueta: "dα , N " }
        ],
        respuestas: { Dnmayor: "${biggest}", dtablas: "${D_alfa_N}" }
    },
    `);
}

ks();
