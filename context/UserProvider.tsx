// "use client";

// import { useState } from "react";
// import { User, UserContext } from "./UserContext";

// const UserProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

//   return (
//     <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export default UserProvider;