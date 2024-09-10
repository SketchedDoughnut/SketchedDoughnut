# external
from cryptography.fernet import Fernet
import hashlib
from rich import print
from os import remove, path
import json
import pickle # haha pickle

# initial setup for secure info
def setup_secure_info(manual_key: bytes | None = None):
    if manual_key != None: token = manual_key
    else: token = Fernet.generate_key()
    tool = Fernet(token)
    hashed_key = hashlib.sha256(token)
    digested_hash = hashed_key.digest()
    return token, digested_hash

def encrypt_data():
    # get text inputs
    source = input('please input the source path: ')
    output = input('please input the output path: ')
    incorporate_python = input('is there a python file to link into pyscript? (y/n): ').lower() == 'y'
    if incorporate_python:
        inlay_python = input('enter relative path: ')
    if path.exists('hidden'): 
        from hidden.secret import keys, PRIMARY, SECONDARY
        main_key = keys[PRIMARY]
        secondary_key = keys[SECONDARY]
    else:
        # main_key = input('please input the main key: ')
        # secondary_key = input('please input the secondary key: 
        keys = input('please input the key data: ')
        keys = eval(keys) # UHOH BE CAREFUL AAAAAAAAAAAAAAAAAAAAAAAAAA
        main_key = keys[0]
        secondary_key = keys[1]
    encrypt_or_decrypt = input('please choose to encrypt (e), decrypt (d), recompile (r): ').lower()
    remove_source = input('remove source? (y/n): ').lower()

    # create tools
    main_tool = Fernet(main_key)
    secondary_tool = Fernet(secondary_key)

    # access raw data
    f = open(source, 'r')
    raw_data = f.read()
    f.close()
    print(f'[green]read raw data from file [purple]{source}: [red]{raw_data}')

    # if encrypt, encrypt and dump data
    if encrypt_or_decrypt == 'e':
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

    # if decrypt, decrypt and dump data
    elif encrypt_or_decrypt == 'd':
        secondary_decrypted = secondary_tool.decrypt(raw_data)
        main_decrypted = main_tool.decrypt(secondary_decrypted)
        main_decoded = main_decrypted.decode()
        f = open(output, 'w')
        f.write(main_decoded)
        f.close()
        print(f'[green]wrote decoded decrypted data to file [purple]{output}: [red]{main_decoded}')

    elif encrypt_or_decrypt == 'r':
        secondary_decrypted = secondary_tool.decrypt(raw_data)
        main_decrypted = main_tool.decrypt(secondary_decrypted)
        main_decoded = main_decrypted.decode()
        f = open(output, 'w')
        f.write(main_decoded)
        f.close()
        print(f'[green]wrote decoded decrypted data to file [purple]{output}: [red]{main_decoded}')
        f = open(source, 'r')
        raw_data = f.read()
        f.close()
        print(f'[green]read raw data from file [purple]{source}: [red]{raw_data}')
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
    
    if remove_source == 'y':
        remove(source)
        print(f'[green] removed [purple]{source}')
    
encrypt_data()