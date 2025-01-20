import { StoreProvider } from "./ui/StoreProvider";
import { createReduxStore, AppDispatch } from "./config/store";
import type { StateSchema, ReduxStoreWithManager, StateSchemaKey, ThunkExtraArg, ThunkConfig } from "./config/types";

export {  
	StoreProvider,
	createReduxStore,
	StateSchema, // импорт типов из вышестоящего слоя - исключение
	ReduxStoreWithManager,
	StateSchemaKey,
	ThunkExtraArg,
	ThunkConfig
}

export type { AppDispatch }