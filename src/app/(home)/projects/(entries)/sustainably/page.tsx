import { DashboardLink, Tag } from "@/components";
import { TagList } from "@/components/tag-list";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nicholas Dullam - Sustainably",
  description:
    "A wellness-driven startup with an aim to help those on their fitness journey",
};

type PageProps = {};

export default function Page({}: PageProps) {
  return (
    <div className="text-white text-sm">
      <div className="w-full h-[200px] relative">
        <Image
          fill
          alt="sustainably"
          src={"/assets/images/sustainably-2.png"}
          className="object-cover"
        />
      </div>
      <div className="p-8 pt-0 prose prose-invert prose-sm">
        <div className="my-5 flex items-center gap-4">
          <h1 className="mb-0"> Sustainably </h1>
          <Link
            href="https://app.stnbly.io/dashboard"
            target="_blank"
            className="ml-auto no-underline"
          >
            <DashboardLink name="Visit" />
          </Link>
        </div>
        <TagList>
          <Tag>Heroku</Tag>
          <Tag>AWS</Tag>
          <Tag>MongoDB</Tag>
          <Tag>Node.js</Tag>
          <Tag>React.js</Tag>
          <Tag>Express.js</Tag>
          <Tag>Stripe</Tag>
        </TagList>
        <blockquote>
          A wellness-driven startup with an aim to help those on their fitness
          journey.
        </blockquote>
        <h4> Description </h4>
        <p>
          Sustainably is a SaaS web app geared towards helping people reach
          their fitness goal. It expands my client's personal training business
          into a more affordable and scalable method of giving his customers the
          tools necessary to get to where they want to be.
        </p>
        <h4>
          Role |&nbsp;
          <span className="opacity-50 font-normal">Development Lead</span>
        </h4>
        <p>
          At Sustainably, I continue to serve as the Development Lead, creating
          and managing our MVP while introducing various functional iterations
          as the company's matured. While programming the product in it's
          entirety, I designed an intuitive user experience for new and power
          users, while ensuring backend scalability and version control through
          a Github organization.
        </p>
        <h4> Creating a SaaS </h4>
        <p>
          When developing Sustainably as my first paid-access model, it was
          important to note the efficacy of design. When creating the sign-up,
          the sign-in, even the in-app experiences, I drove the design towards
          increasing user interactions and overall retention; reducing churn
          through our subsequent functional iterations.
        </p>
        <h4> Key Takeaways </h4>
        <p>
          Working at Sustainably was my first full-time experience managing an
          industry-level project, contracted for a client of mine. I realized
          that, despite entering a position without a mentor, learning and
          accelerating my skillset was possible; offering enough to create an
          MVP and a subsequent functional iteration to an active business.
        </p>
      </div>
    </div>
  );
}
