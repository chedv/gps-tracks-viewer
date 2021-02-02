import unittest

from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait

from integration_tests.config import Config
from integration_tests.helpers import Helpers


class TestAuthComponent(unittest.TestCase):
    def setUp(self) -> None:
        self.driver = webdriver.Chrome(executable_path=Config.DRIVER_PATH)
        self.helpers = Helpers(self.driver)

    def test_success_auth_actions(self) -> None:
        self.driver.get(Config.APP_URL)
        self.assertEqual(self.driver.title, 'GpsTracksViewer')

        self.helpers.check_navigation_bar(expected_items=['Login', 'Register'])

        register_values = ['example123@gmail.com', 'Name', 'Surname', 'Qwerty123', 'Qwerty123']
        self.helpers.auth_action(navbar_name='Register', tag_name='app-register', input_values=register_values)

        login_values = ['example123@gmail.com', 'Qwerty123']
        self.helpers.auth_action(navbar_name='Login', tag_name='app-login', input_values=login_values)

        self.helpers.check_navigation_bar(expected_items=['Logout', 'Devices'])

        self.helpers.get_navigation_item('Logout').click()
        WebDriverWait(self.driver, 5).until(lambda wd: self.helpers.has_navigation_item('Login'))

        self.driver.close()
