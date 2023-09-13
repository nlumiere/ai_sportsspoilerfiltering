from os import listdir, rename
from PIL import Image
import keyboard
import cv2
import numpy as np
from sys import exit
from pathlib import Path

def loadImages(path):
    imagesList = listdir(path)
    imgs = []
    for address in imagesList:
        imgs.append(Image.open(path + address))

    return imgs, imagesList

PATH = "../data/unsorted/"
imgs, names = loadImages(PATH)

Path("../data/sorted_raw/non-spoilers/").mkdir(parents=True, exist_ok=True)
Path("../data/sorted_raw/spoilers/").mkdir(parents=True, exist_ok=True)

for i, img in enumerate(imgs):
    npImg = np.array(img)[:, :, ::-1]
    x = npImg.shape[1] * 2
    y = npImg.shape[0] * 2
    dim = x,y
    cv2img = cv2.resize(npImg, dim, interpolation=cv2.INTER_CUBIC)
    cv2.imshow('graycsale image', cv2img)
    cv2.waitKey(0)
    if (keyboard.is_pressed('y')):
        rename(PATH + names[i], "../data/sorted_raw/spoilers/" + names[i])
    elif (keyboard.is_pressed('n')):
        rename(PATH + names[i], "../data/sorted_raw/non-spoilers/" + names[i])
    elif (keyboard.is_pressed('q')):
        exit()