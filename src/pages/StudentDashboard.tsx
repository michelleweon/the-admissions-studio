import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  Target,
  TrendingUp,
  Calendar,
  Clock,
  Play,
  ChevronRight,
  LogOut,
  User,
  Brain
} from "lucide-react";
import tutorAvatar from "@/assets/ai-tutor-avatar.png";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [currentScore] = useState(1280);
  const [targetScore] = useState(1500);
  const progressPercent = ((currentScore - 1200) / (targetScore - 1200)) * 100;

  const performanceData = [
    { week: "Week 1", score: 1200 },
    { week: "Week 2", score: 1220 },
    { week: "Week 3", score: 1250 },
    { week: "Week 4", score: 1280 }
  ];

  const courses = [
    { id: 1, name: "Math Fundamentals", progress: 75, lessons: 12, color: "bg-chart-1" },
    { id: 2, name: "Reading Comprehension", progress: 45, lessons: 10, color: "bg-chart-2" },
    { id: 3, name: "Writing & Grammar", progress: 30, lessons: 8, color: "bg-chart-3" },
    { id: 4, name: "Advanced Problem Solving", progress: 10, lessons: 15, color: "bg-chart-4" }
  ];

  const weeklyTasks = [
    { title: "Complete Math Module 5", due: "Today", priority: "high" },
    { title: "Reading Practice Test", due: "Tomorrow", priority: "medium" },
    { title: "Review Writing Errors", due: "Wed", priority: "low" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border-2 border-primary flex items-center justify-center">
              <div className="w-4 h-4 bg-accent" />
            </div>
            <span className="font-bold text-lg text-foreground hidden sm:block">THE ADMISSIONS STUDIO</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <User className="h-4 w-4" /> Profile
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="flex items-center gap-2">
              <LogOut className="h-4 w-4" /> Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, Alex!</h1>
          <p className="text-muted-foreground">Let's continue your SAT prep journey.</p>
        </div>

        {/* Score Progress */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 border-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Score Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-8 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Current Score</p>
                  <p className="text-4xl font-bold text-foreground">{currentScore}</p>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progress to target</span>
                    <span className="font-medium text-primary">{targetScore}</span>
                  </div>
                  <Progress value={progressPercent} className="h-3" />
                </div>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                    <YAxis domain={[1100, 1600]} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--card))",
                        border: "2px solid hsl(var(--border))",
                        borderRadius: "0"
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* AI Tutor Card */}
          <Card className="border-2 border-primary bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary mb-4">
                  <img src={tutorAvatar} alt="AI Tutor" className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-foreground mb-2">AI Tutor Ready</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Start an adaptive practice session tailored to your weak areas.
                </p>
                <Button onClick={() => navigate("/course/1")} className="w-full flex items-center justify-center gap-2">
                  <Brain className="h-4 w-4" /> Start Session
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Courses & Tasks */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Courses */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" /> My Courses
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {courses.map((course) => (
                <Card
                  key={course.id}
                  className="border-2 hover:border-primary transition-all cursor-pointer group"
                  onClick={() => navigate(`/course/${course.id}`)}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-3 h-12 ${course.color}`} />
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                    <h3 className="font-bold text-foreground mb-2">{course.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{course.lessons} lessons</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium text-foreground">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Weekly Tasks */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" /> This Week
              </h2>
            </div>
            <Card className="border-2">
              <CardContent className="pt-6 space-y-4">
                {weeklyTasks.map((task, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 border-2 border-border hover:border-primary transition-all cursor-pointer"
                  >
                    <div
                      className={`w-2 h-8 ${
                        task.priority === "high"
                          ? "bg-destructive"
                          : task.priority === "medium"
                          ? "bg-chart-4"
                          : "bg-chart-2"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">{task.title}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {task.due}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Resources */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" /> Recommended
              </h3>
              <div className="space-y-3">
                <Card className="border-2 hover:border-primary transition-all cursor-pointer">
                  <CardContent className="py-4">
                    <p className="font-medium text-foreground text-sm">SAT Practice Test #5</p>
                    <p className="text-xs text-muted-foreground">Full mock exam</p>
                  </CardContent>
                </Card>
                <Card className="border-2 hover:border-primary transition-all cursor-pointer">
                  <CardContent className="py-4">
                    <p className="font-medium text-foreground text-sm">Algebra Review</p>
                    <p className="text-xs text-muted-foreground">Based on recent errors</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
