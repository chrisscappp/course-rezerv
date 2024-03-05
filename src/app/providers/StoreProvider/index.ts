import { StoreProvider } from "./ui/StoreProvider";
import { createReduxStore } from "./config/store";
import type { StateSchema, ReduxStoreWithManager, StateSchemaKey } from "./config/types";

export {  
	StoreProvider,
	createReduxStore,
	StateSchema, // импорт типов из вышестоящего слоя - исключение
	ReduxStoreWithManager,
	StateSchemaKey
}