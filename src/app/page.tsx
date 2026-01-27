"use client";
import Image from "next/image";
import ArrowButton from "@/app/components/Button";
import LoginImg from "../../public/assets/curvedMainImg.png";
import logo from "../assets/images/Logo2.png";
import { Eye, EyeOff } from "lucide-react";
import React, { useEffect, useState } from "react";
import InputField from "./components/InputField";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { loginAction } from "@/actions";
// import Loader from "./admin/components/ui/Loader";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, startTransition] = React.useTransition();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/authority");
    }
  }, [session, router]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
    if (!email && !password) {
      toast.error("Email and Password are required.");
      setLoading(false);
      return;
    }
    if (email && !password) {
      toast.error("Password is required.");
      setLoading(false);
      return;
    }
    if (!email && password) {
      toast.error("Email is required.");
      setLoading(false);
      return;
    }
    startTransition(async () => {
      setLoading(true);
      try {
        const response = await loginAction({ email, password });
        if (response?.success) {
          toast.success("Logged in successfully");
          router.push("/authority");
        } else if (response?.message === "Invalid password") {
          toast.error(response?.message);
        } else {
          console.error("Login failed: ", response);
          toast.error("User Not Found.");
        }
      } catch (error) {
        console.error("Login action error:", error);
        toast.error("Something went wrong! Please try again.");
      } finally {
        setLoading(false);
      }
    });
     }, 100); 
  };

  return (
    <>
      {loading ? (
        // <Loader />
        <div>Loading...</div>
      ) : (
        <>
          <div className="w-full h-screen bg-neutral-900 relative overflow-hidden font-body flex justify-center items-center">
            {/* Blurred glow background */}
            <div className="absolute w-[916px] h-[916px] left-1/2 top-[54px] -translate-x-1/2 bg-rose-200/20 blur-[250px]" />

            {/* Auth section */}
            <div className="relative z-10 flex w-full max-w-6xl bg-transparent rounded-xl overflow-hidden flex-col md:flex-row-reverse h-full md:h-[550px] md:p-6 gap-x-16">
              {/* Left side: Image */}
              <div className="hidden md:flex flex-1 relative w-full h-auto overflow-hidden rounded-xl">
                <Image
                  src={LoginImg}
                  alt="Illustration"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Right side: Login form */}
              <div className="flex-1 flex flex-col justify-center gap-5 px-6 sm:px-8 py-10 w-full">
                {/* Logo */}
                <div className="w-full flex justify-start">
                  <Image
                    src={logo}
                    alt="logo"
                    className="w-30 h-20 sm:w-30 sm:h-20 md:w-30 md:h-20 transition-all"
                  />
                </div>

                {/* Heading */}
                <div className="flex flex-col gap-2">
                  <h1 className="text-stone-200 text-3xl font-extrabold font-heading capitalize">
                    Login To Your ID
                  </h1>
                  <p className="text-zinc-400 text-base font-normal">
                    Kindly provide your login details to access your account!
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-5">
                    <InputField
                      value={email}
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="Email Address"
                    />

                    <div className="relative w-full">
                      <InputField
                        value={password}
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="pr-12"
                      />
                      <div
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 cursor-pointer"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </div>
                    </div>

                    <ArrowButton type="submit" text="Login" />

                    <div className="flex justify-center items-center text-zinc-400 text-base flex-wrap gap-2">
                      <label className="flex items-center gap-2"></label>
                      <button
                        type="button"
                        onClick={() => router.push("/forgot-password")}
                        className="underline text-[#ffccd3] hover:text-[#ffccd3] hover:opacity-90 transition duration-200 ease-in-out cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffccd3]"
                      >
                        Forgot Password?
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
