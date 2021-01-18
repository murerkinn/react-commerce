import React, { FC } from 'react'

const createStars = (val: number, color: string | undefined) => {
  let stars = []

  for (let i = 1; i < 6; ++i) {
    stars.push(
      <span key={i}>
        <i
          style={{ color }}
          className={val >= i ? 'fas fa-star' : val >= i - 0.5 ? 'fas fa-star-half-alt' : 'far fa-star'}
        ></i>
      </span>
    )
  }

  return stars
}

const Rating: FC<IProps> = ({ value, text, color }) => {
  return (
    <div className="rating">
      {createStars(value, color)}
      <span>{text}</span>
    </div>
  )
}

interface IProps {
  value: number
  text: string
  color?: string
}

Rating.defaultProps = {
  color: '#f8e825',
}

export default Rating
