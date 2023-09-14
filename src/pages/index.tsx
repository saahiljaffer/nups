import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="wrapper relative h-screen overflow-hidden bg-[#8fac97]">
        <div className="absolute h-full w-full animate-slideOut">
          <Image
            alt=""
            src="/card.png"
            width={3042}
            height={4032}
            className="h-full object-contain"
          />
        </div>
        <div className="mx-auto flex animate-appear flex-col items-end gap-8 p-8 first-letter:flex-col">
          <div className="flex flex-col items-end">
            <p className="uppercase">Saahil</p>
            <span>Son of Muntazir & Fatim Jaffer</span>
          </div>
          <p>and</p>
          <div className="flex flex-col items-end">
            <p className="uppercase">Fatimah</p>
            <span>Daughter of Riyaz & Sabira Jessa</span>
          </div>
          <p>request the honour of your presence at their wedding ceremony</p>
          <p className="uppercase">Sunday, September 22nd, 2024 at 4 PM</p>
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
