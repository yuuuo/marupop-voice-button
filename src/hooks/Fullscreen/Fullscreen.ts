import { useCallback, useEffect, useState } from "react";

export type FullscreenOutput = {
  isFullscreen: boolean;
  toggle: () => void;
};

export const useFullscreen = (): FullscreenOutput => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const handleFullscreenChange = useCallback(() => {
    setIsFullscreen(!!document.fullscreenElement);
  }, []);

  useEffect(() => {
    document.addEventListener(
      "fullscreenchange",
      handleFullscreenChange,
      false
    );
  }, [handleFullscreenChange]);

  const toggle = useCallback(() => {
    isFullscreen
      ? document.exitFullscreen()
      : document.body.requestFullscreen();
  }, [isFullscreen]);

  return { isFullscreen, toggle };
};
