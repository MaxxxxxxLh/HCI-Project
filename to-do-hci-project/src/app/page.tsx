"use client"
import { BoxManager } from "@/components/addButton";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Calendar } from "@/components/calendar";
import { useState } from "react";
import i18n from "@/components/i18n";
import { I18nextProvider } from "react-i18next";
import "../styles/tailwind.css"


export default function Home() {
  const [currentComponent, setCurrentComponent] = useState<string>('Home');
  const toggleComponent : (componentName: string) => void = (componentName) => {
    setCurrentComponent(componentName);
  };

  return (
    <I18nextProvider i18n={i18n}>
      <main className="flex flex-col h-screen dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ">
        
        <Header/>
        {currentComponent === 'Home' && <BoxManager/>}
        {currentComponent === 'Calendar' && <Calendar/>} 
        <Footer toggle={toggleComponent}/>
      

      </main> 
    </I18nextProvider>
  );
}
