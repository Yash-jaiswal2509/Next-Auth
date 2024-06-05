"use client";

import { CardWrapper } from "./card-wrapper";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/verify-email";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

export const NewVerifcationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;
    
    if (!token) {
      setError("Token does not exist");
      return;
    }

    // In dev mode, useEffect gets called twice, so we need to check if the token is already verified
    newVerification(token)
      .then((data) => {
        setError(data.error);
        setSuccess(data.sucess);
      })
      .catch(() => {
        setError("An error occurred");
      });
  }, [token, success, error]);

  useEffect(() => onSubmit(), [onSubmit]);
  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to Login"
      backButtonHref="/auth/login"
    >
      <div className="flex w-full items-center justify-center">
        {!success && !error && <BeatLoader color="#2563EB" />}
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  );
};
