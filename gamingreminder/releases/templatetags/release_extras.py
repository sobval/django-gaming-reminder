import json
import time
import datetime
from django import template

register = template.Library()


# Write your template tags here


@register.filter('timestamp_to_time')
def convert_timestamp_to_time(timestamp):
    return datetime.date.fromtimestamp(int(timestamp))