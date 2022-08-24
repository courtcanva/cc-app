import { render } from "@testing-library/react";
import Card from "@/components/Team/Card";

describe("Card", () => {
  const member = {
    id: "1",
    name: "Eason Li",
    profileImg: "/teamProfileImages/eason-li.jpeg",
    role: "Developer",
    linkedInUrl: "https://www.linkedin.com/in/eason-li-dev/",
    githubUrl: "https://github.com/GitHubEason",
    emailAddress: "easonli0216@gmail.com",
  };

  it("Should render the property successfully", () => {
    const { getByText } = render(<Card key={member.id} member={member} />);

    expect(getByText(/Eason Li/i)).toBeInTheDocument();
  });
});
