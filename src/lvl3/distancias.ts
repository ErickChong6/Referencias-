type group = { distance: number; quantity: number };

export function distancias(
  num_len = 5,
  alfa = 0.05,
  X = 3.84,
  nums: number[] = Array.from(
    { length: 10 },
    () =>
      Math.floor(Math.random() * Math.pow(10, num_len)) / Math.pow(10, num_len),
  ),
) {
  const groups: group[] = get_groups(num_len, nums);
  const n = groups.length - 1;
  const FEi: number[] = [];
  const FOi: number[] = [];
  for (let i = 0; i < groups.length; i++) {
    FOi.push(groups[i]!.quantity);
    // console.log(groups[i]?.distance);
    if (groups[i]!.distance < n) {
      FEi.push(0.1 * Math.pow(0.9, groups[i]!.distance) * nums.length);
    } else {
      FEi.push(Math.pow(0.9, groups[i]!.distance) * nums.length);
    }
  }
  let FEi_ag_lt5 = 0;
  let FOi_ag_lt5 = 0;
  let FEi_ag_gt5 = 0;
  let FOi_ag_gt5 = 0;
  for (let i = 0; i < FEi.length; i++) {
    if (FEi[i]! < 5) {
      FEi_ag_lt5 += FEi[i]!;
      FOi_ag_lt5 += FOi[i]!;
    } else {
      FEi_ag_gt5 += FEi[i]!;
      FOi_ag_gt5 += FOi[i]!;
    }
  }
  console.log(FOi);
  console.log(FEi);
  // console.log(FOi_ag_lt5, FEi_ag_lt5);
  // console.log(FOi_ag_gt5, FEi_ag_gt5);
  // console.log(`const xo = Math.pow(${FOi_ag_lt5} - ${FEi_ag_lt5}, 2) / ${FEi_ag_lt5} + Math.pow(${FOi_ag_gt5} - ${FEi_ag_gt5}, 2) / ${FEi_ag_gt5};`);
  const xo =
    Math.pow(FOi_ag_lt5 - FEi_ag_lt5, 2) / FEi_ag_lt5 +
    Math.pow(FOi_ag_gt5 - FEi_ag_gt5, 2) / FEi_ag_gt5;
  console.log(`
    {
        id: "p1n3", tipo: "distancias",
        numeros: [${nums}],
        alfa: ${alfa}, n: 2,
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
  for (let i = 0; i < FOi.length; i++) {
    console.log(`
            { foi: ${FOi[i]}, fei: ${FEi[i]} },
                `);
  }
  console.log(`
        ],
        campos: [
            { campo: "feiAmayor", etiqueta: "FEᵢ agrupada i < n", tolerancia: 0.00001 },
            { campo: "feiAmenor", etiqueta: "FEᵢ agrupada i < n", tolerancia: 0.00001 },
            { campo: "foiA", etiqueta: "FOᵢ agrupada    ", tolerancia: 0.00001 },
            { campo: "xo2", etiqueta: "X₀²", tolerancia: 0.00001 },
            { campo: "X", etiqueta: "X2α, n2- 1", tolerancia: 0.00001 },
        ],
        respuestas: { feiAmayor: "2.71", feiAmenor: "7.29", foiA: "10", xo2: "26.900369", X: 3.84 }
    },
              `);
}

function get_groups(num_len: number, nums: number[]): group[] {
  const groups: group[] = [];
  lvl1: for (let i = 0; i < nums.length; i++) {
    const str_num = nums[i]!.toString().padEnd(7, "0");
    let has_duplicate = false;
    let tmp_j = 0;
    let tmp_k = 0;
    for (let j = 2; j <= num_len; j++) {
      for (let k = j + 1; k <= num_len + 1; k++) {
        if (str_num.charAt(j) === str_num.charAt(k)) {
          if (has_duplicate) {
            console.error(i);
            throw "not valid";
          }
          has_duplicate = true;
          tmp_j = j;
          tmp_k = k;
        }
      }
    }
    if (has_duplicate) {
      // console.log(i, "number:", nums[i]);
      // console.log("numbers:", str_num.charAt(tmp_j), str_num.charAt(tmp_k));
      const distance = tmp_k - tmp_j - 1;
      if (groups.length === 0) {
        const group_tmp: group = { distance: distance, quantity: 1 };
        // console.log("brand new entry", group_tmp);
        groups.push(group_tmp);
        // console.log("current groups:", groups);
        continue lvl1;
      }
      for (let j = 0; j < groups.length; j++) {
        if (distance === groups[j]?.distance) {
          // console.log("added in group", groups[j]?.distance);
          groups[j]!.quantity += 1;
          // console.log("current groups:", groups);
          continue lvl1;
        }
      }
      const group_tmp: group = { distance: distance, quantity: 1 };
      // console.log("new entry", group_tmp);
      groups.push(group_tmp);
      // console.log("current groups:", groups);
    }
  }
  // console.log(groups);
  return groups;
}

distancias();
