import { StoreProvider } from "./ui/StoreProvider";
import { createReduxStore, AppDispatch } from "./config/store";
import type { StateSchema, ReduxStoreWithManager, StateSchemaKey, ThunkExtraArg, ThunkConfig } from "./config/types";

export {  
	StoreProvider,
	createReduxStore
}

export type { 
	AppDispatch,
	StateSchema, // импорт типов из вышестоящего слоя - исключение
	ReduxStoreWithManager,
	StateSchemaKey,
	ThunkExtraArg,
	ThunkConfig
}