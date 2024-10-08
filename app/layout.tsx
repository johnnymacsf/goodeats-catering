import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import { Nunito } from 'next/font/google';
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal"; 
import getCurrentUser from "./actions/getCurrentUser";
import ListModal from "./components/modals/ListModal";

export const metadata = {
  title: "GoodEats Catering",
  description: "Catering clone app",
};

const font = Nunito({
  subsets: ["latin"]
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <ListModal />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser}/>
        </ClientOnly>
        <div className="pb-20 md:pt-40 pt-28">
          {children}
        </div>
      </body>

    </html>
  );
}
