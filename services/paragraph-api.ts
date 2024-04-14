import { WRITER_DURATION } from "@/CONSTANTS";

const paragraphApi = {
  getRandomWords: async (wordCount = WRITER_DURATION + 10): Promise<string[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_PARAGRAPH_API_URL}?words=${wordCount}`, {
      cache: "no-cache",
    });
    return await response.json();
  },
};

export default paragraphApi;
