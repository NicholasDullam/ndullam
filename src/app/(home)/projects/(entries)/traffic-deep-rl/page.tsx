import { DashboardLink, Tag } from "@/components";
import { TagList } from "@/components/tag-list";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nicholas Dullam - Traffic Deep RL",
  description: "A project aimed at optimizing traffic-light patterns",
};

type PageProps = {};

export default function Page({}: PageProps) {
  return (
    <div>
      <div className="w-full h-[200px] relative">
        <Image
          fill
          alt="traffic rl"
          src={"/assets/images/traffic-rl-1.png"}
          className="object-cover"
        />
      </div>
      <div className="p-8 pt-0 prose prose-invert prose-sm max-w-full">
        <div className="my-5 flex items-center gap-4">
          <h1 className="mb-0"> Traffic Deep RL </h1>
        </div>
        <TagList>
          <Tag>Python</Tag>
          <Tag>Numpy</Tag>
          <Tag>Rllib</Tag>
          <Tag>SUMO</Tag>
          <Tag>SUMORL</Tag>
        </TagList>
        <blockquote>
          A project aimed at optimizing traffic-light patterns for improved
          realistic throughput of intersections.
        </blockquote>
        <h4> Description </h4>
        <p>
          {`As a capstone project for CS 490, my team and I worked alongside a
          professor from Purdue's department of Civil Engineering to optimize
          traffic patterns with deep-reinforcement learning principles.`}
        </p>
        <h4>
          Role |<span className="font-normal opacity-50"> Member </span>
        </h4>
        <p>
          As a member of a team of six other developers, I worked to aid the
          group in data preparation, modeling, evaluations, and general
          understanding, while documenting reports of our results and processes
          for further repeatability.
        </p>
        <h4> Modeling with Deep RL </h4>
        <p>
          {`In our case, given our use of reinforcement learning, it's important
          to note how we managed the state and environment. Based on 15 minutes
          of data from Lankershim boulevard, we created baseline aggregates,
          like turning volume, to use an a simulation tool known as SUMO -- this
          would end up being our way of creating a new data pool for our models.
          Modeling with a focus on deep-reinforcement learning in our case can
          be broken down into three groups: use of deep-q networks (DQN),
          proximal policy optimization (PPO), and soft-actor critic (SAC). Each
          of these models was tested with two value functions to optimize
          throughout, one with judgement on aggregate vehicle delay, and the
          other on total vehicle stops. Results for our initial findings can
          also be found below.`}
        </p>
        <div className="flex flex-col gap-2">
          <Link
            href="https://data.transportation.gov/Automobiles/Next-Generation-Simulation-NGSIM-Vehicle-Trajector/8ect-6jqj"
            target="_blank"
            className="no-underline flex"
          >
            <DashboardLink name="Dataset" />
          </Link>
          <Link
            href={"/assets/documents/modeling-report.pdf"}
            target="_blank"
            className="no-underline flex"
          >
            <DashboardLink name="Modeling" />
          </Link>
        </div>
        <h4> Key Takeaways </h4>
        <p>
          {`As a project heavy in development, understanding, and repeatability,
          it was important to cycle changes -- for instance, once we've
          developed a solution, but develop a new understanding of the data,
          it's crucial to cycle back and reflect the new understanding in the
          development process. As for repeatability, with things constantly
          changing, it's necessary to document the entire process to ensure any
          results can be matched by a reviewing third-party.`}
        </p>
      </div>
    </div>
  );
}
