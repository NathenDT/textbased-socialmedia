from dotenv import load_dotenv
import MySQLdb
import os
import pandas as pd

load_dotenv()


class Database:
    def __init__(self):
        self.connection = self.connect_to_database()
        self.cursor = self.connection.cursor()

    def __del__(self):
        self.cursor.close()
        self.connection.close()

    def connect_to_database(self):
        # Connect to the MySQL database
        connection = MySQLdb.connect(
            host=os.getenv("HOST"),
            user=os.getenv("USERNAME"),
            passwd=os.getenv("PASSWORD"),
            db=os.getenv("DATABASE"),
            autocommit=True,
            ssl_mode="VERIFY_IDENTITY",
            ssl={"ca": "/etc/ssl/cert.pem"},
        )

        return connection

    def fetch_posts(self):
        try:
            query = "SELECT id, content FROM Post"
            self.cursor.execute(query)

            return pd.DataFrame(self.cursor.fetchall(), columns=["id", "content"])
        except Exception as e:
            print(e)

            return

    def fetch_likes(self, user_id: str | None):
        if user_id is None:
            return

        try:
            query = f"""
                SELECT p.id, p.content
                FROM Post p
                JOIN `Like` l ON p.id = l.postId
                WHERE l.userId = '{user_id}';
            """
            self.cursor.execute(query)

            return pd.DataFrame(self.cursor.fetchall(), columns=["id", "content"])
        except Exception as _:
            return

    def fetch_most_liked(self, start_index: int, count: int):
        try:
            query = f"""
                SELECT p.id, p.userId, p.content, p.createdAt, COUNT(l.postId) AS likeCount
                FROM Post p
                LEFT JOIN `Like` l ON p.id = l.postId
                GROUP BY p.id, p.userId, p.content, p.createdAt
                ORDER BY likeCount DESC, p.createdAt DESC
                LIMIT {start_index}, {count};
            """
            self.cursor.execute(query)

            return pd.DataFrame(
                self.cursor.fetchall(),
                columns=["id", "userId", "content", "createdAt", "likeCount"],
            )
        except Exception as e:
            print(e)

            return
