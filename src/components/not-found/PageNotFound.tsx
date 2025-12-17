import React from "react";
import Link from "next/link";

const PageNotFound = () => {
  return (
    <section
      className="bg-(--colorLightGrey) px-4 py-12 text-(--color-preto) sm:py-16 lg:py-20"
      aria-labelledby="not-found-heading"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 rounded-[1.75rem] border border-(--colorGrey) bg-(--colorWhite)/90 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.08)] backdrop-blur sm:gap-10 sm:rounded-[2rem] sm:p-8 lg:p-10">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
          <div className="space-y-8">
            <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.45em] text-(--color-hina)">
              <span className="hidden h-px flex-1 bg-(--colorGrey) sm:inline-flex" />
              <span>404 / page not found</span>
              <span className="hidden h-px flex-1 bg-(--colorGrey) sm:inline-flex" />
            </div>

            <div className="space-y-5">
              <p className="text-6xl font-bold tracking-wide text-(--color-hina) sm:text-6xl">
                404
              </p>
              <h1
                id="not-found-heading"
                className="text-[2.2rem] font-semibold leading-tight md:text-[2.7rem]"
              >
                This page has gone out of style.
              </h1>
              <p className="max-w-xl text-base text-(--color-hina) md:text-lg">
                The page doesn&apos;t exist. Maybe double-check the link? Or use the
                search above to find what you&apos;re looking for.
              </p>
            </div>

            <div className="flex flex-col gap-3 text-sm font-semibold uppercase tracking-wide sm:flex-row sm:flex-wrap">
              <Link
                href="/"
                className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-(--color-preto) px-7 py-3 text-(--colorWhite) transition hover:bg-(--colorDark) sm:w-auto"
              >
                Keep browsing
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex w-full items-center justify-center rounded-lg border border-(--color-hina) px-6 py-3 text-(--color-preto) transition hover:border-(--color-preto) sm:w-auto"
              >
                Contact customer care
              </Link>
            </div>
          </div>

          <div className="rounded-4xl border border-(--colorGrey) bg-linear-to-br from-(--colorWhite) to-(--colorLightGrey) p-6 shadow-[0_20px_45px_rgba(0,0,0,0.05)] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-(--color-hina)">
              quick directions
            </p>
            <div className="mt-6 space-y-3 text-left text-base text-(--color-preto) sm:space-y-4">
              <Link
                href="/"
                className="flex items-center justify-between rounded-xl border border-transparent px-4 py-3 transition hover:border-(--color-preto)"
              >
                <span>Back to home</span>
                <span aria-hidden>&rarr;</span>
              </Link>
              <Link
                href="/wishlist"
                className="flex items-center justify-between rounded-xl border border-transparent px-4 py-3 transition hover:border-(--color-preto)"
              >
                <span>Wishlist</span>
                <span aria-hidden>&rarr;</span>
              </Link>
              <Link
                href="/customer-care"
                className="flex items-center justify-between rounded-xl border border-transparent px-4 py-3 transition hover:border-(--color-preto)"
              >
                <span>Customer care</span>
                <span aria-hidden>&rarr;</span>
              </Link>
              
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-2 border-t border-(--colorGrey) pt-6 text-xs uppercase tracking-[0.35em] text-(--color-hina) sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:text-sm">
          <span>Need help? 24/7 </span>
       
         
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;
