// "use client"

// import type React from "react"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "../../components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
// import { Input } from "../../components/ui/input"
// import { Label } from "../../components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Calendar } from "@/components/ui/calendar"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { format } from "date-fns"
// import { CalendarIcon } from "lucide-react"
// import { cn } from "../../lib/utils"

// export default function CreateMarketPage() {
//   const router = useRouter()
//   const [marketType, setMarketType] = useState("binary")
//   const [date, setDate] = useState<Date>()
//   const [loading, setLoading] = useState(false)
//   const [outcomes, setOutcomes] = useState([
//     { name: "Yes", odds: "1.5" },
//     { name: "No", odds: "2.5" },
//   ])

//   const addOutcome = () => {
//     setOutcomes([...outcomes, { name: "", odds: "2.0" }])
//   }

//   const updateOutcome = (index: number, field: string, value: string) => {
//     const newOutcomes = [...outcomes]
//     newOutcomes[index] = { ...newOutcomes[index], [field]: value }
//     setOutcomes(newOutcomes)
//   }

//   const removeOutcome = (index: number) => {
//     if (outcomes.length <= 2) return
//     const newOutcomes = [...outcomes]
//     newOutcomes.splice(index, 1)
//     setOutcomes(newOutcomes)
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)

//     // Simulate API call
//     setTimeout(() => {
//       setLoading(false)
//       // Redirect to the newly created market
//       router.push("/markets/acme-ai")
//     }, 1500)
//   }

//   return (
//     <div className="container mx-auto py-10">
//       <h1 className="text-3xl font-bold mb-6">Create a New Market</h1>

//       <form onSubmit={handleSubmit}>
//         <Card className="mb-8">
//           <CardHeader>
//             <CardTitle>Market Details</CardTitle>
//             <CardDescription>Define the startup and prediction for your market</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="startup-name">Startup Name</Label>
//               <Input id="startup-name" placeholder="e.g., Acme AI" required />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="prediction">Prediction Question</Label>
//               <Input id="prediction" placeholder="e.g., Will Acme AI reach $10M ARR by Q4 2025?" required />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="description">Market Description</Label>
//               <Textarea
//                 id="description"
//                 placeholder="Provide details about the startup, including industry, funding rounds, notable investors, etc."
//                 className="min-h-[120px]"
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label>Market Type</Label>
//               <RadioGroup defaultValue="binary" onValueChange={setMarketType} className="flex flex-col space-y-1">
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="binary" id="binary" />
//                   <Label htmlFor="binary">Binary (Yes/No)</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="multi" id="multi" />
//                   <Label htmlFor="multi">Multi-Option</Label>
//                 </div>
//               </RadioGroup>
//             </div>

//             <div className="space-y-2">
//               <Label>Market Expiry Date</Label>
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button
//                     variant={"outline"}
//                     className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
//                   >
//                     <CalendarIcon className="mr-2 h-4 w-4" />
//                     {date ? format(date, "PPP") : <span>Pick a date</span>}
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0">
//                   <Calendar
//                     mode="single"
//                     selected={date}
//                     onSelect={setDate}
//                     initialFocus
//                     disabled={(date) => date < new Date()}
//                   />
//                 </PopoverContent>
//               </Popover>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="mb-8">
//           <CardHeader>
//             <CardTitle>Outcomes & Odds</CardTitle>
//             <CardDescription>Define the possible outcomes and their initial odds</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {outcomes.map((outcome, index) => (
//                 <div key={index} className="flex items-center gap-4">
//                   <div className="flex-1">
//                     <Label htmlFor={`outcome-${index}`} className="mb-2 block">
//                       Outcome {index + 1}
//                     </Label>
//                     <Input
//                       id={`outcome-${index}`}
//                       value={outcome.name}
//                       onChange={(e) => updateOutcome(index, "name", e.target.value)}
//                       placeholder={`Outcome ${index + 1}`}
//                       required
//                     />
//                   </div>
//                   <div className="w-24">
//                     <Label htmlFor={`odds-${index}`} className="mb-2 block">
//                       Odds
//                     </Label>
//                     <Input
//                       id={`odds-${index}`}
//                       value={outcome.odds}
//                       onChange={(e) => updateOutcome(index, "odds", e.target.value)}
//                       type="number"
//                       step="0.1"
//                       min="1.1"
//                       required
//                     />
//                   </div>
//                   {marketType === "multi" && (
//                     <Button
//                       type="button"
//                       variant="ghost"
//                       size="sm"
//                       className="mt-8"
//                       onClick={() => removeOutcome(index)}
//                       disabled={outcomes.length <= 2}
//                     >
//                       Remove
//                     </Button>
//                   )}
//                 </div>
//               ))}

//               {marketType === "multi" && (
//                 <Button type="button" variant="outline" onClick={addOutcome} className="w-full mt-2">
//                   Add Outcome
//                 </Button>
//               )}
//             </div>
//           </CardContent>
//           <CardFooter className="flex justify-between">
//             <Button variant="outline" type="button" onClick={() => router.push("/")}>
//               Cancel
//             </Button>
//             <Button type="submit" disabled={loading}>
//               {loading ? "Creating..." : "Create Market"}
//             </Button>
//           </CardFooter>
//         </Card>
//       </form>
//     </div>
//   )
// }

