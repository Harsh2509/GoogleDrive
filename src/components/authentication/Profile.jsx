import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { CenteredContainer } from "./CenteredContainer";

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch (e) {
      setError("Unable to Sign Out");
      console.error(e);
    }
  }

  return (
    <CenteredContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email: </strong> {currentUser && currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div>
        <Link variant="link" onClick={handleLogout}>
          Logout
        </Link>
      </div>
    </CenteredContainer>
  );
};
export default Profile;
