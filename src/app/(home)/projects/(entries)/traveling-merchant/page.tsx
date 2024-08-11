import { DashboardLink, Tag } from "@/components";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TagList } from "../_components/tag-list";

export const metadata: Metadata = {
  title: "Nicholas Dullam - Traveling Merchant",
  description: "A hub for any sales gone virtual",
};

type PageProps = {};

export default function Page({}: PageProps) {
  return (
    <div>
      <div className="w-full h-[200px] relative">
        <Image
          fill
          alt="sustainably"
          src={"/assets/images/traveling-merchant-2.png"}
          className="object-cover"
        />
      </div>
      <div className="p-8 pt-0 prose prose-invert prose-sm">
        <div className="my-5 flex items-center gap-4">
          <h1 className="mb-0"> Traveling Merchant </h1>
          <Link
            href="https://github.com/NicholasDullam/traveling_merchant"
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
          <Tag>Socket.io</Tag>
        </TagList>
        <blockquote> A hub for any sales gone virtual. </blockquote>
        <h4> Description </h4>
        <p>
          Traveling Merchant is an online marketplace focused on the sale and
          logistics associated with virtual trades and services. It was a
          project started on the basis of my former roommate's experiences when
          starting his own online business; dealing with eBay, game developers,
          and third-party processing, I sought to solve his problems for him.
          The project evolved when I was given the opportunity to lead a team
          through CS 307 (Software Engineering I) at Purdue. Being a
          semester-long project, I also used the project as the basis for
          startup analysis in ENTR 310 (Marketing for Small Ventures).
        </p>
        <h4>
          Role |&nbsp;
          <span className="font-normal opacity-50">Development Lead</span>
        </h4>
        <p>
          Working on Traveling Merchant I've served as the Development Lead,
          managing a team of three other developers under SCRUM and Agile
          principles. While performing code reviews, managing pull requests and
          committing head-on, I lead the project in it's technical entirety.
        </p>
        <h4>Creating a Marketplace</h4>
        <p>
          By aiming to development a powerful online marketplace, traditionally
          two audiences are sought out with different user experiences; however,
          we looked to change that. When developing Traveling Merchant, we took
          the marketplace concept to the next level, integrating the buyer and
          seller experiences with variable commissions based on user level
          (affected by total site spending/earnings), and creating responsive
          messaging and notifications right out of the box.
        </p>
        <h4> Key Takeaways </h4>
        <p>
          What I've learned from Traveling Merchant thus far is that, creating a
          startup and managing a team can be an inherently difficult process;
          especially when balancing workloads. People won't always fulfill what
          they're set out to do, and when developing, you need to be prepared
          for that.
        </p>
      </div>
    </div>
  );
}
