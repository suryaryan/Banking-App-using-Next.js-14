
import MobileNav from "@/components/MobileNav";
import Image from "next/image";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import SideBar from "@/components/SideBar";
import { redirect } from "next/navigation";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = await getLoggedInUser();
  if(!loggedIn) redirect('/auth/sign-in')
  return (
   <main className="flex h-screen w-full font-inter">
        <div className="hidden md:flex">
        <SideBar user={loggedIn} />
      </div>
        <div className="flex size-full flex-col">
          <div className="root-layer flex justify-between">
            <div className="flex md:hidden">
            <Image src = "icons/logo.svg" width={36} height={30} alt="Menu"/>
            </div>
            <div className="md:hidden">
             <MobileNav user = {loggedIn}/>
            </div>
          </div>
          {children}
        </div>
   </main>
  );
}
