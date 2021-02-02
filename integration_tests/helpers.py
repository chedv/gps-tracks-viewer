import unittest
from typing import List

from selenium.webdriver.chrome.webdriver import WebDriver
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.remote.webelement import WebElement


class Helpers(unittest.TestCase):
    def __init__(self, driver: WebDriver) -> None:
        super().__init__()
        self.driver = driver

    def get_navigation_items(self) -> List[WebElement]:
        navigation_bar = self.driver.find_element_by_class_name('navbar')
        return navigation_bar.find_elements_by_tag_name('a')

    def get_navigation_item(self, name: str) -> WebElement:
        for nav_item in self.get_navigation_items():
            if nav_item.text == name:
                return nav_item
        raise ValueError('There is no item in the navbar by specified name')

    def has_navigation_item(self, name: str) -> bool:
        for nav_item in self.get_navigation_items():
            if nav_item.text == name:
                return True
        return False

    def check_navigation_bar(self, expected_items: List[str]):
        for nav_item in self.get_navigation_items():
            self.assertIn(nav_item.text, expected_items)

    def has_element(self, find_method: str, key: str) -> bool:
        try:
            getattr(self.driver, find_method)(key)
        except NoSuchElementException:
            return False
        return True

    def wait_until_selected_element(self, by: str, key: str, timeout: int) -> None:
        WebDriverWait(self.driver, timeout).until(ec.presence_of_element_located((by, key)))

    def wait_until_not_selected_element(self, by: str, key: str, timeout: int) -> None:
        WebDriverWait(self.driver, timeout).until_not(ec.presence_of_element_located((by, key)))

    def submit_form(self, input_values: List[str]) -> None:
        form_controls = self.driver.find_elements_by_class_name('form-control')
        self.assertEqual(len(form_controls), len(input_values))

        for i in range(len(form_controls)):
            form_controls[i].send_keys(input_values[i])

        self.driver.find_element_by_tag_name('button').click()

    def auth_action(self, navbar_name: str, tag_name: str, input_values: List[str]) -> None:
        self.get_navigation_item(navbar_name).click()
        self.wait_until_selected_element(By.TAG_NAME, key=tag_name, timeout=5)

        result = self.has_element(find_method='find_element_by_tag_name', key='form')
        self.assertTrue(result)

        self.submit_form(input_values)
        self.wait_until_not_selected_element(By.TAG_NAME, key=tag_name, timeout=5)
