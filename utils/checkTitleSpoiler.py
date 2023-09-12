import os, sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import playground
# Using readlines()
titles = []
with open('data/titles.txt', encoding="utf8") as f:
    for line in f:
        if not line.startswith("==="):
            titles.append(line)

print(titles)

for title in titles:
    response = playground.request(title)