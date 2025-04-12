"use client";
export const dynamic = "force-dynamic";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useMutation } from "convex/react";
import { CheckCircle2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";

function UpgardePlans() {
  const upgradeUserPlan = useMutation(api.user.userUpgradePlan);
  const { user } = useUser();
  const OnPaymentSuccess = async () => {
    const result = await upgradeUserPlan({
      userEmail: user?.primaryEmailAddress?.emailAddress,
    });
    console.log(result);
    toast("Plan upgraded successfully");
  };
  return (
    // <div className="p-5">
    //   <h2 className="font-medium text-3xl">Plans</h2>
    //   <p>Upgarde your plan to upload multiple pdf to take notes</p>
    //   <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
    //     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
    //       <div className="rounded-2xl border border-indigo-600 p-6 shadow-xs ring-1 ring-indigo-600 sm:order-last sm:px-8 lg:p-12">
    //         <div className="text-center">
    //           <h2 className="text-lg font-medium text-gray-900">
    //             Pro
    //             <span className="sr-only">Plan</span>
    //           </h2>

    //           <p className="mt-2 sm:mt-4">
    //             <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
    //               {" "}
    //               30${" "}
    //             </strong>

    //             <span className="text-sm font-medium text-gray-700">
    //               /month
    //             </span>
    //           </p>
    //         </div>

    //         <ul className="mt-6 space-y-2">
    //           <li className="flex items-center gap-1">
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               fill="none"
    //               viewBox="0 0 24 24"
    //               strokeWidth="1.5"
    //               stroke="currentColor"
    //               className="size-5 text-indigo-700 shadow-sm"
    //             >
    //               <path
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 d="M4.5 12.75l6 6 9-13.5"
    //               />
    //             </svg>

    //             <span className="text-gray-700"> 20 users included </span>
    //           </li>

    //           <li className="flex items-center gap-1">
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               fill="none"
    //               viewBox="0 0 24 24"
    //               strokeWidth="1.5"
    //               stroke="currentColor"
    //               className="size-5 text-indigo-700 shadow-sm"
    //             >
    //               <path
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 d="M4.5 12.75l6 6 9-13.5"
    //               />
    //             </svg>

    //             <span className="text-gray-700"> 5GB of storage </span>
    //           </li>

    //           <li className="flex items-center gap-1">
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               fill="none"
    //               viewBox="0 0 24 24"
    //               strokeWidth="1.5"
    //               stroke="currentColor"
    //               className="size-5 text-indigo-700 shadow-sm"
    //             >
    //               <path
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 d="M4.5 12.75l6 6 9-13.5"
    //               />
    //             </svg>

    //             <span className="text-gray-700"> Email support </span>
    //           </li>

    //           <li className="flex items-center gap-1">
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               fill="none"
    //               viewBox="0 0 24 24"
    //               strokeWidth="1.5"
    //               stroke="currentColor"
    //               className="size-5 text-indigo-700 shadow-sm"
    //             >
    //               <path
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 d="M4.5 12.75l6 6 9-13.5"
    //               />
    //             </svg>

    //             <span className="text-gray-700"> Help center access </span>
    //           </li>

    //           <li className="flex items-center gap-1">
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               fill="none"
    //               viewBox="0 0 24 24"
    //               strokeWidth="1.5"
    //               stroke="currentColor"
    //               className="size-5 text-indigo-700 shadow-sm"
    //             >
    //               <path
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 d="M4.5 12.75l6 6 9-13.5"
    //               />
    //             </svg>

    //             <span className="text-gray-700"> Phone support </span>
    //           </li>

    //           <li className="flex items-center gap-1">
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               fill="none"
    //               viewBox="0 0 24 24"
    //               strokeWidth="1.5"
    //               stroke="currentColor"
    //               className="size-5 text-indigo-700 shadow-sm"
    //             >
    //               <path
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 d="M4.5 12.75l6 6 9-13.5"
    //               />
    //             </svg>

    //             <span className="text-gray-700"> Community access </span>
    //           </li>
    //         </ul>

    //         {/* <a
    //           href="#"
    //           className="mt-8 block rounded-full border border-indigo-600 bg-indigo-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-indigo-700 hover:ring-1 hover:ring-indigo-700 focus:ring-3 focus:outline-hidden"
    //         >
    //           Get Started
    //         </a> */}
    //         <div className="mt-5">
    //           <PayPalButtons
    //             onApprove={() => OnPaymentSuccess()}
    //             onCancel={() => console.log("Payment Cancel")}
    //             createOrder={(data, actions) => {
    //               return actions?.order?.create({
    //                 purchase_units: [
    //                   {
    //                     amount: {
    //                       value: 9.99,
    //                       currency_code: "USD",
    //                     },
    //                   },
    //                 ],
    //               });
    //             }}
    //           />
    //         </div>
    //       </div>

    //       <div className="rounded-2xl border border-gray-200 p-6 shadow-xs sm:px-8 lg:p-12">
    //         <div className="text-center">
    //           <h2 className="text-lg font-medium text-gray-900">
    //             Starter
    //             <span className="sr-only">Plan</span>
    //           </h2>

    //           <p className="mt-2 sm:mt-4">
    //             <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
    //               {" "}
    //               20${" "}
    //             </strong>

    //             <span className="text-sm font-medium text-gray-700">
    //               /month
    //             </span>
    //           </p>
    //         </div>

    //         <ul className="mt-6 space-y-2">
    //           <li className="flex items-center gap-1">
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               fill="none"
    //               viewBox="0 0 24 24"
    //               strokeWidth="1.5"
    //               stroke="currentColor"
    //               className="size-5 text-indigo-700 shadow-sm"
    //             >
    //               <path
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 d="M4.5 12.75l6 6 9-13.5"
    //               />
    //             </svg>

    //             <span className="text-gray-700"> 10 users included </span>
    //           </li>

    //           <li className="flex items-center gap-1">
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               fill="none"
    //               viewBox="0 0 24 24"
    //               strokeWidth="1.5"
    //               stroke="currentColor"
    //               className="size-5 text-indigo-700 shadow-sm"
    //             >
    //               <path
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 d="M4.5 12.75l6 6 9-13.5"
    //               />
    //             </svg>

    //             <span className="text-gray-700"> 2GB of storage </span>
    //           </li>

    //           <li className="flex items-center gap-1">
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               fill="none"
    //               viewBox="0 0 24 24"
    //               strokeWidth="1.5"
    //               stroke="currentColor"
    //               className="size-5 text-indigo-700 shadow-sm"
    //             >
    //               <path
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 d="M4.5 12.75l6 6 9-13.5"
    //               />
    //             </svg>

    //             <span className="text-gray-700"> Email support </span>
    //           </li>

    //           <li className="flex items-center gap-1">
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               fill="none"
    //               viewBox="0 0 24 24"
    //               strokeWidth="1.5"
    //               stroke="currentColor"
    //               className="size-5 text-indigo-700 shadow-sm"
    //             >
    //               <path
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 d="M4.5 12.75l6 6 9-13.5"
    //               />
    //             </svg>

    //             <span className="text-gray-700"> Help center access </span>
    //           </li>
    //         </ul>

    //         <a
    //           href="#"
    //           className="mt-8 block rounded-full border border-indigo-600 bg-white px-12 py-3 text-center text-sm font-medium text-indigo-600 hover:ring-1 hover:ring-indigo-600 focus:ring-3 focus:outline-hidden"
    //         >
    //           Get Started
    //         </a>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <section className="py-10 relative">
    <div className="container mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Choose Your Plan
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            name: "Starter",
            price: "Free",
            features: [
              "5 PDF uploads per month",
              "3 YouTube video summaries",
              "Basic AI chat",
              "Email support",
            ],
          },
          {
            name: "Pro",
            price: "$29",
            popular: true,
            features: [
              "Unlimited PDF uploads",
              "Unlimited video summaries",
              "Advanced AI chat",
              "Priority support",
              "Custom API access",
            ],
          },
          {
            name: "Enterprise",
            price: "Custom",
            features: [
              "Everything in Pro",
              "Custom integrations",
              "Dedicated account manager",
              "SLA guarantee",
              "Custom AI training",
            ],
          },
        ].map((plan, index) => (
          <div
            key={index}
            className={`relative p-8 rounded-2xl border ${
              plan.popular
                ? "border-purple-500 bg-gradient-to-br from-purple-900/50 to-transparent"
                : "border-purple-500/20 bg-gradient-to-br from-purple-900/30 to-transparent"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-1 rounded-full text-sm">
                Most Popular
              </div>
            )}
  
            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <div className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {plan.price}
              {plan.price !== "Custom" && (
                <span className="text-lg text-gray-400">/mo</span>
              )}
            </div>
  
            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-purple-400 mr-2" />
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
  
            {/* Conditional PayPal or Get Started */}
            {plan.popular ? (
              <PayPalButtons
                onApprove={() => OnPaymentSuccess()}
                onCancel={() => console.log("Payment Cancel")}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: "29.00", // Match Pro plan price
                          currency_code: "USD",
                        },
                      },
                    ],
                  });
                }}
              />
            ) : (
              <button
                className={`w-full py-3 rounded-full ${
                  plan.popular
                    ? "bg-gradient-to-r from-purple-500 to-pink-500"
                    : "border border-purple-500/30 hover:bg-purple-500/10"
                } transition-all`}
              >
                Get Started
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
  
  
  );
}

export default UpgardePlans;
