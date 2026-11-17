const numero_problema = 5;

export function frecuencias(
  nums = Array.from(
    { length: 10 },
    () => Math.floor(Math.random() * 100000) / 100000,
  ),
  alfa = 0.05,
  n = 5,
) {
  const x_tabla = [
    3.84, 5.99, 7.81, 9.49, 11.07, 12.59, 14.07, 15.51, 16.92, 18.31,
  ];
  const N = nums.length;
  const FEi = N / n;
  const FOi = new Array(n).fill(0);

  nums.forEach((num) => {
    const idx = Math.min(Math.floor(num * n), n - 1);
    FOi[idx]++;
  });

  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += Math.pow(FOi[i]! - FEi, 2);
  }
  const xo2 = sum / FEi;
  const xtabla = x_tabla[n - 2]!;
  frecuencias_print_config(nums, alfa, n, xo2, xtabla, FEi, FOi);
}

function frecuencias_print_config(
  nums: number[],
  alfa: number,
  n: number,
  xtotal: number,
  xtabla: number,
  FEi: number,
  FOi: number[],
) {
  console.log(`
    {
        id: "p${numero_problema}n2", tipo: "frecuencias",
        numeros: [${nums}],
        alfa: ${alfa},
        n: ${n},
    `);
  if (xtotal < xtabla) {
    console.log(
      `        conclusion: "Los números rectangulares son aceptados",`,
    );
  } else {
    console.log(
      `        conclusion: "Los números rectangulares son rechazados",`,
    );
  }
  console.log(`        tabla: [ `);
  for (let i = 0; i < FOi.length; i++) {
    console.log(`            { foi: "${FOi[i]}", fei: "${FEi}" },`);
  }
  console.log(`        ],
        campos: [
            { campo: "xTotal", etiqueta: "χ² calculada" },
            { campo: "xTablas", etiqueta: "χ² de tablas" }
        ],
        respuestas: { xTotal: "${xtotal}", xTablas: "${xtabla}" }
    }, `);
}

frecuencias();
