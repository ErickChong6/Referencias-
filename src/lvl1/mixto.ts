type Arr = { xn: number; xn1: number; rest: number };

const MAX_ITERATIONS = 250;

export function mixto(
  a = Math.floor(Math.random() * 100) + 1,
  xo = Math.floor(Math.random() * 100) + 1,
  c = Math.floor(Math.random() * 100) + 1,
  m = Math.floor(Math.random() * 100) + 1,
) {
  let xn = xo;
  let n = 1;
  let is_done = false;
  const res: Arr[] = [];
  for (let i = 0; !is_done; i++) {
    if (i >= MAX_ITERATIONS) {
      throw `demasiadas iteraciones, terminando en ${i}`;
    }
    const xn1 = (a * xn + c) % m;
    const tmp: Arr = { xn: xn, xn1: xn1, rest: Math.floor((a * xn + c) / m) };
    res.push(tmp);
    if (xn1 == xo) {
      is_done = true;
    } else {
      xn = xn1;
      n += 1;
    }
  }
  mixto_config(xo, a, res, c, m, n);
}

function mixto_config(
  xo: number,
  a: number,
  res: Arr[],
  c: number,
  m: number,
  n: number,
) {
  console.log(`
    {
        id: "p0n1", tipo: "mixto", a: ${a}, x0: ${xo}, c: ${c}, m: ${m}, n: ${n},
        `);
  if (n === m) {
    console.log(` conclusion: "Los números rectangulares son aceptados",`);
  } else {
    console.log(` conclusion: "Los números rectangulares se rechazan",`);
  }
  console.log(`
        respuestas: [
              `);
  for (let i = 0; i < res.length; i++) {
    console.log(
      ` { xn: ${res[i]!.xn}, producto: '${res[i]!.rest} + ${res[i]!.xn1}/${m}', siguiente: ${res[i]!.xn1}, r: '${res[i]!.xn1}/${m}' }, `,
    );
  }
  console.log(` ]
    }, `);
}

mixto();
