"use client";

import { Button } from "@/components/ui/button";
import {
  SignIn,
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
  useOrganization,
  useUser,
} from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const organization = useOrganization();
  const user = useUser();

  let orgId: string | undefined = undefined;

  // seperating orgId and userId logic
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const getfiles = useQuery(
    api.files.getAllFiles,
    organization.organization?.id
      ? { orgId: organization.organization.id }
      : "skip"
  );

  const createFile = useMutation(api.files.createFile);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignedOut>
        <SignInButton>
          <Button>SignIn</Button>
        </SignInButton>
      </SignedOut>

      <Button
        onClick={() => {
          if (!orgId) return;
          createFile({ name: "New File", orgId: orgId });
        }}
      >
        Click to Upload
      </Button>

      <div className="">
        {getfiles?.map((file) => {
          return (
            <div key={file._id}>
              {file._id}
              {file.name}
            </div>
          );
        })}
      </div>
    </main>
  );
}
