import { LinkRepo } from "@src/repos";
import { PromiseLink } from "@src/types";
import { generateShortId } from "@src/util";

export async function generateUniqueShortUrl(url: string): PromiseLink {
  let shortUrl = generateShortId(url);

  let fetchedLink = await LinkRepo.getFirst({
    where: { shortener: shortUrl },
  });

  while (fetchedLink) {
    shortUrl = generateShortId(url);
    fetchedLink = await LinkRepo.getFirst({
      where: { shortener: shortUrl },
    });
  }

  return LinkRepo.add({ url, shortener: shortUrl });
}
