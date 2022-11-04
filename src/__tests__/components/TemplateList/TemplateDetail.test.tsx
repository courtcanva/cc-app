import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import TemplateDetail from "@/components/TemplateList/TemplateDetail";
import { mockTemplateDataRaw } from "@/components/MockData/MockTemplateData";
import moment from "moment";

describe("Render template detail modal", () => {
  const mockTemplateItem = mockTemplateDataRaw[0];
  const mockDetail = {
    userId: mockTemplateItem.user_id,
    description: mockTemplateItem.description,
    courtImgUrl: mockTemplateItem.image,
    createDate: moment(mockTemplateItem.createdAt).format("DD/MM/YYYY"),
    tags: mockTemplateItem.tags,
    designDetail: mockTemplateItem.design,
  };

  it("Should render all element of the template detail modal", () => {
    render(
      <TemplateDetail
        isOpen={true}
        onClose={() => {}}
        template={mockDetail}
        applyTemplate={() => {}}
      />
    );
    const courtImg = screen.getByRole("img");
    const designName = screen.getByText(mockDetail.designDetail.designName);
    const templateDescription = screen.getByText(mockDetail.description);
    const courtCategory = screen.getByText(mockDetail.tags.CourtCategory);
    const courtType = screen.getByText(mockDetail.tags.CourtType);
    const publisherTitle = screen.getByText(/publisher/i);
    const designerName = screen.getByText(mockDetail.designDetail.designer);
    const createDateTitle = screen.getByText(/create/i);
    const createDate = screen.getByText(mockDetail.createDate);
    const backButton = screen.getByRole("button", { name: /back/i });
    const useButton = screen.getByRole("button", { name: /use/i });

    expect(courtImg).toBeInTheDocument();
    expect(designName).toBeInTheDocument();
    expect(templateDescription).toBeInTheDocument();
    expect(courtCategory).toBeInTheDocument();
    expect(courtType).toBeInTheDocument();
    expect(publisherTitle).toBeInTheDocument();
    expect(designerName).toBeInTheDocument();
    expect(createDateTitle).toBeInTheDocument();
    expect(createDate).toBeInTheDocument();
    expect(backButton).toBeInTheDocument();
    expect(useButton).toBeInTheDocument();
  });
});
