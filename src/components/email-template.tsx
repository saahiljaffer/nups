/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import * as React from "react";

interface EmailTemplateProps {
  token: string;
  firstName: string;
}

export const EmailTemplate = ({ token, firstName }: EmailTemplateProps) => (
  <div>
    <h1>Salaams, {firstName}!</h1>
    <p>You are Invited!</p>
    <a href={token}>Click here to RSVP!</a>
    <img src="https://nups.us/card.png" height={500} width={375} alt="card" />
  </div>
);
