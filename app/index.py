from flask import Flask, render_template, request
import json
import facebook
import ipdb

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def home():
    return render_template('index.html')

@app.route('/auth', methods=['POST'])
def auth():
  user_info = {}
  token = str(request.form['accessToken'])
  user_id = request.form['userID']
  graph = facebook.GraphAPI(access_token=token, version='2.5')
  user = graph.get_object(id=user_id, fields='id,name,education')
  nu = [edu for edu in user['education'] if edu['school']['name']=='Northeastern University'][0]
  ipdb.set_trace()
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
  return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

if __name__ == '__main__':
    app.run(debug=True, port=5003)
