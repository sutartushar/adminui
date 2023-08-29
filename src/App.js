import Table from "./components/Table";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";
import axios from "axios";
import { useEffect, useState } from "react";
import EditPopUp from "./components/EditPopUp";

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showEditPopUp, setShowEditPopUp] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  let url = async () => {
    try {
      let response = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    url();
  }, []);

  //for search functionality;
  const handleSearch = (searchQuery) => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  //pagination function
  const handelPageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const CurrentRow = filteredUsers.slice(indexOfFirstRow, indexOfLastRow);

  // handel row selection
  const handelRowSelection = (userId) => {
    if (selectedRows.includes(userId)) {
      setSelectedRows(selectedRows.filter((id) => id !== userId));
    } else {
      setSelectedRows([...selectedRows, userId]);
    }
  };

  //handel delete selected row
  const handelDeleteSelected = () => {
    setFilteredUsers(
      filteredUsers.filter((user) => !selectedRows.includes(user.id))
    );
    setSelectedRows([]);
  };

  //on click on the delet btn on a row
  const handleDelete = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setSelectedRows(selectedRows.filter((id) => id !== userId));
  };

  //edit user
  const handleEdit = (userId) => {
    const userToEdit = users.find((user) => user.id === userId);
    setEditingUser(userToEdit);
    setShowEditPopUp(true);
  };

  //save button
  const handleSaveEdit = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setShowEditPopUp(false);
  };

  //cancel button
  const handleCloseEdit = () => {
    setShowEditPopUp(false);
    setEditingUser(null);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <Table
        users={CurrentRow}
        onSelect={handelRowSelection}
        selectedRows={selectedRows}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      <Pagination
        totalRows={filteredUsers.length}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        onPageChange={handelPageChange}
      />
      <button
        style={{
          borderRadius: 10,
          background: "#ed071e",
          border: "none",
          padding: 5,
          color: "white",
          cursor: "pointer"
        }}
        onClick={handelDeleteSelected}
        disabled={selectedRows.length === 0}
      >
        Delete Selected
      </button>

      {showEditPopUp && (
        <EditPopUp
          user={editingUser}
          onClose={handleCloseEdit}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}
export default App;
