from flask import Flask, render_template, request, jsonify, session
import urllib
import redis
import json
import facebook
import uuid
from PIL import Image

SECRET_KEY = 'a537f276-af8c-485f-bc13-9c54872989c9'
SESSION_COOKIE_SECURE = False

app = Flask(__name__)
app.config.from_object(__name__)

r = redis.StrictRedis(host='localhost', port=6379, db=0)

@app.route('/', methods=['GET','POST'])
def home():
    return render_template('index.html')

@app.route('/auth', methods=['GET','POST'])
def auth():
  if request.method == 'POST':
    token = str(request.form['accessToken'])
    user_id = request.form['userID']
    graph = facebook.GraphAPI(access_token=token, version='2.5')
    testing = open('testing.txt', 'w+')
    user = graph.get_object(id=user_id, fields='id,name,education')
    albums = graph.get_connections(id=user_id,connection_name='albums')
    testing.write('user' + user)
    testing.write('album' + album)
    profile_album_id = [album for album in albums['data'] if album['name'] == 'Profile Pictures'][0]['id']
    profile_picture_object = graph.get_object(id=profile_album_id,fields='cover_photo')
    profile_picture_id = profile_picture_object['cover_photo']['id']
    profile_pictures_images = graph.get_object(id=profile_picture_id,fields='images')
    profile_pictures = profile_pictures_images['images']
    max_width = 0
    profile_picture = ''
    for picture in profile_pictures:
      if picture['width'] > max_width:
        max_width = picture['width']
        profile_picture = picture

    file_name = user['name'] + '.jpg'
    urllib.urlretrieve(profile_picture['source'], file_name)
    img = Image.open(file_name).convert('L')
    gs_file = 'gs-' + file_name
    img.save(gs_file)
    r.set('test_file', gs_file)
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}
  else:
    gs_file = r.get('test_file')
    return jsonify(gs_prof_pic=gs_file)


if __name__ == '__main__':
  app.run(debug=True, port=5003)
