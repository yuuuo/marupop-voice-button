import { memo } from "react";
import { Grid, Slider } from "@mui/material";
import {
  MdVolumeDown as VolumeDown,
  MdVolumeUp as VolumeUp,
} from "react-icons/md";
export type Props = {
  value: number;
  onChange?: (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => void;
};

export const VolumeSlider: React.VFC<Props> = memo(
  ({ value, onChange }: Props): JSX.Element => {
    return (
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <VolumeDown />
        </Grid>
        <Grid item xs>
          <Slider value={value} onChange={onChange} />
        </Grid>
        <Grid item>
          <VolumeUp />
        </Grid>
      </Grid>
    );
  }
);
