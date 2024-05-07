'use client'

import { Inter } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";
import { createContext, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export const Context = createContext()

export default function RootLayout({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState()

  const states = {
    loggedIn,
    setLoggedIn,
    userData,
    setUserData
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <Context.Provider value={states}>
          <Header/>
            <div className="page-container">
                {children}
            </div>
          </Context.Provider>
        </body>
    </html>
  );
}
