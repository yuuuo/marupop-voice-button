import { Howl, HowlCallback, HowlErrorCallback, HowlOptions } from "howler";
import { useCallback, useState } from "react";

export type AudioOutput = {
  play: (spriteOrId?: string | number | undefined) => number;
  stop: (id?: number | undefined) => void;
  volume: (idOrSetVolume: number) => void;
  addEvent: (
    event: string,
    callback: HowlCallback | HowlErrorCallback,
    id?: number
  ) => void;
  removeEvent: (
    event: string,
    callback?: HowlCallback | HowlErrorCallback,
    id?: number
  ) => void;
};

export const useAudio = (options: HowlOptions): AudioOutput => {
  const [audio] = useState<Howl>(new Howl(options));

  const play = useCallback(
    (spriteOrId?: string | number) => {
      return audio.play(spriteOrId);
    },
    [audio]
  );

  const stop = useCallback(
    (id?: number) => {
      audio.stop(id);
    },
    [audio]
  );

  const volume = useCallback(
    (idOrSetVolume: number) => {
      audio.volume(idOrSetVolume);
    },
    [audio]
  );

  const addEvent = useCallback(
    (
      event: string,
      callback: HowlCallback | HowlErrorCallback,
      id?: number
    ): void => {
      audio.on(event, callback, id);
    },
    [audio]
  );

  const removeEvent = useCallback(
    (
      event: string,
      callback?: HowlCallback | HowlErrorCallback,
      id?: number
    ): void => {
      audio.off(event, callback, id);
    },
    [audio]
  );

  return { play, stop, volume, addEvent, removeEvent };
};
