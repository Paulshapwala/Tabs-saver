import sqlite3
import os
from flask import Flask, request, jsonify
import datetime

app = Flask(__name__)

# Absolute path to the database file
DB_FILE = r"C:\Users\shapz\Desktop\database files\tabs-saver-db\research_links.db"

# Ensure that the database directory exists
DB_DIR = os.path.dirname(DB_FILE)
os.makedirs(DB_DIR, exist_ok=True)


# Initialize database and create table if it doesn't exist
def init_db():
    with sqlite3.connect(DB_FILE) as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS research (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                topic TEXT NOT NULL,
                date TEXT NOT NULL,
                title TEXT NOT NULL,
                url TEXT NOT NULL
            )
        """)
init_db()

# API endpoint to save links
@app.route('/save_links', methods=['POST'])
def save_links():
    data = request.json
    topic = data.get("topic", "Untitled_Research")
    links = data.get("links", [])

    if not links:
        return jsonify({"error": "No links provided"}), 400

    date_str = datetime.datetime.now().strftime("%Y-%m-%d")

    with sqlite3.connect(DB_FILE) as conn:
        cursor = conn.cursor()
        for link in links:
            cursor.execute("INSERT INTO research (topic, date, title, url) VALUES (?, ?, ?, ?)",
                           (topic, date_str, link["title"], link["url"]))
        conn.commit()

    return jsonify({"message": "Research saved successfully!"})

# API endpoint to retrieve saved research topics
@app.route('/get_topics', methods=['GET'])
def get_topics():
    with sqlite3.connect(DB_FILE) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT DISTINCT topic, date FROM research ORDER BY date DESC")
        topics = [{"topic": row[0], "date": row[1]} for row in cursor.fetchall()]
        print("print topics fetched")

    return jsonify({"topics": topics})


# API endpoint to retrieve links for a specific topic
@app.route('/get_links/<topic>', methods=['GET'])
def get_links(topic):
    with sqlite3.connect(DB_FILE) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT date, title, url FROM research WHERE topic = ? ORDER BY date DESC", (topic,))
        links = [{"date": row[0], "title": row[1], "url": row[2]} for row in cursor.fetchall()]
    output = {topic: links}
    print("links fetched!")
    return jsonify(output)

if __name__ == '__main__':
    app.run(debug=True)
