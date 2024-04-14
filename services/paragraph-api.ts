const paragraphApi = {
  getRandomParagraph: async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_PARAGRAPH_API_URL);
    return await response.text();
  },
};

export default paragraphApi;
