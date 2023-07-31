import Head from "next/head";
import { type RouterOutputs, api } from "~/utils/api";
import { CheckCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { useUser } from "@clerk/nextjs";
import { useForm, type SubmitHandler } from "react-hook-form";

type Party = RouterOutputs["parties"]["getAll"][number];
const PartyCard = ({ party }: { party: Party }) => (
  <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800 sm:p-8">
    <div className="flow-root">
      <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
        {party.guests.map((guest) => (
          <li key={guest.id} className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  {`${guest.firstName} ${guest.lastName}`}
                </p>
                <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                  {guest.email}
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                <CheckCircleIcon className="h-8 w-8" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
};

const AddPartyCard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const { mutate } = api.parties.create.useMutation();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate({ guests: [data] });
  };
  return (
    <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800 sm:p-8">
      <div className="flow-root">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col"
          autoComplete="off"
        >
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="grid min-w-0 flex-1 grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="Saahil"
                      required
                      {...register("firstName", { required: true })}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="Jaffer"
                      required
                      {...register("lastName", { required: true })}
                    />
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="contact@saahiljaffer.com"
                      required
                      {...register("email", { required: true })}
                    />
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div className="flex flex-1 justify-end gap-2">
            <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-green-400 to-blue-600 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-green-200 group-hover:from-green-400 group-hover:to-blue-600 dark:text-white dark:focus:ring-green-800">
              <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
                Add Guest
              </span>
            </button>
            <button
              type="submit"
              className="rounded-lg bg-gradient-to-br from-green-400 to-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-green-200 dark:focus:ring-green-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function Home() {
  const { user } = useUser();
  const { data, isLoading: partiesLoading } = api.parties.getAll.useQuery(
    undefined,
    {
      enabled:
        user?.id === "user_2TJY1nrt8JFKw4lO6eD7G4blWXs" ||
        user?.id === "user_2TKF8G8bcMQt2ikiWuxmhoEE9qn",
    }
  );

  if (
    !user ||
    (user.id !== "user_2TJY1nrt8JFKw4lO6eD7G4blWXs" &&
      user.id !== "user_2TKF8G8bcMQt2ikiWuxmhoEE9qn")
  )
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-900 text-gray-200">
        please contact saahil
      </div>
    );

  if (partiesLoading)
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-900">
        <div role="status">
          <svg
            aria-hidden="true"
            className="h-10 w-10 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

  if (!data) return <div>Something went wrong</div>;

  return (
    <>
      <Head>
        <title>nups</title>
        <meta name="description" content="nups" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900">
        <div className="container flex max-w-md flex-col items-center justify-center gap-12 px-4 py-16">
          <button
            type="button"
            className="place-self-end rounded-lg bg-gradient-to-br from-green-400 to-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-green-200 dark:focus:ring-green-800"
          >
            Add Party
          </button>
          <AddPartyCard />
          {data.map((party) => (
            <PartyCard key={party.id} party={party} />
          ))}
        </div>
      </main>
    </>
  );
}
