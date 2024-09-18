import React from "react";

type AvatarSize = "sm" | "md" | "lg" | "xl";

type Props = {
  image?: string | null;
  highlight?: boolean;
  size?: AvatarSize;
};

export default function Avatar({
  image,
  highlight = false,
  size = "md",
}: Props) {
  const { containerClassName, imgClassName } = getAvatarClassName(
    size,
    highlight
  );

  return (
    <div className={containerClassName}>
      {/* 유저의 계정에 등록된 이미지 주소가 전달되고, 어떤 방법으로 로그인했냐에 따라 다르기 때문에 config 파일에 remotePattern을 등록할 수 없다.
      따라서 Next.js에서 제공하는 <Image>를 사용하지 않고 <img> 태그를 사용한다. */}
      <img
        src={image ?? undefined}
        alt="user's profile image"
        className={imgClassName}
        // 외부 링크에서 가져오는 이미지가 엑스박스로 뜨는 현상을 방지할 수 있다.
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

type AvatarSizeStyle = {
  containerClassName: string;
  imgClassName: string;
}

function getAvatarClassName(
  size: AvatarSize,
  highlight: boolean
): AvatarSizeStyle {
  const base = "rounded-full";
  let className;
  switch (size) {
    case "sm":
      className = "w-9 h-9";
      break;
    case "md":
      className = "w-12 h-12";
      break;
    case "lg":
      className = "w-16 h-16";
      break;
    case "xl":
      className = "w-40 h-40";
      break;
    default:
      throw new Error(`유효하지 않은 타입의 사이즈입니다. ${size}`);
  }
  return {
    containerClassName: `${base} ${className} ${
      highlight &&
      "p-[0.2rem] bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300"
    }`,
    imgClassName: `${base} ${
      highlight ? "p-[0.1rem] bg-white" : ""
    } object-cover w-full h-full`,
  };
}
