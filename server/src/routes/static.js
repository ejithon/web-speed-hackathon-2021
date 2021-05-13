import history from 'connect-history-api-fallback';
import Router from 'express-promise-router';
import serveStatic from 'serve-static';
import expressStaticGzip from 'express-static-gzip';

import { PUBLIC_PATH, CLIENT_DIST_PATH, UPLOAD_PATH } from '../paths';

const router = Router();

// SPA 対応のため、ファイルが存在しないときに index.html を返す
router.use(history());

router.use(
  expressStaticGzip(UPLOAD_PATH, {
    etag: false,
    lastModified: false,
    enableBrotli: true,
  }),
);

router.use(
  expressStaticGzip(PUBLIC_PATH, {
    etag: false,
    lastModified: false,
    enableBrotli: true,
  }),
);

router.use(
  expressStaticGzip(CLIENT_DIST_PATH, {
    etag: false,
    lastModified: false,
    enableBrotli: true,
  }),
);

export { router as staticRouter };
