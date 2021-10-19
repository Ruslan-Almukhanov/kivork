import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Ticket, User } from "../../../api";

type Props = {
  t: Ticket;
  setToCompleteHandler: (id: number) => void;
  users: User[];
  assignHandler: (ticketId: number, userId: number) => void;
};
const TicketItem = ({
  t,
  setToCompleteHandler,
  users,
  assignHandler,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(111);

  const selectUser = (userId: number) => {
    setSelectedUser(userId);
  };

  const assignUserHadler = (ticketId: number) => {
    selectedUser && assignHandler(ticketId, selectedUser);
  };
  return (
    <li style={{ marginBottom: 20 }}>
      <NavLink key={t.id} to={`/${t.id}`}>
        Ticket: {t.id}, {t.description}
      </NavLink>
      {!t.completed && (
        <button
          style={{ marginLeft: 20 }}
          onClick={() => setToCompleteHandler(t.id)}
        >
          Set to complete
        </button>
      )}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <p>{`Status is: ${t.completed ? "Completed" : "Not completed"}`}</p>
      )}

      <select
        value={t.assigneeId?.toString()}
        onChange={(e) => selectUser(+e.target.value)}
      >
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      <button onClick={() => assignUserHadler(t.id)}>Assign</button>
    </li>
  );
};

export default TicketItem;
