import { Promise as RsvpPromise } from 'rsvp';
import * as assign from 'object-assign';

type HistoryEvent = {
  key: string;
  time: number;
  eventType: string;
};
const eventHistory: HistoryEvent[] = [];
const promises: Promise<void>[] = [];
const consoleWidth = 80;

export function executeTask(key: string, ms: number, fail?: boolean) {
  eventHistory.push({
    key,
    eventType: 'start',
    time: Date.now(),
  });
  const result = new RsvpPromise<void>((resolve, reject) => {
    setTimeout(() => {
      eventHistory.push({
        key,
        eventType: fail ? 'fail' : 'end',
        time: Date.now(),
      });
      (fail ? reject : resolve)();
    }, ms);
  });

  promises.push(result.then(() => null, () => null));
  return result;
}

export class Promise<T, K=any> {
  public static all = RsvpPromise.all;

  constructor(name: string, executor: (resolve: (arg: T) => void, reject: (arg: K) => void) => void) {
    const actualPromise = new RsvpPromise((a, b) => {
      eventHistory.push({
        key: name,
        eventType: 'start',
        time: Date.now(),
      });
      executor(a, b);
    });
    promises.push(actualPromise.then(
      () => {
        eventHistory.push({
          key: name,
          eventType: 'end',
          time: Date.now(),
        });
      }, () => {
        eventHistory.push({
          key: name,
          eventType: 'fail',
          time: Date.now(),
        });
      }
    ));

    return actualPromise;
  }
}

function findLongestKey(events: HistoryEvent[]) {
  return events.reduce((longestLength, nextEvent) => {
    return longestLength > nextEvent.key.length ? longestLength : nextEvent.key.length;
  }, 0);
}

function findMaxTime(events: HistoryEvent[]): number {
  return events.reduce((maxTime, nextEvent) => {
    return maxTime > nextEvent.time ? maxTime : nextEvent.time;
  }, 0);
}

function findMinTime(events: HistoryEvent[]): number {
  return events.reduce((minTime, nextEvent) => {
    return minTime < nextEvent.time ? minTime : nextEvent.time;
  }, 9999999999999999999999999999999999);
}

function translateEventInTime(events: HistoryEvent[], minTime: number) {
  return events.map(event => assign({}, event, {
    time: event.time - minTime,
  }));
}

function pad(str: string, length: number, paddingChar: string = ' ') {
  return str.length >= length ? str : pad(str + paddingChar, length, paddingChar);
}

function renderStart(startEvent: HistoryEvent, timeQuantum: number) {
  const padNumber = Math.floor(startEvent.time / timeQuantum);
  return `${pad('', padNumber)}`;
}

function renderRun(startEvent: HistoryEvent, finishEvent: HistoryEvent | undefined, timeQuantum: number) {
  if (!finishEvent) {
    return '...';
  }
  const padNumber = Math.floor((finishEvent.time - startEvent.time) / timeQuantum);
  if (padNumber <= 0) {
    return finishEvent.eventType === 'end' ? '|' : 'X';
  }
  //console.log(startEvent, finishEvent, timeQuantum, padNumber);
  return `|${pad('', padNumber - 1, '-')}${finishEvent.eventType === 'end' ? '|' : 'X'}`;
}

function renderPromiseTime(startEvent: HistoryEvent, finishEvent: HistoryEvent | undefined, timeQuantum: number, maxNameLength: number) {
  console.log(`${pad(startEvent.key, maxNameLength)}:${renderStart(startEvent, timeQuantum)}${renderRun(startEvent, finishEvent, timeQuantum)}`);
}

function finish() {
  setTimeout(() => {
    const minTime = findMinTime(eventHistory);
    const translatedEventHistory = translateEventInTime(eventHistory, minTime);
    const maxTime = findMaxTime(translatedEventHistory);
    const longestNameLength = findLongestKey(translatedEventHistory);
    const timeScale = consoleWidth - 1 - longestNameLength;
    const timeQuantum = maxTime / timeScale;

    const startEvents = translatedEventHistory.filter(event => event.eventType === 'start').sort((a, b) => a.time - b.time);

    startEvents.forEach(
      startEvent =>
        renderPromiseTime(
          startEvent,
          translatedEventHistory.find(event => (event.eventType !== 'start') && (event.key === startEvent.key)),
          timeQuantum,
          longestNameLength
        )
    );
    //console.log({longestNameLength, maxTime, minTime, timeScale, timeQuantum, translatedEventHistory});
  }, 1000)
}


finish();

