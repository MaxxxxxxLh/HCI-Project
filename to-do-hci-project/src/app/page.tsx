"use client"
import { BoxManager } from "@/components/addButton";
import { Header } from "@/components/header";
import "../styles/tailwind.css"

export default function Home() {
  return (
    <main className="dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ">
      <Header/>
      <BoxManager/>
    </main>
  );
}
