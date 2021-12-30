import { memo, MouseEventHandler, useMemo } from "react";
import { Grid } from "@mui/material";
import { VoiceButton } from "../VoiceButton";

export type Props = {
  renderOrder: VoiceType[];
  handleSankakuClick: MouseEventHandler<HTMLButtonElement> | undefined;
  handleShikakuClick: MouseEventHandler<HTMLButtonElement> | undefined;
  handleMaruClick: MouseEventHandler<HTMLButtonElement> | undefined;
  handlePopClick: MouseEventHandler<HTMLButtonElement> | undefined;
  handleDesuClick: MouseEventHandler<HTMLButtonElement> | undefined;
};

export type VoiceType = "sankaku" | "shikaku" | "maru" | "pop" | "desu";

export const VoiceButtonContainer: React.VFC<Props> = memo(
  ({
    renderOrder,
    handleSankakuClick,
    handleShikakuClick,
    handleMaruClick,
    handlePopClick,
    handleDesuClick,
  }: Props): JSX.Element => {
    const voiceParts = useMemo(() => {
      return {
        sankaku: (
          <Grid item key="sankaku">
            <VoiceButton onClick={handleSankakuClick} text="さんかく" />
          </Grid>
        ),
        shikaku: (
          <Grid item key="shikaku">
            <VoiceButton onClick={handleShikakuClick} text="しかく" />
          </Grid>
        ),
        maru: (
          <Grid item key="maru">
            <VoiceButton onClick={handleMaruClick} text="まる" />
          </Grid>
        ),
        pop: (
          <Grid item key="pop">
            <VoiceButton onClick={handlePopClick} text="ぽっぷ" />
          </Grid>
        ),
        desu: (
          <Grid item key="desu">
            <VoiceButton onClick={handleDesuClick} text="です" />
          </Grid>
        ),
      };
    }, [
      handleDesuClick,
      handleMaruClick,
      handlePopClick,
      handleSankakuClick,
      handleShikakuClick,
    ]);

    return (
      <Grid container justifyContent="center" spacing={2}>
        {renderOrder.map((key) => {
          return voiceParts[key];
        })}
      </Grid>
    );
  }
);
