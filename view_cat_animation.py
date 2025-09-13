import webbrowser
from pathlib import Path

# Open the cat animation HTML file in the default web browser
html_path = Path(__file__).with_name("cat_animation.html")
webbrowser.open(html_path.resolve().as_uri())
