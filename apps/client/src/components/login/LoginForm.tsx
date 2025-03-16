import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PenTool, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@repo/ui";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui";
import { Input } from "@repo/ui";
import ShapesDecoration from "~/components/neutral/ShapeDecoration";
import { UserLoginInput, TUserLoginInput } from "@repo/types";
import { useAuth } from "~/hooks/useAuth";
import { useToast } from "@repo/ui";

console.log(UserLoginInput);

export default function LoginPage() {
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<TUserLoginInput>({
    resolver: zodResolver(UserLoginInput),
    defaultValues: {
      identifier: "",
      password: "",
    },
    mode: "onBlur", // Validate fields when they lose focus for better UX
  });

  const { isSubmitting, errors } = form.formState;

  async function onSubmit(data: TUserLoginInput) {
    try {
      await login(data);

      toast({
        title: "Welcome back!",
        description: "You've successfully logged in to Smart Draw.",
        duration: 5000,
      });

      // Navigate to dashboard after successful login
      navigate("/dashboard");
    } catch (error) {
      // Display error using toast notification only
      const errorMessage =
        error.message || "Something went wrong. Please try again.";

      toast({
        title: "Login Failed",
        description: errorMessage,
        duration: 5000,
        variant: "destructive",
      });
    }
  }

  return (
    <div className="relative min-h-screen bg-[#FFFAE0] overflow-hidden">
      <ShapesDecoration />

      {/* Navigation */}
      <header className="relative z-10 px-6 py-4 border-b-4 border-black bg-[#FFFAE0] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <PenTool className="h-8 w-8" />
            <h1 className="text-2xl font-black tracking-tight">SMART DRAW</h1>
          </Link>
        </div>
      </header>

      <main className="relative z-10 px-6 py-12">
        <div className="max-w-md mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-black mb-2">
              <span className="bg-[#A0D2EB] px-3 py-1 inline-block transform rotate-1">
                Welcome Back!
              </span>
            </h2>
            <p className="text-lg">Log in to your Smart Draw account</p>
          </div>

          <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="identifier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-bold">
                        Username or Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border-3 border-black focus-visible:ring-[#A0D2EB] focus-visible:ring-offset-2"
                          placeholder="username or email@example.com"
                          disabled={isSubmitting}
                          autoComplete="username"
                          aria-invalid={!!errors.identifier}
                        />
                      </FormControl>
                      <FormMessage className="font-medium text-[#FF4A6E]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center">
                        <FormLabel className="text-lg font-bold">
                          Password
                        </FormLabel>
                        <Link
                          to="/forgot-password"
                          className="text-sm font-medium text-[#FF90B3] hover:underline"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          className="border-3 border-black focus-visible:ring-[#A0D2EB] focus-visible:ring-offset-2"
                          placeholder="••••••••"
                          disabled={isSubmitting}
                          autoComplete="current-password"
                          aria-invalid={!!errors.password}
                        />
                      </FormControl>
                      <FormMessage className="font-medium text-[#FF4A6E]" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-lg font-bold border-3 border-black bg-[#A0D2EB] hover:bg-[#8BC0E0] shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    <>
                      Log In <ArrowRight className="ml-2" />
                    </>
                  )}
                </Button>

                <div className="text-center pt-2">
                  <p>
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="font-bold text-[#FF90B3] hover:underline"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>
    </div>
  );
}
