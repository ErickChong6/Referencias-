export function uniforme(
  nums: number[] = Array.from(
    { length: 10 },
    () => Math.floor(Math.random() * Math.pow(10, 5)) / Math.pow(10, 5),
  ),
  a = Math.floor(Math.random() * 10) + 1,
) {
  const b = Math.floor(Math.random() * 10) + a;
  console.log(a, b);
  const x_arr: number[] = [];
  nums.forEach((num) => {
    x_arr.push(formula(num, a, b));
  });
  uniforme_config(nums, x_arr, a, b);
}

function formula(num: number, a: number, b: number): number {
  return a + (b - a) * num;
}

function uniforme_config(
  nums: number[],
  x_arr: number[],
  a: number,
  b: number,
) {
  console.log(`
    {
        // a = ${a}, b = ${b}
        id: "p0n4", tipo: "uniforme",
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

uniforme();
