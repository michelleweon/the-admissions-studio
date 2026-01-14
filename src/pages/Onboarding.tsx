import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, Mic, MicOff } from "lucide-react";
import tutorAvatar from "@/assets/ai-tutor-avatar.png";

const Onboarding = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userType = location.state?.userType || "student";
  
  const [step, setStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [studentData, setStudentData] = useState({
    currentScore: "",
    targetScore: "",
    timeframe: ""
  });
  const [parentData, setParentData] = useState({
    childName: "",
    childEmail: "",
    isChildRegistered: false
  });

  const totalSteps = userType === "student" ? 2 : 3;
  const progress = (step / totalSteps) * 100;

  const questions = {
    student: [
      "Welcome! I'm your AI tutor. Let's personalize your SAT prep journey. First, what's your current SAT score or estimated score?",
      "Great! Now, what's your target SAT score, and how much time do you have to prepare?"
    ],
    parent: [
      "Welcome! I'm here to help set up your parent dashboard. First, tell me about your child.",
      "Is your child already registered with The Admissions Studio?",
      "Perfect! Let me link your accounts so you can track their progress."
    ]
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      navigate(userType === "student" ? "/student-dashboard" : "/parent-dashboard");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border p-4">
        <div className="container mx-auto max-w-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Step {step} of {totalSteps}</span>
            <span className="text-sm font-medium text-primary">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center pt-24 pb-12 px-6">
        <div className="w-full max-w-2xl">
          {/* AI Tutor Avatar */}
          <div className="flex items-start gap-6 mb-8">
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary flex-shrink-0">
              <img src={tutorAvatar} alt="AI Tutor" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 bg-secondary p-6 relative">
              <div className="absolute -left-3 top-6 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-secondary" />
              <p className="text-lg text-foreground">
                {questions[userType][step - 1]}
              </p>
            </div>
          </div>

          {/* Voice Input Toggle */}
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setIsRecording(!isRecording)}
              className={`p-4 rounded-full transition-all ${
                isRecording
                  ? "bg-accent text-accent-foreground animate-pulse"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {isRecording ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
            </button>
          </div>

          {/* Form Fields */}
          {userType === "student" ? (
            <div className="space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentScore">Current SAT Score (or estimate)</Label>
                    <Input
                      id="currentScore"
                      type="number"
                      placeholder="e.g., 1200"
                      min="400"
                      max="1600"
                      value={studentData.currentScore}
                      onChange={(e) => setStudentData({ ...studentData, currentScore: e.target.value })}
                    />
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="targetScore">Target SAT Score</Label>
                    <Input
                      id="targetScore"
                      type="number"
                      placeholder="e.g., 1500"
                      min="400"
                      max="1600"
                      value={studentData.targetScore}
                      onChange={(e) => setStudentData({ ...studentData, targetScore: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeframe">Preparation Timeframe</Label>
                    <select
                      id="timeframe"
                      value={studentData.timeframe}
                      onChange={(e) => setStudentData({ ...studentData, timeframe: e.target.value })}
                      className="w-full h-10 px-3 border-2 border-input bg-background text-foreground focus:border-primary focus:outline-none"
                    >
                      <option value="">Select timeframe</option>
                      <option value="1month">1 Month</option>
                      <option value="3months">3 Months</option>
                      <option value="6months">6 Months</option>
                      <option value="1year">1 Year</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="childName">Child's Full Name</Label>
                    <Input
                      id="childName"
                      type="text"
                      placeholder="Enter your child's name"
                      value={parentData.childName}
                      onChange={(e) => setParentData({ ...parentData, childName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="childEmail">Child's Email</Label>
                    <Input
                      id="childEmail"
                      type="email"
                      placeholder="Enter your child's email"
                      value={parentData.childEmail}
                      onChange={(e) => setParentData({ ...parentData, childEmail: e.target.value })}
                    />
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="space-y-4">
                  <Label className="block mb-4">Is your child already registered?</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setParentData({ ...parentData, isChildRegistered: true })}
                      className={`p-6 border-2 text-center transition-all ${
                        parentData.isChildRegistered
                          ? "border-primary bg-secondary"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <span className="font-medium text-foreground">Yes, they have an account</span>
                    </button>
                    <button
                      onClick={() => setParentData({ ...parentData, isChildRegistered: false })}
                      className={`p-6 border-2 text-center transition-all ${
                        !parentData.isChildRegistered
                          ? "border-primary bg-secondary"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <span className="font-medium text-foreground">No, create their account</span>
                    </button>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="bg-secondary p-6 border-2 border-primary">
                  <p className="text-foreground text-center">
                    {parentData.isChildRegistered
                      ? "We'll send a link request to your child's email to connect your accounts."
                      : "We'll create an account for your child and send them login instructions."}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <Button onClick={handleNext} className="flex items-center gap-2">
              {step === totalSteps ? "Complete Setup" : "Continue"} <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
