import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";
import TicketItem from "./TicketItem";
import "@testing-library/jest-dom";

const setToCompleteHandler = async (id: number) => {
  console.log("s");
};

const assignHandler = async (ticketId: number, userId: number) => {
  console.log("s");
};

const ticket = {
  id: 1,
  description: "text",
  assigneeId: 111,
  completed: true,
};

describe("Component <TicketItem/>", () => {
  it("TicketItem page rendered correctly", async () => {
    const { findByText, getByRole } = render(
      <Router>
        <TicketItem
          t={ticket}
          users={[]}
          setToCompleteHandler={setToCompleteHandler}
          assignHandler={assignHandler}
        />
      </Router>
    );
    const link = await findByText(/Ticket/i);
    expect(link).toBeInTheDocument();
    getByRole("link");
  });
});
