/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
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
import { UserRegisterInput, TUserRegistrationInput } from "@repo/types";

import { useToast } from "@repo/ui";
import NavBar from "../neutral/NavBar";
import apiClient from "~/api/apiClient";

export default function RegisterPage() {
  const { toast } = useToast();
  // const navigate = useNavigate();

  const form = useForm<TUserRegistrationInput>({
    resolver: zodResolver(UserRegisterInput),
    defaultValues: {
      name: "",
      password: "",
      email: "",
      username: "",
    },
    mode: "onBlur", // Validate fields when they lose focus for better UX
  });

  const { isSubmitting, errors } = form.formState;

  async function onSubmit(data: TUserRegistrationInput) {
    try {
      const res = await apiClient.register(data);

      toast({
        title: "Email Verification Needed!",
        description: "Please check your email to verify your account.",
        duration: 5000,
      });

      // Navigate to dashboard after successful login
      // navigate("/dashboard");
      // console.log("Registration successful", res);
    } catch (error: any) {
      // Display error using toast notification only
      // console.log("error", error);
      // console.log("meesage", error.response?.data?.message);
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      toast({
        title: "Account Creation Failed",
        description: errorMessage,
        duration: 5000,
        variant: "destructive",
      });
    } finally {
      form.reset();
    }
  }

  return (
    <div className="relative min-h-screen bg-[#FFFAE0] overflow-hidden">
      <ShapesDecoration />

      <div className="z-20">
        <NavBar />
      </div>

      <main className="relative z-10 px-6 py-12">
        <div className="max-w-md mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-black mb-2">
              <span className="bg-[#A0D2EB] px-3 py-1 inline-block transform rotate-1">
                Create an Account to get started!
              </span>
            </h2>
            <p className="text-lg">Create your Smart Draw account</p>
          </div>

          <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-bold">Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border-2 border-black focus-visible:ring-[#A0D2EB] focus-visible:ring-offset-2"
                          placeholder="Mayank Tiwari"
                          disabled={isSubmitting}
                          autoComplete="name"
                          aria-invalid={!!errors.name}
                        />
                      </FormControl>
                      <FormMessage className="font-medium text-[#FF4A6E]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center">
                        <FormLabel className="text-lg font-bold">
                          Email
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          className="border-2 border-black focus-visible:ring-[#A0D2EB] focus-visible:ring-offset-2"
                          placeholder="mayank@gmail.com"
                          disabled={isSubmitting}
                          autoComplete="current-password"
                          aria-invalid={!!errors.email}
                        />
                      </FormControl>
                      <FormMessage className="font-medium text-[#FF4A6E]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center">
                        <FormLabel className="text-lg font-bold">
                          Username
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          className="border-2 border-black focus-visible:ring-[#A0D2EB] focus-visible:ring-offset-2"
                          placeholder="mayank"
                          disabled={isSubmitting}
                          autoComplete="current-password"
                          aria-invalid={!!errors.username}
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
                      </div>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          className="border-2 border-black focus-visible:ring-[#A0D2EB] focus-visible:ring-offset-2"
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
                  className="w-full text-lg font-bold"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create your Account <ArrowRight className="ml-2" />
                    </>
                  )}
                </Button>

                <div className="text-center pt-2">
                  <p>
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="font-bold text-[#FF90B3] hover:underline"
                    >
                      Login
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
