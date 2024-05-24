import random
import string

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'mp4'}

def generate_user_id(length=8):
    characters = string.ascii_letters + string.digits
    return ''.join(random.choices(characters, k=length))

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def allowed_video(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() == 'mp4'
