'use client';
import UserTabs from "@/components/layout/UserTabs";
import {useProfile} from "@/components/UseProfile";
import Link from "next/link";
import {useEffect, useState} from "react";

'use client';
import UserTabs from "@/components/layout/UserTabs";
import {useProfile} from "@/components/UseProfile";
import Link from "next/link";
import {useEffect, useState} from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const {loading, data} = useProfile();

  useEffect(() => {
    if (data?.admin) {
      fetch('/api/users').then(response => {
        if (response.ok) {
          response.json().then(users => {
            if (users) {
              setUsers(users);
            }
          });
        } else {
          console.error("Failed to fetch users");
        }
      }).catch(error => {
        console.error("Failed to fetch users", error);
      })
    }
  }, [data?.admin]);

  if (loading) {
    return 'Loading user info...';
  }

  if (!data?.admin) {
    return 'Not an admin';
  }

  return (
    <section className="max-w-2xl mx-auto mt-8">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        {users?.length > 0 && users.map(user => (
          <div
            key={user?._id}
            className="bg-gray-100 rounded-lg mb-2 p-1 px-4 flex items-center gap-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
              <div className="text-gray-900">
                {!!user?.name && (<span>{ProfileName(user)}</span>)}
                {!user?.name && (<span className="inria">No name</span>)}
              </div>
              <span className="text-gray-500">{user?.email}</span>
            </div>
            <div>
              <Link className="button" href={`/users/${user?._id}`}>
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
