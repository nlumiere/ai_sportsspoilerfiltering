import os, sys, json
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import playground

titles = []
with open('data/titles.txt', encoding="utf8") as f:
    for line in f:
        if not line.startswith("==="):
            titles.append(line)

dictionary = {}
for title in titles:
    response = playground.request(title)
    if "No" in response:
        dictionary[title] = "No"
    else:
        dictionary[title] = "Yes"


# Serializing json
json_object = json.dumps(dictionary, indent=4)
 
# Writing to sample.json
with open("data/labeledTitles_spoilers.txt", "a", encoding="utf-8") as f:
    f.write(json_object)