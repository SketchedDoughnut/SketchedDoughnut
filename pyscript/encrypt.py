from cryptography.fernet import Fernet
import hashlib

# CODE
# token = Fernet.generate_key()
# tool = Fernet(token)
# hashed_key = hashlib.sha256(token)
# digested_hash = hashed_key.digest()

# USING ABOVE DETAILS
token = input('-> ').encode()
tool = Fernet(token)
input_mode = 1
if input_mode == 0:
    raw_data = input('-> ').encode()
elif input_mode == 1:
    f = open(r'other\app.html', 'r')
    raw_data = f.read()
    f.close()
    raw_data = raw_data.encode()
encrypted = tool.encrypt(raw_data)
print('encrypted data:', encrypted)