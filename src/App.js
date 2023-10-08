import React, { useEffect } from "react";
import "./App.css";
import Img1 from "./components/assets/img-1.png";
import Img2 from "./components/assets/img-2.png";
import Img3 from "./components/assets/img-3.png";
import Lottie from "lottie-react";
import AnimationData from "./components/assets/Animation.json";
import {Logo} from "./components/logo.jsx";
import { ModalContato } from "./components/offcanvas/Offcanvas";

function App() {
  const observer = new IntersectionObserver(entries => {
    for (let i = entries.length - 1; i >= 0; i--) {
      const entry = entries[i]
      if (entry.isIntersecting) {
        document.querySelectorAll("[data-img]").forEach(img => {
          img.classList.remove("show")
        })
        const img = document.querySelector(entry.target.dataset.imgToShow)
        img?.classList.add("show")
        break
      }
    }
  })  
  document.querySelectorAll("[data-img-to-show]").forEach(section => {
    observer.observe(section)
  })
  useEffect(() => {
  document.querySelectorAll("[data-img-to-show]").forEach(section => {
    observer.observe(section)
  })
})
  return (
    <>
      <header id="header">
      <div className="hero">
      <Logo 
          className="logo"
          alt="Prossima Art AI logo"
          />
      </div>
      <ModalContato/>

    </header>

      <div class="imgs">
        <img
          src={Img1}
          alt="..."
          data-img
          id="img-1"
          className="top-section-img show"
        />
        <img src={Img2} alt="..." data-img id="img-2" />
        <img src={Img3} alt="..." data-img id="img-3" />
      </div>
      <section className="top-section full-screen-section">
        <div className="left mt-5">
          <h1 className="titleH1">Innovations for B2B</h1>
          <p className="Paragraf">
            The only platform that gives continuous service API for interactions across platforms.
          </p>
        </div>
        <div className="right">
          <Lottie className="top-section-animation"
          animationData={AnimationData}
          loop={true}
          autoplay={true}
          />
        </div>
      </section>
      <section className="full-screen-section first-main-section">
        <h1 className="titleH1">Completely Visual</h1>
        <p className="Paragraf">Never touch the command line, from provision to production.</p>
        <div data-img-to-show="#img-1"></div>
      </section>
      <section className="full-screen-section">
        <h1 className="titleH1">Full Stack</h1>
        <p className="Paragraf"> 
          Never manage infrastructure again. One click gets you: a database,
          APIs, deployments, hosting, etc.
        </p>
        <div data-img-to-show="#img-2"></div>
      </section>
      <section className="full-screen-section">
        <h1 className="titleH1">Sentiment analysis</h1>
        <p className="Paragraf">Organizations can leverage this analysis to gain insights into the perceptions and sentiments surrounding their brand or product.</p>
        <div data-img-to-show="#img-3"></div>
      </section>
    </>
  );
}

export default App;
