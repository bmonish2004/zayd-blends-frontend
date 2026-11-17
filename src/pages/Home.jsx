import { Featured } from "../components/bestSellers";
import { Hero } from "../components/hero";
import RatingReviews from "../components/RatingReviews";

export function Home() {
  return (
    <>
      <section>
        <Hero/>
        <Featured/>
        <RatingReviews/>
      </section>
    </>
  )
}
