const numero_problema = 4;

export function promedios(
  nums = Array.from(
    { length: 10 },
    () => Math.floor(Math.random() * 100000) / 100000,
  ),
  alfa = 0.05,
) {
  let sum = 0;
  const N = nums.length;
  nums.forEach((e) => {
    sum += e;
  });
  const prom = sum / N;
  const Z = Math.abs(((prom - 1 / 2) * Math.sqrt(N)) / Math.sqrt(1 / 12));
  const Z_tabla = 1.96;
  promedios_print_config(nums, prom, Z, Z_tabla, alfa);
  console.log();
  promedios_title(nums, 0.05);
}

function promedios_print_config(
  nums: number[],
  prom: number,
  Z: number,
  Z_tabla: number,
  alfa: number,
) {
  console.log(
    ` {
        id: "p${numero_problema}n2", tipo: "promedios",
        numeros: ${nums},
        alfa: ${alfa},
    `,
  );
  if (Z < Z_tabla) {
    console.log(' conclusion: "Los números rectangulares son aceptados", ');
  } else {
    console.log(' conclusion: "Los números rectangulares se rechazan",');
  }
  console.log(
    ` campos: [
            { campo: "media", etiqueta: "x̄" },
            { campo: "z0", etiqueta: "Z₀", tolerancia: 0.01 },
            { campo: "z", etiqueta: "Z" }
        ],
        respuestas: { media: "${prom}", z0: "${Z}", z: "${Z_tabla}" }
    },
    `,
  );
}

function promedios_title(nums: number[], a: number) {
  let text = `N = ${nums.length}\ta = ${a * 100}%\n\n`;
  nums.forEach((num) => {
    text = text.concat(`${num}\n`);
  });
  console.log(text);
}

promedios();
