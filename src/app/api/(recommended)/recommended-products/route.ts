import connectDB from "@/config/db/connectDB";
import Product from "@/models/product.model/product.model";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET() {
  try {
    await connectDB();

    // Google Gemini API Configuration
    const apiKey: string = process.env.GEMINI_API_KEY || "";
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Fetch 10 random products from DB
    const randomProducts = await Product.aggregate([{ $sample: { size: 10 } }]);

    // Generate AI-based filtering prompt
    const productNames = randomProducts.map((p) => p.title).join(", ");
    const aiPrompt = `Here are 10 random products: ${productNames}. Select the 6 best products that would be great recommendations for general users. Return only the product names as a comma-separated list.`;

    // Call Google Gemini API
    const aiResponse = await model.generateContent(aiPrompt);

    // Extract AI-suggested product names
    const recommendedProductNames = aiResponse.response
      .text()
      .trim()
      .split(", ");

    // Fetch recommended products from DB
    const recommendedProducts = await Product.find({
      title: { $in: recommendedProductNames },
    });

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Recommended products retrieved successfully",
      data: recommendedProducts,
    });
  } catch (error) {
    console.error("Error in AI recommendation API:", error);
    return NextResponse.json(
      { error: "Internal Server Error", err: error },
      { status: 500 }
    );
  }
}
