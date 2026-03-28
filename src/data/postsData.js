import { postsMokpo } from './postsMokpo.js';
import { postsShinan } from './postsShinan.js';
import { postsHaenam } from './postsHaenam.js';
import { postsWando } from './postsWando.js';
import { postsJindo } from './postsJindo.js';
import { postsMain } from './postsMain.js';

const POST_DATA = {
  ...postsMokpo,
  ...postsShinan,
  ...postsHaenam,
  ...postsWando,
  ...postsJindo,
  ...postsMain,
};

export default POST_DATA;
