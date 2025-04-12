import Image from "next/image";
import { SignIn } from "@clerk/nextjs";
import { X } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row-reverse">
          {/* Right Image */}
          <div className="w-full md:w-1/2 relative bg-pink-100">
          
            <div className="relative w-full h-[400px] md:h-full bg-white">
              <Image
                src="/boy.png"
                alt="Boy illustration"
                fill
                className="object-cover rounded-none md:rounded-l-3xl"
              />
            </div>
          </div>

          {/* SignIn Form on Left */}
          <div className="w-full md:w-1/2 p-8 flex items-center justify-center">
            <div className="w-full max-w-md">
              <SignIn
                appearance={{
                  variables: {
                    colorPrimary: "#ec4899",
                    colorText: "#111827",
                    colorBackground: "#ffffff",
                    colorInputBackground: "#fff",
                    colorInputText: "#111827",
                    colorInputPlaceholder: "#6B7280",
                    colorAlphaShade: "#fce7f3",
                  },
                  elements: {
                    card: "bg-white shadow-xl rounded-2xl px-6 py-8",
                    formButtonPrimary:
                      "bg-pink-500 hover:bg-pink-600 text-white rounded-xl py-3 text-sm font-medium",
                    formFieldInput:
                      "border border-gray-200 rounded-xl px-4 py-3 placeholder-gray-500",
                    footerActionLink:
                      "text-pink-500 hover:text-pink-600 font-medium",
                    socialButtonsBlockButton:
                      "border border-gray-200 hover:bg-gray-50 rounded-xl text-gray-700",
                    headerTitle: "text-3xl font-bold",
                    headerSubtitle: "text-gray-600 text-sm",
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
