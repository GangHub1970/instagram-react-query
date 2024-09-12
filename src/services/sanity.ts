import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-09-10",
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
  useCdn: false,
});

const builder = imageUrlBuilder(client);

// sanity에 저장된 이미지를 가져올 때 asset에서 직접 가져오면 최적화되지 않은 이미지를 사용하게 된다.
// 그렇기 때문에 @sanity/image-url 라이브러리를 사용해서 이미지 주소를 받아온다.
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
