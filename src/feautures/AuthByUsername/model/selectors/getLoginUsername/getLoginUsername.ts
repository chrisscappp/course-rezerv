import { StateSchema } from "@/app/providers/StoreProvider/index";

export const getLoginUsername = (state: StateSchema) => state?.loginForm?.username || ""