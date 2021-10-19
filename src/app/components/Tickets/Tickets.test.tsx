import React from "react";
import { render } from "@testing-library/react";
import Tickets from "./Tickets";
import { ApiService } from "../../../api";

const apiService = new ApiService();

describe("Component <Tickets/>", () => {
  it("Tickets page rendered correctly", async () => {
    const { getByText } = render(<Tickets apiService={apiService} />);
    const heading = await getByText(/Tickets/);
    expect(heading).toBeInTheDocument();
  });
});
