import os
from dotenv import load_dotenv

load_dotenv()
print(os.getenv("IMAGEKIT_PUBLIC_KEY"))
print(os.getenv("IMAGEKIT_PRIVATE_KEY"))