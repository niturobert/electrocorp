from app import app
from os import environ

app.run(debug=False, port=environ.get("PORT", 5000))