import styled from "styled-components";
import { useStateProvider } from "../utlis/StateProvider";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsShuffle,
  BsPlayCircleFill,
} from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";
import axios from "axios";
import { reducerCases } from "../utlis/Contants";

export function PlayerControls() {
  const [{ token, playerState, currentlyPlaying }, dispatch] =
    useStateProvider();

  const changeTrack = async (type) => {
    await axios.post(
      `https://api.spotify.com/v1/me/player/${type}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
          "content-type": "application/json",
        },
      }
    );

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

    // dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
  };

  const changeState = async () => {
    const state = playerState ? "pause" : "play";

    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/${state}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
          "content-type": "application/json",
        },
      }
    );

    dispatch({
      type: reducerCases.SET_PLAYER_STATE,
      playerState: !playerState,
    });
  };

  return (
    <Container>
      <div className="shuffle">
        <BsShuffle />
      </div>
      <div className="previous">
        <CgPlayTrackPrev onClick={() => changeTrack("previous")} />
      </div>

      <div className="state">
        {playerState ? (
          <BsFillPauseCircleFill onClick={changeState} />
        ) : (
          <BsPlayCircleFill onClick={changeState} />
        )}
      </div>

      <div className="next">
        <CgPlayTrackNext onClick={() => changeTrack("next")} />
      </div>
      <div className="repeat">
        <FiRepeat />
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  svg {
    color: #b3b3b3;
    transition: 0.2s ease-in-out;
    &:hover {
      color: white;
    }
  }

  .state {
    svg {
      color: white;
    }
  }
  .previous,
  .next,
  .state {
    font-size: 2rem;
  }
`;
