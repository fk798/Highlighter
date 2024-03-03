from flask import Flask, request, jsonify
from openai import OpenAI
import mysql.connector
import config

# open ai stuff
client = OpenAI(api_key = config.openai_api)

# mysql stuff
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password=config.mysql_password
)

mycursor = mydb.cursor()

# cache all tables
mycursor.execute("SELECT * FROM gptnotes.users")
users_table = mycursor.fetchall()

mycursor.execute("SELECT * FROM gptnotes.notes")
notes_table = mycursor.fetchall()

mycursor.execute("SELECT * FROM gptnotes.word")
word_table = mycursor.fetchall()

# flask stuff
app = Flask(__name__)

@app.route("/search", methods = ["POST"])
def search():
    request_json = request.get_json()
    if request.method == "POST":
        prompt = "what is " + request_json.get("search") + "?"
        print(prompt)
        gpt_response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}]
        )
        gpt_response_message = gpt_response.choices[0].message.content
        response_object = {}
        #response_object["prompt"] = prompt
        response_object["answer"] = gpt_response_message
        return jsonify(response_object)
    
@app.route("/login", methods = ["POST"])
def login():
    request_json = request.get_json()
    print(request_json)
    if request.method == "POST":
        username = request_json.get("username")
        password = request_json.get("password")
        ret = {}
        for user in users_table:
            if user[1] == username:
                print(user)
                if user[2] == password:
                    ret["result"] = True
        if "result" not in ret.keys():
            ret["result"] = False
        return jsonify(ret)
