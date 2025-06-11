import { SIGNIN_URL } from "@/lib/constants";
import { TrendingUp, PieChart, Wallet } from "lucide-react";

const SignInPage = () => {
  const handleGoogleSignIn = async () => {
    window.location.href = SIGNIN_URL;
  };

  return (
    <div className="h-screen w-full flex items-center justify-center px-4 py-6 bg-gradient-to-br from-background via-accent/5 to-primary/5">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl shadow-xl p-8 space-y-8">
          {/* Header with Logo */}
          <div className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center mb-6 shadow-lg">
              <Wallet className="w-10 h-10 text-primary-foreground" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">
                FinanceFlow
              </h1>
              <p className="text-muted-foreground text-lg">
                Your Smart Finance Management Platform
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-muted-foreground">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm">
                Track expenses and income effortlessly
              </span>
            </div>
            <div className="flex items-center space-x-3 text-muted-foreground">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <PieChart className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm">Visualize your spending patterns</span>
            </div>
            <div className="flex items-center space-x-3 text-muted-foreground">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Wallet className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm">
                Set budgets and achieve financial goals
              </span>
            </div>
          </div>

          {/* Welcome Message */}
          {/* <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold text-foreground">
              Welcome Back
            </h2>
            <p className="text-muted-foreground text-sm">
              Sign in to continue managing your finances with ease
            </p>
          </div> */}

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full py-4 px-6 bg-background hover:bg-accent border border-input rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-3 shadow-sm hover:shadow-md"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="text-foreground font-semibold">
              Continue with Google
            </span>
          </button>

          {/* Security Note */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              🔒 Secure authentication powered by Google
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 space-y-2">
          <p className="text-xs text-muted-foreground">
            By signing in, you agree to our{" "}
            <button className="text-primary hover:underline">
              Terms of Service
            </button>{" "}
            and{" "}
            <button className="text-primary hover:underline">
              Privacy Policy
            </button>
          </p>
          <p className="text-xs text-muted-foreground">
            Take control of your financial future today
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
