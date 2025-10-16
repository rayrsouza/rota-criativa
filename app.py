from flask import Flask, render_template, request, redirect, jsonify
import json
import os

app = Flask(__name__)

ARQUIVO = "inscricoes.json"

# Garante que o arquivo existe e está vazio
if not os.path.exists(ARQUIVO):
    with open(ARQUIVO, "w", encoding="utf-8") as f:
        json.dump([], f)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/inscricao", methods=["POST"])
def inscricao():
    nome = request.form.get("nome")
    data_nasc = request.form.get("dataNasc")
    email = request.form.get("email")
    telefone = request.form.get("telefone")
    sexo = request.form.get("sexo")
    nome_social = request.form.get("nomeSocial")

    # Lê as inscrições existentes
    try:
        with open(ARQUIVO, "r", encoding="utf-8") as f:
            inscricoes = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        inscricoes = []
    
    # Adiciona a nova inscrição
    nova_inscricao = {
        "nome": nome,
        "data_nascimento": data_nasc,
        "email": email,
        "telefone": telefone,
        "sexo": sexo,
        "nome_social": nome_social
    }
    inscricoes.append(nova_inscricao)
    
    # Salva no JSON
    with open(ARQUIVO, "w", encoding="utf-8") as f:
        json.dump(inscricoes, f, ensure_ascii=False, indent=2)

    # Retorna JSON para AJAX
    return jsonify({"success": True, "message": "Inscrição enviada com sucesso!"})

if __name__ == "__main__":
    app.run(debug=True)
