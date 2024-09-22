import React, { useOptimistic } from "react";

type Props = {
  posts: number;
  followers: number;
  following: number;
};

// INFOS 배열을 const로 선언하여, 각 요소가 리터럴 타입으로 처리되게 함
const INFOS = ["posts", "followers", "following"] as const;

export default function UserInfo({ posts, followers, following }: Props) {
  const [optimisticState, addOptimistic] = useOptimistic(
    { posts, followers, following },
    (currentState, optimisticValue: number) => ({
      ...currentState,
      followers: optimisticValue,
    })
  );

  return (
    <ul className="flex gap-4 my-4">
      {INFOS.map((info, index) => (
        <li key={index}>
          <span className="mr-1 font-bold">{optimisticState[info]}</span>
          {info}
        </li>
      ))}
    </ul>
  );
}
