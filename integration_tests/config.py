import os


class Config:
    APP_URL = os.environ.get('APP_URL')
    DRIVER_PATH = os.environ.get('DRIVER_PATH')
