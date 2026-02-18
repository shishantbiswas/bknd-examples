import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { HttpStatusCode } from "@solidjs/start";

export default function NotFound() {
  return (
    <div class=" p-8 pb-20 gap-16 ">
      <main class="flex justify-center items-center">
        <Title>Not Found</Title>
        <HttpStatusCode code={404} />
        <main class="grid place-items-center px-6 py-24 sm:py-32 lg:px-8 min-h-[80vh]">
          <div class="text-center">
            <p class="text-base font-semibold text-red-600">404</p>
            <h1 class="mt-4 text-5xl font-semibold tracking-tight text-balance  sm:text-7xl">
              Page not found
            </h1>
            <p class="mt-6 text-lg font-medium text-pretty opacity-60 sm:text-xl/8">
              Sorry, we couldn&apos;t find the page you&apos;re looking for.
            </p>
            <div class="mt-10 flex items-center justify-center gap-x-6">
              <A href="/" class="">
                Go Home
              </A>
            </div>
          </div>
        </main>
      </main>
    </div>
  );
}
