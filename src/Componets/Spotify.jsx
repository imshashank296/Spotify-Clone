import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useStateProvider } from "../utlis/StateProvider";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { Body } from "./body";
import { Footer } from "./footer";
import { reducerCases } from "../utlis/Contants";
import axios from "axios";
export function Spotify() {
  const [{ token, playlists }, dispatch] = useStateProvider();
  const bodyRef = useRef();
  const [navBackground, setNavBackgorund] = useState(false);
  const [headerBackground, setHeaderBackgorund] = useState(false);

  const bodyScrolled = () => {
    bodyRef.current.scrollTop >= 30
      ? setNavBackgorund(true)
      : setNavBackgorund(false);
    bodyRef.current.scrollTop >= 268
      ? setHeaderBackgorund(true)
      : setHeaderBackgorund(false);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "content-type": "application/json",
        },
      });

      const userInfo = { userId: data.id, userName: data.display_name };
      //console.log("from user", { userInfo });
      dispatch({ type: reducerCases.SET_USER, userInfo });
    };

    getUserInfo();
  }, [token, dispatch]);

  return (
    <Container>
      <div className="spotify_body">
        <Sidebar></Sidebar>
        <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
          <Navbar navBackground={navBackground}></Navbar>
          <div className="body_contents">
            <Body headerBackground={headerBackground}></Body>
          </div>
        </div>
      </div>
      <div className="spotify_footer">
        <Footer></Footer>
      </div>
    </Container>
  );
}

const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 85vh 15vh;
  .spotify_body {
    display: grid;
    grid-template-columns: 15vw 85vw;
    height: 100%;
    width: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 1));
    background-color: rgb(32, 87, 100);
  }
  .body {
    height: 100%;
    width: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.7rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
      }
    }
  }
`;
