#!/bin/sh

# FLASK_APP=app.py FLASK_DEBUG=1 SECRET_SALT="^&?cY,t}pE>6rQu]$C#pRK^dns3B((}.e~*BzSgb5d7h*F;&FB/jD(>N\NSMX.b" DATABASE_URL="postgresql://leader:mysecretpassword@172.22.4.5:5432/electrocorp" ./initialize_db.py
FLASK_APP=app.py SECRET_SALT="^&?cY,t}pE>6rQu]$C#pRK^dns3B((}.e~*BzSgb5d7h*F;&FB/jD(>N\NSMX.b" DATABASE_URL="postgresql://leader:mysecretpassword@172.22.4.5:5432/electrocorp" flask run
