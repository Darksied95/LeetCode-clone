import TopBar from "@/components/TopBar/TopBar";
import Workspace from "@/components/Workspace/Workspace";
import { problems } from "@/utils/problems";
import React from "react";

type ProblemPageProps = {};

const ProblemPage: React.FC<ProblemPageProps> = () => {
  return (
    <div>
      <TopBar problemPage />
      <Workspace />
    </div>
  );
};
export default ProblemPage;

export async function getStaticPaths() {
  const paths = Object.keys(problems).map((key) => {
    params: {
      pid: key;
    }
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { pid: string } }) {
  const { pid } = params;
  const problem = problems[pid];

  if (!problem) {
    return {
      notFound: true,
    };
  }

  return {
    props: { problem },
  };
}
