import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <>
      <div
        className="wrapper relative flex h-screen items-center justify-center overflow-hidden bg-[#8fac97]"
        onClick={() => {
          setIsClicked(true);
        }}
      >
        <div
          className={clsx(
            "absolute h-full w-3 shadow-[10px_0_10px_0px_rgba(48,65,53,0.5)]",
            isClicked && "animate-disappear"
          )}
        ></div>
        <Image
          alt=""
          src="/logo.png"
          width={3042}
          height={4032}
          className={clsx(
            "z-50 h-36 w-36 rounded-full bg-white object-contain p-2 shadow-lg shadow-[#304135]",
            isClicked && "hidden animate-disappear"
          )}
        />
        <div
          className={clsx(
            "mx-auto flex hidden flex-col items-end gap-8 p-8 first-letter:flex-col",
            isClicked ? "animate-appear" : "hidden"
          )}
        >
          <div className="flex flex-col items-end">
            <p>Saahil</p>
            <span>Son of Muntazir & Fatim Jaffer</span>
          </div>
          <p>and</p>
          <div className="flex flex-col items-end">
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
