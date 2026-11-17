/* =========================================================
 *  problemas5.js  —  NIVEL 5: Aplicaciones de simulación
 *  Mismo orden y mismos nombres que problemas1.js y problemas4.js:
 *  tiempo → vidas → banco → elegir → mostrar → tabla → revisar
 *  → vidas/revivir → fórmulas.
 *
 *  Modelos y Fórmulas (documentos fuente: OR.zip):
 *    1) Sistemas de Inventario (TAplicaciones de Simulación.pdf):
 *       - Política (q, R) con tiempo de entrega L meses.
 *       - Inv. Final = max(0, Inv. Inicial - Demanda).
 *       - Faltante   = max(0, Demanda - Inv. Inicial).
 *       - Inv. Promedio = (Inv. Inicial + Inv. Final) / 2.
 *       - Costo Ordenar = No. Órdenes × Co.
 *       - Costo Mantener Inventario = Σ(Inv. Promedio) × Cm_mensual.
 *       - Costo Faltante = Σ(Faltante) × Cf.
 *       - Costo Total = Costo Ordenar + Costo Mantener + Costo Faltante.
 *
 *    2) Sistemas de Colas (EjApCaja.pdf):
 *       - Hora Llegada_i = Hora Llegada_(i-1) + Tiempo Entre Llegadas_i.
 *       - Hora Inicio Servicio_i = max(Hora Llegada_i, Hora Fin Servicio_(i-1)).
 *       - Hora Fin Servicio_i = Hora Inicio Servicio_i + Tiempo Servicio_i.
 *       - Tiempo de Espera_i = Hora Inicio Servicio_i - Hora Llegada_i.
 *       - Tiempo en el Sistema_i = Hora Fin Servicio_i - Hora Llegada_i.
 *       - Tiempo Cajero Inactivo_i = Hora Inicio Servicio_i - Hora Fin Servicio_(i-1) (para i=1: Hora Llegada_1).
 *       - Promedio en el Sistema = Σ(Tiempo en el Sistema) / N.
 *       - Porcentaje de Inactividad = (Σ Tiempo Inactivo / Hora Fin Último Cliente) × 100.
 *
 *    3) Juego de Volados (EjerAplicaciones de Simulación.pdf, EjRApVolados.pdf):
 *       - R ≤ 0.5 significa Ganar (Si); R > 0.5 significa Perder (No).
 *       - Al perder se duplica la apuesta (2X); al ganar se reinicia a la apuesta inicial.
 *       - Nunca se apuesta más dinero del disponible (Apuesta = min(Apuesta deseada, Saldo disponible)).
 *       - La corrida termina al alcanzar la meta o llegar a la quiebra ($0).
 *  ========================================================= */

/* ---------- Tiempo ---------- */
var minutosProblema = 45;
var minutosPenalizacion = 5;
var tiempoRestante = 0;      // en segundos
var reloj = null;            // aquí se guarda el setInterval para poder detenerlo
var textoTiempo;

/* ---------- Vidas y revivir ---------- */
var mediasVidas = 6;         // 3 corazones = 6 medias vidas
var revivirUsado = false;    // interruptor: solo se puede revivir una vez por nivel

/* ---------- Tolerancia numérica ---------- */
var toleranciaNivel5 = 0.05;

/***BANCO DE PROBLEMAS**/
var bancoNivel5 = [
    {
        "id": "p0n5",
        "tipo": "inventario",
        "titulo": "Refacciones de maquinaria industrial",
        "enunciado": "Una planta industrial maneja refacciones con un inventario inicial de 150 piezas, política (q = 200, R = 100) y tiempo de entrega de 2 meses (una orden colocada al final del mes t llega al inicio del mes t+2). Dadas las demandas mensuales de los primeros 6 meses [64, 52, 47, 31, 40, 25], determina para cada mes el inventario final, faltante, orden emitida e inventario promedio. Finalmente calcula el costo de ordenar ($100/orden), costo de mantenimiento ($1.67/unidad/mes) y costo total del periodo.",
        "parametros": {
            "inv_inicial": 150,
            "q": 200,
            "R": 100,
            "L": 2,
            "co": 100,
            "cm_mes": 1.6667,
            "cf": 50
        },
        "respuestas": [
            {
                "mes": 1,
                "ini": 150,
                "dem": 64,
                "fin": 86,
                "falt": 0,
                "orden": 1,
                "prom": 118
            },
            {
                "mes": 2,
                "ini": 86,
                "dem": 52,
                "fin": 34,
                "falt": 0,
                "orden": 0,
                "prom": 60
            },
            {
                "mes": 3,
                "ini": 234,
                "dem": 47,
                "fin": 187,
                "falt": 0,
                "orden": 0,
                "prom": 210.5
            },
            {
                "mes": 4,
                "ini": 187,
                "dem": 31,
                "fin": 156,
                "falt": 0,
                "orden": 0,
                "prom": 171.5
            },
            {
                "mes": 5,
                "ini": 156,
                "dem": 40,
                "fin": 116,
                "falt": 0,
                "orden": 0,
                "prom": 136
            },
            {
                "mes": 6,
                "ini": 116,
                "dem": 25,
                "fin": 91,
                "falt": 0,
                "orden": 2,
                "prom": 103.5
            }
        ],
        "resultado": {
            "ordenes": 2,
            "costo_ordenar": 200,
            "costo_inventario": 1332.5,
            "costo_faltante": 0,
            "total": 1532.5,
            "promedio": 133.25
        }
    },

    {
        "id": "p1n5",
        "tipo": "inventario",
        "titulo": "Inventario de microcontroladores",
        "enunciado": "Un fabricante de equipo electrónico opera con inventario inicial de 120 microcontroladores, política (q = 150, R = 80) y tiempo de entrega de 1 mes (la orden llega al inicio del siguiente mes). Con las demandas para 5 meses [50, 60, 45, 70, 55], simula el inventario mensual y determina los costos de ordenar ($120/orden), mantenimiento ($2.00/unidad/mes) y costo total.",
        "parametros": {
            "inv_inicial": 120,
            "q": 150,
            "R": 80,
            "L": 1,
            "co": 120,
            "cm_mes": 2.0,
            "cf": 40
        },
        "respuestas": [
            {
                "mes": 1,
                "ini": 120,
                "dem": 50,
                "fin": 70,
                "falt": 0,
                "orden": 1,
                "prom": 95
            },
            {
                "mes": 2,
                "ini": 220,
                "dem": 60,
                "fin": 160,
                "falt": 0,
                "orden": 0,
                "prom": 190
            },
            {
                "mes": 3,
                "ini": 160,
                "dem": 45,
                "fin": 115,
                "falt": 0,
                "orden": 0,
                "prom": 137.5
            },
            {
                "mes": 4,
                "ini": 115,
                "dem": 70,
                "fin": 45,
                "falt": 0,
                "orden": 2,
                "prom": 80
            },
            {
                "mes": 5,
                "ini": 195,
                "dem": 55,
                "fin": 140,
                "falt": 0,
                "orden": 0,
                "prom": 167.5
            }
        ],
        "resultado": {
            "ordenes": 2,
            "costo_ordenar": 240,
            "costo_inventario": 1340,
            "costo_faltante": 0,
            "total": 1580,
            "promedio": 134
        }
    },

    {
        "id": "p2n5",
        "tipo": "inventario",
        "titulo": "Reactivos de laboratorio químico",
        "enunciado": "Un laboratorio tiene un inventario inicial de 50 frascos de reactivo, política (q = 100, R = 40) y tiempo de entrega de 1 mes. Con las demandas registradas de 5 meses [65, 50, 40, 70, 30], completa la tabla identificando faltantes, órdenes e inventario promedio, y calcula los costos de ordenar ($150/orden), mantener ($2.50/unidad/mes), faltantes ($60/unidad) y el costo total.",
        "parametros": {
            "inv_inicial": 50,
            "q": 100,
            "R": 40,
            "L": 1,
            "co": 150,
            "cm_mes": 2.5,
            "cf": 60
        },
        "respuestas": [
            {
                "mes": 1,
                "ini": 50,
                "dem": 65,
                "fin": 0,
                "falt": 15,
                "orden": 1,
                "prom": 25
            },
            {
                "mes": 2,
                "ini": 100,
                "dem": 50,
                "fin": 50,
                "falt": 0,
                "orden": 0,
                "prom": 75
            },
            {
                "mes": 3,
                "ini": 50,
                "dem": 40,
                "fin": 10,
                "falt": 0,
                "orden": 2,
                "prom": 30
            },
            {
                "mes": 4,
                "ini": 110,
                "dem": 70,
                "fin": 40,
                "falt": 0,
                "orden": 3,
                "prom": 75
            },
            {
                "mes": 5,
                "ini": 140,
                "dem": 30,
                "fin": 110,
                "falt": 0,
                "orden": 0,
                "prom": 125
            }
        ],
        "resultado": {
            "ordenes": 3,
            "costo_ordenar": 450,
            "costo_inventario": 825,
            "costo_faltante": 900,
            "total": 2175,
            "promedio": 66
        }
    },

    {
        "id": "p3n5",
        "tipo": "colas",
        "titulo": "Caja registradora de supermercado",
        "enunciado": "En la caja de cobro de un supermercado (un solo canal), se registran los tiempos entre llegadas y de servicio de 6 clientes. Determina la hora de llegada, hora de inicio y fin de servicio, tiempo de espera en cola, tiempo total en el sistema y tiempo de cajero inactivo. Finalmente calcula el tiempo promedio dentro del sistema y el porcentaje de tiempo inactivo del cajero.",
        "respuestas": [
            {
                "cliente": 1,
                "tiempo_llegada": 9,
                "hora_llegada": 9,
                "hora_inicio": 9,
                "tiempo_servicio": 3,
                "hora_fin": 12,
                "espera": 0,
                "tiempo_sistema": 3,
                "tiempo_inactivo": 9
            },
            {
                "cliente": 2,
                "tiempo_llegada": 2,
                "hora_llegada": 11,
                "hora_inicio": 12,
                "tiempo_servicio": 2,
                "hora_fin": 14,
                "espera": 1,
                "tiempo_sistema": 3,
                "tiempo_inactivo": 0
            },
            {
                "cliente": 3,
                "tiempo_llegada": 6,
                "hora_llegada": 17,
                "hora_inicio": 17,
                "tiempo_servicio": 4,
                "hora_fin": 21,
                "espera": 0,
                "tiempo_sistema": 4,
                "tiempo_inactivo": 3
            },
            {
                "cliente": 4,
                "tiempo_llegada": 8,
                "hora_llegada": 25,
                "hora_inicio": 25,
                "tiempo_servicio": 6,
                "hora_fin": 31,
                "espera": 0,
                "tiempo_sistema": 6,
                "tiempo_inactivo": 4
            },
            {
                "cliente": 5,
                "tiempo_llegada": 6,
                "hora_llegada": 31,
                "hora_inicio": 31,
                "tiempo_servicio": 4,
                "hora_fin": 35,
                "espera": 0,
                "tiempo_sistema": 4,
                "tiempo_inactivo": 0
            },
            {
                "cliente": 6,
                "tiempo_llegada": 9,
                "hora_llegada": 40,
                "hora_inicio": 40,
                "tiempo_servicio": 4,
                "hora_fin": 44,
                "espera": 0,
                "tiempo_sistema": 4,
                "tiempo_inactivo": 5
            }
        ],
        "resultado": {
            "total_tiempo_sistema": 24,
            "promedio_sistema": 4.0,
            "promedio_espera": 0.17,
            "tiempo_inactivo_total": 21,
            "porcentaje_inactivo": 47.73,
            "total": 24,
            "promedio": 4.0
        }
    },

    {
        "id": "p4n5",
        "tipo": "colas",
        "titulo": "Ventanilla de atención bancaria",
        "enunciado": "Una ventanilla bancaria atiende a los clientes por orden de llegada. Con los tiempos entre llegadas [3, 4, 2, 6, 5, 4] y tiempos de servicio [4, 5, 3, 2, 4, 3] en minutos, calcula la hora de llegada, hora de inicio y fin de servicio, espera en cola, tiempo en el sistema y tiempo inactivo del cajero, así como el tiempo promedio en el sistema y porcentaje de inactividad.",
        "respuestas": [
            {
                "cliente": 1,
                "tiempo_llegada": 3,
                "hora_llegada": 3,
                "hora_inicio": 3,
                "tiempo_servicio": 4,
                "hora_fin": 7,
                "espera": 0,
                "tiempo_sistema": 4,
                "tiempo_inactivo": 3
            },
            {
                "cliente": 2,
                "tiempo_llegada": 4,
                "hora_llegada": 7,
                "hora_inicio": 7,
                "tiempo_servicio": 5,
                "hora_fin": 12,
                "espera": 0,
                "tiempo_sistema": 5,
                "tiempo_inactivo": 0
            },
            {
                "cliente": 3,
                "tiempo_llegada": 2,
                "hora_llegada": 9,
                "hora_inicio": 12,
                "tiempo_servicio": 3,
                "hora_fin": 15,
                "espera": 3,
                "tiempo_sistema": 6,
                "tiempo_inactivo": 0
            },
            {
                "cliente": 4,
                "tiempo_llegada": 6,
                "hora_llegada": 15,
                "hora_inicio": 15,
                "tiempo_servicio": 2,
                "hora_fin": 17,
                "espera": 0,
                "tiempo_sistema": 2,
                "tiempo_inactivo": 0
            },
            {
                "cliente": 5,
                "tiempo_llegada": 5,
                "hora_llegada": 20,
                "hora_inicio": 20,
                "tiempo_servicio": 4,
                "hora_fin": 24,
                "espera": 0,
                "tiempo_sistema": 4,
                "tiempo_inactivo": 3
            },
            {
                "cliente": 6,
                "tiempo_llegada": 4,
                "hora_llegada": 24,
                "hora_inicio": 24,
                "tiempo_servicio": 3,
                "hora_fin": 27,
                "espera": 0,
                "tiempo_sistema": 3,
                "tiempo_inactivo": 0
            }
        ],
        "resultado": {
            "total_tiempo_sistema": 24,
            "promedio_sistema": 4.0,
            "promedio_espera": 0.5,
            "tiempo_inactivo_total": 6,
            "porcentaje_inactivo": 22.22,
            "total": 24,
            "promedio": 4.0
        }
    },

    {
        "id": "p5n5",
        "tipo": "colas",
        "titulo": "Módulo de trámites escolares",
        "enunciado": "Un módulo universitario atiende alumnos de forma secuencial. Con tiempos entre llegadas [2, 5, 3, 4, 6, 3] y tiempos de atención [3, 4, 5, 2, 3, 4] minutos, simula la línea de espera calculando llegadas, inicios, fines, esperas, estancia en el sistema e inactividad del encargado.",
        "respuestas": [
            {
                "cliente": 1,
                "tiempo_llegada": 2,
                "hora_llegada": 2,
                "hora_inicio": 2,
                "tiempo_servicio": 3,
                "hora_fin": 5,
                "espera": 0,
                "tiempo_sistema": 3,
                "tiempo_inactivo": 2
            },
            {
                "cliente": 2,
                "tiempo_llegada": 5,
                "hora_llegada": 7,
                "hora_inicio": 7,
                "tiempo_servicio": 4,
                "hora_fin": 11,
                "espera": 0,
                "tiempo_sistema": 4,
                "tiempo_inactivo": 2
            },
            {
                "cliente": 3,
                "tiempo_llegada": 3,
                "hora_llegada": 10,
                "hora_inicio": 11,
                "tiempo_servicio": 5,
                "hora_fin": 16,
                "espera": 1,
                "tiempo_sistema": 6,
                "tiempo_inactivo": 0
            },
            {
                "cliente": 4,
                "tiempo_llegada": 4,
                "hora_llegada": 14,
                "hora_inicio": 16,
                "tiempo_servicio": 2,
                "hora_fin": 18,
                "espera": 2,
                "tiempo_sistema": 4,
                "tiempo_inactivo": 0
            },
            {
                "cliente": 5,
                "tiempo_llegada": 6,
                "hora_llegada": 20,
                "hora_inicio": 20,
                "tiempo_servicio": 3,
                "hora_fin": 23,
                "espera": 0,
                "tiempo_sistema": 3,
                "tiempo_inactivo": 2
            },
            {
                "cliente": 6,
                "tiempo_llegada": 3,
                "hora_llegada": 23,
                "hora_inicio": 23,
                "tiempo_servicio": 4,
                "hora_fin": 27,
                "espera": 0,
                "tiempo_sistema": 4,
                "tiempo_inactivo": 0
            }
        ],
        "resultado": {
            "total_tiempo_sistema": 24,
            "promedio_sistema": 4.0,
            "promedio_espera": 0.5,
            "tiempo_inactivo_total": 6,
            "porcentaje_inactivo": 22.22,
            "total": 24,
            "promedio": 4.0
        }
    },

    {
        "id": "p6n5",
        "tipo": "colas",
        "titulo": "Triage de consultorio médico",
        "enunciado": "En la consulta de un médico general, se tienen registrados los tiempos entre llegadas [4, 3, 5, 2, 6, 4, 3] y tiempos de consulta [5, 4, 3, 5, 2, 4, 3] de 7 pacientes. Simula el flujo del servicio y obtén el tiempo total en el sistema, el tiempo promedio por paciente y el porcentaje de tiempo inactivo del médico.",
        "respuestas": [
            {
                "cliente": 1,
                "tiempo_llegada": 4,
                "hora_llegada": 4,
                "hora_inicio": 4,
                "tiempo_servicio": 5,
                "hora_fin": 9,
                "espera": 0,
                "tiempo_sistema": 5,
                "tiempo_inactivo": 4
            },
            {
                "cliente": 2,
                "tiempo_llegada": 3,
                "hora_llegada": 7,
                "hora_inicio": 9,
                "tiempo_servicio": 4,
                "hora_fin": 13,
                "espera": 2,
                "tiempo_sistema": 6,
                "tiempo_inactivo": 0
            },
            {
                "cliente": 3,
                "tiempo_llegada": 5,
                "hora_llegada": 12,
                "hora_inicio": 13,
                "tiempo_servicio": 3,
                "hora_fin": 16,
                "espera": 1,
                "tiempo_sistema": 4,
                "tiempo_inactivo": 0
            },
            {
                "cliente": 4,
                "tiempo_llegada": 2,
                "hora_llegada": 14,
                "hora_inicio": 16,
                "tiempo_servicio": 5,
                "hora_fin": 21,
                "espera": 2,
                "tiempo_sistema": 7,
                "tiempo_inactivo": 0
            },
            {
                "cliente": 5,
                "tiempo_llegada": 6,
                "hora_llegada": 20,
                "hora_inicio": 21,
                "tiempo_servicio": 2,
                "hora_fin": 23,
                "espera": 1,
                "tiempo_sistema": 3,
                "tiempo_inactivo": 0
            },
            {
                "cliente": 6,
                "tiempo_llegada": 4,
                "hora_llegada": 24,
                "hora_inicio": 24,
                "tiempo_servicio": 4,
                "hora_fin": 28,
                "espera": 0,
                "tiempo_sistema": 4,
                "tiempo_inactivo": 1
            },
            {
                "cliente": 7,
                "tiempo_llegada": 3,
                "hora_llegada": 27,
                "hora_inicio": 28,
                "tiempo_servicio": 3,
                "hora_fin": 31,
                "espera": 1,
                "tiempo_sistema": 4,
                "tiempo_inactivo": 0
            }
        ],
        "resultado": {
            "total_tiempo_sistema": 33,
            "promedio_sistema": 4.71,
            "promedio_espera": 1.0,
            "tiempo_inactivo_total": 5,
            "porcentaje_inactivo": 16.13,
            "total": 33,
            "promedio": 4.71
        }
    },

    {
        "id": "p7n5",
        "tipo": "volados",
        "titulo": "Juego de volados — Capital inicial $30",
        "enunciado": "Simula el juego de volados con capital inicial de $30, meta de $50 y apuesta inicial de $10. Reglas: si R <= 0.5 se gana y la siguiente apuesta regresa a $10; si R > 0.5 se pierde y la apuesta se duplica (sin exceder el saldo); la corrida termina si se llega a la meta o a la quiebra ($0), comenzando una nueva corrida. Simula los 10 volados dados.",
        "c0": 30,
        "meta": 50,
        "a0": 10,
        "r": [
            0.03991,
            0.38555,
            0.17546,
            0.32843,
            0.69572,
            0.24122,
            0.61196,
            0.88722,
            0.65961,
            0.03788
        ],
        "respuestas": [
            {
                "paso": 1,
                "corrida": 1,
                "antes": 30,
                "apuesta": 10,
                "r": 0.03991,
                "gano": "Si",
                "despues": 40,
                "meta": "No"
            },
            {
                "paso": 2,
                "corrida": 1,
                "antes": 40,
                "apuesta": 10,
                "r": 0.38555,
                "gano": "Si",
                "despues": 50,
                "meta": "Meta"
            },
            {
                "paso": 3,
                "corrida": 2,
                "antes": 30,
                "apuesta": 10,
                "r": 0.17546,
                "gano": "Si",
                "despues": 40,
                "meta": "No"
            },
            {
                "paso": 4,
                "corrida": 2,
                "antes": 40,
                "apuesta": 10,
                "r": 0.32843,
                "gano": "Si",
                "despues": 50,
                "meta": "Meta"
            },
            {
                "paso": 5,
                "corrida": 3,
                "antes": 30,
                "apuesta": 10,
                "r": 0.69572,
                "gano": "No",
                "despues": 20,
                "meta": "No"
            },
            {
                "paso": 6,
                "corrida": 3,
                "antes": 20,
                "apuesta": 20,
                "r": 0.24122,
                "gano": "Si",
                "despues": 40,
                "meta": "No"
            },
            {
                "paso": 7,
                "corrida": 3,
                "antes": 40,
                "apuesta": 10,
                "r": 0.61196,
                "gano": "No",
                "despues": 30,
                "meta": "No"
            },
            {
                "paso": 8,
                "corrida": 3,
                "antes": 30,
                "apuesta": 20,
                "r": 0.88722,
                "gano": "No",
                "despues": 10,
                "meta": "No"
            },
            {
                "paso": 9,
                "corrida": 3,
                "antes": 10,
                "apuesta": 10,
                "r": 0.65961,
                "gano": "No",
                "despues": 0,
                "meta": "Quiebra"
            },
            {
                "paso": 10,
                "corrida": 4,
                "antes": 30,
                "apuesta": 10,
                "r": 0.03788,
                "gano": "Si",
                "despues": 40,
                "meta": "No"
            }
        ],
        "resultado": {
            "veces_meta": 2,
            "veces_quiebra": 1,
            "corridas_terminadas": 3,
            "probabilidad_meta": 66.67,
            "total": 2,
            "promedio": 66.67
        }
    },

    {
        "id": "p8n5",
        "tipo": "volados",
        "titulo": "Juego de volados — Capital inicial $40",
        "enunciado": "Analiza el juego de volados con capital inicial de $40, meta de $90 y apuesta inicial de $20. Reglas: R <= 0.5 gana (apuesta regresa a $20); R > 0.5 pierde (apuesta se duplica con tope de saldo); la corrida termina al alcanzar o superar la meta ($90) o al llegar a la quiebra ($0). Simula los 10 volados y calcula cuántas veces se llegó a la meta y la probabilidad de éxito.",
        "c0": 40,
        "meta": 90,
        "a0": 20,
        "r": [
            0.03991,
            0.38555,
            0.17546,
            0.32643,
            0.69572,
            0.24122,
            0.61196,
            0.30532,
            0.03788,
            0.48228
        ],
        "respuestas": [
            {
                "paso": 1,
                "corrida": 1,
                "antes": 40,
                "apuesta": 20,
                "r": 0.03991,
                "gano": "Si",
                "despues": 60,
                "meta": "No"
            },
            {
                "paso": 2,
                "corrida": 1,
                "antes": 60,
                "apuesta": 20,
                "r": 0.38555,
                "gano": "Si",
                "despues": 80,
                "meta": "No"
            },
            {
                "paso": 3,
                "corrida": 1,
                "antes": 80,
                "apuesta": 20,
                "r": 0.17546,
                "gano": "Si",
                "despues": 100,
                "meta": "Meta"
            },
            {
                "paso": 4,
                "corrida": 2,
                "antes": 40,
                "apuesta": 20,
                "r": 0.32643,
                "gano": "Si",
                "despues": 60,
                "meta": "No"
            },
            {
                "paso": 5,
                "corrida": 2,
                "antes": 60,
                "apuesta": 20,
                "r": 0.69572,
                "gano": "No",
                "despues": 40,
                "meta": "No"
            },
            {
                "paso": 6,
                "corrida": 2,
                "antes": 40,
                "apuesta": 40,
                "r": 0.24122,
                "gano": "Si",
                "despues": 80,
                "meta": "No"
            },
            {
                "paso": 7,
                "corrida": 2,
                "antes": 80,
                "apuesta": 20,
                "r": 0.61196,
                "gano": "No",
                "despues": 60,
                "meta": "No"
            },
            {
                "paso": 8,
                "corrida": 2,
                "antes": 60,
                "apuesta": 40,
                "r": 0.30532,
                "gano": "Si",
                "despues": 100,
                "meta": "Meta"
            },
            {
                "paso": 9,
                "corrida": 3,
                "antes": 40,
                "apuesta": 20,
                "r": 0.03788,
                "gano": "Si",
                "despues": 60,
                "meta": "No"
            },
            {
                "paso": 10,
                "corrida": 3,
                "antes": 60,
                "apuesta": 20,
                "r": 0.48228,
                "gano": "Si",
                "despues": 80,
                "meta": "No"
            }
        ],
        "resultado": {
            "veces_meta": 2,
            "veces_quiebra": 0,
            "corridas_terminadas": 2,
            "probabilidad_meta": 100.0,
            "total": 2,
            "promedio": 100.0
        }
    },

    {
        "id": "p9n5",
        "tipo": "volados",
        "titulo": "Juego de volados — Capital inicial $50",
        "enunciado": "Simula el juego de volados comenzando con $50, meta de $80 y apuesta inicial de $15 con los 8 números aleatorios dados. Aplica las reglas académicas: R <= 0.5 gana, R > 0.5 pierde; doblar al perder, reiniciar al ganar; tope de saldo y fin por meta o quiebra.",
        "c0": 50,
        "meta": 80,
        "a0": 15,
        "r": [
            0.42,
            0.78,
            0.31,
            0.15,
            0.82,
            0.64,
            0.29,
            0.45
        ],
        "respuestas": [
            {
                "paso": 1,
                "corrida": 1,
                "antes": 50,
                "apuesta": 15,
                "r": 0.42,
                "gano": "Si",
                "despues": 65,
                "meta": "No"
            },
            {
                "paso": 2,
                "corrida": 1,
                "antes": 65,
                "apuesta": 15,
                "r": 0.78,
                "gano": "No",
                "despues": 50,
                "meta": "No"
            },
            {
                "paso": 3,
                "corrida": 1,
                "antes": 50,
                "apuesta": 30,
                "r": 0.31,
                "gano": "Si",
                "despues": 80,
                "meta": "Meta"
            },
            {
                "paso": 4,
                "corrida": 2,
                "antes": 50,
                "apuesta": 15,
                "r": 0.15,
                "gano": "Si",
                "despues": 65,
                "meta": "No"
            },
            {
                "paso": 5,
                "corrida": 2,
                "antes": 65,
                "apuesta": 15,
                "r": 0.82,
                "gano": "No",
                "despues": 50,
                "meta": "No"
            },
            {
                "paso": 6,
                "corrida": 2,
                "antes": 50,
                "apuesta": 30,
                "r": 0.64,
                "gano": "No",
                "despues": 20,
                "meta": "No"
            },
            {
                "paso": 7,
                "corrida": 2,
                "antes": 20,
                "apuesta": 20,
                "r": 0.29,
                "gano": "Si",
                "despues": 40,
                "meta": "No"
            },
            {
                "paso": 8,
                "corrida": 2,
                "antes": 40,
                "apuesta": 15,
                "r": 0.45,
                "gano": "Si",
                "despues": 55,
                "meta": "No"
            }
        ],
        "resultado": {
            "veces_meta": 1,
            "veces_quiebra": 0,
            "corridas_terminadas": 1,
            "probabilidad_meta": 100.0,
            "total": 1,
            "promedio": 100.0
        }
    }

];

/** =========================================================
 *  ELEGIR LOS PROBLEMAS DE LA PARTIDA
 *  ========================================================= */
var tiposNivel5 = ["inventario", "colas", "volados"];
var problemasPorTipo = 2;
var problemasPorNivel = (typeof RETOS_POR_NIVEL !== "undefined" && RETOS_POR_NIVEL[4]) ? RETOS_POR_NIVEL[4] : 8;

var problemasPartida = [];   // los que tocan en esta partida
var problemaActual = 0;      // cuál va (0, 1, 2, ...)

function Revolver(lista) {   // Fisher-Yates: todos los órdenes con la misma probabilidad
    var copia = lista.slice();                    // copia para no dañar el banco
    for (var i = copia.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = copia[i];
        copia[i] = copia[j];
        copia[j] = temp;
    }
    return copia;
}

function ElegirProblemas() {
    var resueltos = JSON.parse(sessionStorage.getItem("resueltosNivel5") || "[]");
    var noResueltos = bancoNivel5.filter(function (p) { return !resueltos.includes(p.id); });
    var yaResueltos = bancoNivel5.filter(function (p) { return resueltos.includes(p.id); });

    // 1) Primero, balanceado por tipo que NO haya resuelto
    var elegidos = [];
    tiposNivel5.forEach(function (tipo) {
        var deEsteTipo = noResueltos.filter(function (p) { return p.tipo === tipo; });
        elegidos = elegidos.concat(Revolver(deEsteTipo).slice(0, problemasPorTipo));
    });

    // 2) Si no alcanzan, completar con otros no resueltos
    var sobrantes = Revolver(noResueltos).filter(function (p) { return !elegidos.includes(p); });
    elegidos = elegidos.concat(sobrantes).slice(0, problemasPorNivel);

    // 3) Si aun así no alcanzan, repetir de los resueltos
    if (elegidos.length < problemasPorNivel) {
        elegidos = elegidos.concat(Revolver(yaResueltos)).slice(0, problemasPorNivel);
    }

    problemasPartida = Revolver(elegidos);
}

/** =========================================================
 *  MOSTRAR EL PROBLEMA
 *  ========================================================= */
function TituloDelProblema(p) {
    if (p.tipo === "inventario") {
        return `${p.titulo} — Política (q = ${p.parametros.q}, R = ${p.parametros.R})`;
    } else if (p.tipo === "colas") {
        return `${p.titulo} — Línea de espera (un canal)`;
    } else {
        return `${p.titulo} — Meta $${p.meta}, Apuesta inicial $${p.a0}`;
    }
}

function MostrarProblema() {
    parado = true;
    if (typeof gato !== "undefined" && gato.classList) {
        gato.classList.remove("gato-corriendo");
    }
    var p = problemasPartida[problemaActual];

    if (typeof tituloProblema !== "undefined") {
        tituloProblema.innerText = TituloDelProblema(p);
    } else {
        var elemTitulo = document.querySelector(".p-titulo");
        if (elemTitulo) elemTitulo.innerText = TituloDelProblema(p);
    }

    var enunciado = document.querySelector(".p-enunciado");
    if (enunciado) enunciado.innerText = p.enunciado;

    CrearTabla(p);
    PintarVidas();
    if (typeof pantallaProblema !== "undefined") {
        pantallaProblema.style.display = "block";
    } else {
        var elemProb = document.querySelector(".problema");
        if (elemProb) elemProb.style.display = "block";
    }
    if (typeof IniciarReloj === "function") IniciarReloj();
}

/** =========================================================
 *  TABLA Y CONTROLES DINÁMICOS
 *  ========================================================= */
var solucion = [];      // respuestas correctas por fila
var filasTabla = 0;     // cuántas filas lleva

function ObtenerTablaResumen() {
    var t = document.getElementById("tablaResumenNivel5");
    if (!t) {
        t = document.createElement("table");
        t.id = "tablaResumenNivel5";
        t.className = "p-tabla";
        t.style.marginTop = "15px";
        var tablaPrincipal = document.getElementById("tablaMix");
        if (tablaPrincipal) {
            tablaPrincipal.insertAdjacentElement("afterend", t);
        }
    }
    return t;
}

function CrearTabla(p) {
    solucion = p.respuestas;

    var encabezado = document.getElementById("encabezado");
    var tabla = document.getElementById("tablaMix");
    var resumen = ObtenerTablaResumen();

    while (tabla.rows.length > 1) tabla.deleteRow(-1);
    while (resumen.rows.length > 0) resumen.deleteRow(-1);
    filasTabla = 0;

    if (p.tipo === "inventario") {
        encabezado.innerHTML = "<th>Mes</th><th>Inv. Inicial</th><th>Demanda</th><th>Inv. Final</th><th>Faltante</th><th>No. Orden</th><th>Inv. Promedio</th>";
        for (var i = 0; i < p.respuestas.length; i++) {
            var r = p.respuestas[i];
            var fila = tabla.insertRow(-1);
            fila.insertCell(0).innerText = r.mes;
            fila.insertCell(1).innerText = r.ini;
            fila.insertCell(2).innerText = r.dem;

            // Inputs del jugador
            var campos = ["fin", "falt", "orden", "prom"];
            for (var k = 0; k < campos.length; k++) {
                var input = document.createElement("input");
                input.dataset.fila = i;
                input.dataset.campo = campos[k];
                input.dataset.grupo = "resp";
                fila.insertCell(k + 3).appendChild(input);
            }
            filasTabla++;
        }

        // Tabla de resultados de inventario
        resumen.style.display = "";
        var fResHeader = resumen.insertRow(-1);
        fResHeader.innerHTML = "<th>Costo de Ordenar ($)</th><th>Costo de Mantener ($)</th><th>Costo de Faltante ($)</th><th>Costo Total ($)</th>";
        var fResInputs = resumen.insertRow(-1);
        var camposRes = ["costo_ordenar", "costo_inventario", "costo_faltante", "total"];
        for (var c = 0; c < camposRes.length; c++) {
            var inpRes = document.createElement("input");
            inpRes.dataset.campo = camposRes[c];
            inpRes.dataset.grupo = "resultado";
            fResInputs.insertCell(c).appendChild(inpRes);
        }

    } else if (p.tipo === "colas") {
        encabezado.innerHTML = "<th>No.</th><th>Tiempo llegada</th><th>Hora llegada</th><th>Hora inicio</th><th>Tiempo servicio</th><th>Hora fin</th><th>Tiempo espera</th><th>Tiempo sistema</th><th>Tiempo inactivo</th>";
        for (var j = 0; j < p.respuestas.length; j++) {
            var rc = p.respuestas[j];
            var filaC = tabla.insertRow(-1);
            filaC.insertCell(0).innerText = rc.cliente;
            filaC.insertCell(1).innerText = rc.tiempo_llegada;

            var inpHoraLlegada = document.createElement("input");
            inpHoraLlegada.dataset.fila = j;
            inpHoraLlegada.dataset.campo = "hora_llegada";
            inpHoraLlegada.dataset.grupo = "resp";
            filaC.insertCell(2).appendChild(inpHoraLlegada);

            var inpHoraInicio = document.createElement("input");
            inpHoraInicio.dataset.fila = j;
            inpHoraInicio.dataset.campo = "hora_inicio";
            inpHoraInicio.dataset.grupo = "resp";
            filaC.insertCell(3).appendChild(inpHoraInicio);

            filaC.insertCell(4).innerText = rc.tiempo_servicio;

            var camposColas = ["hora_fin", "espera", "tiempo_sistema", "tiempo_inactivo"];
            for (var kc = 0; kc < camposColas.length; kc++) {
                var inpCol = document.createElement("input");
                inpCol.dataset.fila = j;
                inpCol.dataset.campo = camposColas[kc];
                inpCol.dataset.grupo = "resp";
                filaC.insertCell(kc + 5).appendChild(inpCol);
            }
            filasTabla++;
        }

        // Resumen de colas
        resumen.style.display = "";
        var fColHeader = resumen.insertRow(-1);
        fColHeader.innerHTML = "<th>Tiempo Promedio en Sistema (min)</th><th>Porcentaje Tiempo Inactivo (%)</th>";
        var fColInputs = resumen.insertRow(-1);
        var camposColRes = ["promedio_sistema", "porcentaje_inactivo"];
        for (var cr = 0; cr < camposColRes.length; cr++) {
            var inpColRes = document.createElement("input");
            inpColRes.dataset.campo = camposColRes[cr];
            inpColRes.dataset.grupo = "resultado";
            fColInputs.insertCell(cr).appendChild(inpColRes);
        }

    } else if (p.tipo === "volados") {
        encabezado.innerHTML = "<th>No.</th><th>Corrida</th><th>Antes ($)</th><th>Apuesta ($)</th><th>R</th><th>¿Ganó? (Si / No)</th><th>Después ($)</th><th>¿Meta? (No / Meta / Quiebra)</th>";
        for (var v = 0; v < p.respuestas.length; v++) {
            var rv = p.respuestas[v];
            var filaV = tabla.insertRow(-1);
            filaV.insertCell(0).innerText = rv.paso;

            var inpCorrida = document.createElement("input");
            inpCorrida.dataset.fila = v;
            inpCorrida.dataset.campo = "corrida";
            inpCorrida.dataset.grupo = "resp";
            filaV.insertCell(1).appendChild(inpCorrida);

            var inpAntes = document.createElement("input");
            inpAntes.dataset.fila = v;
            inpAntes.dataset.campo = "antes";
            inpAntes.dataset.grupo = "resp";
            filaV.insertCell(2).appendChild(inpAntes);

            var inpApuesta = document.createElement("input");
            inpApuesta.dataset.fila = v;
            inpApuesta.dataset.campo = "apuesta";
            inpApuesta.dataset.grupo = "resp";
            filaV.insertCell(3).appendChild(inpApuesta);

            filaV.insertCell(4).innerText = rv.r;

            var camposVol = ["gano", "despues", "meta"];
            for (var kv = 0; kv < camposVol.length; kv++) {
                var inpVol = document.createElement("input");
                inpVol.dataset.fila = v;
                inpVol.dataset.campo = camposVol[kv];
                inpVol.dataset.grupo = "resp";
                filaV.insertCell(kv + 5).appendChild(inpVol);
            }
            filasTabla++;
        }

        // Resumen de volados
        resumen.style.display = "";
        var fVolHeader = resumen.insertRow(-1);
        fVolHeader.innerHTML = "<th>Veces que llegó a la Meta</th><th>Veces a la Quiebra</th><th>Probabilidad de llegar a la Meta (%)</th>";
        var fVolInputs = resumen.insertRow(-1);
        var camposVolRes = ["veces_meta", "veces_quiebra", "probabilidad_meta"];
        for (var cv = 0; cv < camposVolRes.length; cv++) {
            var inpVolRes = document.createElement("input");
            inpVolRes.dataset.campo = camposVolRes[cv];
            inpVolRes.dataset.grupo = "resultado";
            fVolInputs.insertCell(cv).appendChild(inpVolRes);
        }
    }

    // Limpieza de campos opcionales del HTML
    ["p-total", "p-promedio"].forEach(function (id) {
        var campo = document.getElementById(id);
        if (!campo) return;
        campo.value = "";
        campo.readOnly = false;
        campo.classList.remove("ok", "mal");
    });

    var mensaje = document.querySelector(".p-mensaje");
    if (mensaje) mensaje.innerText = "";
}

function InsertarFila() {
    // En Nivel 5 la estructura de periodos/clientes/volados es predeterminada
}

function QuitarFila() {
    // En Nivel 5 la estructura de periodos/clientes/volados es predeterminada
}

/** =========================================================
 *  REVISAR RESPUESTAS
 *  ========================================================= */
function ANumero(texto) {
    texto = String(texto).replace(/\s+/g, "").replace(",", ".");
    if (texto === "") return NaN;

    var partes = texto.split("+");
    var total = 0;
    for (var i = 0; i < partes.length; i++) {
        var parte = partes[i];
        if (parte === "") return NaN;
        var numero;
        if (parte.includes("/")) {
            var div = parte.split("/");
            if (div.length !== 2) return NaN;
            numero = Number(div[0]) / Number(div[1]);
        } else {
            numero = Number(parte);
        }
        if (isNaN(numero)) return NaN;
        total += numero;
    }
    return total;
}

function SonIguales(respuestaJugador, respuestaCorrecta, tolerancia) {
    if (respuestaCorrecta === undefined || respuestaCorrecta === null) return false;

    // Comparación para texto cualitativo (ej. "Si", "No", "Meta", "Quiebra")
    if (typeof respuestaCorrecta === "string" && isNaN(Number(respuestaCorrecta))) {
        var jug = String(respuestaJugador).trim().toLowerCase();
        var cor = respuestaCorrecta.trim().toLowerCase();
        return jug === cor;
    }

    var a = ANumero(respuestaJugador);
    var b = ANumero(respuestaCorrecta);
    if (isNaN(a) || isNaN(b)) return false;
    if (tolerancia === undefined) tolerancia = toleranciaNivel5;
    return Math.abs(a - b) <= tolerancia;
}

function RevisarRespuestas() {
    var mensaje = document.querySelector(".p-mensaje");
    var inputs = document.querySelectorAll("#tablaMix input");
    var inputsResumen = document.querySelectorAll("#tablaResumenNivel5 input");
    var campoTotal = document.getElementById("p-total");
    var campoPromedio = document.getElementById("p-promedio");
    var p = problemasPartida[problemaActual];
    var tolerancia = p.tolerancia !== undefined ? p.tolerancia : toleranciaNivel5;
    var errores = 0;

    // A) Validar que no haya casillas vacías
    for (var k = 0; k < inputs.length; k++) {
        if (inputs[k].value.trim() === "") {
            if (mensaje) mensaje.innerText = "Te faltan casillas por llenar en la tabla.";
            return;
        }
    }
    for (var rk = 0; rk < inputsResumen.length; rk++) {
        if (inputsResumen[rk].value.trim() === "") {
            if (mensaje) mensaje.innerText = "Escribe los resultados solicitados en la sección inferior.";
            return;
        }
    }

    // B) Revisar casilla por casilla de la tabla principal
    inputs.forEach(function (input) {
        var fila = Number(input.dataset.fila);
        var campo = input.dataset.campo;
        var celda = input.parentElement;
        var correcta = solucion[fila] ? solucion[fila][campo] : undefined;

        if (correcta !== undefined && SonIguales(input.value, correcta, tolerancia)) {
            celda.classList.add("ok");
            celda.classList.remove("mal");
            input.readOnly = true;
        } else {
            celda.classList.add("mal");
            celda.classList.remove("ok");
            errores++;
        }
    });

    // C) Revisar resumen
    inputsResumen.forEach(function (input) {
        var campo = input.dataset.campo;
        var celda = input.parentElement;
        var correcta = p.resultado[campo];

        if (correcta !== undefined && SonIguales(input.value, correcta, tolerancia)) {
            celda.classList.add("ok");
            celda.classList.remove("mal");
            input.readOnly = true;
        } else {
            celda.classList.add("mal");
            celda.classList.remove("ok");
            errores++;
        }
    });

    // D) Opcionales en el HTML si existen
    if (campoTotal && p.resultado.total !== undefined) {
        if (SonIguales(campoTotal.value, p.resultado.total, tolerancia)) {
            campoTotal.classList.add("ok");
            campoTotal.classList.remove("mal");
            campoTotal.readOnly = true;
        } else {
            campoTotal.classList.add("mal");
            campoTotal.classList.remove("ok");
            errores++;
        }
    }
    if (campoPromedio && p.resultado.promedio !== undefined) {
        if (SonIguales(campoPromedio.value, p.resultado.promedio, tolerancia)) {
            campoPromedio.classList.add("ok");
            campoPromedio.classList.remove("mal");
            campoPromedio.readOnly = true;
        } else {
            campoPromedio.classList.add("mal");
            campoPromedio.classList.remove("ok");
            errores++;
        }
    }

    // E) Resultado
    if (errores > 0) {
        if (mensaje) mensaje.innerText = "Te equivocaste en una o más casillas. Has perdido media vida y 5 minutos.";
        PerderMediaVida();
        if (mediasVidas > 0 && typeof Penalizar === "function") {
            Penalizar();
        }
    } else {
        if (mensaje) mensaje.innerText = "¡Excelente! Has resuelto el problema con precisión.";
        var resueltos = JSON.parse(sessionStorage.getItem("resueltosNivel5") || "[]");
        if (!resueltos.includes(p.id)) {
            resueltos.push(p.id);
            sessionStorage.setItem("resueltosNivel5", JSON.stringify(resueltos));
        }
        if (typeof guardarProgreso === "function") {
            guardarProgreso(5, problemaActual + 1);
        }
        if (typeof ContinuarCarrera === "function") {
            ContinuarCarrera();
        }
    }
}

/** =========================================================
 *  VIDAS
 *  ========================================================= */
function PintarVidas() {
    var contenedorVidas = document.getElementById("p-vidas");
    if (!contenedorVidas) return;
    contenedorVidas.innerHTML = "";

    for (var i = 0; i < 3; i++) {
        var resto = mediasVidas - i * 2;
        var img = document.createElement("img");

        if (resto >= 2) {
            img.src = "img/corazon.png";
            img.alt = "Corazón completo";
            img.classList.add("img-corazon");
        } else if (resto === 1) {
            img.src = "img/corazonRoto.png";
            img.alt = "Medio corazón";
            img.classList.add("img-corazonRoto");
        } else {
            continue;
        }
        contenedorVidas.appendChild(img);
    }
}

function PerderMediaVida() {
    mediasVidas--;
    PintarVidas();
    if (mediasVidas <= 0) {
        SinVidas();
    }
}

/** =========================================================
 *  REVIVIR + MINI-JUEGO
 *  ========================================================= */
function SinVidas() {
    if (typeof DetenerReloj === "function") DetenerReloj();
    var elemProb = document.querySelector(".problema");
    if (elemProb) elemProb.style.display = "none";
    var elemRevivir = document.querySelector(".pantalla-revivir");
    if (elemRevivir) elemRevivir.style.display = "block";
    if (revivirUsado) {
        var revivirTexto = document.querySelector(".revivir-texto");
        if (revivirTexto) revivirTexto.innerText = "Ya usaste tu oportunidad de revivir.";
        var btnRevivir = document.querySelector(".btn-revivir");
        if (btnRevivir) btnRevivir.style.display = "none";
    }
}

function AbrirMinijuego() {
    revivirUsado = true;
    var elemRevivir = document.querySelector(".pantalla-revivir");
    if (elemRevivir) elemRevivir.style.display = "none";
    var elemMinijuego = document.querySelector(".minijuego");
    if (elemMinijuego) elemMinijuego.style.display = "block";
    if (typeof IniciarSopa === "function") IniciarSopa();
}

function MinijuegoGanado() {
    var elemMinijuego = document.querySelector(".minijuego");
    if (elemMinijuego) elemMinijuego.style.display = "none";
    mediasVidas = 6;
    PintarVidas();
    var mensaje = document.querySelector(".p-mensaje");
    if (mensaje) mensaje.innerText = "¡Has revivido! Termina el problema.";
    if (tiempoRestante < 600) tiempoRestante = 600;
    var elemProb = document.querySelector(".problema");
    if (elemProb) elemProb.style.display = "block";
    if (typeof ReanudarReloj === "function") ReanudarReloj();
}

function MinijuegoPerdido() {
    IrAlMenu();
}

function IrAlMenu() {
    window.location.href = "niveles.html";
}

/** =========================================================
 *  FÓRMULAS
 *  ========================================================= */
var imagenesFormulas = [
    "img/nivel5/formula1.png",    // Inventarios
    "img/nivel5/formula2.png",    // Colas
    "img/nivel5/formula3.png"     // Volados
];
var formulaActual = 0;

function AbrirFormulas() {
    formulaActual = 0;
    MostrarFormulas();
    var elemVentana = document.querySelector(".ventana-formulas");
    if (elemVentana) elemVentana.style.display = "flex";
    if (document.activeElement && typeof document.activeElement.blur === "function") {
        document.activeElement.blur();
    }
}

function CerrarFormulas() {
    var elemVentana = document.querySelector(".ventana-formulas");
    if (elemVentana) elemVentana.style.display = "none";
}

function CambiarFormula(direccion) {
    formulaActual += direccion;
    if (formulaActual < 0) formulaActual = imagenesFormulas.length - 1;
    if (formulaActual >= imagenesFormulas.length) formulaActual = 0;
    MostrarFormulas();
}

function MostrarFormulas() {
    var imgForm = document.querySelector(".formulas-img");
    if (imgForm) imgForm.src = imagenesFormulas[formulaActual];
    var contForm = document.querySelector(".formulas-contador");
    if (contForm) contForm.innerText = (formulaActual + 1) + " / " + imagenesFormulas.length;
}
