from flask import Flask, jsonify, request
import threading
import schedule
import time

from recommendation import Recommendation


app = Flask(__name__)
recommendation = Recommendation()
ACTIVE = True


@app.route("/health", methods=["GET"])
def health():
    return "OK"


@app.route("/recommendation", methods=["GET"])
def get_recommendation():
    user_id = request.args.get("user_id")
    start_index = int(request.args.get("start_index", 0))
    count = int(request.args.get("count", 10))

    return jsonify(
        recommendation.get_recommendation(user_id, start_index, count).tolist()
    )


def schedule_post_embedding_update():
    schedule.every(24).hours.do(recommendation.update_post_embeddings)

    while ACTIVE:
        schedule.run_pending()
        time.sleep(1)


if __name__ == "__main__":
    threading.Thread(target=schedule_post_embedding_update).start()
    app.run()
