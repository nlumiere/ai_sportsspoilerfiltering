import os
from sys import exit
from os.path import join, dirname
from dotenv import load_dotenv

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

OPENAI_KEY = os.environ.get("OPENAI_KEY")
OPENAI_ENDPOINT = "https://emeaopenai.azure-api.net"
OPENAI_MODEL = os.environ.get("OPENAI_MODEL")

if OPENAI_KEY and OPENAI_ENDPOINT and OPENAI_MODEL:
    print("Keys loaded successfully!")
else:
    print("Error in setting up the environment")
    exit()