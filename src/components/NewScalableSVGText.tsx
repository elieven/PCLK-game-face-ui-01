import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

type BBox = { x: number; y: number; width: number; height: number };

// round the values to prevent slight pixel shifting when rasterized
const makeViewBox = (bbox: BBox) => {
  const { x, y, width, height } = bbox;
  return [x, y, width, height].map(Math.round).join(' ');
};

interface Props {
  text: string;
  className?: string;
}

const ScalableSVGText = ({ text, className }: Props) => {
  const ref = useRef<null | SVGSVGElement>(null);

  // before mount the bbox is not yet known so state is neeedd
  // to rerender it on mount and bbox calculation
  const [bbox, setbbox] = useState<null | BBox>(null);

  // on mount & every time the text changes calculate the bbox
  useEffect(() => {
    if (ref.current) {
      setbbox(ref.current.getBBox());
    }
  }, [text]);

  return (
    <svg
      ref={ref}
      width="100%"
      height="100%"
      viewBox={bbox ? makeViewBox(bbox) : ''}
      className={clsx(className)}
    >
      <text>{text}</text>
    </svg>
  );
};

export default ScalableSVGText;
