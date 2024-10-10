import os
import json
import pandas as pd
import matplotlib.pyplot as plt
from collections import Counter
from datetime import datetime

def leer_datos_de_carpeta(carpeta, archivo_all):
    datos = []
    incorrectas = []
    preguntas_dict = {}

    with open(archivo_all, 'r') as f:
        contenido_all = json.load(f)
        for pregunta in contenido_all['preguntes']:
            preguntas_dict[pregunta['id']] = pregunta['pregunta']

    for subcarpeta in os.listdir(carpeta):
        ruta_subcarpeta = os.path.join(carpeta, subcarpeta)
        if os.path.isdir(ruta_subcarpeta):
            for archivo in os.listdir(ruta_subcarpeta):
                if archivo.endswith(".json"):
                    ruta_archivo = os.path.join(ruta_subcarpeta, archivo)
                    with open(ruta_archivo, 'r') as f:
                        contenido = json.load(f)
                        if 'solucions' in contenido:
                            datos.append({
                                'archivo': archivo,
                                'subcarpeta': subcarpeta,
                                'correctes': contenido['solucions'].get('correctes', 0),
                                'incorrectes': contenido['solucions'].get('incorrectes', 0),
                            })
                        if 'respostes' in contenido:
                            for respuesta in contenido['respostes']:
                                if respuesta['respostaID'] == 0:  # 0 es cuando el jugador no contesta la pregunta
                                    incorrectas.append(respuesta['preguntaID'])
    return pd.DataFrame(datos), incorrectas, preguntas_dict

def generar_graficos(df, incorrectas, preguntas_dict):
    # Quesito con porcentajes de media
    total_correctas = df['correctes'].sum()
    total_incorrectas = df['incorrectes'].sum()
    plt.figure(figsize=(7, 7))
    plt.pie([total_correctas, total_incorrectas], labels=['Correctas', 'Incorrectas'], autopct='%1.1f%%', colors=['g', 'r'])
    plt.title('Porcentaje de Respuestas Correctas e Incorrectas')
    plt.tight_layout() 
    plt.savefig('./images/quesito.png')
    plt.show()

    # Preguntas más falladas
    contador = Counter(incorrectas)
    ids = list(contador.keys())
    frecuencias = list(contador.values())
    preguntas = [preguntas_dict[id] for id in ids]

    plt.figure(figsize=(10, 10))
    plt.bar(preguntas, frecuencias, color='r')
    plt.xlabel('Pregunta')
    plt.ylabel('Frecuencia de Fallos')
    plt.title('Preguntas Más Falladas')
    plt.xticks(rotation=90)
    plt.tight_layout() 
    plt.savefig('./images/falladas.png')

# Ruta de la carpeta que contiene los archivos JSON
carpeta_datos = './data'
archivo_all = './all.json'

# Leer datos de la carpeta y el archivo all.json
df, incorrectas, preguntas_dict = leer_datos_de_carpeta(carpeta_datos, archivo_all)

# Muestra todo
generar_graficos(df, incorrectas, preguntas_dict)

print("ALL GOOD")