import React from 'react';
import carImage from './../assets/car.svg';

const fragment = document.createElement('div');
fragment.innerHTML = carImage;
const svgElement = fragment.querySelector('svg');
const svgData = svgElement.innerHTML || '';

export default function CarImage(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg width={svgElement.getAttribute('width')}
        height={svgElement.getAttribute('height')}
        viewBox={svgElement.getAttribute('viewBox')}
        preserveAspectRatio={svgElement.getAttribute('preserveAspectRatio')}
        {...props} dangerouslySetInnerHTML={{__html: svgData}}>
            
        </svg>
    )
}