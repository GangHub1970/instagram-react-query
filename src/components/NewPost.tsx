"use client";

import { AuthUser } from "@/models/user";
import React, { useRef, useState } from "react";
import PostUserAvatar from "./PostUserAvatar";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCreateFetcher } from "@/lib/fetchers/post";
import DragAndDrop from "./DragAndDrop";
import Textarea from "./Textarea";
import GridSpinner from "./ui/GridSpinner";
import Button from "./ui/Button";

type Props = {
  user: AuthUser;
};

export default function NewPost({ user: { username, image } }: Props) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const { mutate, isPending, error } = useMutation({
    mutationFn: postCreateFetcher,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.push("/");
    },
  });

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("comment", JSON.stringify(commentRef.current?.value || ""));

    mutate(formData);
  };
  return (
    <section className="flex flex-col items-center mx-auto mt-12 w-full max-w-2xl">
      {isPending && (
        <div className="absolute inset-0 z-50 text-center content-center h-full bg-sky-500/20">
          <GridSpinner />
        </div>
      )}
      {error && (
        <p className="text-center p-4 mb-4 w-full font-bold bg-red-100 text-red-600">
          {error.message}
        </p>
      )}
      <PostUserAvatar username={username} image={image || ""} />
      <form className="flex flex-col my-8 w-full" onSubmit={handleSubmit}>
        <DragAndDrop
          file={file}
          onChange={handleFileSelect}
          description="Drag and Drop your image here or click."
        />
        <Textarea
          ref={commentRef}
          id="comment-upload"
          name="comment"
          rows={10}
          placeholder="Write a caption..."
          required
        />
        <Button text="submit" onClick={() => {}} />
      </form>
    </section>
  );
}
