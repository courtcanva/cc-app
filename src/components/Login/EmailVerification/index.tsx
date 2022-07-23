import {
  ModalHeader,
  ModalBody,
  Flex,
  Text,
  Icon,
  Divider,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";
import MainLogoSvg from "@/assets/svg/CourtCanva-main-LOGO.svg";
import ModalOperator from "../ModalOperater";

type Props = {
  nextStep: () => void;
  prevStep: () => void;
  onClose: any;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  userEmail: string;
  initialRef: React.MutableRefObject<null>;
};
const EmailVerification: React.FC<Props> = ({
  userEmail,
  nextStep,
  onClose,
  setStep,
  prevStep,
}) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    nextStep();
  };
  const handleCloseModal = () => {
    setStep(1);
    onClose();
  };
  return (
    <>
      <ModalOperator handleCloseModal={handleCloseModal} prevStep={prevStep} />
      <ModalHeader width="100%">
        <Flex flexDir="column" alignItems="center">
          <Icon width="240px" height="180px" viewBox="0 0 800 600" role="logo">
            <MainLogoSvg />
          </Icon>
          <Text fontSize="sm" textAlign="center">
            Please enter the 4-digit code sent to
            <Text color="brand.secondary">{userEmail}</Text>
          </Text>
          <Divider />
        </Flex>
      </ModalHeader>
      <ModalBody>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "30px",
            width: "300px",
          }}
          // onSubmit={handleSubmit}
        >
          <FormControl width="5rem" isRequired>
            <Input name="verifyCode" type="number" htmlSize={4} width="5rem" textAlign="center" />
          </FormControl>
          <Button variant="shareBtn" width="300px" marginTop="20px" onClick={handleSubmit}>
            Verify
          </Button>
        </form>
      </ModalBody>
    </>
  );
};

export default EmailVerification;
