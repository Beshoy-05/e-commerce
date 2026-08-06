import HomeHero from "../../components/Home/HomeHero/HomeHero";
import HomeStory from "../../components/Home/HomeStory/HomeStory";
import HomeValues from "../../components/Home/HomeValues/HomeValues";
import HomeProcess from "../../components/Home/HomeProcess/HomeProcess";
import HomeStats from "../../components/Home/HomeStats/HomeStats";
import HomeCTA from "../../components/Home/HomeCTA/HomeCTA";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <>
      <HomeHero />
      <HomeStory />
      <HomeValues />
      <HomeProcess />
      <HomeStats />
      <HomeCTA />
      <Footer />
    </>
  );
};

export default Home;
