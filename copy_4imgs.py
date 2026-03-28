import shutil

src_dir = r"C:\Users\곰탈쌤\.gemini\antigravity\brain\a1f650ed-67ce-40a4-8120-7dfb8d027fd5"
dest_dir = r"c:\Users\곰탈쌤\안티그래비티\src\assets"

files = [
    ("media__1773797320206.jpg", "post_food_mandu.jpg"),
    ("media__1773797320238.jpg", "post_food_sumu.jpg"),
    ("media__1773797320304.jpg", "post_food_gugongtan.jpg"),
    ("media__1773797320316.jpg", "post_food_jokzakaya.jpg")
]

for src, dest in files:
    shutil.copy(f"{src_dir}\\{src}", f"{dest_dir}\\{dest}")
print("Done")
