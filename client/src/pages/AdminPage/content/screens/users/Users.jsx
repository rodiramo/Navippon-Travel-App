import { useState, useEffect } from "react";
import {
  CircularProgress,
  Box,
  IconButton,
  Modal,
  Typography,
  Button,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import config from "@config/config.js";
import { useSelector } from "react-redux";

const Users = () => {
  const token = useSelector((state) => state.token);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${config.API_URL}/admin/user-list`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${config.API_URL}/admin/user/${selectedUser}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      setUsers(users.filter((user) => user._id !== selectedUser));
      setOpenDeleteModal(false);
    } catch (error) {
      setError("Failed to delete user");
    }
  };

  const openDeleteConfirmationModal = (userId) => {
    setSelectedUser(userId);
    setOpenDeleteModal(true);
  };

  const closeDeleteConfirmationModal = () => {
    setOpenDeleteModal(false);
    setSelectedUser(null);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "85vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Box>
      <div className="header">
        <h2>User Management</h2>
      </div>
      <div className="table-container">
        {users.length === 0 ? (
          <p>No users found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>
                    {user.firstName} {user.lastName}
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <IconButton
                      onClick={() => openDeleteConfirmationModal(user._id)}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                    <IconButton>
                      <EditIcon color="primary" />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal open={openDeleteModal} onClose={closeDeleteConfirmationModal}>
        <div className="modal-content">
          <Typography variant="h6">Confirm Deletion</Typography>
          <Typography>
            Are you sure you want to delete this user? This action cannot be
            undone.
          </Typography>
          <div>
            <Button onClick={closeDeleteConfirmationModal}>Cancel</Button>
            <Button onClick={handleDelete} color="error">
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </Box>
  );
};

export default Users;
