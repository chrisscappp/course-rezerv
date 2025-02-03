import { memo, useState } from "react"
import cls from "./StarRating.module.scss"
import { classNames } from "@/shared/lib/classNames/classNames"
import { Icon } from "../Icon/Icon"
import StarIcon from "../../assets/icons/star-64-64.svg"

interface StarRatingProps {
	className?: string,
	onSelect?: (starsCount: number) => void,
	size?: number,
	selectedStars?: number
}

const stars = [1, 2, 3, 4, 5]

export const StarRating = memo((props: StarRatingProps) => {

	const { className, onSelect, selectedStars = 0, size = 30 } = props

	const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars)
	const [isSelected, setIsSelected] = useState(Boolean(selectedStars))

	const onHover = (starsCount: number) => () => {
		if (!isSelected) {
			setCurrentStarsCount(starsCount)
		}
	} // если звёзды не выбраны, то можем их установить. перерисовки на каждое изменение

	const onLeave = () => {
		if (!isSelected) {
			setCurrentStarsCount(0)
		}
	}

	const onClick = () => {
		if (!isSelected) {
			onSelect?.(currentStarsCount)
			setIsSelected(true)
		}
	}

	return (
		<div className={classNames(cls.StarRating, {}, [className])}>
			{stars.map(starNumber => (
				<Icon 
					className={classNames(cls.starIcon, {
						[currentStarsCount >= starNumber ? cls.hovered : cls.normal]: true,
						[cls.selected]: isSelected
					}, [])}
					Svg={StarIcon} 
					key={starNumber}
					width={size}
					height={size}
					onMouseLeave={onLeave}
					onMouseEnter={onHover(starNumber)}
					onClick={onClick}
				/>
			))}
		</div>
	)
})