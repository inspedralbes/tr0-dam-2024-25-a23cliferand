import json

with open("./all.json") as contingut:
    preguntes = json.load(contingut)
    print(type(preguntes)) 
    print(preguntes)        