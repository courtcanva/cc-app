import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import TemplateDetail from "@/components/TemplateList/TemplateDetail";
import { mockTemplateDataRaw } from "@/components/MockData/MockTemplateData";

describe("Render template detail modal", () => {
  const mockTemplateItem = mockTemplateDataRaw[0];
  const mockDetail = {
    userId: mockTemplateItem.user_id,
    description: mockTemplateItem.description,
    courtImgUrl: mockTemplateItem.image,
    createDate: mockTemplateItem.createdAt,
    tags: mockTemplateItem.tags,
    designDetail: mockTemplateItem.design,
  };

  it("Should render all element of the template detail modal", () => {
    render(<TemplateDetail isOpen={true} onClose={() => {}} template={mockDetail} />);

    const courtImg = screen.getByRole("img");
    const designName = screen.getByText(/small court example/i);
    const templateDescription = screen.getByText(/loreamsdhuhihuhuihu/i);
    const courtCategory = screen.getByText(/smallcourt/i);
    const courtType = screen.getByText(/basketball/i);
    const publisherTitle = screen.getByText(/publisher/i);
    const designerName = screen.getByText(/test designer/i);
    const createDateTitle = screen.getByText(/create/i);
    const createDate = screen.getByText(/2022\-10\-27/i);

    const backButton = screen.getByRole("button", { name: /back/i });
    const useButton = screen.getByRole("button", { name: /use/i });

    expect(courtImg).toBeInTheDocument;
    expect(designName).toBeInTheDocument;
    expect(templateDescription).toBeInTheDocument;
    expect(courtCategory).toBeInTheDocument;
    expect(courtType).toBeInTheDocument;
    expect(publisherTitle).toBeInTheDocument;
    expect(designerName).toBeInTheDocument;
    expect(createDateTitle).toBeInTheDocument;
    expect(createDate).toBeInTheDocument;
    expect(backButton).toBeInTheDocument;
    expect(useButton).toBeInTheDocument;
  });
});
