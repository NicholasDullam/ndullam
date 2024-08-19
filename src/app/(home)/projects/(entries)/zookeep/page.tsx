import { DashboardLink, Tag } from "@/components";
import { TagList } from "@/components/tag-list";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nicholas Dullam - ZooKeep",
  description:
    "An experimental project, seeking to test the integrations of information systems",
};

type PageProps = {};

export default function Page({}: PageProps) {
  return (
    <div>
      <div className="w-full h-[200px] relative">
        <Image
          fill
          src={"/assets/images/zookeep-1.jpeg"}
          alt="zookeep"
          className="object-cover"
        />
      </div>
      <div className="p-8 pt-0 prose prose-invert prose-sm max-w-full">
        <div className="my-5 flex items-center gap-4">
          <h1 className="mb-0"> Zookeep </h1>
          <Link
            href="https://github.com/NicholasDullam/zookeep"
            target="_blank"
            className="ml-auto no-underline"
          >
            <DashboardLink name="GitHub" />
          </Link>
        </div>
        <TagList>
          <Tag>Heroku</Tag>
          <Tag>MongoDB</Tag>
          <Tag>Node.js</Tag>
          <Tag>React.js</Tag>
          <Tag>Express.js</Tag>
        </TagList>
        <blockquote>
          An experimental project, seeking to test the integrations of
          information systems through an intuitive admin-level user experience.
        </blockquote>
        <h4> Description </h4>
        <p>
          ZooKeep is a zoo-management platform, offering an experience geared at
          increasing the efficacy of management integrations. This project was
          started as an experimental design, testing user experience with more
          complex manipulation of information systems through CS 348
          (Information Systems) at Purdue.
        </p>
        <h4>
          Role |&nbsp;<span className="font-normal opacity-50">Developer</span>
        </h4>
        <p>
          When working on ZooKeep, as served as one of three developers;
          programming both the frontend and backend implementations while
          focusing on continuous integrations and database management.
        </p>
        <h4>Creating an Effective User Experience</h4>
        <p>
          User experience, especially when dealing with high-level interactions,
          requires design that is both intuitive and responsive. Creating
          navigation that is straight-forward, including the minimum
          interactions to complete a function, and ensuring that all
          interactions are direct and understood are crucial in providing the
          user with the response that they expect, when they expect it.
        </p>
        <h4> Key Takeaways </h4>
        <p>
          Working on ZooKeep, I've understood the importance of concrete data
          construction for scalability, alongside the necessary precautions when
          integrating a user-experience to admin-level data manipulation.
          Ensuring DB transactions and isolation levels are properly seated are
          also steps that must be taken when dealing with concurrent changes.
        </p>
      </div>
    </div>
  );
}
