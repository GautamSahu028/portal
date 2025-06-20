"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { signUpSchema } from "../schemas";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { signUp } from "../actions";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserCheck,
  GraduationCap,
} from "lucide-react";

// Infer TypeScript type from Zod schema
type Inputs = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const [error, setError] = useState<string | undefined>();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<Inputs>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: undefined,
    },
  });

  const onSubmit = async (data: Inputs) => {
    setIsLoading(true);
    const error = await signUp(data);
    setError(error);
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            <p className="text-red-200 text-sm">{error}</p>
          </div>
        )}

        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white font-medium">
                Full Name
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:bg-white/15 rounded-lg h-12"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-red-200" />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white font-medium">
                Email Address
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:bg-white/15 rounded-lg h-12"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-red-200" />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white font-medium">Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:bg-white/15 rounded-lg h-12"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="text-red-200" />
            </FormItem>
          )}
        />

        {/* Role Dropdown */}
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white font-medium">
                Account Type
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4 z-10" />
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="hover:cursor-pointer pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40 focus:bg-white/15 rounded-lg h-12 backdrop-blur-sm transition-all duration-200 hover:bg-white/15">
                      <SelectValue
                        placeholder="Select your role"
                        className="text-white"
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-transparent backdrop-blur-xl border border-white/20 shadow-2xl rounded-lg overflow-hidden">
                      <SelectItem
                        value="FACULTY"
                        className="hover:bg-white/15 focus:bg-white/15 text-white hover:text-white focus:text-white cursor-pointer transition-all duration-200 px-4 py-3 border-b border-white/10 last:border-b-0"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-white font-medium">
                            Faculty Member
                          </span>
                        </div>
                      </SelectItem>

                      <SelectItem
                        value="STUDENT"
                        className="hover:bg-white/15 focus:bg-white/15 text-white hover:text-white focus:text-white cursor-pointer transition-all duration-200 px-4 py-3"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-white font-medium">
                            Student
                          </span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </FormControl>
              <FormMessage className="text-red-200" />
            </FormItem>
          )}
        />

        <div className="flex flex-col space-y-4 pt-2">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white/20 hover:bg-white/30 text-white border-0 rounded-lg h-12 font-semibold transition-all duration-200 hover:scale-105 hover:cursor-pointer"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>

          <div className="text-center"></div>
        </div>
      </form>
    </Form>
  );
}
