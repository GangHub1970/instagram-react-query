import React from "react";

type Props = {
  image?: string | null;
};

export default function Avatar({ image }: Props) {
  return (
    <div className="p-[0.2rem] w-9 h-9 rounded-full bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300">
      {/* 유저의 계정에 등록된 이미지 주소가 전달되고, 어떤 방법으로 로그인했냐에 따라 다르기 때문에 config 파일에 remotePattern을 등록할 수 없다.
      따라서 Next.js에서 제공하는 <Image>를 사용하지 않고 <img> 태그를 사용한다. */}
      <img
        src={image ?? undefined}
        alt="user's profile image"
        className="rounded-full"
        // 외부 링크에서 가져오는 이미지가 엑스박스로 뜨는 현상을 방지할 수 있다.
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
