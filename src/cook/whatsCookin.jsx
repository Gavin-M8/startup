import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function WhatsCookin({ username, socketRef }) {
  const [otherUsers, setOtherUsers] = useState([]);

  useEffect(() => {
    if (socketRef.current) return;

    console.log("Inside WhatsCookin, connecting WebSocket");

    let port = window.location.port;
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
   
    const socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("Connected from frontend");

      socket.send(JSON.stringify({
        type: "new_user",
        value: username
      }));
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Received message type:", message.type);

      if (message.type === "new_user") {
        const incomingUser = message.value;
        if (!incomingUser || incomingUser === username) return;

        setOtherUsers(prev => {
          if (prev.some(u => u.username === incomingUser)) return prev;
          return [...prev, { username: incomingUser, activity: "entered the kitchen!" }];
        });
      }

      if (message.type === "activity") {
        const { username: u, activity } = message.value;
        if (!u) return; 

        setOtherUsers(prev => {
          const exists = prev.some(user => user.username === u);
          if (exists) {
            return prev.map(user =>
              user.username === u ? { ...user, activity } : user
            );
          } else {
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
