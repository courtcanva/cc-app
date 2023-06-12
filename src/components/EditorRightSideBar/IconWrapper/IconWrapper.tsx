import { Box } from "@chakra-ui/react";

interface IconWrapperProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

const IconWrapper = ({ children, disabled, onClick }: IconWrapperProps) => {
  return (
    <Box
      as="button"
      display="inline-block"
      verticalAlign="middle"
      color="fontcolor.primary"
      cursor="point"
      disabled={disabled}
      _disabled={{
        opacity: "0.5",
        cursor: "not-allowed",
      }}
      onClick={onClick}
    >
      {children}
    </Box>
  );
};

export default IconWrapper;
