import { Button } from "@mui/material";
import Link from "next/link";
import { CSSProperties } from "react";

interface BackButtonProps {
  url: string;
}

const containerStyles: CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end'
}

export const MeBackButton = ({ url }: BackButtonProps) => {
  return (
    <div style={containerStyles}>
      <Link href={url} passHref>
        <Button variant="contained" color="primary">Back</Button>
      </Link>
    </div>
  );
}