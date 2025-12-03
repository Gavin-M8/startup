import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function WhatsCookin({ username, socketRef }) {
  const [otherUsers, setOtherUsers] = useState([]);

  useEffect(() => {
    // Only connect if socketRef.current is empty
    if (socketRef.current) return;

    console.log("Inside WhatsCookin, connecting WebSocket");

    const socket = new WebSocket('ws://localhost:4000');
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("Connected from frontend");

      // Notify server of new user
      socket.send(JSON.stringify({
        type: "new_user",
        value: username
      }));
    };

    // socket.onmessage = (event) => {
    //   const message = JSON.parse(event.data);
    //   console.log("Received message type:", message.type);

    //   if (message.type === "new_user") {
    //     const incomingUser = message.value;
    //     if (incomingUser === username) return;

    //     setOtherUsers(prev => {
    //       if (prev.some(u => u.username === incomingUser)) return prev;
    //       return [...prev, { username: incomingUser, activity: "entered the kitchen!" }];
    //     });
    //   }

    //   if (message.type === "user_left") {
    //     const leftUser = message.value;

    //     setOtherUsers(prev =>
    //       prev.map(u =>
    //         u.username === leftUser
    //           ? { ...u, activity: "left the kitchen" }
    //           : u
    //       )
    //     );

    //     setTimeout(() => {
    //       setOtherUsers(prev => prev.filter(u => u.username !== leftUser));
    //     }, 3000);
    //  }


    //   if (message.type === "activity") {
    //     const { username: u, activity } = message.value;

    //     setOtherUsers(prev => {
    //       const exists = prev.some(user => user.username === u);
    //       if (exists) {
    //         // Update existing user's activity
    //         return prev.map(user =>
    //           user.username === u ? { ...user, activity } : user
    //         );
    //       } else {
    //         // Add user if not already present
    //         return [...prev, { username: u, activity }];
    //       }
    //     });
    //   }
    // };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Received message type:", message.type);

      if (message.type === "new_user") {
        const incomingUser = message.value;
        if (!incomingUser || incomingUser === username) return; // ignore empty or self

        setOtherUsers(prev => {
          if (prev.some(u => u.username === incomingUser)) return prev;
          return [...prev, { username: incomingUser, activity: "entered the kitchen!" }];
        });
      }

      if (message.type === "activity") {
        const { username: u, activity } = message.value;
        if (!u) return; // ignore messages without username

        setOtherUsers(prev => {
          // Update existing user
          const exists = prev.some(user => user.username === u);
          if (exists) {
            return prev.map(user =>
              user.username === u ? { ...user, activity } : user
            );
          } else {
            // Only add if username is valid
            return [...prev, { username: u, activity }];
          }
        });
      }

      if (message.type === "user_left") {
        const leftUser = message.value;
        if (!leftUser) return;

        setOtherUsers(prev =>
          prev.map(u =>
            u.username === leftUser
              ? { ...u, activity: "left the kitchen" }
              : u
          )
        );

        setTimeout(() => {
          setOtherUsers(prev => prev.filter(u => u.username !== leftUser));
        }, 3000);
      }
    };


    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    return () => {
      console.log("Cleaning up socket");
      socket.close();
      socketRef.current = null;
    };
  }, [username, socketRef]);

  return (
    <div>
      <h2>What's Cookin'</h2>
      <hr />
      <div className="user-list">
        <AnimatePresence>
          {otherUsers.map(user => (
            <motion.div
              key={user.username}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="shadow-sm p-2 mb-3 rounded bg-white border"
            >
              <strong>{user.username}</strong> <em>{user.activity}</em>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default WhatsCookin;
