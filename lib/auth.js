// 管理画面の認証に使う値。実際の値は環境変数から読み込む。
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
export const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET;

// セッションを保持する Cookie 名
export const COOKIE_NAME = "admin_session";
