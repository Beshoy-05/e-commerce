
import React from "react";
import AboutHero from "../../components/About/AboutHero/AboutHero"
import AboutStory from "../../components/About/AboutStory/AboutStory"
import AboutValues from "../../components/About/AboutValues/AboutValues"
import AboutProcess from "../../components/About/AboutProcess/AboutProcess"
import AboutStats from "../../components/About/AboutStats/AboutStats"
import AboutCTA from "../../components/About/AboutCTA/AboutCTA"
import Footer from "../../components/Footer/Footer";

const About = () => {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutProcess />
      <AboutStats />
      <AboutCTA />
      <Footer />
    </>
  );
};

export default About;