import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
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
            "fixed left-[50%] flex h-full items-center justify-center",
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
          <div className="fixed h-full w-3 shadow-[10px_0_10px_0px_rgba(48,65,53,0.5)]"></div>
        </div>
        <div
          className={clsx(
            "fixed mx-auto flex w-fit flex-col items-start gap-8 p-8 first-letter:flex-col",
            isClicked ? "animate-slideIn" : "hidden"
          )}
        >
          <div className="flex flex-col items-start">
            <p>Saahil</p>
            <span>Son of Muntazir & Fatim Jaffer</span>
          </div>
          <p>and</p>
          <div className="flex flex-col items-start">
            <p>Fatimah</p>
            <span>Daughter of Riyaz & Sabira Jessa</span>
          </div>
          <p>request the honour of your presence at their wedding ceremony</p>
          <p>Sunday, September 22nd, 2024 at 4 PM</p>
          <Link
            href="/rsvp"
            className="mb-2 mr-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
          >
            I wanna be there
          </Link>
          <p>reception to follow</p>
        </div>
      </div>
    </>
  );
}

//
