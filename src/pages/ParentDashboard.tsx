import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  Calendar,
  Clock,
  ChevronRight,
  LogOut,
  User,
  Users,
  Bell,
  BookOpen,
  Lightbulb,
  Target,
  CheckCircle
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

const ParentDashboard = () => {
  const navigate = useNavigate();
  const [selectedChild, setSelectedChild] = useState(0);

  const children = [
    { name: "Alex", currentScore: 1280, targetScore: 1500, lastActive: "2 hours ago" },
    { name: "Jordan", currentScore: 1150, targetScore: 1400, lastActive: "Yesterday" }
  ];

  const child = children[selectedChild];
  const progressPercent = ((child.currentScore - 1000) / (child.targetScore - 1000)) * 100;

  const performanceData = [
    { week: "Week 1", score: 1200, target: 1500 },
    { week: "Week 2", score: 1220, target: 1500 },
    { week: "Week 3", score: 1250, target: 1500 },
    { week: "Week 4", score: 1280, target: 1500 }
  ];

  const subjectPerformance = [
    { subject: "Math", score: 85, improvement: 12 },
    { subject: "Reading", score: 72, improvement: 8 },
    { subject: "Writing", score: 68, improvement: 5 }
  ];

  const weeklyTasks = [
    { title: "Complete Math Module 5", status: "completed", due: "Mon" },
    { title: "Reading Practice Test", status: "in-progress", due: "Tue" },
    { title: "Review Writing Errors", status: "pending", due: "Wed" },
    { title: "Vocabulary Quiz", status: "pending", due: "Thu" }
  ];

  const milestones = [
    { title: "First practice test completed", date: "Jan 5", achieved: true },
    { title: "Math score improved 50+ points", date: "Jan 12", achieved: true },
    { title: "Complete 25 lessons", date: "Target: Jan 20", achieved: false }
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
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center">
                2
              </span>
            </Button>
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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Parent Dashboard</h1>
            <p className="text-muted-foreground">Monitor your child's SAT prep progress.</p>
          </div>
          
          {/* Child Selector */}
          {children.length > 1 && (
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div className="flex gap-2">
                {children.map((c, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedChild(index)}
                    className={`px-4 py-2 border-2 font-medium transition-all ${
                      selectedChild === index
                        ? "border-primary bg-secondary text-primary"
                        : "border-border text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-2">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Current Score</p>
              <p className="text-3xl font-bold text-foreground">{child.currentScore}</p>
              <p className="text-sm text-chart-2 mt-1">+80 since start</p>
            </CardContent>
          </Card>
          <Card className="border-2">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Target Score</p>
              <p className="text-3xl font-bold text-foreground">{child.targetScore}</p>
              <p className="text-sm text-muted-foreground mt-1">{child.targetScore - child.currentScore} pts to go</p>
            </CardContent>
          </Card>
          <Card className="border-2">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Study Time</p>
              <p className="text-3xl font-bold text-foreground">12.5h</p>
              <p className="text-sm text-muted-foreground mt-1">This week</p>
            </CardContent>
          </Card>
          <Card className="border-2">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Last Active</p>
              <p className="text-xl font-bold text-foreground">{child.lastActive}</p>
              <p className="text-sm text-chart-2 mt-1">On track</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Performance Chart */}
          <Card className="lg:col-span-2 border-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Score Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Progress to target</span>
                  <span className="font-medium text-primary">{Math.round(progressPercent)}%</span>
                </div>
                <Progress value={progressPercent} className="h-3" />
              </div>
              <div className="h-64">
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
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="hsl(var(--accent))"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Milestones */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Milestones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 p-3 border-2 ${
                    milestone.achieved ? "border-chart-2 bg-chart-2/5" : "border-border"
                  }`}
                >
                  {milestone.achieved ? (
                    <CheckCircle className="h-5 w-5 text-chart-2 flex-shrink-0 mt-0.5" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-muted-foreground flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-medium text-foreground text-sm">{milestone.title}</p>
                    <p className="text-xs text-muted-foreground">{milestone.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Subject Performance & Tasks */}
        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          {/* Subject Performance */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Subject Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subjectPerformance} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" domain={[0, 100]} stroke="hsl(var(--muted-foreground))" />
                    <YAxis type="category" dataKey="subject" stroke="hsl(var(--muted-foreground))" width={80} />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--card))",
                        border: "2px solid hsl(var(--border))",
                        borderRadius: "0"
                      }}
                    />
                    <Bar dataKey="score" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Tasks */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                This Week's Tasks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {weeklyTasks.map((task, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 border-2 border-border"
                >
                  <div
                    className={`w-2 h-8 ${
                      task.status === "completed"
                        ? "bg-chart-2"
                        : task.status === "in-progress"
                        ? "bg-chart-4"
                        : "bg-muted-foreground"
                    }`}
                  />
                  <div className="flex-1">
                    <p className={`font-medium text-sm ${
                      task.status === "completed" ? "text-muted-foreground line-through" : "text-foreground"
                    }`}>
                      {task.title}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {task.due}
                    </p>
                  </div>
                  {task.status === "completed" && (
                    <CheckCircle className="h-4 w-4 text-chart-2" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <div className="mt-6">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-accent" />
            Recommendations for {child.name}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="border-2 hover:border-primary transition-all cursor-pointer">
              <CardContent className="pt-6">
                <div className="w-10 h-10 bg-secondary flex items-center justify-center mb-4">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">Focus on Reading</h3>
                <p className="text-sm text-muted-foreground">
                  Reading scores show room for improvement. Consider additional practice.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-primary transition-all cursor-pointer">
              <CardContent className="pt-6">
                <div className="w-10 h-10 bg-secondary flex items-center justify-center mb-4">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">Increase Study Time</h3>
                <p className="text-sm text-muted-foreground">
                  Adding 30 min/day could accelerate progress significantly.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-primary transition-all cursor-pointer">
              <CardContent className="pt-6">
                <div className="w-10 h-10 bg-secondary flex items-center justify-center mb-4">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">Mock Test Ready</h3>
                <p className="text-sm text-muted-foreground">
                  Schedule a full practice test to assess current readiness.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ParentDashboard;
