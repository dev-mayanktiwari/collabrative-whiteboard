import CTA from "../components/homepage/CTA";
import Hero from "../components/homepage/Hero";
import Features from "../components/homepage/Features";
import Layout from "~/components/providers/Layout";
import ShapesDecoration from "~/components/neutral/ShapeDecoration";

const Home = () => {
  return (
    <div>
      <Layout>
        <ShapesDecoration />
        <Hero />
        <Features />
        <CTA />
      </Layout>
    </div>
  );
};

export default Home;
