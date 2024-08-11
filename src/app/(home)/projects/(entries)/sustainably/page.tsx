import { DashboardLink, Tag } from "@/components";
import Image from "next/image";
import Link from "next/link";

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
      <div className="p-8 pt-3">
        <div
          className="my-5"
          style={{ display: "flex", alignItems: "center", overflowX: "scroll" }}
        >
          <h1 className="text-2xl font-bold mb-0"> Sustainably </h1>
          <div style={{ color: "white", marginLeft: "auto" }}>
            <Link href="https://app.stnbly.io/dashboard" target="_blank">
              <DashboardLink name="Visit" />
            </Link>
          </div>
        </div>
        <div className="flex mb-5 overflow-x-scroll">
          <Tag>Heroku</Tag>
          <Tag>AWS</Tag>
          <Tag>MongoDB</Tag>
          <Tag>Node.js</Tag>
          <Tag>React.js</Tag>
          <Tag>Express.js</Tag>
          <Tag>Stripe</Tag>
        </div>
        <h6 className="text-sm mt-5">
          A wellness-driven startup with an aim to help those on their fitness
          journey.
        </h6>
        <h3 className="text-md font-bold mt-5 mb-2"> Description </h3>
        <p>
          Sustainably is a SaaS web app geared towards helping people reach
          their fitness goal. It expands my client's personal training business
          into a more affordable and scalable method of giving his customers the
          tools necessary to get to where they want to be.
        </p>
        <h3 className="text-md font-bold mt-5 mb-2">
          Role |{" "}
          <span className="text-md opacity-50 font-normal">
            Development Lead
          </span>
        </h3>
        <p>
          At Sustainably, I continue to serve as the Development Lead, creating
          and managing our MVP while introducing various functional iterations
          as the company's matured. While programming the product in it's
          entirety, I designed an intuitive user experience for new and power
          users, while ensuring backend scalability and version control through
          a Github organization.
        </p>
        <h3 className="text-md font-bold mt-5 mb-2"> Creating a SaaS </h3>
        <p>
          When developing Sustainably as my first paid-access model, it was
          important to note the efficacy of design. When creating the sign-up,
          the sign-in, even the in-app experiences, I drove the design towards
          increasing user interactions and overall retention; reducing churn
          through our subsequent functional iterations.
        </p>
        <h3 className="text-md font-bold mt-5 mb-2"> Key Takeaways </h3>
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
