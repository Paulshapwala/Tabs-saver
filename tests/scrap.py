import sqlite3

DB_FILE = r"C:\Users\shapz\Desktop\database files\tabs-saver-db\research_links.db"

def delete_research_entry(topic=None, title=None):
    if not topic and not title:
        print("Please provide a topic or title to delete.")
        return

    query = "DELETE FROM research WHERE 1=1"
    params = []

    if topic:
        query += " AND topic = ?"
        params.append(topic)

    if title:
        query += " AND title = ?"
        params.append(title)

    with sqlite3.connect(DB_FILE) as conn:
        cursor = conn.cursor()
        cursor.execute(query, params)
        conn.commit()
        print(f"Deleted {cursor.rowcount} entries.")


