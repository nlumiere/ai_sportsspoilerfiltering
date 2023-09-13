import os
from os import listdir
import splitfolders
from keras.preprocessing import image
from pathlib import Path

""" fSpoiler is a boolean that is true if it's a spoiler
Can use this to resize images, but keep_aspect_ratio = True
in load_img will crop, otherwise will distort """
def preprocessImages(path, fSpoiler):
    imagesList = listdir(path)
    imgs = []
    for address in imagesList:
        img = image.load_img(path + address, target_size=(224, 224))
        if fSpoiler:
            img.save('../data/sorted_resized/spoilers/' + address)
        else:
            img.save('../data/sorted_resized/non-spoilers/' + address)
        imgs.append(img)
    return imgs

Path("../data/sorted_resized/").mkdir(parents=True, exist_ok=True)
Path("../data/sorted_resized/non-spoilers/").mkdir(parents=True, exist_ok=True)
Path("../data/sorted_resized/spoilers/").mkdir(parents=True, exist_ok=True)
preprocessImages('../data/sorted_raw/non-spoilers/', False)
preprocessImages('../data/sorted_raw/spoilers/', True)

splitfolders.ratio('../data/sorted_resized', output="../data/sorted_split", seed=1337, ratio=(.7, 0.15,0.15)) 

# def getImageArrays(path):
#     imagesList = listdir(path)
#     imgArrList = []
#     for address in imagesList:
#         img = image.load_img(path + address, target_size=(224, 224))
#         imgArr = image.img_to_array(img)
#         print(imgArr)
#         imgArrList.append(imgArr)
#     return imgArrList
