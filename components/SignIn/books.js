import { Grid2 } from "@mui/material";
import Image from "next/image";
import { BookStack } from "../SmartMinds";
import { useEffect, useState } from "react";
import axios from "axios";
import { GET_BOOKS } from "@/helpers/constants";

export default function Books() {
  const [books, setBooks] = useState();
  useEffect(() => {
    const getBooks = async () => {
      await axios
        .get(GET_BOOKS)
        .then((response) => {
          const data = response.data;
          setBooks(data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    };
    getBooks();
  }, []);
  return (
    <Grid2 spacing={{ xs: 4, md: 2, lg: 4 }} container>
      {books &&
        books?.map((b, k) => {
          return (
            <Grid2 key={k} size={{ xs: 6, md: 3 }}>
              <BookStack stackColor={b.color_code}>
                <Image src={`${process.env.CDN_SERVER}/${b.cover_source}`} width={155} height={155} quality={100} alt="Smart minds mathematics class IX" />
              </BookStack>
            </Grid2>
          );
        })}
    </Grid2>
  );
}
