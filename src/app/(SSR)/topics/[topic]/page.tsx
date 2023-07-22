import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import styles from "./TopicPage.module.css";
import { Alert } from "@/components/bootstrap";
import { Metadata } from "next";

interface PageProps {
  params: { topic: string };
  // searchParams: { topic: string },
}

// make this dynamic
// export const revalidate = 0;

//tell nextjs to fetch some data during build time

export function generateMetadata({ params: { topic } }: PageProps): Metadata {
  return {
    title: topic + " - Stock Photo Gallery",
  };
}

export const generateStaticParams = async () => {
  // return [{ params: { topic: "nature" } }, { params: { topic: "cars" } }];
  return ["health", "cars", "nature"].map((topic) => ({ params: { topic } }));
};

//nextjs can also restrict user from some params
// export const dynamicParams = false;

export default async function Page({ params: { topic } }: PageProps) {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?query=${topic}&count=10&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );

  const images: UnsplashImage[] = await response.json();

  return (
    <div>
      <Alert>
        This page uses <strong>generateStaticParams</strong> to render and cache
        static pages at build time, even though the URL has a dynamic parameter.
        Pages that are not included in generateStaticParams will be fetched and
        rendered on first access and then cached for subsequent requests, which
        can be disabled.
      </Alert>
      <h1>{topic}</h1>
      {images.map((image) => (
        <Image
          key={image.urls.raw}
          src={image.urls.raw}
          alt={image.description}
          width={250}
          height={250}
          className={styles.image}
        />
      ))}
    </div>
  );
}
