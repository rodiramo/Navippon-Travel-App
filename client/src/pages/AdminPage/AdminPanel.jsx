import { useSelector } from 'react-redux';
import NavBar from '../../components/NavBar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useEffect, useState } from 'react';
import { IconButton, Modal, Typography, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import './AdminPanel.css'; // Import the CSS file

const AdminPanel = () => {
  const role = useSelector((state) => state.user.role);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [newRole, setNewRole] = useState('user');
  const token = useSelector((state) => state.token);

  useEffect(() => {
    if (role !== 'admin') {
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3333/admin/user-list', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [role, token]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3333/admin/user/${selectedUser}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      // Remove user from state after successful deletion
      setUsers(users.filter(user => user._id !== selectedUser));
      setOpenDeleteModal(false);
    } catch (error) {
      setError('Failed to delete user');
    }
  };

  const handleRoleChange = async () => {
    try {
      const response = await fetch(`http://localhost:3333/admin/user/${selectedUser}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user role');
      }

      // Update role in state
      setUsers(users.map(user => 
        user._id === selectedUser ? { ...user, role: newRole } : user
      ));
      setOpenEditModal(false);
    } catch (error) {
      setError('Failed to update user role');
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

  const openEditRoleModal = (userId, currentRole) => {
    setSelectedUser(userId);
    setNewRole(currentRole);
    setOpenEditModal(true);
  };

  const closeEditRoleModal = () => {
    setOpenEditModal(false);
    setSelectedUser(null);
  };

  if (role !== 'admin') {
    return <div>Access Denied</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <NavBar />
      <div className="header">
        <h1>Admin Panel</h1>
      </div>
      <div className="table-container">
        <div className="header">
          <h2>Users List</h2>
        </div>
        {users.length === 0 ? (
          <p style={{ textAlign: 'center' }}>No users found</p>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.firstName} {user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <IconButton onClick={() => openEditRoleModal(user._id, user.role)}>
                        <EditIcon color="primary" />
                      </IconButton>
                      <IconButton onClick={() => openDeleteConfirmationModal(user._id)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="list-view">
              {users.map((user) => (
                <div className="user-item" key={user._id}>
                  <strong>ID:</strong> {user._id}<br />
                  <strong>Name:</strong> {user.firstName} {user.lastName}<br />
                  <strong>Email:</strong> {user.email}<br />
                  <strong>Role:</strong> {user.role}<br />
                  <IconButton onClick={() => openEditRoleModal(user._id, user.role)}>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => openDeleteConfirmationModal(user._id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />

      {/* Confirmation Modal for Deletion */}
      <Modal
        open={openDeleteModal}
        onClose={closeDeleteConfirmationModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="modal-content">
          <Typography id="modal-title" variant="h6" component="h2">
            Confirm Deletion
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this user? This action cannot be undone.
          </Typography>
          <div style={{ marginTop: '1rem', textAlign: 'right' }}>
            <Button onClick={closeDeleteConfirmationModal} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal for Editing User Role */}
      <Modal
        open={openEditModal}
        onClose={closeEditRoleModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="modal-content">
          <Typography id="modal-title" variant="h6" component="h2">
            Edit User Role
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Select the new role for the user.
          </Typography>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="role-select-label">Role</InputLabel>
            <Select
              labelId="role-select-label"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              label="Role"
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
          <div style={{ marginTop: '1rem', textAlign: 'right' }}>
            <Button onClick={closeEditRoleModal} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleRoleChange}>
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminPanel;
