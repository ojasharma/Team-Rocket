"use client";

import { useEffect, useState } from "react";
import { motion, type PanInfo, useAnimation } from "framer-motion";
import { X, Heart, RotateCcw, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card } from "../components/ui/card";

// Mock founder data
const founders = [
  {
    id: 1,
    name: "Ojasvi Sharma",
    role: "Tech Founder",
    skills: ["AI/ML", "Full-Stack Development", "Cloud Architecture"],
    stage: "MVP",
    vision:
      "Building an AI-driven platform that revolutionizes how companies hire technical talent.",
    lookingFor: ["Business Co-founder", "Marketing Expert"],
    image: "/a.jpg",
  },
  {
    id: 2,
    name: "Pankaj Jaat",
    role: "Product Founder",
    skills: ["Product Strategy", "UX Design", "Growth Hacking"],
    stage: "Scaling",
    vision:
      "Creating a sustainable marketplace connecting local farmers with urban consumers.",
    lookingFor: ["Tech Co-founder", "Operations Expert"],
    image: "/b.jpg",
  },
  {
    id: 3,
    name: "Michael Wong",
    role: "Business Founder",
    skills: ["Business Development", "Sales", "Finance"],
    stage: "Funded",
    vision:
      "Disrupting the fintech space with blockchain-based payment solutions for emerging markets.",
    lookingFor: ["CTO", "Blockchain Developer"],
    image: "/c.jpg",
  },
  {
    id: 4,
    name: "Tanishq Sharma",
    role: "Healthcare Founder",
    skills: ["Healthcare", "Biotech", "Research"],
    stage: "Idea",
    vision:
      "Developing wearable technology that monitors vital signs and predicts health issues before they occur.",
    lookingFor: ["Tech Co-founder", "Medical Advisor"],
    image: "/d.jpg",
  },
  {
    id: 5,
    name: "David Kim",
    role: "Creative Founder",
    skills: ["Design", "Branding", "Content Creation"],
    stage: "MVP",
    vision:
      "Building a platform that connects creative professionals with businesses needing on-demand design work.",
    lookingFor: ["Tech Co-founder", "Marketing Expert"],
    image: "/e.jpg",
  },
  {
    id: 6,
    name: "Ayush Kashyap",
    role: "Social Impact Founder",
    skills: ["Sustainability", "Non-profit Management", "Community Building"],
    stage: "Scaling",
    vision:
      "Creating technology solutions for environmental conservation and sustainable development.",
    lookingFor: ["Tech Co-founder", "Impact Investor"],
    image: "/f.jpg",
  },
  {
    id: 7,
    name: "James Wilson",
    role: "Fintech Founder",
    skills: ["Finance", "Banking", "Compliance"],
    stage: "Funded",
    vision:
      "Democratizing access to financial services through a mobile-first banking platform.",
    lookingFor: ["CTO", "Mobile Developer"],
    image: "/g.jpg",
  },
];

export default function CoFounder() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<string | null>(null);
  const [lastAction, setLastAction] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [history, setHistory] = useState<number[]>([]);
  const controls = useAnimation();

  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  const currentFounder = founders[currentIndex];
  const isLastCard = currentIndex === founders.length - 1;

  const handleSwipe = (info: PanInfo) => {
    if (info.offset.x > 100) {
      handleLike();
    } else if (info.offset.x < -100) {
      handleReject();
    }
  };

  const handleLike = () => {
    if (isLastCard) {
      setDirection("right");
      setTimeout(() => {
        setDirection(null);
      }, 300);
      return;
    }

    setDirection("right");
    setHistory([...history, currentIndex]);
    setLastAction(currentIndex);

    setTimeout(() => {
      setCurrentIndex(currentIndex + 1);
      setDirection(null);
    }, 300);
  };

  const handleReject = () => {
    if (isLastCard) {
      setDirection("left");
      setTimeout(() => {
        setDirection(null);
      }, 300);
      return;
    }

    setDirection("left");
    setHistory([...history, currentIndex]);

    setTimeout(() => {
      setCurrentIndex(currentIndex + 1);
      setDirection(null);
    }, 300);
  };

  const handleUndo = () => {
    if (history.length === 0) return;

    const prevIndex = history[history.length - 1];
    setCurrentIndex(prevIndex);
    setHistory(history.slice(0, -1));
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const getCardStyle = () => {
    if (direction === "left") {
      return {
        x: -300,
        opacity: 0,
        rotate: -20,
        transition: { duration: 0.3 },
      };
    } else if (direction === "right") {
      return { x: 300, opacity: 0, rotate: 20, transition: { duration: 0.3 } };
    }
    return { x: 0, opacity: 1, rotate: 0 };
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 bg-gray-50">
      <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-8">Founder Match</h1>

        {isLastCard && direction ? (
          <div className="text-center p-8">
            <h2 className="text-xl font-semibold mb-4">
              You've seen all founders!
            </h2>
            <Button onClick={() => setCurrentIndex(0)}>Start Over</Button>
          </div>
        ) : (
          <div className="relative w-full">
            {currentFounder && (
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, info) => handleSwipe(info)}
                animate={getCardStyle()}
                className="w-full"
              >
                <Card className="overflow-hidden shadow-lg rounded-xl w-full ">
                  <div className="relative">
                    <div className="h-80 bg-gray-200 relative overflow-hidden">
                      {/* Image with Fade Effect */}
                      <img
                        src={currentFounder.image}
                        alt={currentFounder.name}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                      {/* Like/Reject Overlays */}
                      {direction === "right" && (
                        <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full font-bold z-20 transform rotate-12">
                          LIKE
                        </div>
                      )}
                      {direction === "left" && (
                        <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold z-20 transform -rotate-12">
                          PASS
                        </div>
                      )}

                      {/* Basic Info */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
                        <div className="flex items-center justify-between">
                          <div>
                            <h2 className="text-2xl font-bold">
                              {currentFounder.name}
                            </h2>
                            <p className="text-lg">{currentFounder.role}</p>
                          </div>
                          <Badge
                            variant="secondary"
                            className="bg-primary text-primary-foreground"
                          >
                            {currentFounder.stage}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="p-4">
                      <div className="flex flex-wrap gap-2 mb-3 text-black">
                        {currentFounder.skills.map((skill, index) => (
                          <Badge key={index} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <p className="text-sm text-gray-600 mb-3">
                        {currentFounder.vision}
                      </p>

                      <div className="mt-2">
                        <div className="flex items-center mb-1">
                          <span className="text-sm font-medium">
                            Looking for:
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {currentFounder.lookingFor.map((item, index) => (
                            <Badge key={index} variant="secondary">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleDetails}
                        className="w-full mt-3 flex items-center justify-center"
                      >
                        {showDetails ? (
                          <>
                            Less <ChevronUp className="ml-1 h-4 w-4" />
                          </>
                        ) : (
                          <>
                            More <ChevronDown className="ml-1 h-4 w-4" />
                          </>
                        )}
                      </Button>

                      {showDetails && (
                        <div className="mt-3 pt-3 border-t">
                          <h3 className="font-medium mb-2">
                            About {currentFounder.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {currentFounder.name} is a passionate{" "}
                            {currentFounder.role.toLowerCase()} with expertise
                            in {currentFounder.skills.join(", ")}. Currently at
                            the {currentFounder.stage} stage, they are
                            {currentFounder.vision.toLowerCase()}.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-14 w-14 bg-white shadow-md"
            onClick={handleReject}
          >
            <X className="h-6 w-6 text-red-500" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-10 w-10 bg-white shadow-md"
            onClick={handleUndo}
            disabled={history.length === 0}
          >
            <RotateCcw className="h-4 w-4 text-gray-500" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-14 w-14 bg-white shadow-md"
            onClick={handleLike}
          >
            <Heart className="h-6 w-6 text-green-500" />
          </Button>
        </div>

        {/* Card Counter */}
        <div className="mt-4 text-sm text-gray-500">
          {currentIndex + 1} of {founders.length}
        </div>
      </div>
    </main>
  );
}
