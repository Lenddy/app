import { render, screen } from "@testing-library/react";
import App from "./App";
import Log_Reg from "./Log_Reg";
import LongIn from "./LongIn";
import Register from "./Register";

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

// test('renders the log and reg', () => {
//   render(<Log_Reg/>)
//  })

describe("<Log_Reg />", () => {
	it("renders two cards with LongIn and Register components", () => {
		const { getByTestId } = render(<Log_Reg />);
		const longinCard = screen.getByTestId("longin-card");
		const registerCard = screen.getByTestId("register-card");
		expect(longinCard).toBeInTheDocument();
		expect(longinCard).toContainElement(<LongIn />);
		expect(registerCard).toBeInTheDocument();
		expect(registerCard).toContainElement(<Register />);
	});
});

// test("renders without errors", () => {
//   const { getByTestId } = render(<Log_Reg />);
//   const component = getByTestId("Log_Reg");
//   expect(component).toBeInTheDocument();
// });
