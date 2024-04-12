export const paragraphApi = {
  getRandomParagraph: async () => {
    const response = await fetch(process.env.PARAGRAPH_API_URL);
    return await response.text();
  },
};
