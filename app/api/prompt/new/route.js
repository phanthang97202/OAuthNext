import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const { userId, prompt, tag } = await request.json();
  try {
    await connectToDB();
    // const newPrompt = new Prompt({
    //   creator: userId,
    //   prompt,
    //   tag,
    // });
    // await newPrompt.save();

    const newPrompt = await Prompt.create({
      creator: userId,
      prompt,
      tag,
    });

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed create new prompt", error, { status: 500 });
  }
};
