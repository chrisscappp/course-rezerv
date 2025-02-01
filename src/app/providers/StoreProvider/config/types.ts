import { AnyAction, CombinedState, Reducer, ReducersMapObject } from "@reduxjs/toolkit"
import { CounterSchema } from "@/entities/Counter"
import { UserSchema } from "@/entities/User"
import { LoginSchema } from "@/feautures/AuthByUsername"
import { RegisterSchema } from "@/feautures/RegisterByUsername"
import { EditableProfileSchema } from "@/feautures/EditableProfileCard"
import { AxiosInstance } from "axios"
import { ArticleDetailsSchema } from "@/entities/Article"
import { ArticleDetailsPageSchema } from "@/pages/ArticlesDetailsPage"
import { AddCommentFormSchema } from "@/feautures/AddCommentForm"
import { ArticlesPageSchema } from "@/pages/ArticlesPage"
import { ScrollRestoringSchema } from "@/widgets/ScrollRestoring"
import { rtkApi } from "@/shared/api/rtkApi"

export interface StateSchema {
  counter: CounterSchema;
  user: UserSchema;
  scroll: ScrollRestoringSchema;
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>

  // Async
  registerForm?: RegisterSchema;
  loginForm?: LoginSchema;
  editableProfile?: EditableProfileSchema;
  articleDetails?: ArticleDetailsSchema;
  addCommentForm?: AddCommentFormSchema;
  articlesPage?: ArticlesPageSchema;
  articleDetailsPage?: ArticleDetailsPageSchema
}

export type StateSchemaKey = keyof StateSchema
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>

export interface ReducerManagerType {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  getMountedReducers: () => MountedReducers;
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager {
	reducerManager: ReducerManagerType
}

export interface ThunkExtraArg {
	api: AxiosInstance
}

export interface ThunkConfig<T> {
	rejectValue: T,
	extra: ThunkExtraArg,
	state: StateSchema
} // тип для thunkAPI
