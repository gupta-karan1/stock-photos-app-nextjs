import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import Link from "next/link";
import { Alert } from "@/components/bootstrap";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dynamic Photo Page",
};

export const revalidate = 0;

export default async function Page() {
  const response = await fetch(
    "https://api.unsplash.com/photos/random?client_id=" +
      process.env.UNSPLASH_ACCESS_KEY,
    {
      // cache: "no-cache",
      // cache: "no-store",
      //   next: {
      //     revalidate: 0,
      //   },
    }
  );
  const image: UnsplashImage = await response.json();
  const width = Math.min(500, image.width);
  const height = (width / image.width) * image.height;

  return (
    <div className="d-flex flex-column align-items-center">
      <Alert>
        This page <strong>fetches data dynamically.</strong> Every time we
        refresh the page, we see a new image. However, if we navigate to another
        page and then come back, we see the same image again.
      </Alert>
      <Image
        src={image.urls.raw}
        alt={image.description}
        width={width}
        height={height}
        className="rounded shadow mw-100 h-100"
      />
      by{" "}
      <Link href={"/users/" + image.user.username}>{image.user.username}</Link>
    </div>
  );
}
