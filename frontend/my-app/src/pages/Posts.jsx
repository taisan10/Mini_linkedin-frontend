import { useEffect, useState } from 'react';
import axios from 'axios';
   const token = localStorage.getItem('token');
const loggedInUserId = localStorage.getItem("userId");
const isLoggedIn = !!localStorage.getItem('token');


export default function Home() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState(''); 
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedContent, setEditedContent] = useState('');
   const [error, setError] = useState('');



  const fetchPosts = async () => {
  try {
 
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const res = await axios.get('http://localhost:5000/api/post', {
      headers,
    });

    setPosts(res.data);

  } catch (err) {
    console.error('Error fetching posts:', err);
  }
};


  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    try {
      await axios.post(
        'http://localhost:5000/api/post',
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setContent('');
      fetchPosts(); // refresh list
    } catch (err) {
  console.error("Create Post Error:", err.response?.data || err.message);
  setError('Failed to create post');
}

  };
  const handleEdit = (post) => {
  setEditingPostId(post._id);
  setEditedContent(post.content);
};

const handleCancelEdit = () => {
  setEditingPostId(null);
  setEditedContent('');
};
const handleSaveEdit = async (postId) => {
  try {
    await axios.put(`http://localhost:5000/api/post/${postId}`, 
      { content: editedContent }, 
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setEditingPostId(null);
    fetchPosts();
  } catch (err) {
    console.error("Update Post Error:", err.response?.data || err.message);
    setError('Failed to update post');
  }
};

const handleDelete = async (postId) => {
  try {
    await axios.delete(`http://localhost:5000/api/post/${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchPosts();
  } catch (err) {
    console.error("Delete Post Error:", err.response?.data || err.message);
    setError('Failed to delete post');
  }
};




  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
  <div className="max-w-7xl mx-auto">
    <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
      Mini LinkedIn Feed
    </h1>

    {/* Create Post */}
    {isLoggedIn && (
    <form
      onSubmit={handleCreatePost}
      className="bg-white p-4 rounded-lg shadow mb-6 max-w-xl mx-auto"
    >
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full border border-gray-300 rounded-lg p-3 resize-none focus:ring-2 focus:ring-blue-400"
        rows={3}
        required
      />
      <button
        type="submit"
        className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
      >
        Post
      </button>
    </form>
    )}

    {/* Post Cards */}
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {posts.map((post) => (
    <div
  key={post._id}
  className={`rounded-xl shadow-md hover:shadow-lg transition p-5 flex flex-col justify-between ${
    post.author?._id === loggedInUserId ? 'bg-blue-50 border border-blue-300' : 'bg-white'
  }`}
>

      {/* Author + Time */}
      <div className="mb-3">
        <p className="text-sm text-gray-500">
          {new Date(post.createdAt).toLocaleDateString()} •{' '}
          {new Date(post.createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
       <h2 className="text-lg font-semibold text-gray-800 mt-1">
  {post.author?.name || 'Anonymous'}
  {post.author?._id === loggedInUserId && (
    <span className="ml-2 text-xs text-green-600 font-medium">(You)</span>
  )}
</h2>

      </div>

      {/* Content */}
      {editingPostId === post._id ? (
  <div className="mb-4">
    <textarea
      value={editedContent}
      onChange={(e) => setEditedContent(e.target.value)}
      className="w-full border border-gray-300 rounded p-2 text-sm"
      rows={3}
    />
    <div className="flex gap-2 mt-2">
      <button
        onClick={() => handleSaveEdit(post._id)}
        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
      >
        Save
      </button>
      <button
        onClick={handleCancelEdit}
        className="bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400 text-sm"
      >
        Cancel
      </button>
    </div>
  </div>
) : (
  <p className="text-gray-700 text-sm mb-4 leading-relaxed">
    “{post.content}”
  </p>
)}
{post.author?._id === loggedInUserId && editingPostId !== post._id && (
  <div className="flex gap-3 justify-end">
    <button
      onClick={() => handleEdit(post)}
      className="text-sm text-blue-600 hover:underline"
    >
      Edit
    </button>
    <button
      onClick={() => handleDelete(post._id)}
      className="text-sm text-red-600 hover:underline"
    >
      Delete
    </button>
  </div>
)}



      {/* Link */}
      {/* <div> */}
        {/* <a
          href="#"
          className="text-blue-600 text-sm font-medium hover:underline"
        >
          Know more →
        </a> */}
      {/* </div> */}
    </div>
  ))}
</div>

  </div>
</div>

  )
}





















// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const loggedInUserId = localStorage.getItem("userId");
// const isLoggedIn = !!localStorage.getItem('token');

// export default function Home() {
//   const [posts, setPosts] = useState([]);
//   const [content, setContent] = useState('');
//   const [error, setError] = useState('');

//   const token = localStorage.getItem('token');

//   const fetchPosts = async () => {
//   try {
//     const token = localStorage.getItem('token');
//     const headers = token ? { Authorization: `Bearer ${token}` } : {};

//     const res = await axios.get('http://localhost:5000/api/post', {
//       headers,
//     });

//     setPosts(res.data);

//   } catch (err) {
//     console.error('Error fetching posts:', err);
//   }
// };


//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const handleCreatePost = async (e) => {
//     e.preventDefault();
//     if (!content.trim()) return;
//     try {
//       await axios.post(
//         'http://localhost:5000/api/post',
//         { content },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setContent('');
//       fetchPosts(); // refresh list
//     } catch (err) {
//   console.error("Create Post Error:", err.response?.data || err.message);
//   setError('Failed to create post');
// }

//   };

//   return (
//     <div className="min-h-screen bg-gray-100 px-4 py-6">
//   <div className="max-w-7xl mx-auto">
//     <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
//       Mini LinkedIn Feed
//     </h1>

//     {/* Create Post */}
//     {isLoggedIn && (
//     <form
//       onSubmit={handleCreatePost}
//       className="bg-white p-4 rounded-lg shadow mb-6 max-w-xl mx-auto"
//     >
//       {error && <p className="text-red-600 mb-2">{error}</p>}
//       <textarea
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//         placeholder="What's on your mind?"
//         className="w-full border border-gray-300 rounded-lg p-3 resize-none focus:ring-2 focus:ring-blue-400"
//         rows={3}
//         required
//       />
//       <button
//         type="submit"
//         className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
//       >
//         Post
//       </button>
//     </form>
//     )}

//     {/* Post Cards */}
//    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//   {posts.map((post) => (
//     <div
//   key={post._id}
//   className={`rounded-xl shadow-md hover:shadow-lg transition p-5 flex flex-col justify-between ${
//     post.author?._id === loggedInUserId ? 'bg-blue-50 border border-blue-300' : 'bg-white'
//   }`}
// >

//       {/* Author + Time */}
//       <div className="mb-3">
//         <p className="text-sm text-gray-500">
//           {new Date(post.createdAt).toLocaleDateString()} •{' '}
//           {new Date(post.createdAt).toLocaleTimeString([], {
//             hour: '2-digit',
//             minute: '2-digit',
//           })}
//         </p>
//        <h2 className="text-lg font-semibold text-gray-800 mt-1">
//   {post.author?.name || 'Anonymous'}
//   {post.author?._id === loggedInUserId && (
//     <span className="ml-2 text-xs text-green-600 font-medium">(You)</span>
//   )}
// </h2>

//       </div>

//       {/* Content */}
//       <p className="text-gray-700 text-sm mb-4 leading-relaxed">
//         “{post.content}”
//       </p>

//       {/* Link */}
//       {/* <div> */}
//         {/* <a
//           href="#"
//           className="text-blue-600 text-sm font-medium hover:underline"
//         >
//           Know more →
//         </a> */}
//       {/* </div> */}
//     </div>
//   ))}
// </div>

//   </div>
// </div>

//   )
// }
