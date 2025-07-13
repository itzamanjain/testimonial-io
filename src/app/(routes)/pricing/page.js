"use client"
import React from 'react'
import { PricingCard } from "@/components/ui/dark-gradient-pricing"
import Navbar from '@/components/Navbar'


const page = () => {
  return (
      <section className="relative overflow-hidden p-8 bg-background text-foreground">
        <Navbar />
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-20 md:px-8">
        <div className="mb-12 space-y-3">
          <h2 className="text-center text-3xl font-semibold leading-tight sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
            Pricing
          </h2>
          <p className="text-center text-base text-muted-foreground md:text-lg">
            Use it for free for yourself, upgrade when your team needs advanced
            control.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <PricingCard
            tier="Free"
            price="$0/mo"
            bestFor="Best for 1-5 users"
            CTA="Get started free"
            benefits={[
              { text: "One workspace", checked: true },
              { text: "Email support", checked: true },
              { text: "1 day data retention", checked: false },
              { text: "Custom roles", checked: false },
              { text: "Priority support", checked: false },
              { text: "SSO", checked: false },
            ]}
          />
          <PricingCard
            tier="Pro"
            price="$79/mo"
            bestFor="Best for 5-50 users"
            CTA="14-day free trial"
            benefits={[
              { text: "Five workspaces", checked: true },
              { text: "Email support", checked: true },
              { text: "7 day data retention", checked: true },
              { text: "Custom roles", checked: true },
              { text: "Priority support", checked: false },
              { text: "SSO", checked: false },
            ]}
          />
          <PricingCard
            tier="Enterprise"
            price="Contact us"
            bestFor="Best for 50+ users"
            CTA="Contact us"
            benefits={[
              { text: "Unlimited workspaces", checked: true },
              { text: "Email support", checked: true },
              { text: "30 day data retention", checked: true },
              { text: "Custom roles", checked: true },
              { text: "Priority support", checked: true },
              { text: "SSO", checked: true },
            ]}
          />
        </div>
      </div>
    </section>
  )
}

export default page


