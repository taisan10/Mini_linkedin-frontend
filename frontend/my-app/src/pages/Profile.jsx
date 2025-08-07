




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/profile/api/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProfile(res.data.user);
      setPosts(res.data.posts);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      localStorage.setItem("redirectAfterLogin", `/profile/${id}`);
      window.location.href = "/login";
      return;
    }

    fetchProfile();
  }, [id]);

  if (loading) return <div className="p-4">Loading profile...</div>;
  if (!profile) return <div className="p-4 text-red-500">User not found.</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{profile.name}</h2>
      <p className="text-gray-600">{profile.email}</p>
      <p className="mt-2">{profile.bio}</p>

      <h3 className="text-xl font-semibold mt-4">Posts:</h3>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="border rounded p-2 my-2">
            <p>{post.content}</p>
            <small className="text-gray-500">
              {new Date(post.createdAt).toLocaleString()}
            </small>
          </div>
        ))
      ) : (
        <p>No posts yet.</p>
      )}
    </div>
  );
};

export default Profile;

















// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const Profile = () => {
//   const { id } = useParams();
//   const [profile, setProfile] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchProfile = async () => {
//     try {
//       const token = localStorage.getItem('token'); // ensure token is saved on login

//       const res = await axios.get(`http://localhost:5000/profile/api/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       setProfile(res.data.user);
//       setPosts(res.data.posts);
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//     } finally {
//       setLoading(false);
//     }
//   };
  


//   useEffect(() => {
//     fetchProfile();
//   }, [id]);

//   if (loading) return <div>Loading profile...</div>;

//   return (
//     <div className="p-4">
//       {profile ? (
//         <div>
//           <h2 className="text-2xl font-bold">{profile.name}</h2>
//           <p className="text-gray-600">{profile.email}</p>
//           <p className="mt-2">{profile.bio}</p>

//           <h3 className="text-xl font-semibold mt-4">Posts:</h3>
//           {posts.length > 0 ? (
//             posts.map((post) => (
//               <div key={post._id} className="border rounded p-2 my-2">
//                 <p>{post.content}</p>
//                 <small className="text-gray-500">{new Date(post.createdAt).toLocaleString()}</small>
//               </div>
//             ))
//           ) : (
//             <p>No posts yet.</p>
//           )}
//         </div>
//       ) : (
//         <p>User not found.</p>
//       )}
//     </div>
//   );
// };

// export default Profile;
