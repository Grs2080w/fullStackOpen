import repositories from "./Data/repositories"
import Index from "./Components/Index"
import { render, screen } from "@testing-library/react-native"

describe("RepositoryItems", () => {
	describe("RepositoryItemsContainer", () => {
		it("renders first 1° repository information correctly", () => {
			render(<Index repository={repositories.edges[0].node} />)

			const TitleItem = screen.queryByTestId('TitleItem');
			const DescriptionItem = screen.queryByTestId('DescriptionItem');
			const ButtonItem = screen.getByText('TypeScript');
			
			const ValueItem = screen.queryAllByTestId('ValueItem');
			const LabelItem = screen.queryAllByTestId('LabelItem');

			expect(TitleItem).toHaveTextContent("jaredpalmer/formik");
			expect(DescriptionItem).toHaveTextContent("Build forms in React, without the tears");
			expect(ButtonItem).toHaveTextContent("TypeScript");
			
			expect(ValueItem[0]).toHaveTextContent("21.9k");
			expect(LabelItem[0]).toHaveTextContent("Stars");

			expect(ValueItem[1]).toHaveTextContent("1.62k");
			expect(LabelItem[1]).toHaveTextContent("Forks");

			expect(ValueItem[2]).toHaveTextContent("3");
			expect(LabelItem[2]).toHaveTextContent("Reviews");

			expect(ValueItem[3]).toHaveTextContent("88");
			expect(LabelItem[3]).toHaveTextContent("Rating");

		
		}, 10000)

		it("renders Second 2° repository information correctly", () => {
			render(<Index repository={repositories.edges[1].node} />)

			const TitleItem = screen.queryByTestId('TitleItem');
			const DescriptionItem = screen.queryByTestId('DescriptionItem');
			const ButtonItem = screen.getByText('JavaScript');
			
			const ValueItem = screen.queryAllByTestId('ValueItem');
			const LabelItem = screen.queryAllByTestId('LabelItem');

			expect(TitleItem).toHaveTextContent("async-library/react-async");
			expect(DescriptionItem).toHaveTextContent("Flexible promise-based React data loader");
			expect(ButtonItem).toHaveTextContent("JavaScript");
			
			expect(ValueItem[0]).toHaveTextContent("1.76k");
			expect(LabelItem[0]).toHaveTextContent("Stars");

			expect(ValueItem[1]).toHaveTextContent("69");
			expect(LabelItem[1]).toHaveTextContent("Forks");

			expect(ValueItem[2]).toHaveTextContent("3");
			expect(LabelItem[2]).toHaveTextContent("Reviews");

			expect(ValueItem[3]).toHaveTextContent("72");
			expect(LabelItem[3]).toHaveTextContent("Rating");

		
		}, 10000)
	})
})
