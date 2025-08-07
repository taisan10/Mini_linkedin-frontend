import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  // Check login status on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("userId");
    setIsLoggedIn(!!token); // Update login state based on token presence
    setUserId(id);
  }, []);

  // React to login/logout across tabs (window storage)
  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("userId");
      setIsLoggedIn(!!token);
      setUserId(id);
    };

    // Listen for changes in localStorage (across tabs)
    window.addEventListener("storage", checkLogin);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false); // Immediately update state on logout
    navigate("/login");
  };

  const handleProfileClick = () => {
    const token = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");

    if (token && storedUserId) {
      navigate(`/profile/${storedUserId}`);
    } else {
      localStorage.setItem("redirectAfterLogin", `/profile`);
      navigate("/login");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md px-4 py-3">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div
          className="text-xl font-bold cursor-pointer hover:text-blue-600 transition"
          onClick={() => navigate("/")}
        >
          Mini LinkedIn
        </div>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => navigate("/posts")}
            className="text-base font-medium hover:underline"
          >
            Post
          </button>
          <button
            onClick={handleProfileClick}
            className="text-base font-medium hover:underline"
          >
            Profile
          </button>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => navigate("/register")}
                className="px-4 py-1 border rounded hover:bg-gray-100"
              >
                Sign Up
              </button>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-1 border rounded hover:bg-gray-100"
              >
                Sign In
              </button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-1 border rounded bg-red-500 text-white hover:bg-red-600"
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}




// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userId, setUserId] = useState(null);
 


//   // Check login status on mount
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const id = localStorage.getItem("userId");
//     setIsLoggedIn(!!token);
//     setUserId(id);
//   }, []);

//   // Warn if no userId
//   // Warn only if logged in but no userId
// useEffect(() => {
//   if (!isLoggedIn) return; // not logged in, skip

//   if (userId === null) return; // userId is still being fetched from localStorage

//   if (!userId) {
//     console.warn("User is logged in, but no userId found in localStorage!");
//   }
// }, [isLoggedIn, userId]);


//   // React to login/logout across tabs
//   // useEffect(() => {
//   //   const checkLogin = () => {
//   //     const token = localStorage.getItem("token");
//   //     const id = localStorage.getItem("userId");
//   //     setIsLoggedIn(!!token);
//   //     setUserId(id);
//   //   };

//   //   window.addEventListener("storage", checkLogin);
//   //   return () => window.removeEventListener("storage", checkLogin);
//   // }, []);

//   useEffect(() => {
//   const updateAuth = () => {
//     const token = localStorage.getItem("token");
//     const id = localStorage.getItem("userId");
//     setIsLoggedIn(!!token);
//     setUserId(id);
//   };

//   window.addEventListener("authChange", updateAuth);

//   return () => window.removeEventListener("authChange", updateAuth);
// }, []);


//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userId");
//     setIsLoggedIn(false);
//     navigate("/login");
//   };

//   const handleProfileClick = () => {
//     const token = localStorage.getItem("token");
//     const storedUserId = localStorage.getItem("userId");

//     if (token && storedUserId) {
//       navigate(`/profile/${storedUserId}`);
//     } else {
//       localStorage.setItem("redirectAfterLogin", `/profile`);
//       navigate("/login");
//     }
//   };

//   return (
//     <nav className="sticky top-0 z-50 bg-white shadow-md px-4 py-3">
//       <div className="max-w-6xl mx-auto flex justify-between items-center">
//         {/* Logo */}
//         <div
//           className="text-xl font-bold cursor-pointer hover:text-blue-600 transition"
//           onClick={() => navigate("/")}
//         >
//           Mini LinkedIn
//         </div>

//         {/* Navigation */}
//         <div className="hidden md:flex items-center gap-6">
//           <button
//             onClick={() => navigate("/posts")}
//             className="text-base font-medium hover:underline"
//           >
//             Post
//           </button>
//           <button
//             onClick={handleProfileClick}
//             className="text-base font-medium hover:underline"
//           >
//             Profile
//           </button>
//         </div>

//         {/* Auth Buttons */}
//         <div className="hidden md:flex items-center gap-4">
//           {!isLoggedIn ? (
//             <>
//               <button
//                 onClick={() => navigate("/register")}
//                 className="px-4 py-1 border rounded hover:bg-gray-100"
//               >
//                 Sign Up
//               </button>
//               <button
//                 onClick={() => navigate("/login")}
//                 className="px-4 py-1 border rounded hover:bg-gray-100"
//               >
//                 Sign In
//               </button>
//             </>
//           ) : (
//             <button
//               onClick={handleLogout}
//               className="px-4 py-1 border rounded bg-red-500 text-white hover:bg-red-600"
//             >
//               Log Out
//             </button>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }















// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// const storedUserId = localStorage.getItem("userId");

// export default function Navbar() {
//   const navigate = useNavigate();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userId, setUserId] = useState(null);

//   // Check login status on mount
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const id = localStorage.getItem("userId");
//     setIsLoggedIn(!!token);
//     setUserId(id);
//   }, []);

//   // Optional: react to login/logout across tabs
//   useEffect(() => {
//     const checkLogin = () => {
//       const token = localStorage.getItem("token");
//       setIsLoggedIn(!!token);
//     };

//     window.addEventListener("storage", checkLogin);
//     return () => window.removeEventListener("storage", checkLogin);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userId");
//     setIsLoggedIn(false);
//     navigate("/login");
//   };

//   const handleProfileClick = () => {
//   const token = localStorage.getItem("token");
//   const storedUserId = localStorage.getItem("userId"); // ✅ DECLARE IT FIRST

//   if (token && storedUserId) {
//     navigate(`/profile/${storedUserId}`);
//   } else {
//     localStorage.setItem("redirectAfterLogin", `/profile`);
//     navigate("/login");
//   }
// };
// if (!storedUserId) {
//   console.warn("No userId found in localStorage!");
// }


//   return (
//     <nav className="sticky top-0 z-50 bg-white shadow-md px-4 py-3">
//       <div className="max-w-6xl mx-auto flex justify-between items-center">
//         {/* Left: Logo */}
//         <div
//           className="text-xl font-bold cursor-pointer hover:text-blue-600 transition"
//           onClick={() => navigate("/")}
//         >
//           Mini LinkedIn
//         </div>

//         {/* Center: Navigation */}
//         <div className="hidden md:flex items-center gap-6">
//           <button
//             onClick={() => navigate("/posts")}
//             className="text-base font-medium hover:underline"
//           >
//             Post
//           </button>
//           <button
//             onClick={handleProfileClick}
//             className="text-base font-medium hover:underline"
//           >
//             Profile
//           </button>
//         </div>

//         {/* Right: Auth Buttons */}
//         <div className="hidden md:flex items-center gap-4">
//           {!isLoggedIn ? (
//             <>
//               <button
//                 onClick={() => navigate("/register")}
//                 className="px-4 py-1 border rounded hover:bg-gray-100"
//               >
//                 Sign Up
//               </button>
//               <button
//                 onClick={() => navigate("/login")}
//                 className="px-4 py-1 border rounded hover:bg-gray-100"
//               >
//                 Sign In
//               </button>
//             </>
//           ) : (
//             <button
//               onClick={handleLogout}
//               className="px-4 py-1 border rounded bg-red-500 text-white hover:bg-red-600"
//             >
//               Log Out
//             </button>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }
