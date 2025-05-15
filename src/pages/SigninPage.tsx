import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";

const SignInPage: React.FC = () => {
  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    window.location.href = "http://localhost:8000/api/v1/auth/google";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[350px] shadow-lg bg-card">
          <CardHeader>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <CardTitle className="text-2xl text-center text-foreground">
                Welcome
              </CardTitle>
              <CardDescription className="text-center mt-2 text-muted-foreground">
                Sign in to manage your expenses
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent className="flex justify-center">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="outline"
                size="lg"
                className="flex items-center gap-2 h-12 px-6 bg-background"
                onClick={handleGoogleSignIn}
              >
                <motion.div
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <FcGoogle size={24} />
                </motion.div>
                <span className="text-foreground">Sign in with Google</span>
              </Button>
            </motion.div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-sm text-muted-foreground"
            >
              Secure and easy login
            </motion.p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default SignInPage;
