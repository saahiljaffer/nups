import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <>
      <div
        className={clsx(
          "fixed left-0 top-0 h-screen w-screen overflow-hidden bg-[#96ac98]"
        )}
        onClick={() => {
          setIsClicked(true);
        }}
      >
        <div>
          <div
            className={clsx(
              "fixed left-[50%] h-full w-3 shadow-[10px_0_10px_0px_rgba(48,65,53,0.5)]",
              isClicked && "animate-slideOut2"
            )}
          ></div>
          <Image
            alt=""
            src="/logo4.png"
            width={1024}
            height={1024}
            className={clsx(
              "fixed left-[42%] top-[38%] z-10 h-40 w-40 justify-self-end rounded-full object-cover",
              isClicked && "animate-slideOut"
            )}
          />
        </div>
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
