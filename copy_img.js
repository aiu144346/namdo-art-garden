const fs = require('fs');
try {
  fs.copyFileSync(
    'C:/Users/곰탈쌤/.gemini/antigravity/brain/tempmediaStorage/media__1773935230319.jpg',
    'C:/Users/곰탈쌤/안티그래비티/public/images/media__1773935230319.jpg'
  );
  console.log("Success");
} catch(e) {
  console.error("Failed:", e);
}
