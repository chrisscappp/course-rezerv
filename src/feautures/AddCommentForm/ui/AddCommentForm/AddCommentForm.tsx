import { memo, useCallback } from "react"
import cls from "./AddCommentForm.module.scss"
import { classNames } from "@/shared/lib/classNames/classNames";
import { Input } from "@/shared/ui/Input";
import { useTranslation } from "react-i18next";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import { DynamicModuleLoader, ReducersList } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { addCommentFormActions, addCommentFormReducer } from "../../model/slices/addCommentFormSlice";
import { useSelector } from "react-redux";
import { getAddCommentFormError, getAddCommentFormText } from "../../model/selectors/addCommentFormSelectors";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Text, TextTheme } from "@/shared/ui/Text";
import { HStack } from "@/shared/ui/Stack";

export interface AddCommentFormProps {
	className?: string;
	onSend: (text: string) => void;
}

const reducers: ReducersList = {
	addCommentForm: addCommentFormReducer
}

const AddCommentForm = memo((props: AddCommentFormProps) => {
	
	const {
		className,
		onSend
	} = props

	const { t } = useTranslation()
	const text = useSelector(getAddCommentFormText)
	const error = useSelector(getAddCommentFormError)
	const dispatch = useAppDispatch()

	const onChangeCommentText = useCallback((value: string) => {
		dispatch(addCommentFormActions.setText(value))
	}, [dispatch])

	const onSendHandler = useCallback(() => {
		onSend(text || "")
		dispatch(addCommentFormActions.setText(""))
	}, [dispatch, onSend, text])

	return (
		<DynamicModuleLoader reducers = {reducers} removeAfterUnmount>
			{error && <Text text = {error} theme = {TextTheme.ERROR}/>}
			<HStack justify="between" max className = {classNames(cls.AddCommentForm, {}, [className])}>
				<Input
					placeholder = {t("Введите текст комментария")}
					value = {text}
					onChange = {onChangeCommentText}
					className = {cls.input}
				/>
				<Button
					theme = {ButtonTheme.OUTLINE_INVERTED}
					onClick = {onSendHandler}
				>
					{t("Отправить")}
				</Button>
			</HStack>
		</DynamicModuleLoader>
	)
})

export default AddCommentForm