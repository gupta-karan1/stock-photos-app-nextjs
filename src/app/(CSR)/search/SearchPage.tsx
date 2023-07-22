"use client";

import { UnsplashImage } from "@/models/unsplash-image";
import { FormEvent, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import Image from "next/image";
import styles from "./SearchPage.module.css";

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState<UnsplashImage[] | null>(
    []
  );

  const [searchResultsLoading, setSearchResultsLoading] = useState(false);
  const [searchResultsLoadingIsError, setSearchResultsLoadingIsError] =
    useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get("query")?.toString().trim();

    if (query) {
      try {
        setSearchResults(null);
        setSearchResultsLoading(true);
        setSearchResultsLoadingIsError(false);
        const response = await fetch(`/api/search?query=${query}`);
        const images: UnsplashImage[] = await response.json();
        setSearchResults(images);
      } catch (error) {
        setSearchResultsLoadingIsError(true);
      } finally {
        setSearchResultsLoading(false);
      }
    }
  }
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="search-input">
          <Form.Label>Search</Form.Label>
          <Form.Control
            name="query"
            placeholder="Eg. Nature, Cars, Health, etc."
          />
        </Form.Group>
        <Button type="submit" className="mb-3" disabled={searchResultsLoading}>
          Search
        </Button>
      </Form>

      <div className="d-flex flex-column align-items-center">
        {searchResultsLoading && <Spinner animation="border" />}
        {searchResultsLoadingIsError && (
          <p>Something went wrong. Please try again.</p>
        )}
        {searchResults?.length === 0 && (
          <p>Nothing found. Try a different query</p>
        )}
      </div>

      {searchResults && (
        <>
          {searchResults.map((image) => (
            <Image
              key={image.urls.raw}
              src={image.urls.raw}
              alt={image.description}
              width={250}
              height={250}
              className={styles.image}
            />
          ))}
        </>
      )}
    </div>
  );
}
