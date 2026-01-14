import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Users, ArrowLeft, Eye, EyeOff } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<"student" | "parent">("student");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo, navigate to onboarding for new users or dashboard for existing
    if (isLogin) {
      navigate(userType === "student" ? "/student-dashboard" : "/parent-dashboard");
    } else {
      navigate("/onboarding", { state: { userType } });
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary p-12 flex-col justify-between">
        <div>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </button>
        </div>
        
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 border-3 border-primary-foreground flex items-center justify-center">
              <div className="w-6 h-6 bg-accent" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary-foreground">THE ADMISSIONS</h1>
              <h1 className="text-3xl font-bold text-primary-foreground">STUDIO</h1>
            </div>
          </div>
          <p className="text-xl text-primary-foreground/80 max-w-md">
            AI-powered SAT preparation that adapts to your learning style and guarantees results.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 text-primary-foreground/80">
            <div className="w-2 h-2 bg-accent" />
            <span>Data-driven Learning</span>
          </div>
          <div className="flex items-center gap-3 text-primary-foreground/80">
            <div className="w-2 h-2 bg-accent" />
            <span>Human Insight</span>
          </div>
          <div className="flex items-center gap-3 text-primary-foreground/80">
            <div className="w-2 h-2 bg-accent" />
            <span>AI Precision</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 border-2 border-primary flex items-center justify-center">
                <div className="w-4 h-4 bg-accent" />
              </div>
              <span className="font-bold text-xl text-foreground">THE ADMISSIONS STUDIO</span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              {isLogin ? "Welcome back" : "Create your account"}
            </h2>
            <p className="text-muted-foreground">
              {isLogin
                ? "Sign in to continue your learning journey"
                : "Join The Admissions Studio today"}
            </p>
          </div>

          {/* User Type Toggle */}
          <div className="mb-6">
            <Label className="text-sm font-medium text-foreground mb-3 block">I am a</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setUserType("student")}
                className={`p-4 border-2 flex flex-col items-center gap-2 transition-all ${
                  userType === "student"
                    ? "border-primary bg-secondary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <GraduationCap className={`h-6 w-6 ${userType === "student" ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`font-medium ${userType === "student" ? "text-primary" : "text-foreground"}`}>
                  Student
                </span>
              </button>
              <button
                onClick={() => setUserType("parent")}
                className={`p-4 border-2 flex flex-col items-center gap-2 transition-all ${
                  userType === "parent"
                    ? "border-primary bg-secondary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <Users className={`h-6 w-6 ${userType === "parent" ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`font-medium ${userType === "parent" ? "text-primary" : "text-foreground"}`}>
                  Parent
                </span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required={!isLogin}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg">
              {isLogin ? "Sign In" : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline font-medium"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
