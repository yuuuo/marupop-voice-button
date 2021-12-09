import React, { useCallback, useEffect, useRef, useState } from "react";
import { Howler } from "howler";

export const useAudioVisualizer = () => {
  const svg = useRef<SVGSVGElement>(null);
  const svgPath = useRef<SVGPathElement>(null);
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode>();
  const animation = useRef<number>();

  const audioVisualizerAnimation = useCallback(() => {
    if (
      svg.current == null ||
      svgPath.current == null ||
      analyserNode == null
    ) {
      return;
    }

    const freqs = new Uint8Array(analyserNode.frequencyBinCount);
    analyserNode.smoothingTimeConstant = 0.1;
    analyserNode.fftSize = 1024;
    analyserNode.getByteFrequencyData(freqs);
    const barWidth =
      (svg.current.width.baseVal.value * 1.5) / analyserNode.frequencyBinCount;
    let d = "M";
    freqs.forEach((_y, i: number) => {
      if (svg.current == null || svgPath.current == null) {
        return;
      }
      const x = i * barWidth;
      const value = freqs[i];
      const percent = value / 255;
      const yBase = i % 2 === 0 ? 1 : -1;
      const height =
        svg.current.height.baseVal.value / 2 +
        (svg.current.height.baseVal.value / 2) * percent * -1 * yBase;
      d += `${x} ${height},`;
    });
    svgPath.current.setAttribute("d", d);
    animation.current = requestAnimationFrame(audioVisualizerAnimation);
  }, [analyserNode]);

  const startAnimation = useCallback(() => {
    if (animation.current === undefined) {
      audioVisualizerAnimation();
    }
  }, [audioVisualizerAnimation]);

  const endAnimation = useCallback(() => {
    if (animation.current !== undefined) {
      svgPath.current?.removeAttribute("d");
      cancelAnimationFrame(animation.current);
      animation.current = undefined;
    }
  }, []);

  useEffect(() => {
    const analyserNode = Howler.ctx.createAnalyser();
    setAnalyserNode(analyserNode);
    Howler.masterGain.connect(analyserNode);
    analyserNode.connect(Howler.ctx.destination);
  }, []);

  const AudioVisualizer = useCallback(
    () => (
      <svg
        ref={svg}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        width="100%"
        height="100%"
      >
        <path ref={svgPath} stroke="#ffffff80" strokeWidth="0.5" fill="none" />
      </svg>
    ),
    []
  );

  return {
    AudioVisualizer,
    startAnimation,
    endAnimation,
  };
};
