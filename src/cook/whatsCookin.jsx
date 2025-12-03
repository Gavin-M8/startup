import React from 'react';
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function WhatsCookin({ username, socketRef }) {
  const [otherUsers, setOtherUsers] = useState([]);

  useEffect(() => {
    if (socketRef.current) return;

    console.log("Inside WhatsCookin, connecting WebSocket");

    const socket = new WebSocket('ws://localhost:4000');
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("connected from the frontend");

      socket.send(JSON.stringify({
        type: "new_user",
        value: username
      }));
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message.type);

      if (message.type === "new_user") {
        const incomingUser = message.value;
        if (incomingUser === username) return;

        setOtherUsers((prev) => {
          if (prev.some(u => u.username === incomingUser)) return prev;
          return [...prev, { username: incomingUser, activity: "entered the kitchen!" }];
        });
      }

      if (message.type === "user_left") {
        const leftUser = message.value;
        setOtherUsers((prev) =>
          prev.filter((u) => u.username !== leftUser)
        );
      }

      if (message.type === "activity") {
        const { username: u, activity } = message.value;

        setOtherUsers((prev) =>
          prev.map((user) =>
            user.username === u
              ? { ...user, activity }
              : user
          )
        );
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
  }, [username]);

  return (
    <div>
      <h2>What's Cookin'</h2>
      <hr />
      <div className="user-list">
        <AnimatePresence>
          {otherUsers.map((user) => (
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