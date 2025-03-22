import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-6">The Betting Arena</h1>
      <p className="text-xl mb-8">
        The Wall Street of Startups - Predict, Debate, and Bet on the Future of
        Innovation
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Create a Market</h2>
            <p className="mb-4">
              Start a new betting market on a startup's future.
            </p>
            <Link to="/create">
              <Button className="w-full">Create New Market</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Browse Markets</h2>
            <p className="mb-4">
              Explore existing markets and place your bets.
            </p>
            <Link to="/markets">
              <Button className="w-full" variant="outline">
                Browse Markets
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
