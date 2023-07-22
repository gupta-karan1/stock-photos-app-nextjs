import SearchPage from "./SearchPage";

import { Metadata } from "next";
import { Alert } from "@/components/bootstrap";

export const metadata: Metadata = {
  title: "Search - Stock Photo Gallery",
};

// here the server component becomes the wrapper for the client component which the SearchPage component
//you can also fetch data here and pass it to the client component as props

export default function Page() {
  return (
    <div>
      <Alert>
        {" "}
        This page fetches data <strong>client-side</strong>. In order to not
        leak API credentials, the request is sent to a NextJS{" "}
        <strong>route handler</strong> that runs on the server and then forwards
        the request to the Unsplash API. This route handler then fetches data
        from the API and returns it to the client.{" "}
      </Alert>
      <SearchPage />
    </div>
  );
}
