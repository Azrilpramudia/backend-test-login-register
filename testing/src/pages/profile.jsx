import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/users/1") // Ganti dengan ID pengguna
      .then((res) => setUser(res.data.User))
      .catch(() => setUser(null));
  }, []);

  const handleGoBack = () => {
    navigate(-1); // Kembali ke halaman sebelumnya
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md">
      <div className="flex items-center justify-between mb-4">
        {/* Tombol Kembali */}
        <button
          onClick={handleGoBack}
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600"
        >
          Kembali
        </button>
      </div>
      <h2 className="text-xl font-bold mb-4">Profile</h2>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
