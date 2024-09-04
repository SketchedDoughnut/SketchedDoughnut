import requests
from cryptography.fernet import Fernet
import js
import hashlib
import asyncio
# import shelve # what is this?

# main operating class
class Security_agent:
    def __init__(self):
        self.main_hash = b'X\x8aiS\x8a\xcf!\x00\xca\xfe\xa1\xe3\x84\xb4\xban\x1e\x94\xbdz\x00k\x0f\xa2\xc8\xf9\xbbX\x94J\xcb\xbf' 
        self.secondary_hash = b'\x18\x039\x10a8\x11\x0c\x89\x8b\xae\xfe\xeej\x8a\xc5\x16\xbe\x02,8i\x1d\x91\x93\x11_\xf1\x19\xf8\xc2\xf7'

    # when token is inputted, this function grabs it and checks if it is correct (hash digest comparison)
    async def submit_token(self, main_token_in: None | str = None, secondary_token_in: None | str = None):
        # fetch encrypted data from file
        selection = js.document.getElementById('appload')
        js.console.log(selection)
        # https://www.w3schools.com/jsref/dom_obj_select.asp
        # https://stackoverflow.com/questions/62798126/get-data-from-select-tag-using-javascript
        # file_extension = selection.options[selection.selectedIndex].value

        # encrypted_data = await js.fetch(f'./data/{file_extension}')
        encrypted_data = await js.fetch(f'./data/base.data')
        if encrypted_data.status != 200: return
        text_encrypted_data: str = await encrypted_data.text()
        encoded_encrypted_data = text_encrypted_data.encode()

        # get token from form, convert to bytes
        if main_token_in == None: main_token_input = js.document.getElementById("main input token")
        else: main_token_input = main_token_in
        if secondary_token_in == None: secondary_token_input = js.document.getElementById('secondary input token')
        else: secondary_token_input = secondary_token_in
        main_token: str = main_token_input.value
        secondary_token: str = secondary_token_input.value
        bytes_main_token = main_token.encode()
        bytes_secondary_token = secondary_token.encode()

        # compare hashed version of token with inputted, see if they match
        main_hashed_token = hashlib.sha256(bytes_main_token)
        secondary_hashed_token = hashlib.sha256(bytes_secondary_token)
        main_digested_token = main_hashed_token.digest()
        secondary_digested_token = secondary_hashed_token.digest()
        if main_digested_token != self.main_hash and secondary_digested_token != self.secondary_hash: return
        js.console.log('[PYTHON MANAGER] Hashes match')

        # remove current elements on screen
        for id in ['secure removal', 'script removal']: js.document.getElementById(id).remove()
        js.console.log('[PYTHON MANAGER] Secure elements removed')

        # decrypt data
        main_encryption_tool = Fernet(main_token)
        secondary_encryption_tool = Fernet(secondary_token)
        secondary_decrypted = secondary_encryption_tool.decrypt(encoded_encrypted_data)
        main_decrypted = main_encryption_tool.decrypt(secondary_decrypted)
        decoded = main_decrypted.decode()

        js.document.getElementById('injection point').innerHTML = decoded
        js.console.log('[PYTHON MANAGER] Content injected')

###########################################################################################################################

# DATA = b'gAAAAABmfRC9d-LdYJmFu_v6ihv04d3tQXIVrUu4JTrI2EPSuSLgc5DJ2Jxm-ANgoe7ynl2J_qW1XozQZK5b2G6dVCFjhMmyJZcGiSfrOIujRMnlf84rgtgbUeBKQyPCeK_GBgiPfZcH'

###########################################################################################################################

# object for initializing, yada yada
secure = Security_agent()

# if __name__ == '__main__':
#     asyncio.run(secure.submit_token)