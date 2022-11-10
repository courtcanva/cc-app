import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Icon,
} from "@chakra-ui/react";
import React, { useState } from "react";

type Props = {
  label: string;
  value: string;
  onChange: (event: any) => void;
};

const PwdInputGroup: React.FC<Props> = ({ label, value, onChange }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <FormControl isRequired marginTop="8px">
      <FormLabel>{label}</FormLabel>
      <InputGroup size="md">
        <Input
          paddingRight="4.5rem"
          type={show ? "text" : "password"}
          placeholder={label}
          value={value}
          onChange={onChange}
        />
        <InputRightElement width="3.5rem">
          <Button height="1.75rem" size="sm" onClick={handleClick}>
            {show ? <Icon as={RiEyeOffFill} /> : <Icon as={RiEyeFill} />}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};
export default PwdInputGroup;
