from datetime import datetime
from flask import Flask, request
from flask import render_template
import asyncio

from async_bd import insert_data

app = Flask(__name__)


@app.route('/')
def index():
    return render_template("index.html")


def get_formatted_datetime():
    current_datetime = datetime.now()
    formatted_datetime = current_datetime.strftime("%d.%m.%Y:%H:%M:%S")

    return formatted_datetime


@app.route('/submit_form', methods=['POST'])
def submit_form():
    if request.method == 'POST':
        data_write = {'user_id': request.form.get('user_id'),
                      'name': request.form.get('full_name'),
                      'pass_count': int(request.form.get('passenger_count')),
                      'departure_date': request.form.get('departure_date'),
                      'from_loc': request.form.get('from_loc'),
                      'to_loc': request.form.get('to_loc'),
                      'phone': request.form.get('phone'),
                      'data_booking': get_formatted_datetime(),
                      'status_booking': 'wait_send'}
        asyncio.run(insert_data('booking', data_write))
        return '<div class="my_msg"><p>Бронь принята!</p><p>Скоро с вами свяжется диспетчер для уточнения деталей</p></div>'



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
