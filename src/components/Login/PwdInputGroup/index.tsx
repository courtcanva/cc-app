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
import { useState } from "react";
type Props = {
  label: string;
  value: string;
  onChange: (event: any) => void;
};

const PwdInputGroup: React.FC<Props> = ({ label, value, onChange }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <FormControl isRequired>
      <FormLabel>{label}</FormLabel>
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder={label}
          value={value}
          onChange={onChange}
        />
        <InputRightElement width="3.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? <Icon as={RiEyeOffFill} /> : <Icon as={RiEyeFill} />}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};
export default PwdInputGroup;
