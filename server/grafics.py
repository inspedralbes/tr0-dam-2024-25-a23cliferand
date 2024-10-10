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

    with open(archivo_all, 'r', encoding='utf-8') as f:
        contenido_all = json.load(f)
        for pregunta in contenido_all['preguntes']:
            preguntas_dict[int(pregunta['id'])] = pregunta['pregunta']

    for subcarpeta in os.listdir(carpeta):
        ruta_subcarpeta = os.path.join(carpeta, subcarpeta)
        if os.path.isdir(ruta_subcarpeta):
            for archivo in os.listdir(ruta_subcarpeta):
                if archivo.endswith(".json"):
                    ruta_archivo = os.path.join(ruta_subcarpeta, archivo)
                    with open(ruta_archivo, 'r', encoding='utf-8') as f:
                        contenido = json.load(f)
                        if 'solucions' in contenido:
                            try:
                                fecha = datetime.strptime(archivo.split('_')[0], '%d%m%y')
                            except ValueError:
                                fecha = None
                            datos.append({
                                'archivo': archivo,
                                'subcarpeta': subcarpeta,
                                'correctes': contenido['solucions'].get('correctes', 0),
                                'incorrectes': contenido['solucions'].get('incorrectes', 0),
                                'fecha': fecha
                            })
                        if 'respostes' in contenido:
                            for respuesta in contenido['respostes']:
                                if respuesta['respostaID'] != 1: 
                                    incorrectas.append(int(respuesta['preguntaID']))
                                    
    return pd.DataFrame(datos), incorrectas, preguntas_dict

def generar_graficos(df, incorrectas, preguntas_dict):

    # Quesito con porcentajes
    total_correctas = df['correctes'].sum()
    total_incorrectas = df['incorrectes'].sum()
    plt.figure(figsize=(7, 7))
    plt.pie([total_correctas, total_incorrectas], labels=['Correctas', 'Incorrectas'], autopct='%1.1f%%', colors=['g', 'r'])
    plt.title('Correctas e Incorrectas %')
    plt.tight_layout()
    plt.savefig('./images/quesito.png')
    plt.show()

    # Preguntas más falladas
    contador = Counter(incorrectas)
    ids = list(contador.keys())
    frecuencias = list(contador.values())
    preguntas = [preguntas_dict[id] for id in ids]

    # Ordenar por frecuencia
    preguntas_frecuencias = sorted(zip(preguntas, frecuencias), key=lambda x: x[1], reverse=True)

    if preguntas_frecuencias:
        preguntas_ordenadas, frecuencias_ordenadas = zip(*preguntas_frecuencias)

        plt.figure(figsize=(10, 10))
        plt.bar(preguntas_ordenadas, frecuencias_ordenadas, color='r')
        plt.xlabel('Pregunta')
        plt.ylabel('Frecuencia de Fallos')
        plt.title('Preguntas Más Falladas')
        plt.xticks(rotation=90)
        plt.tight_layout() 
        plt.savefig('./images/falladas.png')
        plt.show()
    else:
        print("No hay preguntas incorrectas para mostrar.")

carpeta_datos = './data'
archivo_all = './all.json'

df, incorrectas, preguntas_dict = leer_datos_de_carpeta(carpeta_datos, archivo_all)
generar_graficos(df, incorrectas, preguntas_dict)