# external
from cryptography.fernet import Fernet
import hashlib
from rich import print

# initial setup for secure info
def setup_secure_info():
    token = Fernet.generate_key()
    tool = Fernet(token)
    hashed_key = hashlib.sha256(token)
    digested_hash = hashed_key.digest()
    return token, digested_hash

def encrypt_data():
    # get text inputs
    source = input('please input the source path: ')
    output = input('please input the output path: ')
    main_key = input('please input the main key: ')
    secondary_key = input('please input the secondary key: ')

    # create tools
    main_tool = Fernet(main_key)
    secondary_tool = Fernet(secondary_key)

    # access raw data
    f = open(source, 'r')
    raw_data = f.read()
    f.close()
    print(f'[green]raw data from file [purple]{source}: [red]{raw_data}')

    # encode, then encrypt data
    encoded_data = raw_data.encode()
    main_encrypted_data = main_tool.encrypt(encoded_data)
    secondary_encrypted_data = secondary_tool.encrypt(main_encrypted_data)
    print(f'[green]double encrypted data: [red]{secondary_encrypted_data}')

    # save data to output, decoding the encrypted data into a str
    decoded_secondary_encrypted = secondary_encrypted_data.decode()
    f = open(output, 'w')
    f.write(decoded_secondary_encrypted)
    f.close()
    print(f'[green]wrote decoded encrypted data to file [purple]{output}: [red]{decoded_secondary_encrypted}')
encrypt_data()