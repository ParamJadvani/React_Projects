import { Button } from '../ui/button'
import { FaArrowRightLong } from 'react-icons/fa6'

const HeroSection = () => {
  return (
    <div className='m-2 box-border'>
        <section className="relative bg-gradient-to-r from-food-yellow/20 to-food-cream py-5 md:py-5 lg:py-5 overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 md:order-1">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Discover the <span className="text-food-red">Delight</span> of Homemade Cooking
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Explore hundreds of easy-to-follow recipes that will transform your everyday meals into extraordinary culinary experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-primary flex items-center gap-2 text-base">
              Browse Recipes <FaArrowRightLong />
              </Button>
              <Button variant="outline" className="border-food-teal text-food-teal hover:bg-food-teal hover:text-white">
                Watch Cooking Videos
              </Button>
            </div>
            <div className="flex items-center mt-12 space-x-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-food-red">500+</p>
                <p className="text-sm text-muted-foreground">Recipes</p>
              </div>
              <div className="h-10 w-px bg-border"></div>
              <div className="text-center">
                <p className="text-3xl font-bold text-food-teal">12k+</p>
                <p className="text-sm text-muted-foreground">Happy Cooks</p>
              </div>
              <div className="h-10 w-px bg-border"></div>
              <div className="text-center">
                <p className="text-3xl font-bold text-food-orange">4.8</p>
                <p className="text-sm text-muted-foreground">Rating</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 md:order-2 relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Delicious food spread" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 w-32 hidden md:block">
              <p className="text-sm font-medium">Top Rated</p>
              <h3 className="text-food-red font-bold">Pasta Primavera</h3>
            </div>
            <div className="absolute -top-6 -right-6 bg-white rounded-lg shadow-lg p-4 w-36 hidden md:block">
              <p className="text-sm font-medium">Most Popular</p>
              <h3 className="text-food-teal font-bold">Berry Parfait</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}

export default HeroSection