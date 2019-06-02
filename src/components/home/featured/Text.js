import React from 'react';
import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';

import { LiverBird } from '../../ui/icons';
import FeaturedPlayer from '../../../resources/images/featured_player.png';

class Text extends React.Component {
	
	animateIcon = () => (
		<Animate
			show={true}
			start={{
				opacity: 0,
				rotate: 0
			}}
			enter={{
				opacity: [1],
				rotate: [360],
				timing: {delay: 250 }
			}}
		>
			{({opacity, rotate}) => {
				return (
					<div 
						className="featured_icon"
						style={{
							opacity,
							transform: `translate(370px, 170px) rotateY(${rotate}deg)`
						}}
					>
						<LiverBird
							width="100px"
							height="150px"
						/>

					</div>	
				)
			}}
		</Animate>
	)

	animateHeading = () => (
		<Animate
			show={true}
			start={{
				opacity: 0,
				x: 700,
				y: 330
			}}
			enter={{
				opacity: [1],
				x: [370],
				y: [330],
				timing: {delay: 500, duration: 1000, ease: easePolyOut}
			}}
		>
			{({opacity, x, y}) => {
				return (
					<div 
						className="featured_heading"
						style={{
							opacity,
							transform: `translate(${x}px, ${y}px)`
						}}
					>
						Liverpool FC
					</div>
				)
			}}
		</Animate>
	)

	animateFirst = () => (
		<Animate
			show={true}
			start={{
				opacity: 0,
				x: 700,
				y: 500
			}}
			enter={{
				opacity: [1],
				x: [370],
				y: [500],
				timing: {delay: 500, duration: 1000, ease: easePolyOut}
			}}
		>
			{({opacity, x, y}) => {
				return (
					<div 
						className="featured_first"
						style={{
							opacity,
							transform: `translate(${x}px, ${y}px)`
						}}
					>
						You'll Never Walk Alone
					</div>
				)
			}}
		</Animate>
	)

	animatePlayer = () => (
		<Animate
			show={true}
			start={{
				opacity: 0
			}}
			enter={{
				opacity: [1],
				timing: {delay: 750}
			}}
		>
			{({opacity, x, y}) => {
				return (
					<div 
						className="featured_player"
						style={{
							opacity,
							background: `url(${FeaturedPlayer})`,
							transform: 'translate(650px, 130px)'
						}}
					>
					</div>
				)
			}}
		</Animate>
	)

	render() {
		return (
			<div className="featured_text">
				{this.animatePlayer()}
				{this.animateIcon()}
				{this.animateHeading()}
				{this.animateFirst()}
			</div>
		);
	}
}

export default Text;