import HeroSection from "@/components/HomePageComponents/HeroSection";
import FeaturedRecipes from "@/components/HomePageComponents/FeaturedRecipes";
import Categories from "@/components/HomePageComponents/Categories";

const Home = () => {
    return (
        <div className="m-2 box-border">
            <HeroSection />
            <FeaturedRecipes />
            <Categories />
        </div>
    );
};

export default Home;
