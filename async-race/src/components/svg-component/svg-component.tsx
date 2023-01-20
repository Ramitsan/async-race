import React from 'react';
import carImage from './../../assets/car.svg';
import flagImage from './../../assets/flag.svg';

function createSvgComponent(svgText: string) {
  const fragment = document.createElement('div');
  fragment.innerHTML = svgText;
  const svgElement = fragment.querySelector('svg');
  const svgData = svgElement.innerHTML || '';

  return function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg width={svgElement.getAttribute('width')}
        height={svgElement.getAttribute('height')}
        viewBox={svgElement.getAttribute('viewBox')}
        preserveAspectRatio={svgElement.getAttribute('preserveAspectRatio')}
        {...props} dangerouslySetInnerHTML={{ __html: svgData }}>
      </svg>
    )
  }
}
export const CarImage = createSvgComponent(carImage);
export const FlagImage = createSvgComponent(flagImage);