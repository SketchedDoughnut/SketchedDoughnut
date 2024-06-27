import requests
from cryptography.fernet import Fernet
import js
import hashlib
# import shelve # what is this?

# main operating class
class Security_agent:
    def __init__(self):
        # hash to compare to
        self.SAVED_HASH = b'X\x8aiS\x8a\xcf!\x00\xca\xfe\xa1\xe3\x84\xb4\xban\x1e\x94\xbdz\x00k\x0f\xa2\xc8\xf9\xbbX\x94J\xcb\xbf'
        self.hash_match = False

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
            self.crypto_agent()

    def crypto_agent(self):
        if self.hash_match:
           self.encryption_tool = Fernet(self.token)
           decrypted = self.encryption_tool.decrypt(DATA)
           raw = decrypted.decode()
           exec(raw)

###########################################################################################################################

DATA = b'gAAAAABmfRC9d-LdYJmFu_v6ihv04d3tQXIVrUu4JTrI2EPSuSLgc5DJ2Jxm-ANgoe7ynl2J_qW1XozQZK5b2G6dVCFjhMmyJZcGiSfrOIujRMnlf84rgtgbUeBKQyPCeK_GBgiPfZcH'

###########################################################################################################################

# object for initializing, yada yada
secure = Security_agent()