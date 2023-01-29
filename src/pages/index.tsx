import { TRPCClientError } from "@trpc/client";
import { DefaultErrorShape, TRPCError } from "@trpc/server";
import classNames from "classnames";
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Alert } from "../components/Alert";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Label } from "../components/Label";

import { api } from "../utils/api";

const Home: NextPage = () => {
  const subscribe = api.subscription.subscribe.useMutation({
    onSuccess() {
      return router.push("/success");
    },
  });
  const [form, setForm] = useState({ email: "" });
  const router = useRouter();

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    subscribe.mutate({
      email: form.email,
    });
  }

  const emailError = subscribe.error?.data?.zodError?.fieldErrors.email?.[0];

  return (
    <>
      <Head>
        <title>Subscribe | WebDevCody</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container m-auto flex flex-col items-center justify-center gap-8 p-4 pt-20">
        <Image
          className="rounded-full"
          alt="web dev cody brand image"
          src="/wdc.jpeg"
          width="100"
          height="100"
        />

        <h1 className="text-center text-4xl font-bold">
          Subscribe to the
          <br /> WebDevCody Newsletter
        </h1>

        <p className="text-wdc-secondary max-w-screen-sm text-center text-xl">
          Subscribe to my newsletter and receive weekly updates on any community
          projects we are starting, recently published videos, and updates on
          new tutorials and courses.
        </p>

        {subscribe.error && (
          <Alert>Please correct the errors in the form below.</Alert>
        )}

        <form onSubmit={handleSubscribe} className="flex flex-col gap-6">
          <fieldset className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              className={classNames(
                "w-80",
                emailError && "border border-red-400"
              )}
              placeholder="your-email@example.com"
              onChange={(e) => setForm({ email: e.currentTarget.value })}
              id="email"
              name="email"
              data-testid="email-input"
              required
              type="email"
            />
            <span className="text-red-400">{emailError}</span>
          </fieldset>
          <Button
            data-testid="subscribe-button"
            isLoading={subscribe.isLoading}
          >
            {subscribe.isLoading ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </main>
    </>
  );
};

export default Home;
