import numpy as np
import tensorflow as tf
import tensorflow_hub as hub
import tensorflow_text as _
from sklearn.metrics.pairwise import cosine_similarity

from database import Database


class Recommendation:
    def __init__(self):
        self.database = Database()
        self.posts = self.database.fetch_posts()
        self.post_embeddings = self.get_post_embeddings()

    def embed(self, texts):
        with tf.device("/cpu:0"):
            hub_url = "https://tfhub.dev/google/universal-sentence-encoder/4"

            embedding = hub.load(hub_url)(texts)

        embedding = np.array(embedding)
        embedding = np.squeeze(embedding)

        return embedding

    def get_post_embeddings(self):
        if self.posts.empty:
            return np.array([])

        post_embeddings = self.embed(self.posts["content"].tolist())

        return post_embeddings

    def update_post_embeddings(self):
        self.posts = self.database.fetch_posts()
        self.post_embeddings = self.get_post_embeddings()

    def get_recommendation(
        self, user_id: str | None, start_index: int = 0, count: int = 2
    ):
        liked_posts = self.database.fetch_likes(user_id)

        if liked_posts is None or liked_posts.empty:
            posts = self.database.fetch_most_liked(start_index, count)

            return np.array(posts["id"].tolist())

        liked_post_embeddings = self.embed(liked_posts["content"].tolist())

        similarity_scores = cosine_similarity(
            liked_post_embeddings, self.post_embeddings
        )

        recommend_ids = np.argsort(-similarity_scores)[0]

        return np.array(
            self.posts.iloc[recommend_ids[start_index : start_index + count]][
                "id"
            ].tolist()
        )
