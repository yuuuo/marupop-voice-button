import React, { memo, MouseEventHandler } from "react";
import { Button } from "@mui/material";

export type Props = {
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
};

export const VoiceButton: React.FC<Props> = memo(
  ({ text, onClick }: Props): JSX.Element => {
    return (
      <Button
        variant="outlined"
        color="primary"
        onClick={onClick}
        sx={{
          width: "8em",
        }}
      >
        {text}
      </Button>
    );
  }
);
