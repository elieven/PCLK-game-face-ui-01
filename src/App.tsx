import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {
  PlusSmallIcon,
  MinusSmallIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon,
  PlayIcon
} from '@heroicons/react/24/outline';
import './styles.css';

import ScalableSVGText from './components/NewScalableSVGText';

dayjs.extend(duration);

const compactFormat = (n: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 2
  });
  return formatter.format(n);
};

const areaContent = {
  title: {
    label: 'Title',
    text: 'JOKER 60.000 GTD Final'
  },
  left: {
    label: 'Left',
    text: '15'
  },
  total: {
    label: 'Total',
    text: '985'
  },
  level: {
    label: 'Level',
    text: '38'
  },
  blind: {
    label: 'Blind',
    text: '150.000/300.000'
  },
  ante: {
    label: 'Ante',
    text: '300.000'
  },
  currentTime: {
    label: 'Current time',
    text: '04:03:08'
  },
  unique: {
    label: 'Unique',
    text: '428'
  },
  reentries: {
    label: 'Re-entries',
    text: '557'
  },
  nextLevel: {
    label: 'Next level',
    text: 'BREAK'
  },
  nextBlind: {
    label: 'Next blind',
    text: `${compactFormat(350000)}/${compactFormat(1280000)}`
  },
  nextAnte: {
    label: 'Next ante',
    text: '400K'
  },
  elapsedTime: {
    label: 'Elapsed time',
    text: '12:43:25'
  },
  payouts: {
    label: 'Payouts',
    text: 'payouts'
  },
  remainingRoundTime: {
    label: 'Remaining round time',
    text: '16:35'
  },
  nextBreak: {
    label: 'Next break',
    text: '02:46:35'
  },
  avgStack: {
    label: 'Avg. stack',
    text: '8.796.667'
  },
  totalChips: {
    label: 'Total chips',
    text: '131.950.000'
  }
};

// make controls and perhaps title also separate from teh rest of stats
// since at least the controls do not scale in any way at all and will
// always require the amount of space that they do

const Stat = ({ label, value }: { label?: string; value: string }) => {
  return (
    <div className="flex flex-col items-center bg-pink-200 w-full h-full">
      {label ? (
        <div className="text-center uppercase text-sm font-bold bg-blue-200 lg:text-base 2xl:text-xl">
          {label}
        </div>
      ) : null}
      <div className="bg-green-200 w-full h-full relative">
        <ScalableSVGText
          text={value}
          className="absolute bg-green-200 inset-0 w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

// temporary implementation to save my fingers
const StatCell = ({
  stat,
  children
}: {
  stat: string;
  children: React.ReactNode;
}) => {
  return (
    <div style={{ gridArea: stat }} className="flex flex-col items-center">
      {children}
    </div>
  );
};

const getftime = () => dayjs(new Date().toISOString()).format('hh:mm:ss');

const CurrentTimeIndicator = () => {
  const [time, setTime] = useState(getftime());

  useEffect(() => {
    const interval = setInterval(() => setTime(getftime()));
    return () => clearInterval(interval);
  }, []);

  return <Stat label={areaContent.currentTime.label} value={time} />;
};

//
//
//

const BottomControls = () => {
  return (
    <div className="flex justify-center divide-x">
      {/* Players section */}
      <section className="flex space-x-6 px-6">
        <div className="flex flex-col items-center space-y-1">
          <span>Unique</span>
          <div className="flex space-x-2">
            <button className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
              <MinusSmallIcon className="w-6 h-6" />
            </button>
            <button className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
              <PlusSmallIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <span>Active</span>
          <div className="flex space-x-2">
            <button className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
              <MinusSmallIcon className="w-6 h-6" />
            </button>
            <button className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
              <PlusSmallIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>
      {/* Entries section */}
      <section className="flex space-x-6 px-6">
        <div className="flex flex-col items-center space-y-1">
          <span>Buyin</span>
          <div className="flex space-x-2">
            <button className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
              <MinusSmallIcon className="w-6 h-6" />
            </button>
            <button className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
              <PlusSmallIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <span>Rebuy</span>
          <div className="flex space-x-2">
            <button className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
              <MinusSmallIcon className="w-6 h-6" />
            </button>
            <button className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
              <PlusSmallIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <span>Addon</span>
          <div className="flex space-x-2">
            <button className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
              <MinusSmallIcon className="w-6 h-6" />
            </button>
            <button className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
              <PlusSmallIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <span>Average</span>
          <div className="flex space-x-2">
            <button className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
              <MinusSmallIcon className="w-6 h-6" />
            </button>
            <button className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
              <PlusSmallIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>
      {/* Aditional controls section */}
      <section className="flex space-x-6 px-6">
        <div className="flex flex-col items-center space-y-1">
          <span>Start</span>
          <div className="flex space-x-2">
            <button className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
              <PlayIcon className="w-6 h-6 relative transform translate-x-px" />
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <span>Edit</span>
          <div className="flex space-x-2">
            <button className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
              <AdjustmentsHorizontalIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <span>End</span>
          <div className="flex space-x-2">
            <button className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

//
//
//

// payouts could be done as {spot, count, percent} where a spot would have the
// percentage of the chips att he end of the game divided equally between count
// players. So 1/1/35 would give 35% of the reward to the 1st spot / place
// winner/s up to the count of 1. So the #1 player would get 35% of the reward.
// 2/3/22 would for example give 22% of the reward equally divided among the 3
// people in the 2nd spot so after the 1 person in the #1 spot the next 3 players
// would get an equal share of the 22%.
const PayoutsDisplay = ({
  payouts = [
    { spot: 1, percentage: 35 },
    { spot: 2, percentage: 22 },
    { spot: 3, percentage: 15 },
    { spot: 4, percentage: 11 },
    { spot: 5, percentage: 9 },
    { spot: 6, percentage: 8 }
  ]
}: {
  payouts?: { spot: number; percentage: number }[];
}) => {
  return (
    <ul className="grid h-full w-full gap-2">
      {payouts.slice(0).map(({ spot, percentage }) => {
        return (
          <li className="bg-red-200 relative" key={spot}>
            <div className="absolute inset-0 w-full h-full flex justify-between">
              <ScalableSVGText
                text={`${spot}`}
                className="h-full bg-yellow-200"
              />
              <ScalableSVGText
                text={percentage.toFixed(2) + '%'}
                className="h-full bg-yellow-200"
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

const PokerGameFace = () => {
  return (
    <div className="h-screen flex flex-col p-4 space-y-4 font-bold">
      <div className="grid poker-grid gap-4 h-full">
        {Object.entries(areaContent).map(([key, value]) => {
          switch (key) {
            case 'title': {
              return (
                <StatCell stat={key} key={key}>
                  <Stat value={value.text} />
                </StatCell>
              );
            }
            case 'currentTime': {
              return (
                <StatCell stat={key} key={key}>
                  <CurrentTimeIndicator />
                </StatCell>
              );
            }
            case 'payouts': {
              return (
                <StatCell stat={key} key={key}>
                  <div className="text-center uppercase text-sm font-bold bg-blue-200 lg:text-base 2xl:text-xl">
                    Payouts
                  </div>
                  <PayoutsDisplay />
                </StatCell>
              );
            }
            default: {
              return (
                <StatCell stat={key} key={key}>
                  <Stat label={value.label} value={value.text} />
                </StatCell>
              );
            }
          }
        })}
      </div>
      <BottomControls />
    </div>
  );
};

export default function App() {
  return <PokerGameFace />;
}
