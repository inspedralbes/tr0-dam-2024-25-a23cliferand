import os
import matplotlib.pyplot as plt
import pandas as pd
from datetime import datetime
import json

today = datetime.now().strftime('%d-%m-%Y')

df_subcarpeta = (f'./data/{today}')


if not os.path.exists(df_subcarpeta):
    os.makedirs(df_subcarpeta)

if os.listdir(df_subcarpeta):
    total_correctas = 0
    total_incorrectas = 0

    for filename in os.listdir(df_subcarpeta):
        if filename.endswith('.json'):
            with open(os.path.join(df_subcarpeta, filename), 'r') as file:
                data = json.load(file)
                total_correctas += data['solucions']['correctes']
                total_incorrectas += data['solucions']['incorrectes']

    if total_correctas + total_incorrectas > 0:
        plt.figure(figsize=(7, 7))
        plt.pie([total_correctas, total_incorrectas], labels=['Correctas', 'Incorrectas'], autopct='%1.1f%%', colors=['g', 'r'])
        plt.title(f'Correctes e Incorrectes % (DATA: {today})')
        plt.tight_layout()
        plt.savefig(f'./statistics/{today}.png')
        plt.savefig('./images/quesito.png')
    else:
        print("no data")
        plt.figure(figsize=(7, 7))
        plt.pie([1], labels=['No data'], autopct='%1.1f%%', colors=['grey'])
        plt.title(f'Correctas e Incorrectas % (DATA: {today})')
        plt.tight_layout()
        plt.savefig(f'./statistics/{today}.png')
        plt.savefig('./images/quesito.png')
else:
    print("no dates")
    plt.figure(figsize=(7, 7))
    plt.pie([1], labels=['No dades'],autopct='%1.1f%%', colors=['grey'])
    plt.title(f'Correctes e Incorrectes % (DATA: {today})')
    plt.tight_layout()
    plt.savefig(f'./statistics/{today}.png')
    plt.savefig('./images/quesito.png')

print("ALL DONE")
