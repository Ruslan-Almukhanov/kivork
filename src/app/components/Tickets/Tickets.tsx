import { useState, useEffect } from "react";
import TicketItem from "../Ticket/TicketItem";
import { ApiService, Ticket, User } from "../../../api";
import "../../app.css";

type Props = {
  apiService: ApiService;
};
const Tickets = ({ apiService }: Props) => {
  const [value, setValue] = useState("");
  const [tickets, setTickets] = useState([] as Ticket[]);
  const [filteredTickets, setFilteredTickets] = useState([] as Ticket[]);
  const [users, setUsers] = useState([] as User[]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [apiService]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const tickets = await apiService.tickets().toPromise();
      setTickets(tickets);
      setFilteredTickets(tickets);
      const users = await apiService.users().toPromise();
      setUsers(users);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const saveTicketHandler = async (value: string) => {
    try {
      await apiService.newTicket({ description: value }).toPromise();
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const setToCompleteHandler = async (id: number) => {
    try {
      setLoading(true);
      await apiService.complete(id).toPromise();
      fetchData();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const assignHandler = async (ticketId: number, userId: number) => {
    try {
      await apiService.assign(ticketId, userId).toPromise();
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const getTickets = (value: string) => {
    switch (value) {
      case "true":
        return tickets.filter((ticket) => ticket.completed);
      case "false":
        return tickets.filter((ticket) => !ticket.completed);
      default:
        return tickets;
    }
  };
  const filterTickets = (value: string) => {
    const filteredTickets = getTickets(value);
    setFilteredTickets(filteredTickets);
  };
  return (
    <div className="tickets">
      <aside className="tickets__form">
        <h1>Add new ticket</h1>
        <input
          placeholder="description"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={() => saveTicketHandler(value)}>Add</button>
      </aside>
      <div>
        <h3>Filter by status</h3>
        <select onChange={(e) => filterTickets(e.target.value)}>
          <option value="all">All</option>
          <option value="true">Completed</option>
          <option value="false">Not completed</option>
        </select>
        <h2>Tickets</h2>
        {!loading ? (
          <ul className="tickets__list">
            {filteredTickets.map((t) => (
              <TicketItem
                key={t.id}
                t={t}
                setToCompleteHandler={setToCompleteHandler}
                users={users}
                assignHandler={assignHandler}
              />
            ))}
          </ul>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Tickets;
