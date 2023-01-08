import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
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
    </div>
  );
};

export default function App() {
  return <PokerGameFace />;
}
