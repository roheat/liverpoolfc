import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../resources/images/logos/liverpoolfc_logo.png'; 
import liverbird from '../../resources/images/logos/liverbird_white.png';

export const LiverpoolLogo = (props) => {
	const template = (
		<div 
			className="img_cover"
			style={{
				width: props.width,
				height: props.height,
				background: `url(${logo}) no-repeat`
			}}
		></div>
	);

	if(props.link) {
		return (
			<Link to={props.linkTo} className="link_logo">
				{template}
			</Link>
		);
	} else {
		return template;
	}
};

export const LiverBird = (props) => {
	return (
		<div
			className="img_cover"
			style={{
				width: props.width,
				height: props.height,
				background: `url(${liverbird})`
			}}
		></div>
	);
};