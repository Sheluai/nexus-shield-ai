import { useState } from "react";
import { Home } from "./Home";
import { Servers } from "./Servers";
import { Chat } from "./Chat";
import { Premium } from "./Premium";
import { BottomNavigation } from "@/components/BottomNavigation";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("home");

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return <Home onPageChange={setCurrentPage} />;
      case "servers":
        return <Servers />;
      case "chat":
        return <Chat />;
      case "premium":
        return <Premium />;
      default:
        return <Home onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      {renderCurrentPage()}
      <BottomNavigation 
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Index;
