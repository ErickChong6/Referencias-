export function exponencial(
  nums: number[] = Array.from(
    { length: 10 },
    () => Math.floor(Math.random() * Math.pow(10, 5)) / Math.pow(10, 5),
  ),
  lambda = 5,
) {
  const x_arr: number[] = [];
  nums.forEach((num) => {
    x_arr.push(formula(num, lambda));
  });
  exponencial_config(nums, x_arr);
}

function formula(num: number, lambda: number): number {
  return -(1 / lambda) * Math.log(num);
}

function exponencial_config(nums: number[], x_arr: number[]) {
  console.log(`
    {
        id: "p0n4", tipo: "exponencial",
        enunciado: "TODO",
        numeros: [${nums}],
        campos: [
            { campo: "t1", etiqueta: "T1" },
            { campo: "t2", etiqueta: "T2" },
            { campo: "t3", etiqueta: "T3" },
            { campo: "t4", etiqueta: "T4" },
            { campo: "t5", etiqueta: "T5" },
            { campo: "t6", etiqueta: "T6" },
            { campo: "t7", etiqueta: "T7" },
            { campo: "t8", etiqueta: "T8" },
            { campo: "t9", etiqueta: "T9" },
            { campo: "t10", etiqueta: "T10" },
            { campo: "pregunta1", etiqueta: "TODO" },
            { campo: "pregunta2", etiqueta: "TODO" },
            { campo: "pregunta3", etiqueta: "TODO" }
        ],
        // Método de transformada inversa (como en clase): X = −(1/λ) · ln R, con λ = 8
        respuestas: {
              `);
  x_arr.forEach((n, i) => {
    console.log(`
            t${i + 1}: "${n}",
              `);
  });
  console.log(`
            pregunta1: "TODO", pregunta2: "TODO", pregunta3: "TODO"
        }
    },
              `);
}

exponencial();
