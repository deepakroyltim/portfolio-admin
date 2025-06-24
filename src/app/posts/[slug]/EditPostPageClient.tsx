"use client";

import {
  Form,
  Input,
  Button,
  Textarea,
  Link,
  Tooltip,
  Select,
  SelectItem,
  Alert,
} from "@heroui/react";
import { useState, useEffect } from "react";
import { BsArrowLeftSquareFill, BsArrowLeftShort } from "react-icons/bs";
import CKEditorComponent from "@/components/Editor/CKEditor";

interface TaxonomyMeta {
  id: string;
  name: string;
  slug: string;
}

interface User {
  id: string;
  name: string;
}

interface PostWithData {
  id: string;
  slug: string;
  title: string;
  summary: string;
  image: string;
  content: string;
  user: User;
  tags: TaxonomyMeta[];
  category: TaxonomyMeta[];
}

interface EditPostPageClientProps {
  post: PostWithData;
  categories: TaxonomyMeta[];
  tags: TaxonomyMeta[];
}

const EditPostPageClient = ({ data }: { data: EditPostPageClientProps }) => {
  const { post, categories, tags } = data;
  console.log("Old POst:", post);
  const [editorData, setEditorData] = useState<string>(post.content);

  const [title, setTitle] = useState(post.title);
  const [slug, setSlug] = useState(post.slug);
  const [summary, setsummary] = useState(post.summary);

  const [selectedTags, setSelectedTags] = useState<Set<string>>(
    new Set(post.tags.map((tag: TaxonomyMeta) => tag.slug))
  );
  const [selectedCategory, setSelectedCategory] = useState<Set<string>>(
    new Set(post.category.map((cat: TaxonomyMeta) => cat.slug))
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleEditorChange = (event: any, editor: any) => {
    const data = editor.getData();
    setEditorData(data);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    let payload = {
      title,
      slug,
      summary,
      tags: Array.from(selectedTags),
      categories: Array.from(selectedCategory),
      content: editorData,
      userId: post.user.id,
      postId: post.id,
    };

    const response = await fetch(`/api/post/${post.slug}`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      setSuccess("Updated successfully.");
      setTimeout(() => setSuccess(null), 3000);
      setIsLoading(false);
    } else {
      setError("Something went wrong...");
      setTimeout(() => setError(null), 3000);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold flex justify-start items-center">
          <Tooltip content="Back to all posts">
            <Link href="/posts" color="primary" className="font-bold">
              <BsArrowLeftSquareFill className="w-7 h-7 me-2" />
            </Link>
          </Tooltip>
          {post?.title}
        </h1>
      </div>

      <section>
        <Form
          className="w-full max-w-4xl flex flex-col space-y-4 gap-4"
          onSubmit={handleSubmit}
        >
          <div className="w-full flex flex-row gap-2 ">
            <div className="basis-1/2">
              <Input
                isRequired
                errorMessage="Please enter a valid title"
                label="Title"
                labelPlacement="outside"
                name="title"
                placeholder="Enter your title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="basis-1/2">
              <Input
                isRequired
                errorMessage="Please enter a valid slug"
                label="Slug"
                labelPlacement="outside"
                name="slug"
                placeholder="Enter your slug"
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
          </div>
          <Input type="hidden" name="image" value={post?.image || ""} />
          <div className="w-full ">
            <Textarea
              isRequired
              errorMessage="Please enter a valid summary"
              label="Summary"
              labelPlacement="outside"
              name="summary"
              placeholder="Enter post summary"
              value={summary}
              onChange={(e) => setsummary(e.target.value)}
            />
          </div>
          <div className="w-full">
            <h1 className="text-small">Content</h1>
            <CKEditorComponent
              content={post?.content || ""}
              onChange={handleEditorChange}
            />
          </div>

          <div className="w-full flex flex-row gap-2">
            <Select
              name="category"
              className="w-full"
              label="Category"
              labelPlacement="outside"
              selectionMode="single"
              selectedKeys={selectedCategory}
              isRequired
              onSelectionChange={(keys) =>
                setSelectedCategory(new Set(keys as string))
              }
            >
              {(categories ?? []).map((category) => (
                <SelectItem key={category.slug}>{category.name}</SelectItem>
              ))}
            </Select>
            <Select
              name="tags"
              className="w-full"
              labelPlacement="outside"
              label="Tags"
              placeholder="Select tags"
              selectionMode="multiple"
              selectedKeys={selectedTags}
              isRequired
              onSelectionChange={(keys) =>
                setSelectedTags(new Set(keys as string))
              }
            >
              {(tags ?? []).map((tag) => (
                <SelectItem key={tag.slug}>{tag.name}</SelectItem>
              ))}
            </Select>
          </div>

          {success && <Alert color="success" title={success} />}
          {error && <Alert color="danger" title={error} />}

          <div className="w-full flex justify-end gap-2">
            <Button
              color="primary"
              type="submit"
              className="w-full"
              disabled={isLoading}
              isLoading={isLoading}
            >
              {isLoading ? "Updating" : "Update"}
            </Button>

            <Button
              color="default"
              as={Link}
              className="w-full"
              href="/posts"
              startContent={<BsArrowLeftShort />}
            >
              Back to All Posts
            </Button>
          </div>
        </Form>
      </section>
    </>
  );
};

export default EditPostPageClient;
