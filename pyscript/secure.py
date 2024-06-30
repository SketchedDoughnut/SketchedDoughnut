import requests
from cryptography.fernet import Fernet
import js
import hashlib
import asyncio
# import shelve # what is this?

# main operating class
class Security_agent:
    def __init__(self):
        # hash to compare to
        self.SAVED_HASH = b'X\x8aiS\x8a\xcf!\x00\xca\xfe\xa1\xe3\x84\xb4\xban\x1e\x94\xbdz\x00k\x0f\xa2\xc8\xf9\xbbX\x94J\xcb\xbf'
        self.hash_match = False

    # loads the encrypted data from ./data/app.data
    async def load_data(self):
        encrypted_data = await js.fetch('./data/app.data')
        if encrypted_data.status == 200:
            # js.console.log(encrypted_data.text())
            self.data = await encrypted_data.text()
            self.data = self.data.encode()

    # when token is inputted, this function grabs it and checks if it is correct (hash digest comparison)
    def submit_token(self):
        # get token from form
        token_input = js.document.getElementById("input token")
        string_token: str = (token_input.value)
        byte_token: bytes = string_token.encode()

        # compare hashed version of token with inputted, see if they match
        hashed_token = hashlib.sha256(byte_token)
        digested_token = hashed_token.digest()
        if digested_token == self.SAVED_HASH:
            js.console.log('[PYTHON MANAGER] Hashes match')
            self.hash_match = True
            self.token = byte_token
            return 'success'

    # decrypts the data inputted
    def crypto_agent(self, data_in: bytes, mode: str = 'decrypt'):
        if self.hash_match == True:
           if mode == 'decrypt':
            self.encryption_tool = Fernet(self.token)
            decrypted = self.encryption_tool.decrypt(data_in)
            raw = decrypted.decode()
        return raw
    
    # removes all elements from secure.html
    def remove_secure_elements(self):
        element_ids = ['c1', 'c2', 'c3', 'c4', 'token form']
        for id in element_ids:
            element = js.document.getElementById(id)
            element.remove()
        js.console.log('[PYTHON MANAGER] Secure elements removed')

    # injects the decrypted data from ./data/app.data
    async def inject_code(self):
        self.remove_secure_elements()
        content = self.crypto_agent(self.data)
        element = js.document.getElementById('injection point')
        element.innerHTML = content

###########################################################################################################################

# DATA = b'gAAAAABmfRC9d-LdYJmFu_v6ihv04d3tQXIVrUu4JTrI2EPSuSLgc5DJ2Jxm-ANgoe7ynl2J_qW1XozQZK5b2G6dVCFjhMmyJZcGiSfrOIujRMnlf84rgtgbUeBKQyPCeK_GBgiPfZcH'

###########################################################################################################################

# object for initializing, yada yada
secure = Security_agent()