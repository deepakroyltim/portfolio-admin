"use client";

import {
  Button,
  Link,
  Form,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
  Image,
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "@heroui/react";
import { BsPencilSquare } from "react-icons/bs";

import { useDisclosure } from "@heroui/react";

const projects = [
  {
    id: 1,
    title: "Portfolio Website",
    summary: "A personal website to showcase my work and resume.",
    image: "https://placehold.co/600x400",
    actions: ["Edit", "Delete"],
  },
  {
    id: 2,
    title: "Task Manager App",
    summary: "A productivity app to manage daily tasks with reminders.",
    image: "https://placehold.co/600x400",
    actions: ["Edit", "Delete"],
  },
  {
    id: 3,
    title: "Blog Platform",
    summary: "A full-stack blog platform with markdown support and comments.",
    image: "https://placehold.co/600x400",
    actions: ["Edit", "Delete"],
  },
  {
    id: 4,
    title: "Weather Dashboard",
    summary: "A real-time weather dashboard using OpenWeather API.",
    image: "https://placehold.co/600x400",
    actions: ["Edit", "Delete"],
  },
  {
    id: 5,
    title: "E-commerce Store",
    summary: "An online store with cart, checkout, and payment integration.",
    image: "https://placehold.co/600x400",
    actions: ["Edit", "Delete"],
  },
];

const skills = [
  {
    id: 1,
    title: "React.js",
    summary: "Building dynamic and responsive user interfaces.",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    actions: ["Edit", "Delete"],
  },
  {
    id: 2,
    title: "Node.js",
    summary: "Creating scalable backend services and APIs.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
    actions: ["Edit", "Delete"],
  },
  {
    id: 3,
    title: "Tailwind CSS",
    summary: "Designing modern UIs with utility-first CSS framework.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
    actions: ["Edit", "Delete"],
  },
  {
    id: 4,
    title: "MongoDB",
    summary: "Working with NoSQL databases for flexible data storage.",
    image: "https://upload.wikimedia.org/wikipedia/fr/4/45/MongoDB-Logo.svg",
    actions: ["Edit", "Delete"],
  },
  {
    id: 5,
    title: "TypeScript",
    summary: "Writing safer and more maintainable JavaScript code.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg",
    actions: ["Edit", "Delete"],
  },
];

export default function SettingPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <main className="w-full flex-1 p-8 space-y-10">
      {/* Dashboard Header */}
      <div>
        <h1 className="text-3xl font-bold">Front End Settings Page</h1>
      </div>
      <div className="flex flex-row space-x-4">
        <div className="w-full space-y-4">
          <section
            id="basic-details"
            className="flex flex-col shadow dark:shadow-primary p-4 rounded-2xl w-full max-w-2xl space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl">Projects</h2>
              <Button href="3" size="sm" onPress={onOpen}>
                New Project
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableColumn>SL</TableColumn>
                <TableColumn>Title</TableColumn>
                <TableColumn>Summary</TableColumn>
                <TableColumn>Image</TableColumn>
                <TableColumn>Actions</TableColumn>
              </TableHeader>
              <TableBody>
                {projects.map((project, index) => (
                  <TableRow>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{project.title}</TableCell>
                    <TableCell>{project.summary}</TableCell>
                    <TableCell>
                      <Image
                        src={project.image}
                        alt={project.title}
                        className="w-24 h-12 object-cover"
                      />
                    </TableCell>

                    <TableCell>
                      <Link as={Button} onPress={onOpen}>
                        <BsPencilSquare className="w-5 h-5" />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>
          <section
            id="basic-details"
            className="flex flex-col shadow dark:shadow-primary p-4 rounded-2xl w-full max-w-2xl space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl">Skills</h2>
              <Button size="sm" onPress={onOpen}>
                New Skill
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableColumn>SL</TableColumn>
                <TableColumn>Title</TableColumn>
                <TableColumn>Image</TableColumn>
                <TableColumn>Actions</TableColumn>
              </TableHeader>
              <TableBody>
                {skills.map((skill, index) => (
                  <TableRow>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{skill.title}</TableCell>
                    <TableCell>
                      <Image
                        src={skill.image}
                        alt={skill.title}
                        className="w-10 h-10"
                      />
                    </TableCell>

                    <TableCell>
                      <Link as={Button} onPress={onOpen}>
                        <BsPencilSquare className="w-5 h-5" />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>
        </div>
        <div className="w-full">
          <section
            id="basic-details"
            className="flex flex-col shadow dark:shadow-primary p-4 rounded-2xl w-full max-w-2xl space-y-6"
          >
            <h2 className="text-2xl">Basic Details</h2>
            <Form className="w-full max-w-2xl space-y-4">
              <Input
                name="site-name"
                label="Site Name"
                labelPlacement="outside"
                placeholder="Please enter your name"
              />
              <Input
                name="tag-line"
                label="Tag Line"
                labelPlacement="outside"
                placeholder="Please enter a tagline"
              />
              <Input
                type="file"
                name="profile-img"
                label="Profile Image"
                placeholder="Choose your image"
                labelPlacement="outside"
              />
              <Textarea
                name="about-me"
                label="About Me"
                labelPlacement="outside"
              />
              <Input
                type="file"
                name="aboutme-img"
                label="About Me Image"
                placeholder="Choose your pic"
                labelPlacement="outside"
              />
              <div className="w-full">
                <Button className="w-full">Save</Button>
              </div>
            </Form>
          </section>
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <Form className="space-y-4">
                  <Input
                    label="Project Name"
                    labelPlacement="outside"
                    placeholder="Enter project name"
                  />
                  <Textarea
                    label="Project Summary"
                    labelPlacement="outside"
                    placeholder="Enter project summary"
                  />
                </Form>
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </main>
  );
}
