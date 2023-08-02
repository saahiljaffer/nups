import Head from "next/head";
import { type RouterOutputs, api, type RouterInputs } from "~/utils/api";
import {
  CheckCircleIcon,
  EnvelopeIcon,
  MinusCircleIcon,
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useUser } from "@clerk/nextjs";
import { useForm, type SubmitHandler, useFieldArray } from "react-hook-form";
import { useState } from "react";

type Party = RouterOutputs["parties"]["getAll"][number];
const PartyCard = ({ party }: { party: Party }) => {
  const utils = api.useContext();
  const { mutate } = api.parties.delete.useMutation({
    onMutate: async (partyId) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await utils.parties.getAll.cancel();

      // Snapshot the previous value
      const previousParties = utils.parties.getAll.getData();

      // Optimistically update to the new value
      utils.parties.getAll.setData(undefined, (old) => {
        return old?.filter((party) => party.id !== partyId);
      });

      // Return a context object with the snapshotted value
      return { previousParties };
    },
    onError(err, newTodo, ctx) {
      // If the mutation fails, use the context-value from onMutate
      if (!ctx) return;
      utils.parties.getAll.setData(undefined, ctx.previousParties);
      console.log(err);
    },
    onSettled() {
      // Sync with server once mutation has settled
      void utils.parties.getAll.invalidate();
    },
  });
  return (
    <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800 sm:p-8">
      <div className="flow-root">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          {party.guests.map((guest) => (
            <li key={guest.id} className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1 truncate text-sm font-medium text-gray-900 dark:text-white">
                    {`${guest.firstName} ${guest.lastName}`}
                    {guest.gender === "MALE" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-gender-male"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2H9.5zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-gender-female"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5z"
                        />
                      </svg>
                    )}
                    {guest.mendhi && <PencilIcon className="h-4 w-4" />}
                  </p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    {guest.email}
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  <EnvelopeIcon className="h-6 w-6" />
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex place-content-end">
          <button
            onClick={() => {
              mutate(party.id);
            }}
          >
            <TrashIcon className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

const AddPartyCard = () => {
  const { control, register, handleSubmit, reset } =
    useForm<RouterInputs["parties"]["create"]>();
  const utils = api.useContext();
  const [showForm, setShowForm] = useState(false);
  const { mutate } = api.parties.create.useMutation({
    onMutate: async (newParty) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await utils.parties.getAll.cancel();

      // Snapshot the previous value
      const previousParties = utils.parties.getAll.getData();

      // Optimistically update to the new value
      utils.parties.getAll.setData(undefined, (prev) => {
        const optimisticParty: Party = {
          ...newParty,
          id: "optimistic-party",
          createdAt: new Date(),
          updatedAt: new Date(),
          guests: newParty.guests.map((guest, index) => ({
            ...guest,
            id: `guest-${index}`,
            createdAt: new Date(),
            updatedAt: new Date(),
            partyId: "optimistic-party",
            mendhi: guest.mendhi === "YES",
          })),
        };
        if (!prev) return [optimisticParty];
        return [optimisticParty, ...prev];
      });

      // Clear input
      setShowForm(false);

      // Return a context object with the snapshotted value
      return { previousParties };
    },
    onError(err, newTodo, ctx) {
      // If the mutation fails, use the context-value from onMutate
      if (!ctx) return;
      utils.parties.getAll.setData(undefined, ctx.previousParties);
      console.log(err);
    },
    onSettled() {
      // Sync with server once mutation has settled
      void utils.parties.getAll.invalidate();
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "guests",
    control,
  });
  const onSubmitFunction: SubmitHandler<RouterInputs["parties"]["create"]> = (
    data
  ) => {
    mutate(data);
    reset();
    remove();
  };

  return (
    <div className="container flex max-w-md flex-col gap-6">
      <button
        disabled={showForm}
        onClick={() => {
          setShowForm(true);
          append({
            firstName: "",
            lastName: "",
            email: "",
            gender: "MALE",
            mendhi: "NO",
          });
        }}
        type="button"
        className="place-self-end rounded-lg bg-gradient-to-br from-green-400 to-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-green-200 disabled:opacity-50 dark:focus:ring-green-800"
      >
        Add Party
      </button>
      {showForm && (
        <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800 sm:p-8">
          <div className="flow-root">
            <form
              onSubmit={handleSubmit(onSubmitFunction)}
              className="flex flex-col gap-6 py-3 sm:py-4"
              autoComplete="off"
            >
              <ul role="list" className="flex flex-col gap-4">
                {fields.map((field, index) => (
                  <li key={field.id}>
                    <div className="flex items-center space-x-4">
                      <div className="grid min-w-0 flex-1 grid-cols-2 gap-4">
                        <div className="col-span-full flex items-end justify-between">
                          <span className="font-semibold text-white">
                            Guest #{index + 1}
                          </span>
                          {fields.length > 1 && (
                            <button
                              onClick={() => {
                                remove(index);
                              }}
                            >
                              <MinusCircleIcon className="h-7 w-7 text-white" />
                            </button>
                          )}
                        </div>
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
                            {...register(`guests.${index}.firstName`, {
                              required: true,
                            })}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="lastName"
                            className="mb-2 block text-sm font-medium text-gray-900 placeholder:block dark:text-white"
                          >
                            Last Name
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            placeholder="Jaffer"
                            required
                            {...register(`guests.${index}.lastName`, {
                              required: true,
                            })}
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
                            {...register(`guests.${index}.email`)}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="countries"
                            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Gender
                          </label>
                          <select
                            id="countries"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            {...register(`guests.${index}.gender`, {
                              required: true,
                            })}
                          >
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                          </select>
                        </div>
                        <div>
                          <label
                            htmlFor="countries"
                            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Mendhi
                          </label>
                          <select
                            id="countries"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            {...register(`guests.${index}.mendhi`, {
                              required: true,
                            })}
                          >
                            <option value="YES">Yes</option>
                            <option value="NO">No</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex flex-1 justify-between gap-4">
                <button
                  onClick={() => {
                    append({
                      firstName: "",
                      lastName: "",
                      email: "",
                      gender: "MALE",
                      mendhi: "NO",
                    });
                  }}
                >
                  <PlusCircleIcon className="h-8 w-8 text-white" />
                </button>
                <div className="flex gap-3">
                  <div>
                    <select
                      id="countries"
                      className="w-fullh-full block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      {...register("inviter", {
                        required: true,
                      })}
                    >
                      <option value="GROOM">Saahil</option>
                      <option value="BRIDE">Fatimah</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="rounded-lg bg-gradient-to-br from-green-400 to-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-green-200 dark:focus:ring-green-800"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
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
        <div className="container flex max-w-md flex-col items-center justify-center gap-6 px-4 py-16">
          <AddPartyCard />
          {data.map((party) => (
            <PartyCard key={party.id} party={party} />
          ))}
        </div>
      </main>
    </>
  );
}
