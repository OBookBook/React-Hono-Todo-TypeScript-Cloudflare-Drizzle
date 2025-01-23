import { handlers } from "./handlers";
import { setupServer } from "msw/node";

export const APIServer = setupServer(...handlers); // モックサーバーを起動
