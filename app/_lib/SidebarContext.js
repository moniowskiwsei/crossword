'use client';

import { createContext, useContext, useState } from "react"
import Sidebar from "../_components/Sidebar";
import TopBar from "../_components/TopBar";
import Footer from "../_components/Footer";

const SidebarContext = createContext()

export const SidebarProvider = ({ children }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <SidebarContext.Provider value={{ expanded, setExpanded }}>
      <div className="">
        <Sidebar />
        <div className="flex flex-col min-h-screen">
          <TopBar />
            <div className="grow">
              {children}
            </div>
          <Footer/>
        </div>
      </div>
    </SidebarContext.Provider>
  )
}



export const useSidebar = () => useContext(SidebarContext)