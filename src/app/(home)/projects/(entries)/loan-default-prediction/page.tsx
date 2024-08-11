import { DashboardLink, Tag } from "@/components";
import { TagList } from "@/components/tag-list";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nicholas Dullam - Loan Default Prediction",
  description: "An ML investigation on the defaulting of loans",
};

type PageProps = {};

export default function Page({}: PageProps) {
  return (
    <div>
      <div className="w-full h-[200px] relative">
        <Image
          fill
          src={"/assets/images/loan-default-1.png"}
          alt="loan default prediction"
          className="object-cover"
        />
      </div>
      <div className="p-8 pt-0 prose prose-invert prose-sm">
        <div className="my-5 flex items-center gap-4">
          <h1 className="mb-0"> Loan Default Prediction </h1>
          <div style={{ color: "white", marginLeft: "auto" }}>
            <Link
              href="https://github.com/NicholasDullam/loan_default"
              className="no-underline"
            >
              <DashboardLink name="GitHub" />
            </Link>
          </div>
        </div>
        <TagList>
          <Tag>Python</Tag>
        </TagList>
        <blockquote>An ML investigation on the defaulting of loans.</blockquote>
        <h4> Description </h4>
        <p>
          When an borrower defaults on a loan, they fail to repay their debt
          according to the initial arrangements set by the debtor -- a failed
          repayment proves to be an issue with both parties involved. Our goal
          was to predict whether a borrower would default on a loan, given their
          outlined financial statements using Principal Component Analysis, and
          K-nearest Neighbors.
        </p>
        <h4>
          Role |&nbsp;<span className="opacity-50 font-normal">Member</span>
        </h4>
        <p>
          Working on the project, I acted as a team member alongside two other
          students to follow through on our goal of accurately predicting a
          borrower's defaulting behavior. As teammates, we all followed through
          on our strengths, collaborating on the direction of the project and
          ensuring representative results with regular code reviews.
        </p>
        <h4> Creating a Model </h4>
        <p>
          As an overview of our methodology, we took a training, testing, and
          validation approach to predicting the defaulting of loans based upon
          50 features provided a pruned sample of individual financial
          statements. With all of our implementations with custom algorithm
          configurations in Python, we tuned our hyperparameters for PCA to
          include a dimensionality reduction of 6, minimizing our error rate of
          ~8.4%. As for our K-nearest Neighbors implementation, we minimized our
          error rate over sample sizes of 100, with k-values of 2 and 4
          respectively, at ~10%.
        </p>
        <h4> Key Takeaways </h4>
        <p>
          As one of my first involved applications of m achine learning, I found
          the importance of not only understanding the underlying models and
          algorithms, with our custom implementations, but the importantance of
          cross-validating our own implementations among ourselves, helping to
          reduce compute time by getting it right the first time, and pushing
          for accurate and representative results.
        </p>
      </div>
    </div>
  );
}
