import CTA from "../components/homepage/CTA";
import Hero from "../components/homepage/Hero";
import Features from "../components/homepage/Features";
import Layout from "~/components/providers/Layout";

const Home = () => {
  return (
    <div>
      <Layout>
        <Hero />
        <Features />
        <CTA />
      </Layout>
    </div>
  );
};

export default Home;
