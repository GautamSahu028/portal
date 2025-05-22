"use client";

import { Button } from "@/components/ui/button";
import { logOut } from "../actions";

export function LogOutButton() {
  return (
    <Button
      className="bg-red-500 text-white hover:bg-red-800 hover:cursor-pointer"
      onClick={async () => await logOut()}
    >
      Log Out
    </Button>
  );
}
