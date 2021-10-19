import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { ApiService, Ticket, User } from "../../../api";

interface AppProps {
  apiService: ApiService;
}

const DetailedTicket = ({ apiService }: AppProps) => {
  const [ticketInfo, setTicketInfo] = useState({} as Ticket);
  const [userInfo, setUserInfo] = useState({} as User);
  const [loading, setLoading] = useState(false);
  const { id }: { id: string } = useParams();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const ticket = await apiService.ticket(+id).toPromise();
      setTicketInfo(ticket);
      ticket.assigneeId && getUserInfo(ticket.assigneeId);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getUserInfo = async (id: number) => {
    const user = await apiService.user(id).toPromise();
    setUserInfo(user);
  };

  return (
    <div className="detailed">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Link to={"/"}>Go back</Link>
          <p>{`description is: ${ticketInfo.description}`}</p>
          <p>{`assigned to user: ${userInfo.name || "not assigned user"}`}</p>
          <p>{`status: ${
            ticketInfo.completed ? "completed" : "not completed"
          }`}</p>
        </>
      )}
    </div>
  );
};

export default DetailedTicket;
