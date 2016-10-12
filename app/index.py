from flask import Flask, render_template, request, send_file
import re
import base64
import requests
import redis
import json
import ipdb
import facebook
import os
from flask_sslify import SSLify
from PIL import Image
try:
  from StringIO import BytesIO
except ImportError:
  from io import BytesIO

SECRET_KEY = 'a537f276-af8c-485f-bc13-9c54872989c9'

app = Flask(__name__)
app.config.from_object(__name__)
ssify = SSLify(app)

redis_url = os.getenv('REDISTOGO_URL', 'redis://localhost:6379')
redis = redis.from_url(redis_url)

def get_prof_pics(graph, user_id):
  albums = graph.get_connections(id=user_id,connection_name='albums')
  profile_album_id = [album for album in albums['data'] if album['name'] == 'Profile Pictures'][0]['id']
  profile_picture_object = graph.get_object(id=profile_album_id,fields='cover_photo')
  profile_picture_id = profile_picture_object['cover_photo']['id']
  profile_pictures_images = graph.get_object(id=profile_picture_id,fields='images')
  return profile_pictures_images['images']

def largest_img(profile_pictures):
  max_width = 0
  profile_picture = ''
  for picture in profile_pictures:
    if picture['width'] > max_width:
      max_width = picture['width']
      profile_picture = picture
  return profile_picture

def to_greyscale(profile_picture):
  response = requests.get(profile_picture['source'])
  gs_image = Image.open(BytesIO(response.content)).convert('L')
  buffer_image = BytesIO()
  gs_image.save(buffer_image, 'JPEG', quality=90)
  buffer_image.seek(0)
  return buffer_image

def store(redis, key, buffer_image):
  redis.set(key, buffer_image.getvalue())
  three_hours = 60*60*3
  return redis.expire(key, three_hours)

@app.route('/', methods=['GET','POST'])
def home():
  return render_template('index.html')

@app.route('/auth', methods=['POST'])
def auth():
  token = str(request.form['accessToken'])
  user_id = request.form['userID']
  graph = facebook.GraphAPI(access_token=token, version='2.5')
  user = graph.get_object(id=user_id, fields='id,name,education')
  profile_pictures = get_prof_pics(graph, user_id)
  profile_picture = largest_img(profile_pictures)
  gs_file = 'gs-' + user['name'].replace(" ", "") + '.jpg'
  buffer_image = to_greyscale(profile_picture)
  store(redis, gs_file, buffer_image)
  return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

@app.route('/images/<filename>', methods=['GET'])
def image(filename):
  gs_file_string = redis.get(filename)
  gs_image = BytesIO(gs_file_string)
  return send_file(gs_image, mimetype='image/jpeg')

@app.route('/posters', methods=['POST'])
def save_poster():
  buffer_image = BytesIO()
  buffer_image.seek(0)
  base64image = request.form['image']
  name = request.form['name']
  base64image = re.sub('data:image/png;base64,','',str(base64image))
  base64image = re.sub('\n','',base64image)
  poster_image = Image.open(BytesIO(base64.b64decode(base64image)))
  poster_image.save(buffer_image, 'JPEG', quality=90)
  buffer_image.seek(0)
  store(redis, name, buffer_image)
  return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

@app.route('/posters/<name_base64>', methods=['GET'])
def render_poster():
  # TODO: Parse for name and base64 Image
  ipdb.set_trace()
  poster_string = redis.get(name)
  poster_image = BytesIO(poster_string)
  return send_file(poster_image, mimetype='image/jpeg')

@app.route('/<name_base64>', methods=['GET'])
def personalized():
  # TODO: Parse for name 
  # TODO: Get image url using url
  # TODO: Pass name and image link to template
  return render_template('poster.html', )

if __name__ == '__main__':
  app.run(debug=True, port=5003)
