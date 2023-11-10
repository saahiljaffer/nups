import clsx from "clsx";
import Image from "next/image";
import { Stalemate as Sacramento } from "next/font/google";
import { useEffect, useState } from "react";
import { useUser, useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

const sacramento = Sacramento({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// Grab the query param server side, and pass through props
export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context.query);
  return {
    props: { signInToken: context.query.token ? context.query.token : null },
  };
};

export default function Home() {
  const { signIn, setSession } = useSignIn();
  const router = useRouter();

  useEffect(() => {
    console.log(router.query);
    // const res = await signIn.create({
    //   strategy: "ticket",
    //   ticket: router.query as string,
    // });

    // setSession(res.createdSessionId, () => {
    //   setSignInProcessed(true);
    // });
  }, [router.query]);

  const [isClicked, setIsClicked] = useState(false);
  return (
    <>
      <div
        className="h-screen w-screen bg-[#96ac98]"
        onClick={() => {
          setIsClicked(true);
        }}
      >
        <div
          className={clsx(
            "fixed right-[50%] flex h-full items-center justify-center",
            isClicked && "animate-slideOut"
          )}
        >
          <Image
            alt=""
            src="/logo.png"
            width={1024}
            height={1024}
            className="fixed z-10 h-40 w-40"
          />
          <div className="fixed h-full w-3 shadow-[-10px_0_10px_0px_rgba(48,65,53,0.5)]"></div>
        </div>
        <div
          className={clsx(
            "fixed flex w-full flex-col gap-8 p-8",
            isClicked ? "animate-slideIn" : "hidden"
          )}
        >
          <p>Salaams Aamir and Aamena, the families of</p>
          <div className="flex flex-col">
            <p className={`${sacramento.className} text-7xl`}>Saahil</p>
            <span>Son of Muntazir & Fatim Jaffer</span>
          </div>
          <p>and</p>
          <div className="flex flex-col">
            <p className={`${sacramento.className} text-7xl`}>Fatimah</p>
            <span>Daughter of Riyaz & Sabira Jessa</span>
          </div>
          <p>
            request the honour of your presence at their wedding ceremony which
            will be held on
          </p>
          <p>Sunday, September 22nd, 2024 at 2 PM</p>
          <div className="flex items-center gap-2">
            Will you be there?
            <button className="mb-2 mr-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200">
              Yes
            </button>
            <button className="mb-2 mr-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200">
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
