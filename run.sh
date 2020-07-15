#!/bin/bash

source venv/bin/activate
kill -KILL `lsof -i :4000 | awk '{print $2}' | awk 'NR != 1'`
gunicorn --bind 0.0.0.0:4000 wsgi:app
