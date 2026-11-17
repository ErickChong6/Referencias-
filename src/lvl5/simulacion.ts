// volados
const num_len = 5;

export function volados(
  nums: number[] = Array.from(
    { length: 10 },
    () =>
      Math.floor(Math.random() * Math.pow(10, num_len)) / Math.pow(10, num_len),
  ),
) {
  console.log(nums);
  const apuesta_inicial = 10;
  const dinero_inicial = 30;
  const meta = 50;
  let corrida = 1;
  let dinero = dinero_inicial;
  let apuesta = apuesta_inicial;
  console.log(
    `corrida\tdinero_pre\tapuesta\tnum\tgano\tdinero\tllego_meta\tperdio`,
  );
  nums.forEach((num) => {
    const dinero_pre = dinero;
    let gano = false;
    let llego_meta = false;
    let perdio = false;
    if (num < 0.5) {
      dinero += apuesta;
      gano = true;
    } else {
      dinero -= apuesta;
      apuesta += apuesta;
      if (dinero <= 0) {
        perdio = true;
        dinero = 0;
      }
    }
    if (dinero >= meta) {
      llego_meta = true;
    }
    console.log(
      `${corrida}\t${dinero_pre}\t\t${apuesta}\t${num.toString().padEnd(7, "0")}\t${gano}\t${dinero}\t${llego_meta}\t\t${perdio}`,
    );
    if (perdio || llego_meta) {
      corrida += 1;
      dinero = dinero_inicial;
      apuesta = apuesta_inicial;
    }
  });
}

type Row = {
  n: number;
  tiempo_llegada: number;
  hora_llegada: number;
  hora_inicia_servicio: number;
  tiempo_servicio: number;
  hora_fin_servicio: number;
  tiempo_espera: number;
  tiempo_cajero_inactivo: number;
};

// llegada: entre 1 a 10
// atencion: 1 a 6
// | numero | tiempo llegada, hora llegada | hora inicia servicio, tiempo servicio, hora fin servicio | tiempo espera, tiempo cajero inactivo |
export function caja(
  cant_max = 20,
  llegada_min = 1,
  llegada_max = 10,
  atencion_min = 1,
  atencion_max = 6,
  nums: number[] = Array.from(
    { length: cant_max },
    () =>
      Math.floor(Math.random() * Math.pow(10, num_len)) / Math.pow(10, num_len),
  ),
) {
  const table: Row[] = [];
  for (let n = 0; n <= cant_max; n++) {
    if (n === 0) {
      const row: Row = {
        n,
        tiempo_llegada: 0,
        hora_llegada: 0,
        hora_inicia_servicio: 0,
        tiempo_servicio: 0,
        hora_fin_servicio: 0,
        tiempo_espera: 0,
        tiempo_cajero_inactivo: 0,
      };
      table.push(row);
      continue;
    }
    const tiempo_llegada =
      Math.floor(nums[n - 1]! * (llegada_max - llegada_min + 1)) + llegada_min;
    const hora_llegada = tiempo_llegada + table[n - 1]!.tiempo_llegada;
    const hora_inicia_servicio =
      hora_llegada < table[n - 1]!.hora_fin_servicio
        ? table[n - 1]!.hora_fin_servicio
        : hora_llegada;
    const tiempo_servicio =
      Math.floor(nums[n - 1]! * (atencion_max - atencion_min + 1)) +
      atencion_min;
    const hora_fin_servicio = hora_inicia_servicio + tiempo_servicio;
    const tiempo_espera = hora_fin_servicio - hora_llegada;
    const tiempo_cajero_inactivo = Math.abs(
      table[n - 1]!.hora_fin_servicio - hora_llegada,
    );
    const row: Row = {
      n,
      tiempo_llegada,
      hora_llegada,
      hora_inicia_servicio,
      tiempo_servicio,
      hora_fin_servicio,
      tiempo_espera,
      tiempo_cajero_inactivo,
    };
    table.push(row);
  }
  console.log("n\ttl\thl\this\tts\thfs\tte\ttci");
  table.forEach((row) => {
    console.log(
      row.n,
      "\t",
      row.tiempo_llegada,
      "\t",
      row.hora_llegada,
      "\t",
      row.hora_inicia_servicio,
      "\t",
      row.tiempo_servicio,
      "\t",
      row.hora_fin_servicio,
      "\t",
      row.tiempo_espera,
      "\t",
      row.tiempo_cajero_inactivo,
    );
  });
  // console.log(table);
}

caja();
// volados();
