import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Send,
  CheckCircle,
  XCircle,
  Mic,
  MicOff,
  ChevronRight,
  Brain
} from "lucide-react";
import tutorAvatar from "@/assets/ai-tutor-avatar.png";

const Course = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState([
    { role: "tutor", content: "Welcome to your Math Fundamentals session! Let's start with some practice questions tailored to your level." }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const questions = [
    {
      question: "If 3x + 7 = 22, what is the value of x?",
      options: ["3", "5", "7", "15"],
      correct: 1,
      explanation: "Subtract 7 from both sides: 3x = 15. Then divide by 3: x = 5."
    },
    {
      question: "A rectangle has a length of 12 cm and a width of 8 cm. What is its perimeter?",
      options: ["20 cm", "40 cm", "96 cm", "32 cm"],
      correct: 1,
      explanation: "Perimeter = 2(length + width) = 2(12 + 8) = 2(20) = 40 cm."
    },
    {
      question: "What is 15% of 80?",
      options: ["8", "12", "15", "10"],
      correct: 1,
      explanation: "15% of 80 = (15/100) × 80 = 0.15 × 80 = 12."
    }
  ];

  const current = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    
    if (index === current.correct) {
      setScore(score + 1);
      setMessages([
        ...messages,
        { role: "tutor", content: `Correct! ${current.explanation}` }
      ]);
    } else {
      setMessages([
        ...messages,
        { role: "tutor", content: `Not quite. ${current.explanation}` }
      ]);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setMessages([
        ...messages,
        { role: "tutor", content: "Great effort! Let's try the next question." }
      ]);
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    setMessages([
      ...messages,
      { role: "user", content: inputMessage },
      { role: "tutor", content: "That's a great question! Let me help you understand this better..." }
    ]);
    setInputMessage("");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate("/student-dashboard")}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </button>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="font-bold text-primary">Score: {score}/{questions.length}</span>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Question Panel */}
        <div className="flex-1 p-6 lg:border-r border-border">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-foreground mb-2">Math Fundamentals</h1>
              <p className="text-muted-foreground">Adaptive practice session</p>
            </div>

            <Card className="border-2 mb-6">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-primary">Adaptive Question</span>
                </div>
                <p className="text-xl text-foreground mb-6">{current.question}</p>
                
                <div className="space-y-3">
                  {current.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={showResult}
                      className={`w-full p-4 border-2 text-left transition-all flex items-center justify-between ${
                        showResult
                          ? index === current.correct
                            ? "border-chart-2 bg-chart-2/10"
                            : index === selectedAnswer
                            ? "border-destructive bg-destructive/10"
                            : "border-border opacity-50"
                          : "border-border hover:border-primary"
                      }`}
                    >
                      <span className="font-medium text-foreground">
                        {String.fromCharCode(65 + index)}. {option}
                      </span>
                      {showResult && index === current.correct && (
                        <CheckCircle className="h-5 w-5 text-chart-2" />
                      )}
                      {showResult && index === selectedAnswer && index !== current.correct && (
                        <XCircle className="h-5 w-5 text-destructive" />
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {showResult && currentQuestion < questions.length - 1 && (
              <Button onClick={handleNext} className="w-full flex items-center justify-center gap-2">
                Next Question <ChevronRight className="h-4 w-4" />
              </Button>
            )}

            {showResult && currentQuestion === questions.length - 1 && (
              <Card className="border-2 border-primary bg-primary/5">
                <CardContent className="pt-6 text-center">
                  <h2 className="text-2xl font-bold text-foreground mb-2">Session Complete!</h2>
                  <p className="text-lg text-muted-foreground mb-4">
                    You scored {score} out of {questions.length}
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button variant="outline" onClick={() => navigate("/student-dashboard")}>
                      Back to Dashboard
                    </Button>
                    <Button onClick={() => {
                      setCurrentQuestion(0);
                      setSelectedAnswer(null);
                      setShowResult(false);
                      setScore(0);
                    }}>
                      Try Again
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Chat Panel */}
        <div className="lg:w-96 bg-muted/30 flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary">
                <img src={tutorAvatar} alt="AI Tutor" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">AI Tutor</h3>
                <p className="text-sm text-chart-2">Online</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px] lg:max-h-none">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border-2 border-border text-foreground"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsRecording(!isRecording)}
                className={`p-2 transition-all ${
                  isRecording
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {isRecording ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
              </button>
              <input
                type="text"
                placeholder="Ask a question..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 h-10 px-3 border-2 border-input bg-background text-foreground focus:border-primary focus:outline-none"
              />
              <Button onClick={handleSendMessage} size="sm">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
