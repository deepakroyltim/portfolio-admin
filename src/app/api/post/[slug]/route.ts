import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const client = new PrismaClient();

type UrlSlug = {
  params: Promise<{ slug: string }>;
};

export async function GET(req: NextRequest, { params }: UrlSlug) {
  const { slug } = await params;

  try {
    const post = await client.post.findUnique({
      where: { slug },
      include: {
        user: {
          select: { id: true, name: true, image: true },
        },
        postTaxonomies: {
          include: {
            taxonomyMeta: {
              include: {
                taxonomy: true,
              },
            },
          },
        },
      },
    });

    if (!post) {
      return NextResponse.json(
        { success: false, message: "Post not found" },
        { status: 404 }
      );
    }

    // Transform the data for better structure
    const category: (typeof post.postTaxonomies)[0]["taxonomyMeta"][] = [];
    const tags: (typeof post.postTaxonomies)[0]["taxonomyMeta"][] = [];
    for (const pt of post.postTaxonomies) {
      const meta = pt.taxonomyMeta;
      if (meta?.taxonomy?.slug === "category") {
        category.push(meta);
      }
      if (meta?.taxonomy?.slug === "tags") {
        tags.push(meta);
      }
    }

    const transformPosts = {
      id: post.id,
      title: post.title,
      slug: post.slug,
      summary: post.summary,
      content: post.content,
      image: post.image,
      date: post.date,
      user: post.user,
      category,
      tags,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };

    revalidatePath(`/post`);
    revalidatePath(`/post/${post.slug}`);
    return NextResponse.json({ success: true, post: transformPosts });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    }
    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong, Please try after sometime.",
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const {
    postId,
    title,
    slug,
    summary,
    content,
    categories,
    userId,
    tags,
    image,
  } = body;

  try {
    const updatedPost = await client.post.update({
      where: { id: postId },
      data: {
        title,
        slug,
        summary,
        content,
        userId,
        image,
        updatedAt: new Date(),
      },
    });

    // Remove existing PostTaxonomy relations
    const status = await client.postTaxonomy.deleteMany({
      where: { postId: String(postId) },
    });

    // Reconnect tags and category
    const allTaxonomySlugs = [...tags, ...categories];

    const taxonomyMeta = await client.taxonomyMeta.findMany({
      where: { slug: { in: allTaxonomySlugs } },
    });

    const postTaxonomies = taxonomyMeta.map((meta) => ({
      postId: postId,
      taxonomyMetaId: meta.id,
    }));

    await client.postTaxonomy.createMany({
      data: postTaxonomies,
    });

    return NextResponse.json({ success: true, post: updatedPost });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    }
    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong, Please try after sometime.",
      },
      { status: 500 }
    );
  }
}
