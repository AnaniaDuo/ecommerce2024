import React, { useState, useEffect } from "react";
import axios from "axios";
import { TOKEN } from "./components/utilities/constants";

function Users() {
  const [users, setUsers] = useState([]);

  // fetch all users
  useEffect(() => {
    async function fetchAllUsers() {
      const token = window.localStorage.getItem(TOKEN);
      const { data } = await axios.get("/api/users", {
        headers: {
          authorization: token,
        },
      });

      setUsers(data);
    }
    fetchAllUsers();
  }, []);

  return (
    <div className="mt-12">
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Username
              </th>
              <th scope="col" class="px-6 py-3">
                First Name
              </th>
              <th scope="col" class="px-6 py-3">
                Last Name
              </th>
              <th scope="col" class="px-6 py-3">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {user.username}
                </th>
                <td class="px-6 py-4">{user.firstName}</td>
                <td class="px-6 py-4">{user.lastName}</td>
                <td class="px-6 py-4">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
