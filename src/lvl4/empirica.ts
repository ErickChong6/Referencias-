export function empirica(
  num_len = 5,
  nums = Array.from(
    { length: 10 },
    () =>
      Math.floor(Math.random() * Math.pow(10, num_len)) / Math.pow(10, num_len),
  ),
) {
  const res: number[] = [];
  nums.forEach((num) => {
    if (num <= 0.5) {
      res.push(Math.sqrt(2 * num));
    } else {
      res.push(2 * num);
    }
  });
  // console.log(res);
  empirica_config(nums, res);
}

function empirica_config(nums: number[], res: number[]) {
  console.log(`
    {
        id: "p5n4", tipo: "empirica",
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
            { campo: "t10", etiqueta: "T10" }
        ],
        respuestas: {
              `);
  res.forEach((num, i) => {
    console.log(` t${i + 1}: "${num}", `);
  });
  console.log(`
         }
    }`);
}

empirica();
