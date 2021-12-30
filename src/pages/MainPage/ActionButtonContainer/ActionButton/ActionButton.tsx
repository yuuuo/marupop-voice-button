import { memo, MouseEventHandler } from "react";
import { Button } from "@mui/material";

export type Props = {
  icon: React.ReactNode;
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
};

export const ActionButton: React.VFC<Props> = memo(
  ({ icon, text, onClick }: Props): JSX.Element => {
    return (
      <Button
        variant="text"
        color="secondary"
        startIcon={icon}
        onClick={onClick}
      >
        {text}
      </Button>
    );
  }
);
