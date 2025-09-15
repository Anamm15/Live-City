"use client";
import { PollCard } from "./components/PollCard";
import Navbar from "@/components/semantic/Navbar";
import { useGetPollsQuery } from "./hooks/mutation";
import SpinnerLoading from "@/components/loading/SpinnerLoading";

export default function MultiplePollsPage() {
  const { data: polls, isLoading } = useGetPollsQuery();
  return (
    <>
      <Navbar />
      {isLoading ? (
        <SpinnerLoading />
      ) : (
        <div className="min-h-screen bg-gray-50 font-sans mt-20">
          <main className="max-w-2xl mx-auto py-12 px-4">
            <header className="text-center mb-10">
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                Polling Komunitas
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Berikan suaramu dan lihat apa yang dipikirkan oleh orang lain.
              </p>
            </header>

            <div className="space-y-8">
              {polls &&
                polls.map((poll) => (
                  <PollCard key={poll.id} initialPollData={poll} />
                ))}
            </div>
          </main>
        </div>
      )}
    </>
  );
}
