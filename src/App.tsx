import './styles.css';
import ScalableSVGText from './components/NewScalableSVGText';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

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

const StatControl = ({ name }: { name: string }) => {
  const btnClassName =
    'bg-blue-500 w-8 h-8 font-bold flex items-center justify-center rounded-full text-white';
  return (
    <div className="flex flex-col items-center space-y-2">
      <span className="font-bold">{name}</span>
      <div className="flex space-x-2">
        <button className={btnClassName}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
          </svg>
        </button>
        <button className={btnClassName}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m6-6H6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

const CurrentTimeIndicator = () => {
  const [time, setTime] = useState(
    dayjs(new Date().toISOString()).format('hh:mm:ss')
  );
  useEffect(() => {
    const interval = setInterval(() =>
      setTime(dayjs(new Date().toISOString()).format('hh:mm:ss'))
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <ScalableSVGText
      text={time}
      className="absolute bg-green-200 inset-0 w-full h-full object-contain"
    />
  );
};

const RemainingRoundTimeIndicator = () => {
  const [time, setTime] = useState(
    dayjs(new Date().toISOString()).format('mm:ss')
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs(new Date().toISOString()).format('mm:ss'));
    });
    return () => clearInterval(interval);
  }, []);

  return (
    <ScalableSVGText
      text={time}
      className="absolute bg-green-200 inset-0 w-full h-full object-contain"
    />
  );
};

const ControlsPanel = () => {
  return (
    <div className="hidden bg-red-200 flex items-center justify-center divide-x divide-red-600">
      <section id="players-control" className="flex space-x-6 px-6">
        <StatControl name="Unique" />
        <StatControl name="Active" />
      </section>
      <section
        id="entry-option-used-count-control"
        className="flex space-x-6 px-6"
      >
        <StatControl name="Buyin" />
        <StatControl name="Rebuy" />
        <StatControl name="Addon" />
      </section>
      <section id="level-control" className="flex space-x-6 px-6">
        <StatControl name="Round" />
      </section>
      <section className="flex space-x-6 px-6">
        <div className="flex flex-col items-center space-y-2">
          <div className="font-bold">Edit</div>
          <button className="bg-blue-500 w-8 h-8 font-bold flex items-center justify-center rounded-full text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="font-bold">End</div>
          <button className="bg-blue-500 w-8 h-8 font-bold flex items-center justify-center rounded-full text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
};

const PokerGameFace = () => {
  return (
    <div className="h-screen flex flex-col p-4 space-y-4 font-bold">
      <div className="grid poker-grid gap-4 h-full">
        {Object.entries(areaContent).map(([key, value]) => (
          <div
            key={key}
            style={{ gridArea: key }}
            className="flex flex-col items-center"
          >
            {key === 'title' ? null : (
              <div className="text-center uppercase text-sm font-bold bg-blue-200 lg:text-base 2xl:text-xl">
                {value.label}
              </div>
            )}
            <div className="bg-green-200 w-full h-full relative">
              {key === 'currentTime' ? (
                <CurrentTimeIndicator />
              ) : key === 'remainingRoundTime' ? (
                <RemainingRoundTimeIndicator />
              ) : (
                <ScalableSVGText
                  text={value.text}
                  className="absolute bg-green-200 inset-0 w-full h-full object-contain"
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <ControlsPanel />
    </div>
  );
};

export default function App() {
  return <PokerGameFace />;
}
