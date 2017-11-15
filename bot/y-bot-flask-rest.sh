#! /bin/sh

clear

export PYTHONPATH=./src:../program-y/src:../bot-chan/libs/MetOffer-1.3.2:.

python3 ../program-y/src/programy/clients/flaskrest.py --config ./config.yaml --cformat yaml --logging ./logging.yaml

