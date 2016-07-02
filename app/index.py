from flask import Flask, render_template, request, jsonify, session
#from flask.ext.session import Session
import urllib
import json
import facebook
import ipdb
from PIL import Image

app = Flask(__name__)
#sess = Session()

@app.route('/', methods=['GET','POST'])
def home():
    return render_template('index.html')

@app.route('/auth', methods=['GET','POST'])
def auth():
  if request.method == 'POST':
    token = str(request.form['accessToken'])
    user_id = request.form['userID']
    graph = facebook.GraphAPI(access_token=token, version='2.5')
    user = graph.get_object(id=user_id, fields='id,name,education')
    albums = graph.get_connections(id=user_id,connection_name='albums')
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

    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}
  else:
    ipdb.set_trace()
    return jsonify(gs_prof_pic=gs_file)

app.secret_key = '\x074\xa3\xfb\xce:\xdb?\x04\x07E\xa3?]\x0b\x88\x85\x9b\n\xcd\xa5\x14\xd4e'

if __name__ == '__main__':
  #app.config['SESSION_TYPE'] = 'filesystem'
  #app.config['APPLICATION_ROOT']='/Users/Gen/projects/neu-photo-generator'
  #app.config['SESSION_COOKIE_PATH']='/Users/Gen/projects/neu-photo-generator'
  #app.config['SESSION_COOKIE_SECURE']=True
  app.config['SESSION_COOKIE_HTTPONLY']=False
  app.run(debug=True, port=5003)
