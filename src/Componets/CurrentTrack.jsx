import styled from "styled-components";
import { useEffect } from "react";
import axios from "axios";
import { reducerCases } from "../utlis/Contants";

import { useStateProvider } from "../utlis/StateProvider";

export function CurrentTrack() {
  const [{ token, currentlyPlaying }, dispatch] = useStateProvider();

  useEffect(() => {
    const getCurrentTrack = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Authorization: "Bearer " + token,
            "content-type": "application/json",
          },
        }
      );

      const currentlyPlaying = {
        id: response.data.item.id,
        name: response.data.item.name,
        artists: response.data.item.artists.map((artist) => artist.name),
        image: response.data.item.album.images[2].url,
      };
      //console.log(currentlyPlaying);

      dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
    };

    getCurrentTrack();
  }, [token, dispatch]);

  return (
    <Container>
      <div className="track">
        <div className="track__image">
          <img src={currentlyPlaying?.image} />
        </div>
        <div className="track__info">
          <h4>{currentlyPlaying?.name}</h4>
          <h6>{currentlyPlaying?.artists.join(", ")}</h6>
        </div>
      </div>{" "}
    </Container>
  );
}

const Container = styled.div`
  .track {
    display: flex;
    align-items: center;
    gap: 1rem;
    h4 {
      color: white;
    }
    h6 {
      color: #b3b3b3;
    }
  }
`;
