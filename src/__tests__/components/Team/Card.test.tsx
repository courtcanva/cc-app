import { render } from "@testing-library/react";
import Card from "@/components/Team/Card";

describe("Card", () => {
  const member = {
    _id: "test-id",
    name: "Test Name",
    profileImgUrl: "https://test.s3.ap-southeast-2.amazonaws.com/test-path/test.jpg",
    role: "Developer",
    linkedInUrl: "https://www.linkedin.com/in/test/",
    githubUrl: "https://github.com/test",
    emailAddress: "test@gmail.com",
  };

  it("Should render the property successfully", () => {
    const { getByText } = render(<Card key={member._id} member={member} />);

    expect(getByText(/test name/i)).toBeInTheDocument();
  });
});
