import { memo, MouseEventHandler } from "react";
import { Grid } from "@mui/material";
import {
  MdLoop as Loop,
  MdPlayArrow as PlayArrow,
  MdRotateLeft as RotateLeft,
  MdShuffle as Shuffle,
  MdStop as Stop,
} from "react-icons/md";
import { ActionButton } from "./ActionButton";

export type Props = {
  isAll: boolean;
  isLoop: boolean;
  onStopClick: MouseEventHandler<HTMLButtonElement> | undefined;
  onPlayClick: MouseEventHandler<HTMLButtonElement> | undefined;
  onLoopClick: MouseEventHandler<HTMLButtonElement> | undefined;
  onShuffleClick: MouseEventHandler<HTMLButtonElement> | undefined;
  onResetClick: MouseEventHandler<HTMLButtonElement> | undefined;
};

export const ActionButtonContainer: React.VFC<Props> = memo(
  ({
    isAll,
    isLoop,
    onStopClick,
    onPlayClick,
    onLoopClick,
    onShuffleClick,
    onResetClick,
  }: Props): JSX.Element => {
    return (
      <Grid container spacing={1}>
        <Grid item>
          {isAll ? (
            <ActionButton icon={<Stop />} text="Stop" onClick={onStopClick} />
          ) : (
            <ActionButton
              icon={<PlayArrow />}
              text="Play All"
              onClick={onPlayClick}
            />
          )}
        </Grid>
        <Grid item>
          {isLoop ? (
            <ActionButton icon={<Stop />} text="Stop" onClick={onStopClick} />
          ) : (
            <ActionButton
              icon={<Loop />}
              text="Play Loop"
              onClick={onLoopClick}
            />
          )}
        </Grid>
        <Grid item>
          <ActionButton
            icon={<Shuffle />}
            text="Shuffle"
            onClick={onShuffleClick}
          />
        </Grid>
        <Grid item>
          <ActionButton
            icon={<RotateLeft />}
            text="Reset"
            onClick={onResetClick}
          />
        </Grid>
      </Grid>
    );
  }
);
