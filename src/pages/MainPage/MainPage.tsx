import { useCallback, useEffect, memo, useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import {
  MdFullscreen as Fullscreen,
  MdFullscreenExit as FullscreenExit,
} from "react-icons/md";
import { useAudio } from "~/hooks/Audio";
import { useAudioVisualizer } from "~/hooks/AudioVisualizer";
import { useFullscreen } from "~/hooks/Fullscreen";
// Assets
import background from "~/assets/images/marupop.jpg";
import ogg from "~/assets/sounds/voice.ogg";
import m4a from "~/assets/sounds/voice.m4a";
import mp3 from "~/assets/sounds/voice.mp3";
import ac3 from "~/assets/sounds/voice.ac3";
import { ActionButtonContainer } from "./ActionButtonContainer";
import { VolumeSlider } from "./VolumeSlider";
import { VoiceButtonContainer, VoiceType } from "./VoiceButtonContainer";

export const MainPage: React.VFC = memo((): JSX.Element => {
  /*****************************
   * Hooks
   *****************************/
  const [playAllList, setPlayAllList] = useState<string[]>([]);
  const [playLoopList, setPlayLoopList] = useState<string[]>([]);
  const [volumeValue, setVolumeValue] = useState<number>(50);
  const [playingIdList, setPlaingIdList] = useState<number[]>([]);
  const [playingAllIdList, setPlaingAllIdList] = useState<number[]>([]);
  const [playingLoopIdList, setPlaingLoopIdList] = useState<number[]>([]);
  const [isLoop, setIsLoop] = useState<boolean>(false);
  const [isAll, setIsAll] = useState<boolean>(false);
  const [renderOrder, setRenderOrder] = useState<VoiceType[]>([
    "sankaku",
    "shikaku",
    "maru",
    "pop",
    "desu",
  ]);

  const { isFullscreen, toggle } = useFullscreen();
  const { play, volume, addEvent, removeEvent } = useAudio({
    src: [ogg, m4a, mp3, ac3],
    sprite: {
      desu: [0, 417.82312925170066],
      maru: [2000, 328.32199546485265],
      pop: [4000, 466.96145124716537],
      sankaku: [6000, 696.3718820861677],
      shikaku: [8000, 721.4285714285716],
    },
    volume: 50 / 100,
  });
  const { AudioVisualizer, startAnimation, endAnimation } =
    useAudioVisualizer();

  /*****************************
   * Buttons
   *****************************/
  const playAudio = useCallback(
    (id: string) => {
      const playId = play(id);
      setPlaingIdList((prev) => [playId, ...prev]);
      startAnimation();
    },
    [play, startAnimation]
  );
  const playAllAudio = useCallback(
    (id: string) => {
      const playId = play(id);
      setPlaingAllIdList((prev) => [playId, ...prev]);
      startAnimation();
    },
    [play, startAnimation]
  );
  const playLoopAudio = useCallback(
    (id: string) => {
      const playId = play(id);
      setPlaingLoopIdList((prev) => [playId, ...prev]);
      startAnimation();
    },
    [play, startAnimation]
  );
  const handleFullscreenClick = useCallback(() => {
    toggle();
  }, [toggle]);
  const handleSankakuClick = useCallback(() => {
    playAudio("sankaku");
  }, [playAudio]);
  const handleShikakuClick = useCallback(() => {
    playAudio("shikaku");
  }, [playAudio]);
  const handleMaruClick = useCallback(() => {
    playAudio("maru");
  }, [playAudio]);
  const handlePopClick = useCallback(() => {
    playAudio("pop");
  }, [playAudio]);
  const handleDesuClick = useCallback(() => {
    playAudio("desu");
  }, [playAudio]);
  const handlePlayClick = useCallback(() => {
    setIsAll(true);
    setIsLoop(false);
    const [first, ...others] = renderOrder;
    setPlayAllList(others);
    setPlayLoopList([]);
    playAllAudio(first);
  }, [playAllAudio, renderOrder]);
  const handleLoopClick = useCallback(() => {
    setIsLoop(true);
    setIsAll(false);
    const [first, ...others] = renderOrder;
    setPlayLoopList(others);
    setPlayAllList([]);
    playLoopAudio(first);
  }, [playLoopAudio, renderOrder]);
  const handleStopClick = useCallback(() => {
    setIsAll(false);
    setIsLoop(false);
    setPlayAllList([]);
    setPlayLoopList([]);
  }, []);
  const handleShuffleClick = useCallback(() => {
    setRenderOrder((prev) => {
      const out = [...prev];
      for (let i = out.length - 1; i > 0; i--) {
        const r = Math.floor(Math.random() * (i + 1));
        [out[i], out[r]] = [out[r], out[i]];
      }
      return out;
    });
  }, []);
  const handleResetClick = useCallback(() => {
    setRenderOrder(["sankaku", "shikaku", "maru", "pop", "desu"]);
  }, []);

  const handleVolumeChange = useCallback(
    (_: unknown, value: number | number[]) => {
      if (Array.isArray(value) || isNaN(value)) {
        return;
      }
      volume(value / 100);
      setVolumeValue(value);
    },
    [volume]
  );

  const handleAudioEnd = useCallback(
    (soundId: number) => {
      endAnimation();
      if (playingIdList.some((playingId) => playingId === soundId)) {
        const filterdPlayingIdList = playingIdList.filter(
          (playingId) => playingId !== soundId
        );
        setPlaingIdList(filterdPlayingIdList);
        return;
      }

      if (playingAllIdList.some((playingId) => playingId === soundId)) {
        const filterdPlayingIdList = playingAllIdList.filter(
          (playingId) => playingId !== soundId
        );
        setPlaingAllIdList(filterdPlayingIdList);
        if (
          playAllList.length > 0 &&
          playingAllIdList.some((playingId) => playingId === soundId)
        ) {
          const [first, ...others] = playAllList;
          setPlayAllList(others);
          playAllAudio(first);
        } else {
          setIsAll(false);
        }
        return;
      }

      if (playingLoopIdList.some((playingId) => playingId === soundId)) {
        const filterdPlayingIdList = playingLoopIdList.filter(
          (playingId) => playingId !== soundId
        );
        setPlaingLoopIdList(filterdPlayingIdList);
        if (playLoopList.length > 0) {
          const [first, ...others] = playLoopList;
          setPlayLoopList(others);
          playLoopAudio(first);
        } else if (isLoop) {
          const newOrder = [...renderOrder];
          for (let i = newOrder.length - 1; i > 0; i--) {
            const r = Math.floor(Math.random() * (i + 1));
            [newOrder[i], newOrder[r]] = [newOrder[r], newOrder[i]];
          }
          setRenderOrder(newOrder);
          const [first, ...others] = newOrder;
          setPlayLoopList(others);
          playLoopAudio(first);
        }
        return;
      }
    },
    [
      endAnimation,
      playingIdList,
      playingAllIdList,
      playingLoopIdList,
      playAllList,
      playAllAudio,
      playLoopList,
      isLoop,
      playLoopAudio,
      renderOrder,
    ]
  );

  useEffect(() => {
    removeEvent("end");
    addEvent("end", handleAudioEnd);
  }, [addEvent, handleAudioEnd, removeEvent]);

  return (
    <Box
      sx={{
        position: "relative",
        textAlign: "center",
        height: "100%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          margin: "auto",
        }}
      >
        <img src={background} />
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "75%",
          height: "75%",
        }}
      >
        <AudioVisualizer />
      </Box>
      <Box
        sx={{
          backgroundColor: "#282c349a",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "white",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "10px 10px 10px 10px",
          width: "75%",
          height: "80%",
          maxWidth: "800px",
          maxHeight: "400px",
        }}
      >
        <Typography
          sx={{
            paddingTop: "15%",
            fontSize: "2em",
            marginBottom: "1em",
          }}
        >
          さんかくしかくまるぽっぷ
        </Typography>
        <VoiceButtonContainer
          renderOrder={renderOrder}
          handleSankakuClick={handleSankakuClick}
          handleShikakuClick={handleShikakuClick}
          handleMaruClick={handleMaruClick}
          handlePopClick={handlePopClick}
          handleDesuClick={handleDesuClick}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "0",
            right: "0",
            margin: "0.5em 0.5em 0.5em 0.5em",
          }}
        >
          <ActionButtonContainer
            isAll={isAll}
            isLoop={isLoop}
            onLoopClick={handleLoopClick}
            onPlayClick={handlePlayClick}
            onResetClick={handleResetClick}
            onShuffleClick={handleShuffleClick}
            onStopClick={handleStopClick}
          />
        </Box>
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: "0",
          left: "0",
          width: "15em",
          margin: "0.5em 0.5em 0.5em 0.5em",
        }}
      >
        <VolumeSlider value={volumeValue} onChange={handleVolumeChange} />
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: "0",
          right: "0",
          margin: "0.5em 0.5em 0.5em 0.5em",
        }}
      >
        <IconButton onClick={handleFullscreenClick}>
          {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
        </IconButton>
      </Box>
    </Box>
  );
});
