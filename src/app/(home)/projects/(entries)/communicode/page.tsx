import { Tag } from "@/components";
import { TagList } from "@/components/tag-list";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Nicholas Dullam - Communicode",
  description:
    "A startup with an aim of connecting developers with non-profits",
};

type PageProps = {};

export default function Page({}: PageProps) {
  return (
    <div>
      <div className="w-full h-[200px] relative">
        <Image
          fill
          priority
          alt="sustainably"
          src={"/assets/images/communicode-1.jpeg"}
          className="object-cover"
        />
      </div>
      <div className="p-8 pt-0 prose prose-invert prose-sm max-w-full">
        <div className="my-5">
          <h1 className="mb-0"> Communicode </h1>
        </div>
        <TagList>
          <Tag>Python</Tag>
          <Tag>Numpy</Tag>
          <Tag>GCP</Tag>
          <Tag>MongoDB</Tag>
          <Tag>Redis</Tag>
          <Tag>Node.js</Tag>
          <Tag>React.js</Tag>
          <Tag>Express.js</Tag>
        </TagList>
        <blockquote>
          A startup with an aim of connecting developers with non-profits in
          need.
        </blockquote>
        <h4> Description </h4>
        <p>
          Communicode was a start-up project that used machine learning to
          connect developers and designers with non-profit organizations in need
          of a digital update. Designers and developers would be matched with
          non-profit organizations based on their interests and skills, or they
          could browse projects posted by non-profits.
        </p>
        <h4>
          Role |&nbsp;
          <span className="font-normal opacity-50">
            Vice President of Engineering
          </span>
        </h4>
        <p>
          At Communicode, I served as the Vice President of Engineering;
          overseeing integrations, server architectures, and ensuring the
          continuity of the backend development process as we expanded to an
          LLC.
        </p>
        <h4>
          Creating <i>Shapiro</i>
        </h4>
        <p>
          One of my major feats at Communicode was the development of a backend
          matching algorithm; namely, <i>Shapiro</i>. <i>Shapiro</i> was an
          algorithm, written in python, based upon the principles of k-nearest
          neighbors clustering with adaptions driven towards optimizing our user
          experience.
        </p>
        <h4> Key Takeaways </h4>
        <p>
          {`Working at Communicode was one of my first real-world application of
          what I've learned throughout my life programming. I had never been
          exposed to web development, nor an outside work environment before
          this point. What I learned here pushed me into where I am today,
          studying Computer Science, Data Science, and Applied Statistics at
          Purdue.`}
        </p>
      </div>
    </div>
  );
}
