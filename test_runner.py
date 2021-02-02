from unittest import TestLoader, TextTestRunner


if __name__ == '__main__':
    test_suite = TestLoader().discover('integration_tests', 'test_*.py')
    TextTestRunner().run(test_suite)
