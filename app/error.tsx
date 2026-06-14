"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto my-4 flex max-w-xl flex-col rounded-lg border border-[#2A2A30] bg-[#141418] p-8 md:p-12">
      <h2 className="text-xl font-bold text-white">Etwas ist schiefgelaufen</h2>
      <p className="my-2 text-neutral-400">
        Beim Laden des Shops ist ein Fehler aufgetreten. Bitte versuche es
        erneut — falls das Problem bleibt, kontaktiere uns.
      </p>
      <button
        className="mx-auto mt-4 flex w-full items-center justify-center rounded-full bg-[#AEE2DB] p-4 font-semibold tracking-wide text-[#0B0B0D] hover:bg-[#8FD4CB]"
        onClick={() => reset()}
      >
        Erneut versuchen
      </button>
    </div>
  );
}
