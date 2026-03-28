import shutil
import os

src = r"C:\Users\곰탈쌤\.gemini\antigravity\brain\tempmediaStorage\media__1773935230319.jpg"
dst = r"C:\Users\곰탈쌤\안티그래비티\public\images\media__1773935230319.jpg"

try:
    shutil.copy2(src, dst)
    print("Success")
except Exception as e:
    print(f"Failed: {e}")
