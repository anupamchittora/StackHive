import { UserButton } from "@clerk/nextjs";
import { ThemeProvider } from "@/context/ThemeProvider";
export default function Home() {
  return (
    <div>
      <UserButton />
      
    </div>
  );
}