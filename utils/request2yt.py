import requests
from PIL import Image
from io import BytesIO
import uuid
import os
from os.path import join, dirname
from dotenv import load_dotenv

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

KEY = os.environ.get("KEY")

NUM = 25
QUERY = "pole vault women champ"
SIZE = "medium"

url = 'https://youtube.googleapis.com/youtube/v3/search?maxResults=' + str(NUM) + '&q=' + QUERY + '&key=' + KEY

headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}

response = requests.get(url, headers=headers)
obj = response.json()
ids = ""
idsSave = ""

prevIds = ""
with open("../data/ids.txt", "r") as idsFile:
    prevIds = idsFile.read()
# print(prevIds)

for vid in obj["items"]:
    tmp = vid["id"]
    try:
        tmpId = tmp["videoId"]
        if not tmpId in prevIds:
            ids += tmpId + ","
            idsSave += tmpId + "\n"
    except:
        print(tmp)
ids = ids[:-1]

url = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=" + ids + "&key=" + KEY
response = requests.get(url, headers=headers)
obj = response.json()

urls = []
titles = ""
descriptions = ""
try:
    for i, vid in enumerate(obj["items"]):
        urls.append(vid["snippet"]["thumbnails"][SIZE]["url"])
        titles += vid["snippet"]["title"] + "\n===\n"
        descriptions += vid["snippet"]["description"] + "\n===\n"
except:
    print("failed")

imgs = []
for url in urls:
    response = requests.get(url, headers=headers)
    imgs.append(Image.open(BytesIO(response.content)))

for img in imgs:
    uid = uuid.uuid4()
    img.save("../data/unsorted/" + str(uid) + ".png")

with open("../data/titles.txt", "a", encoding="utf-8") as f:
    f.write(titles)

with open("../data/descriptions.txt", "a", encoding="utf-8") as f:
    f.write(descriptions)

with open("../data/ids.txt", "a", encoding="utf-8") as f:
    f.write(idsSave)