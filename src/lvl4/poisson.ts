// lambda = cantidad de dias a la semana
type Row = { prev: number; curr: number; res: number };

export function poisson(lambda = Math.floor(Math.random() * 7) + 1) {
  let prev = 0;
  const aprox_1 = 0.99999;
  // const arr: number[] = [];
  const table: Row[] = [];
  for (let i = 0; true; i++) {
    if (prev >= aprox_1 || i >= 100) {
      break;
    }
    const curr = f(i, lambda);
    const res = F(prev, curr);
    const row: Row = { prev, curr, res };
    table.push(row);
    prev = prev + curr;
  }
  poisson_config(table, lambda);
}

function factorial(num: number): number {
  let res = 1;
  for (let i = 2; i <= num; i++) {
    res *= i;
  }
  return res;
}

function f(x: number, lambda: number): number {
  return (Math.pow(Math.E, -lambda) * Math.pow(lambda, x)) / factorial(x);
}

function F(prev: number, curr: number): number {
  return prev + curr;
}

function poisson_config(table: Row[], lambda: number) {
  console.log(`
    // lambda = ${lambda}
    {
        id: "p3n4", tipo: "poisson",
        enunciado: "TODO",
        tabla: [
              `);
  table.forEach((row, i) => {
    console.log(`
            { x: "${i}", fx: "${row.curr}", FX: "${row.res}" },
                `);
  });
  console.log(`
        ],
    },
              `);
  console.log(lambda);
}

poisson();
