"use client";

import {
  Button,
  Form,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";

import React, { FormEvent, useEffect, useState } from "react";

interface TaxonomyMeta {
  id: string;
  name: string;
  slug: string;
  taxonomyId: string;
}

interface PostPageClientProps {
  categories: TaxonomyMeta[];
  tags: TaxonomyMeta[];
}

const PostPageClient = ({ categories, tags }: PostPageClientProps) => {
  const [postSaving, setPostSaving] = useState(false);
  const [selectedTags, setSelectedTags] = useState("");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPostSaving(true);
    const formData = new FormData(event.currentTarget);
    const title = formData.get("title");
    const slug = formData.get("slug");
    const summary = formData.get("summary");
    const content = formData.get("content");
    const categoryId = formData.get("categoryId");

    const response = await fetch("/api/post", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        slug,
        summary,
        content,
        categoryId,
        tagsId: selectedTags,
      }),
    });
    if (response.ok) {
      setPostSaving(false);
      console.log(response);
    } else {
      setPostSaving(false);
      console.log("Error");
    }
  };

  const handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTags(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setName(name);
    setSlug(name.toLocaleLowerCase().trim().replace(/\s+/g, "-"));
  };

  return (
    <main className="flex-1 p-8 space-y-10">
      <h1 className="text-3xl font-bold">Add Post</h1>
      <section>
        <Form className="max-w-2xl space-y-4" onSubmit={handleSubmit}>
          <Input
            name="title"
            label="Title"
            labelPlacement="outside"
            placeholder="Enter post title"
            value={name}
            onChange={handleNameChange}
            isRequired
          />
          <Input
            name="slug"
            label="Slug"
            labelPlacement="outside"
            placeholder="Enter post slug"
            value={slug}
            isRequired
          />
          <Textarea
            name="summary"
            label="Summary"
            labelPlacement="outside"
            isRequired
          />
          <Textarea
            name="content"
            label="Post Content"
            labelPlacement="outside"
            isRequired
          />
          <div className="w-full flex flex-row gap-2">
            <Select
              name="categoryId"
              placeholder="Select a category"
              label="Category"
              labelPlacement="outside"
              selectionMode="single"
              isRequired
            >
              {(categories ?? []).map((category) => (
                <SelectItem key={category.id}>{category.name}</SelectItem>
              ))}
            </Select>
            <Select
              name="tagsId"
              label="Tags"
              labelPlacement="outside"
              placeholder="Select tags"
              selectionMode="multiple"
              onChange={handleTagChange}
              isRequired
            >
              {(tags ?? []).map((tag) => (
                <SelectItem key={tag.id}>{tag.name}</SelectItem>
              ))}
            </Select>
          </div>

          <Button type="submit" disabled={postSaving} isLoading={postSaving}>
            {postSaving ? "Saving..." : "Save"}
          </Button>
          {/* {formState?.error && <Alert color="danger" title={formState.error} />} */}
        </Form>
      </section>
    </main>
  );
};

export default PostPageClient;
